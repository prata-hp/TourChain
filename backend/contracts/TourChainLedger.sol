// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TourChainLedger
 * @dev V2 contract that logs the entire lifecycle of a tourist journey.
 * It tracks the start, any panic events, and the end of a journey using events.
 * The journeyId is a hash of the off-chain ActiveJourney._id.
 */
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

    /**
     * @dev Records the start of a new journey.
     * @param journeyId A keccak256 hash of the off-chain database ID for the journey.
     * @param startDate The start date of the journey as a Unix timestamp.
     * @param endDate The end date of the journey as a Unix timestamp.
     */
    function startJourney(bytes32 journeyId, uint64 startDate, uint64 endDate) external {
        require(journeyId != bytes32(0), "journeyId is required");
        require(endDate >= startDate, "End date must be after start date");
        emit JourneyStarted(journeyId, startDate, endDate, msg.sender);
    }

    /**
     * @dev Logs a panic alert for an existing journey.
     * @param journeyId The hash of the journey experiencing the panic.
     * @param dataHash A keccak256 hash of the off-chain panic details (location, etc.).
     */
    function alertPanic(bytes32 journeyId, bytes32 dataHash) external {
        require(journeyId != bytes32(0), "journeyId is required");
        emit PanicAlerted(journeyId, dataHash, uint64(block.timestamp), msg.sender);
    }

    /**
     * @dev Records the successful conclusion of a journey.
     * @param journeyId The hash of the journey that has ended.
     */
    function endJourney(bytes32 journeyId) external {
        emit JourneyEnded(journeyId, uint64(block.timestamp), msg.sender);
    }
}