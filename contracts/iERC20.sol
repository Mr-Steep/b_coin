// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

interface iERC20 {

    function name() external view returns(string memory);

    function symbol() external view returns(string memory);

    function decimals() external pure returns(uint);

    function totalSupply() external view returns(uint);

    function balanceOf(address account) external view returns(uint);

    function transfer(address to, uint amount) external;

    function allowance(address _owner, address spender) external view returns(uint);

    function approve(address spender, uint amount) external;

    function transferFrom(address sender, address recipient, uint amount) external;

    function balanceOfBonuses(address account) external view returns(uint);

    function transferBonuses(address _address, uint amount) external;

    function setIsUsedBonuses(address _address) external;

    function getIsUsedBonuses(address _address) external view returns(bool);

    function setBonusMultiplier(address _address, uint amount) external;

    function getBonusMultiplier(address _address) external view returns(uint);

    function setGlobalMultiplier(uint multiplier) external;

    function getGlobalMultiplier() external view returns(uint);

    function setUnlockTime(uint timestamp) external;

    function unlockBonuses() external;

    event Transfer(address indexed from, address indexed to, uint amount);

    event TransferBonus(address indexed from, address indexed to, uint amount);

    event UnlockBonus(address indexed from, uint amount);

    event Multiplayer(address indexed _address, uint multiplier);

    event Approve(address indexed owner, address indexed to, uint amount);
}