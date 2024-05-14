// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pixelia is ERC1155, Ownable {
    string private _baseTokenURI;
    uint256 public baseFee;

    uint256 public nextTokenId;
    uint256 public immutable maxSupply;
    mapping(uint256 => string) public tokenURIs;
    mapping(uint256 => bool) public tokenExists;
    mapping(uint256 => address) public tokenOwners;
    mapping(uint256 => string) public worldNames;
    mapping(uint256 => string) public worldDescriptions;

    event WorldCreated(uint256 indexed tokenId, address indexed owner, string uri, string name, string description);
    event BaseFeeChanged(uint256 newBaseFee);
    event TokenURIUpdated(uint256 indexed tokenId, string newURI);

    struct NFT {
        uint256 tokenId;
        address owner;
        string uri;
        string name;
        string description;
    }

    modifier onlyOwnerOrAuthorized(uint256 _tokenId) {
        require(msg.sender == owner() || msg.sender == creatorOf(_tokenId), "Not authorized");
        _;
    }

    constructor(uint256 _maxSupply, string memory baseTokenURI, uint256 _baseFee) ERC1155(baseTokenURI) Ownable(msg.sender) {
        require(_maxSupply > 0, "Max supply must be greater than zero");
        maxSupply = _maxSupply;
        _baseTokenURI = baseTokenURI;
        baseFee = _baseFee;
    }

    function createWorld(address _owner, string memory _uri, string memory _name, string memory _description, uint256 _quantity)
        external
        payable
        returns (uint256)
    {
        require(_quantity > 0, "Quantity must be greater than zero");
        uint256 totalFee = baseFee * _quantity;
        require(msg.value >= totalFee, "Insufficient fee");
        require(nextTokenId + _quantity <= maxSupply, "Max supply reached");

        for (uint256 i = 0; i < _quantity; i++) {
            uint256 tokenId = nextTokenId;
            _mint(_owner, tokenId, 1, "");
            tokenURIs[tokenId] = _uri;
            tokenExists[tokenId] = true;
            tokenOwners[tokenId] = _owner;
            worldNames[tokenId] = _name; 
            worldDescriptions[tokenId] = _description; 
            emit WorldCreated(tokenId, _owner, _uri, _name, _description);
            nextTokenId++;
        }

        return nextTokenId - 1;
    }

    function updateURI(uint256 _tokenId, string memory _newURI) external payable onlyOwnerOrAuthorized(_tokenId) {
        require(tokenExists[_tokenId], "Token does not exist");
        require(msg.sender == tokenOwners[_tokenId], "Only the owner of the token can update its URI");
        tokenURIs[_tokenId] = _newURI;
        emit TokenURIUpdated(_tokenId, _newURI);
        if (msg.sender != owner()) {
            payable(owner()).transfer(msg.value);
        }
    }

    function setBaseFee(uint256 _newBaseFee) external onlyOwner {
        baseFee = _newBaseFee;
        emit BaseFeeChanged(_newBaseFee);
    }

    function uri(uint256 _tokenId) public view override returns (string memory) {
        require(tokenExists[_tokenId], "Token does not exist");
        return string(abi.encodePacked(_baseURI(), tokenURIs[_tokenId]));
    }

    function creatorOf(uint256 _tokenId) public view returns (address) {
        require(tokenExists[_tokenId], "Token does not exist");
        return tokenOwners[_tokenId];
    }

    function getAllNFTs() external view returns (NFT[] memory) {
        NFT[] memory nfts = new NFT[](nextTokenId);
        for (uint256 i = 0; i < nextTokenId; i++) {
            nfts[i] = NFT({
                tokenId: i,
                owner: tokenOwners[i],
                uri: tokenURIs[i],
                name: worldNames[i],
                description: worldDescriptions[i]
            });
        }
        return nfts;
    }

    function getNFTsByOwner(address _owner) external view returns (NFT[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < nextTokenId; i++) {
            if (tokenOwners[i] == _owner) {
                count++;
            }
        }
        NFT[] memory nfts = new NFT[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < nextTokenId; i++) {
            if (tokenOwners[i] == _owner) {
                nfts[index] = NFT({
                    tokenId: i,
                    owner: tokenOwners[i],
                    uri: tokenURIs[i],
                    name: worldNames[i],
                    description: worldDescriptions[i]
                });
                index++;
            }
        }
        return nfts;
    }

    function _baseURI() internal view returns (string memory) {
        return _baseTokenURI;
    }
}