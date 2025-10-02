// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract TourChainLedger {

    // Event for when a new journey is started and logged.
    event JourneyStarted(
        bytes32 indexed journeyId,
        uint64 startDate,
        uint64 endDate,
        address indexed recorder
    );

    // Event for when a panic is triggered during a journey.
    event PanicAlerted(
        bytes32 indexed journeyId,
        bytes32 dataHash, // A hash of the panic details (lat, lng, timestamp, type)
        uint64 timestamp,
        address indexed recorder
    );

    // Event for when a journey is successfully completed.
    event JourneyEnded(
        bytes32 indexed journeyId,
        uint64 timestamp,
        address indexed recorder
    );

   
    function startJourney(bytes32 journeyId, uint64 startDate, uint64 endDate) external {
        require(journeyId != bytes32(0), "journeyId is required");
        require(endDate >= startDate, "End date must be after start date");
        emit JourneyStarted(journeyId, startDate, endDate, msg.sender);
    }

    function alertPanic(bytes32 journeyId, bytes32 dataHash) external {
        require(journeyId != bytes32(0), "journeyId is required");
        emit PanicAlerted(journeyId, dataHash, uint64(block.timestamp), msg.sender);
    }

    
    function endJourney(bytes32 journeyId) external {
        emit JourneyEnded(journeyId, uint64(block.timestamp), msg.sender);
    }
}
