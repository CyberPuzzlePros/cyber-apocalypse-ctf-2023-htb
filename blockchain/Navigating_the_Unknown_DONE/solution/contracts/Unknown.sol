pragma solidity ^0.8.18;


/*
brownie networks add Ethereum HTB host=http://188.166.152.84:31577 chainid=1337

Private key     :  0x85874638f55ba33fdc1e03f91339dcb7a9bcd3acab096b90c5ee4f2941f1f470
Address         :  0x98A11AB8f4aF9A5E25d13F52BA64B7e2588bE789
Target contract :  0x506fE0E21dc5eB549A5db12fCC20ab8595071c5D
Setup contract  :  0xd70eb3eE766996927539AefF9c54E098445351A5

*/


contract Unknown {
    
    bool public updated;

    function updateSensors(uint256 version) external {
        if (version == 10) {
            updated = true;
        }
    }

}
