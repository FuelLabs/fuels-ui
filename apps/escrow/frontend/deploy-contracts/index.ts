import { FUEL_PROVIDER_URL } from "../src/config";

/**
 * Deploy contract to SwaySwap node.
 */

// TODO: Remove this file after `forc` enabled deploy a contract to a custom url
// https://github.com/FuelLabs/sway/issues/1308
import { randomBytes } from 'ethers/lib/utils';
import fs from 'fs';
import {
  ContractFactory,
  NativeAssetId,
  ScriptTransactionRequest,
  Wallet,
  ZeroBytes32,
  toBigInt,
} from 'fuels';
import type { Interface, JsonAbi } from 'fuels';
import path from 'path';

// @ts-ignore
import { EscrowAbi__factory } from "../src/systems/Core/types/contracts"

const escrowPath = path.join(
    __dirname,
    "../../contracts/escrow/out/debug/escrow.bin"
);

const seedWallet = async (wallet: Wallet) => {
  const transactionRequest = new ScriptTransactionRequest({
    gasPrice: 0,
    gasLimit: 100,
    script: '0x24400000',
    scriptData: randomBytes(32),
  });
  // @ts-ignore
  transactionRequest.addCoin({
    id: '0x000000000000000000000000000000000000000000000000000000000000000000',
    assetId: NativeAssetId,
    // @ts-ignore
    amount: 100_000_000,
    owner: '0xf1e92c42b90934aa6372e30bc568a326f6e66a1a0288595e6e3fbd392a4f3e6e',
  });
  transactionRequest.addCoinOutput(wallet.address, toBigInt(100_000_000), NativeAssetId);
  const submit = await wallet.sendTransaction(transactionRequest);

  return submit.wait();
};

async function deployContractBinary(
  contextLog: string,
  binaryPath: string,
  abi: JsonAbi | Interface
) {
  console.log(contextLog, 'Create wallet...');
  console.log(contextLog, 'connected to', FUEL_PROVIDER_URL);
  const wallet = Wallet.generate({ provider: FUEL_PROVIDER_URL });

  console.log(contextLog, 'Funding wallet with some coins');
  await seedWallet(wallet);

  // Deploy
  console.log(contextLog, 'Load contract binary...');
  const bytecode = fs.readFileSync(binaryPath);
  console.log(contextLog, 'Deploy contract...');
  const factory = new ContractFactory(bytecode, abi, wallet);
  const contract = await factory.deployContract();

  console.log(contextLog, 'Contract deployed...');
  return contract;
}
  
  (async function main() {
    try {
      const contract = await deployContractBinary(
        'FuelEscrow',
        escrowPath,
        EscrowAbi__factory.abi
      );
  
      console.log('Fuel Escrow Contract Id', contract.id);
    } catch (err) {
      console.error(err);
    }
  })();