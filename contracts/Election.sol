// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract Election {
    // model of candidate
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    //stroring and fetching candidate
    mapping(uint256 => Candidate) public candidates;
    // candidate counts
    uint256 public candidateCount;

    // adding candidate
    function addCandidate(string memory _name) private {
        candidateCount++;
        // 0 because intital vote count of any candidate is 0
        candidates[candidateCount] = Candidate(candidateCount, _name, 0);
    }

    // Constructor
    // -> read candiate and store candidate
    string public candidate;

    constructor() {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }
}
