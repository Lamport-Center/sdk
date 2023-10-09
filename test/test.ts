import { LamportCenter } from "../src/index";

// Testing is ad-hoc for now.
// This is an example to test your changes with your personal key. Modify as necessary.
// Execute your test with `npx ts-node tests/test.ts`
async function run() {
    const lamportCenter = new LamportCenter("your-api-key", "your-rpc-url");
    const tx = await lamportCenter.addFeeToTransaction({userWallet: "your-user-public-key", encodedTransaction: "your-encoded-transaction"})
    console.log(tx)
}

run();
