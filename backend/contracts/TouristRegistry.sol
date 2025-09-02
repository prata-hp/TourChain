// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract TouristRegistry {
    mapping(bytes32 => bool) public registered;
    event Registered(bytes32 indexed dataHash, address indexed who, uint256 ts);

    function registerHash(bytes32 _hash) external {
        require(!registered[_hash], "Already registered");
        registered[_hash] = true;
        emit Registered(_hash, msg.sender, block.timestamp);
    }

    function isRegistered(bytes32 _hash) external view returns (bool) {
        return registered[_hash];
    }
}
