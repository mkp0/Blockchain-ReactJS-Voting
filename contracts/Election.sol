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
    mapping(address => uint256) public voterMapping;
    Candidate[] public candidates;
    // candidate counts
    uint256 public candidateCount;

    // adding candidate
    function addCandidate(string memory _name) private {
        candidateCount++;
        // 0 because intital vote count of any candidate is 0
        // candidates[candidateCount] = Candidate(candidateCount, _name, 0);
        candidates.push(Candidate(candidateCount, _name, 0));
    }

    function allCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function vote(uint256 _candidateId) public {
        if (voterMapping[msg.sender] != 0) {
            candidates[voterMapping[msg.sender] - 1].voteCount--;
        }
        voterMapping[msg.sender] = _candidateId;
        candidates[_candidateId - 1].voteCount++;
    }

    // Constructor
    // -> read candiate and store candidate

    constructor() {
        addCandidate("Candidate 1");
        addCandidate("Candidate 2");
    }
}
