require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""

const PRIVATE_KEY =
	process.env.PRIVATE_KEY ||
	"0x11ee3108a03081fe260ecdc106554d09d9d1209bcafd46942b10e02943effc4a"
const HTB_RPC_URL = process.env.HTB || "http://167.99.86.8:32156"

module.exports = {
	defaultNetwork: "hardhat",
	networks: {
		hardhat: {chainId: 31300},
		htb: {
			url: HTB_RPC_URL,
			accounts: [PRIVATE_KEY],
			chainId: 31337,
		},
		localhost: {
			url: "http://localhost:8545",
			chainId: 1337,
		},
	},
	solidity: "0.8.18",
	gasReporter: {
		enabled: true,
		currency: "USD",
		outputFile: "gas-report.txt",
		noColors: true,
		coinmarketcap: COINMARKETCAP_API_KEY,
	},
}
