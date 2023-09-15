// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface iBEP20 {

    function name() external view returns(string memory);

    function symbol() external view returns(string memory);

    function decimals() external pure returns(uint);

    function totalSupply() external view returns(uint);

    function balanceOf(address account) external view returns(uint);

    function transfer(address to, uint amount) external;

    function allowance(address _owner, address spender) external view returns(uint);

    function approve(address spender, uint amount) external;

    function transferFrom(address sender, address recipient, uint amount) external;

    event Transfer(address indexed from, address indexed to, uint amount);

    event Multiplayer(address indexed _address, uint multiplier);

    event Approve(address indexed owner, address indexed to, uint amount);
}

interface iBEP20Ext is iBEP20{

    function balanceOfBonuses(address account) external view returns(uint);

    function transferBonuses(address _address, uint amount) external;

    function setIsUsedBonuses(address _address) external;

    function getIsUsedBonuses(address _address) external view returns(bool);

    function setBonusMultiplier(address _address, uint amount) external;

    function getBonusMultiplier(address _address) external view returns(uint);

    function setGlobalMultiplier(uint multiplier) external;

    function getGlobalMultiplier() external view returns(uint);

    function unlockBonuses() external;

    event TransferBonus(address indexed from, address indexed to, uint amount);

    event UnlockBonus(address indexed from, uint amount);

}


contract BEP20 is iBEP20Ext {
    address owner;
    uint totalTokens;
    uint totalBonusTokens;
    uint globalMultiplier;
    address[] private bonusAddresses;

    mapping(address => uint) balances;
    mapping(address => uint) balanceBonusTokens;
    mapping(address => uint) bonusMultiplier;
    mapping(address => bool) isUsedBonus;

    mapping(address => mapping(address => uint)) allowances;
    string _name;
    string _symbol;

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory) {
        return _symbol;
    }

    function decimals() external pure returns (uint) {
        return 0;
    }

    function totalSupply() external view returns (uint) {
        return totalTokens;
    }

    function totalSupplyBonusTokens() external view returns (uint) {
        return totalBonusTokens;
    }

    modifier enoughTokens(address _from, uint _amount) {
        require(balanceOf(_from) >= _amount, "not enough tokens!");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not an Owner");
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        uint initialSupply,
        uint initialSupplyBonus,
        address shop
    ) {
        _symbol = symbol_;
        _name = name_;
        owner = msg.sender;
        globalMultiplier = 0;
        mint(initialSupply, shop);
        mintBonus(initialSupplyBonus, shop);
    }

    function balanceOf(address account) public view returns (uint) {
        return balances[account];
    }

    function transfer(address to, uint amount) external enoughTokens(msg.sender, amount) {
        _beforeTokenTransfer(msg.sender, to, amount);
        balances[msg.sender] -= amount;
        balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
    }

    function balanceOfBonuses(address account) public view returns (uint) {
        return balanceBonusTokens[account];
    }

    function transferBonuses(address to, uint amount) external enoughTokens(msg.sender, amount) {
        _beforeTokenTransfer(msg.sender, to, amount);
        balanceBonusTokens[msg.sender] -= amount;
        balanceBonusTokens[to] += amount;
        bonusAddresses.push(to);
        emit TransferBonus(msg.sender, to, amount);
    }

    function mintBonus(uint amount, address shop) public onlyOwner {
        _beforeTokenTransfer(address(0), shop, amount);
        balanceBonusTokens[shop] += amount;
        totalBonusTokens += amount;
        emit TransferBonus(address(0), shop, amount);
    }

    function unlockBonuses() external onlyOwner {
        for(uint i = 0; i < bonusAddresses.length; i++){
            address _address = bonusAddresses[i];
            uint bonusTokens = balanceBonusTokens[_address];
            balances[_address] += bonusTokens;
            balanceBonusTokens[_address] = 0;
            emit UnlockBonus(_address, bonusTokens);
        }
    }

    function getGlobalMultiplier() external view returns(uint){
        return globalMultiplier;
    }

    function setGlobalMultiplier(uint multiplier) external onlyOwner{
        globalMultiplier = multiplier;
    }

    function getIsUsedBonuses(address _address) external view returns(bool){
        return isUsedBonus[_address];
    }

    function setIsUsedBonuses(address _address) external{
        isUsedBonus[_address] = true;
    }

    function getBonusMultiplier(address shop) external view returns(uint){
        return bonusMultiplier[shop];
    }

    function setBonusMultiplier(address shop, uint amount) external {
        bonusMultiplier[shop] = amount;
        emit Multiplayer(shop, amount);
    }

    function mint(uint amount, address shop) public onlyOwner {
        _beforeTokenTransfer(address(0), shop, amount);
        balances[shop] += amount;
        totalTokens += amount;
        emit Transfer(address(0), shop, amount);
    }

    function burn(address _from, uint amount) public onlyOwner {
        _beforeTokenTransfer(_from, address(0), amount);
        balances[_from] -= amount;
        totalTokens -= amount;
    }

    function allowance(address owner_, address spender) public view returns (uint) {
        return allowances[owner_][spender];
    }

    function approve(address spender, uint amount) public {
        _approve(msg.sender, spender, amount);
    }

    function _approve(address sender, address spender, uint amount) internal virtual {
        allowances[sender][spender] = amount;
        emit Approve(sender, spender, amount);
    }

    function transferFrom(address sender, address recipient, uint amount) external enoughTokens(sender, amount) {
        _beforeTokenTransfer(sender, recipient, amount);

        require(allowances[sender][recipient] >= amount, "check amount");
        allowances[sender][msg.sender] -= amount;

        balances[sender] -= amount;
        balances[recipient] += amount;

        emit Transfer(sender, recipient, amount);
    }

    function _beforeTokenTransfer( address from, address to, uint amount) internal virtual {}
}

contract bNXT is BEP20 {
    constructor(address _address) BEP20("TEST BE NEXT", "tbnxt", 26 * 10 ** 6, 40 * 10 ** 6, _address) {}
}

contract bNXTShop {
    address public chainlinkOracleAddress;
    iBEP20Ext public token;
    address payable public owner;
    uint constant MIN_TOKEN_AMOUNT = 100;
    uint constant MAX_TOKEN_AMOUNT = 1000;
    uint constant TOKEN_AMOUNT_MULTIPLIER = 100;
    mapping(address => uint) balanceByTheUser;
    mapping(address => uint) private userMultipliers;

    event Bougth(uint _amount, address indexed _buyer);
    event BougthBonus(uint _amount, address indexed _buyer);
    event Sold(uint _amount, address indexed _seller);

    constructor() {
        token = new bNXT(address(this));
        owner = payable(msg.sender);
        chainlinkOracleAddress = 0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not an Owner");
        _;
    }

    function withdrawal() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Insufficient funds");
        owner.transfer(balance);
    }

    function unlockTokens() public onlyOwner {
        token.unlockBonuses();
        token.setGlobalMultiplier(2);
    }

    function transferOwnership(address payable newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        owner = newOwner;
    }

    function setGlobalMultiplier(uint value) public onlyOwner {
        token.setGlobalMultiplier(value);
    }

    function buyTokens(uint tokenAmount) public payable {
        require(msg.sender.balance >= 0, "Insufficient balance");
        require(tokenBalanceContract() > 0, "Contract has no tokens");
        uint balance = balanceByTheUser[msg.sender];
        if (getGlobalMultiplier() == 0) {
            require(tokenAmount >= MIN_TOKEN_AMOUNT, "Token amount below minimum 100");
            require(tokenAmount <= MAX_TOKEN_AMOUNT, "Token amount above maximum 1000");
            require(tokenAmount % TOKEN_AMOUNT_MULTIPLIER == 0, "Token amount must be a multiple of the 100");
            require(tokenAmount + balance <= MAX_TOKEN_AMOUNT, "Token amount can be maximum 1000");
            uint weiAmount = bnxtToWei(tokenAmount);
            require(msg.value >= weiAmount, "you transferred insufficient quantity");
            token.transfer(msg.sender, tokenAmount);
            balanceByTheUser[msg.sender] += tokenAmount;
            emit Bougth(tokenAmount, msg.sender);
            uint multiplier = tokenAmount / TOKEN_AMOUNT_MULTIPLIER;
            userMultipliers[msg.sender] += multiplier;
            setMultiplier();

        } else {
            tokenAmount = tokenAmount * getGlobalMultiplier() - tokenAmount;
            token.transfer(msg.sender, tokenAmount);
            emit BougthBonus(tokenAmount, msg.sender);
        }
    }

    function buyTokensBonus() public payable {
        uint balance = tokenBalanceCurrent();
        require(getMultiplier() > 0, "You have never bought tokens");
        require(!getIsUsed(), "Bonus has been used");
        require(msg.sender.balance >= 0, "Insufficient balance");
        require(tokenBalanceContract() > 0, "Contract has no tokens");
        uint tokenAmount = balance * getMultiplier() - balance;
        uint priceToken = balance/10;
        uint weiAmount = bnxtToWei(priceToken);
        require(msg.value >= weiAmount, "you transferred insufficient quantity");

        token.transferBonuses(msg.sender, tokenAmount);
        emit BougthBonus(tokenAmount, msg.sender);
        token.setIsUsedBonuses(msg.sender);
    }

    function bnxtToWei(uint bnxtAmount) public view returns (uint) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(chainlinkOracleAddress);
        (, int price, , , ) = priceFeed.latestRoundData();
        return uint(bnxtAmount * 1 ether / uint(price) * 10**8);
    }

    function getGlobalMultiplier() public view returns (uint) {
        return token.getGlobalMultiplier();
    }

    function getIsUsed() public view returns (bool) {
        return token.getIsUsedBonuses(msg.sender);
    }

    function setMultiplier() private {
        uint multiplier = userMultipliers[msg.sender];
        if (multiplier < 2) {
            multiplier = 2;
        }
        token.setBonusMultiplier(msg.sender, multiplier);
    }

    function getMultiplier() public view returns (uint) {
        return token.getBonusMultiplier(msg.sender);
    }

    function tokenBalanceContract() public view returns (uint) {
        require(address(this) != address(0), "New owner cannot be zero address");
        return token.balanceOf(address(this));
    }

    function tokenBonusBalanceContract() public view returns (uint) {
        require(address(this) != address(0), "New owner cannot be zero address");
        return token.balanceOfBonuses(address(this));
    }

    function tokenBalanceCurrent() public view returns (uint) {
        return token.balanceOf(msg.sender);
    }

    function tokenBalanceCurrentBonuses() public view returns (uint) {
        return token.balanceOfBonuses(msg.sender);
    }
}