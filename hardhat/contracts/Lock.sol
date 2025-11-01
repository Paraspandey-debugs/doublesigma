// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// OpenZeppelin contracts
import "@openzeppelin/contracts/access/AccessControl.sol";

contract LandRegistryPrivate is AccessControl {
    bytes32 public constant GOVERNMENT_ROLE = keccak256("GOVERNMENT_ROLE");
    bytes32 public constant KYC_REGISTRAR_ROLE = keccak256("KYC_REGISTRAR_ROLE");
    bytes32 public constant BANK_ROLE = keccak256("BANK_ROLE");

    constructor(address governmentAdmin) {
        // Grant admin roles
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);            // deployer is admin
        _grantRole(GOVERNMENT_ROLE, governmentAdmin);          // government admin
        _setRoleAdmin(GOVERNMENT_ROLE, DEFAULT_ADMIN_ROLE);
        _setRoleAdmin(KYC_REGISTRAR_ROLE, GOVERNMENT_ROLE);    // government controls registrars
        _setRoleAdmin(BANK_ROLE, GOVERNMENT_ROLE);
    }

    // --------- User / KYC management ----------
    // We never store raw Aadhaar; store only a salted hash (bytes32)
    mapping(bytes32 => address) public aadhaarHashToAddress; // aadhaarHash -> user address
    mapping(address => bool) public isKycVerified;           // address -> verified

    event UserKycRegistered(address indexed user, bytes32 indexed aadhaarHash, string displayName);
    event UserKycRevoked(address indexed user);

    // register a KYC'd user. Only registrar or government can do this.
    function registerUserKyc(bytes32 aadhaarHash, address userAddress, string memory displayName) external onlyRole(KYC_REGISTRAR_ROLE) {
        require(userAddress != address(0), "invalid user");
        require(aadhaarHashToAddress[aadhaarHash] == address(0), "aadhaar already registered");
        require(!isKycVerified[userAddress], "address already KYC verified");

        aadhaarHashToAddress[aadhaarHash] = userAddress;
        isKycVerified[userAddress] = true;

        emit UserKycRegistered(userAddress, aadhaarHash, displayName);
    }

    function revokeUserKyc(address userAddress) external onlyRole(GOVERNMENT_ROLE) {
        require(isKycVerified[userAddress], "user not verified");
        // find aadhaarHash (expensive) - for demo we won't remove mapping, just flip verification
        isKycVerified[userAddress] = false;
        emit UserKycRevoked(userAddress);
    }

    // --------- Land data structure ----------
    struct Land {
        uint256 id;
        string location;                  // basic public description
        uint256 area;
        address currentOwner;             // visible on-chain
        bool verified;                    // government-verified
        string documentsIpfsHash;         // IPFS pointer for public docs (optional)
        string historyIpfsHash;           // IPFS pointer for ENCRYPTED ownership history (only gov can decrypt)
        // Loan / collateral fields
        address coOwner;                  // bank address when loan active
        bool loanActive;
        uint256 loanAmount;
        bool loanCleared;
    }

    mapping(uint256 => Land) private lands;
    uint256 public nextId = 1;

    // Events
    event LandRegistered(uint256 indexed landId, address indexed owner, string location);
    event LandVerified(uint256 indexed landId);
    event LandTransferred(uint256 indexed landId, address indexed from, address indexed to, string encryptedHistoryIpfsHash);
    event LandPledged(uint256 indexed landId, address indexed owner, address indexed bank, uint256 loanAmount, string encryptedLoanDocIpfsHash);
    event LoanRepaid(uint256 indexed landId);

    // --------- Modifiers ----------
    modifier onlyKycVerified() {
        require(isKycVerified[msg.sender], "KYC required");
       _;
    }

    modifier onlyExistingLand(uint256 landId) {
        require(landId > 0 && landId < nextId, "land not exist");
       _;
    }

    modifier onlyOwnerOf(uint256 landId) {
        require(msg.sender == lands[landId].currentOwner, "not land owner");
       _;
    }

    // --------- Functions ----------
    // Register a land: caller must be KYC verified. Documents/history should be encrypted if sensitive.
    function registerLand(string memory location, uint256 area, string memory documentsIpfsHash, string memory encryptedHistoryIpfsHash) external onlyKycVerified returns (uint256) {
        uint256 landId = nextId++;
        Land storage l = lands[landId];
        l.id = landId;
        l.location = location;
        l.area = area;
        l.currentOwner = msg.sender;
        l.verified = false;
        l.documentsIpfsHash = documentsIpfsHash;
        l.historyIpfsHash = encryptedHistoryIpfsHash; // should be encrypted (gov key) if contains sensitive info

        emit LandRegistered(landId, msg.sender, location);
        return landId;
    }

    // Government verifies land
    function verifyLand(uint256 landId) external onlyRole(GOVERNMENT_ROLE) onlyExistingLand(landId) {
        lands[landId].verified = true;
        emit LandVerified(landId);
    }

    // Pledge land to bank (collateral). Owner must be KYC verified and land must be verified.
    // 'encryptedLoanDocIpfsHash' contains encrypted loan docs (bank+owner signed) — only gov can decrypt.
    function pledgeLandToBank(uint256 landId, address bank, uint256 loanAmount, string memory encryptedLoanDocIpfsHash) external onlyExistingLand(landId) onlyOwnerOf(landId) {
        Land storage l = lands[landId];
        require(l.verified, "land not verified");
        require(!l.loanActive, "loan already active");
        require(isKycVerified[bank], "bank must be KYC verified"); // or use BANK_ROLE for banks
        l.coOwner = bank;
        l.loanActive = true;
        l.loanAmount = loanAmount;
        l.loanCleared = false;

        // optionally update history pointer to include loan info (encrypted)
        l.historyIpfsHash = encryptedLoanDocIpfsHash;
        emit LandPledged(landId, msg.sender, bank, loanAmount, encryptedLoanDocIpfsHash);
    }

    // Bank or Government marks loan repaid
    function markLoanAsRepaid(uint256 landId) external onlyExistingLand(landId) {
        Land storage l = lands[landId];
        require(l.loanActive, "no active loan");
        // allow bank (coOwner) or government to mark repaid
        require(msg.sender == l.coOwner || hasRole(GOVERNMENT_ROLE, msg.sender), "only bank or government");
        l.loanActive = false;
        l.loanCleared = true;
        l.coOwner = address(0);
        l.loanAmount = 0;
        emit LoanRepaid(landId);
    }

    // Transfer land — requires land verified and no active loan. Caller must be current owner.
    // Caller must supply 'encryptedHistoryIpfsHash' which should be the IPFS hash of an ENCRYPTED JSON that includes sale price and previous owner details.
    function transferLand(uint256 landId, address newOwner, string memory encryptedHistoryIpfsHash) external onlyExistingLand(landId) onlyOwnerOf(landId) {
        Land storage l = lands[landId];
        require(l.verified, "land not verified");
        require(!l.loanActive, "land under active loan cannot be transferred");
        require(isKycVerified[newOwner], "new owner must be KYC verified");

        address oldOwner = l.currentOwner;
        l.currentOwner = newOwner;
        // store pointer to encrypted history blob (contains previous owners, sale price, etc.)
        l.historyIpfsHash = encryptedHistoryIpfsHash;

        emit LandTransferred(landId, oldOwner, newOwner, encryptedHistoryIpfsHash);
    }

    // Public getter for basic (non-sensitive) land info
    function getPublicLand(uint256 landId) external view onlyExistingLand(landId) returns (
        uint256 id,
        string memory location,
        uint256 area,
        address currentOwner,
        bool verified,
        bool loanActive,
        address coOwner
    ) {
        Land memory l = lands[landId];
        return (l.id, l.location, l.area, l.currentOwner, l.verified, l.loanActive, l.coOwner);
    }

    // Government-only getter for the encrypted history pointer (IPFS hash) — the hash itself is public if you make this public,
    // but we provide this government-only view to emphasize that only govt should try to fetch/decrypt content.
    function getEncryptedHistoryIpfsHash(uint256 landId) external view onlyExistingLand(landId) onlyRole(GOVERNMENT_ROLE) returns (string memory) {
        return lands[landId].historyIpfsHash;
    }

    // For audit — gov can fetch full internal structure (not exposed to general public)
    function getFullLandDetailsForGov(uint256 landId) external view onlyExistingLand(landId) onlyRole(GOVERNMENT_ROLE) returns (
        uint256 id,
        string memory location,
        uint256 area,
        address currentOwner,
        bool verified,
        string memory documentsIpfsHash,
        string memory historyIpfsHash,
        address coOwner,
        bool loanActive,
        uint256 loanAmount,
        bool loanCleared
    ) {
        Land memory l = lands[landId];
        return (l.id, l.location, l.area, l.currentOwner, l.verified, l.documentsIpfsHash, l.historyIpfsHash, l.coOwner, l.loanActive, l.loanAmount, l.loanCleared);
    }

    // Utility: get total lands
    function getTotalLands() external view returns (uint256) {
        return nextId - 1;
    }
}