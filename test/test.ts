import { LamportCenter } from "../src/index";
import { Transaction } from "@solana/web3.js";

// Testing is ad-hoc for now.
// This is an example to test your changes with your personal key. Modify as necessary.
// Execute your test with `npx ts-node test/test.ts`
async function run() {
  const lamportCenter = new LamportCenter("your-api-key", "your-rpc-url");
  const tx = await lamportCenter.gaslessSigning({
    userWallet: "your-user-public-key",
    transaction: new Transaction(),
  });
  console.log(tx);
}

run();
