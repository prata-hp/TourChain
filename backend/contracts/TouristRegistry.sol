// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * Round-1: Minimal proof-only storage.
 * We emit an event with (idHash, startDate, endDate, recorder).
 * No on-chain reads required for the demo; txHash is enough as proof.
 */
contract TouristRegistry {
    event JourneyRecorded(
        bytes32 indexed idHash,
        uint64 startDate,
        uint64 endDate,
        address indexed recorder
    );

    function recordJourney(bytes32 idHash, uint64 startDate, uint64 endDate) external {
        require(idHash != bytes32(0), "idHash required");
        require(startDate > 0, "startDate required");
        require(endDate >= startDate, "endDate >= startDate");
        emit JourneyRecorded(idHash, startDate, endDate, msg.sender);
    }
}
