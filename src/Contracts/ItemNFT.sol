// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GameItems is ERC1155, Ownable {
    using Strings for uint256;

    struct Item {
        string name;
        string description;
        uint256 price;
        uint256 maxSupply;
        uint256 tagID;
        ItemType itemType;
        address owner;
    }

    enum ItemType { Creator, User }

    mapping(uint256 => Item) public items;
    mapping(uint256 => mapping(address => uint256)) public itemBalances;
    uint256 public nextItemId;

    event ItemCreated(uint256 indexed itemId, string name, string description, uint256 price, uint256 maxSupply, uint256 tagID, ItemType itemType, address owner);
    event ItemUpdated(uint256 indexed itemId, string newDescription);

    constructor(string memory baseURI) ERC1155(baseURI) Ownable(msg.sender) {
        for (uint256 i = 1; i <= 10; i++) {
            createItemByOwner(string(abi.encodePacked("Item ", Strings.toString(i))), string(abi.encodePacked("Description of Item ", Strings.toString(i))), 1e4, 1e6, i, ItemType.Creator);
        }
    }

    function createItemByOwner(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _maxSupply,
        uint256 _tagID,
        ItemType _itemType
    ) public onlyOwner returns (uint256) {
        require(_maxSupply > 0, "Max supply must be greater than zero");
        require(_price > 0, "Price must be greater than zero");

        uint256 itemId = nextItemId;
        items[itemId] = Item(_name, _description, _price, _maxSupply, _tagID, _itemType, msg.sender);
        nextItemId++;

        emit ItemCreated(itemId, _name, _description, _price, _maxSupply, _tagID, _itemType, msg.sender);

        return itemId;
    }

    function createItemByUser(
        string memory _name,
        string memory _description,
        uint256 _price,
        uint256 _maxSupply,
        uint256 _tagID
    ) external returns (uint256) {
        require(_maxSupply > 0, "Max supply must be greater than zero");
        require(_price > 0, "Price must be greater than zero");

        uint256 itemId = nextItemId;
        items[itemId] = Item(_name, _description, _price, _maxSupply, _tagID, ItemType.User, msg.sender);
        nextItemId++;

        emit ItemCreated(itemId, _name, _description, _price, _maxSupply, _tagID, ItemType.User, msg.sender);

        return itemId;
    }

    function mint(uint256 _itemId) external payable {
        require(itemBalances[_itemId][msg.sender] < items[_itemId].maxSupply, "Max supply reached");

        uint256 itemPrice = items[_itemId].price;
        require(msg.value >= itemPrice, "Insufficient funds");

        _mint(msg.sender, _itemId, 1, "");
        itemBalances[_itemId][msg.sender]++;

        if (msg.value > itemPrice) {
            payable(msg.sender).transfer(msg.value - itemPrice);
        }
    }

    function updateItem(uint256 _itemId, string memory _newDescription) external {
        require(items[_itemId].itemType == ItemType.User, "Item type not supported");
        require(itemBalances[_itemId][msg.sender] > 0, "Caller does not own the item");
        require(items[_itemId].owner == msg.sender, "Caller is not the owner of the item");

        items[_itemId].description = _newDescription;

        emit ItemUpdated(_itemId, _newDescription);
    }

    function uri(uint256 _itemId) public view override returns (string memory) {
        return string(abi.encodePacked(super.uri(0), _itemId.toString()));
    }

    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _setURI(newBaseURI);
    }

    function setItemURI(uint256 _itemId, string memory newURI) external onlyOwner {
        items[_itemId].description = newURI;
    }

    function updateItemPrice(uint256 _itemId, uint256 _newPrice) external onlyOwner {
        items[_itemId].price = _newPrice;
    }

    function updateItemMaxSupply(uint256 _itemId, uint256 _newMaxSupply) external onlyOwner {
        items[_itemId].maxSupply = _newMaxSupply;
    }

    function getRemainingSupply(uint256 _itemId) public view returns (uint256) {
        return items[_itemId].maxSupply - itemBalances[_itemId][msg.sender];
    }

    function getItemsForUser(address _user) public view returns (uint256[] memory) {
        uint256 itemCount = 0;
        for (uint256 i = 0; i < nextItemId; i++) {
            if (itemBalances[i][_user] > 0) {
                itemCount++;
            }
        }

        uint256[] memory ownedItems = new uint256[](itemCount);
        uint256 index = 0;
        for (uint256 i = 0; i < nextItemId; i++) {
            if (itemBalances[i][_user] > 0) {
                ownedItems[index] = i;
                index++;
            }
        }
        return ownedItems;
    }
}