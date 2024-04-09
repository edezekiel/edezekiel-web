---
pubDate: 2019-07-23
title: 'Live Stellar Wallet for Testing Smart Contracts'
description: ''
tags: ['react', 'projects', 'css', 'javascript']
---

I am very happy to announce the [Live](https://stellar-wallet.netlify.com) version of my open-source Stellar testnet wallet. Here is the code on [Github](https://github.com/edezekiel/stellar-wallet).

This is for Stellar enthusiasts and anyone working on stellar smart contracts. Below, I'll (1) explain why this tool is useful, (2) discuss some background information about Stellar smart contracts, (3) provide short answers to some of the most challenging questions I faced during development, (4) give brief instructions on how to use this tool, and (5) list some resources that I found helpful.

**Disclaimer**: _I built this as an educational experiment and the program has not been thoroughly tested._

## 1. Why Build this Stellar Tool?

I work at a blockchain development company called [web3devs](https://web3devs.com/). We're probably most well known for our work on Ethereum smart contracts, but we also work with Stellar smart contracts!

Although Stellar.org explains the concepts behind [Mutisignature Escrow Account with Time Lock & Recovery](https://www.stellar.org/developers/guides/walkthroughs/stellar-smart-contracts.html), and provides [example code](https://www.stellar.org/developers/js-stellar-base/reference/base-examples.html) for creating a multi-sig account, they do not show how to implement the time lock or recovery methods. **With this post, I am releasing that code and a live demonstration of how it works.**

## 2. Background Information

Most applications interact with the Stellar network through Horizon, a RESTful HTTP API server. See [Stellar.org](https://www.stellar.org/developers/guides/get-started/). You use a SDK to interact with Horizon. I used the Javascript SDK.

There are significant differences between Ethereum and Stellar smart contracts. For one thing, Ethereum smart contracts are written in Solidity, which is a Turing-complete language.

In contrast, stellar smart contracts can only accomplish a limited set of tasks. You use a common programming language like JavaScript or Go to You interact with Horizon, which is an interface between Stellar Core and applications that want to access the Stellar network.

## 3. Pernicious Bugs and Tricky Questions

### Why Does My Transaction Keep Failing (Getting 400 Response from Horizon)?

- You didn't set the base fee:

```javascript
const baseFee = await server.fetchBaseFee();

const transaction = new StellarSdk.TransactionBuilder(account, {
  fee: baseFee,
});
```

- You didn't load the account before building the transaction:

```javascript
const account = await server.loadAccount(sourceKeys.publicKey());
const transaction = new StellarSdk.TransactionBuilder(account, {
  fee: baseFee,
});
```

#### Why can't I submit the Unlock XDR to Horizon?

You may be trying to submit the XDR too early. The unlock XDR can only be submitted _after_ the lock-up period is over. This is a little confusing, because you have to create the unlock transaction _before_ the lock-up period is over.

The solution is signing the unlock transaction, and saving that transaction somewhere publicly. Only submit the unlock xdr to Horizon once the lock up period is over.

```javascript
try {
  // Save as an XDR string
  const transactionXDR = transaction
    .toEnvelope()
    .toXDR()
    .toString("base64");
  console.log("FN: unlock", "Success! Results:"), transactionXDR);
  return transactionXDR;
}
```

#### How do I set timebounds?

It was not easy to figure out the syntax for setting timebounds. Here is what finally worked for me:

```javascript
// The unlock date (D+T) is the first date that the unlock transaction can be
// submitted. If Transaction 3 (this transaction) is submitted before the
// unlock date, the transaction will not be valid.

const transaction = new StellarSdk.TransactionBuilder(escrowAccount, {
  fee: baseFee,
  timebounds: {
    minTime: (
      Math.floor(Date.now() / 1000) + parseInt(unlockTx.unlockDate)
    ).toString(),
    // The maximum time is set to 0, to denote that the transaction does not have
    // an expiration date.
    maxTime: (0).toString(),
  },
  sequence: (parseInt(escrowAccount.sequence) + 1).toString(),
});
```

## 4. Instructions

In order to use this tool you'll need to create at least two testnet accounts. You can make new accounts within the tool by clicking the "Create Stellar Account" button. Just take note of the public and private keys that pop up in the header.

**Note:** these are test accounts so no real money is involved. You should never post a secret key to an account on the public stellar server.

You can image one account as a "seller" (the Destination), and another as a "buyer". The buyer creates the escrow account and adds the seller (Destination) as a signer. When the lockout period expires the seller can use the XDR to "unlock" funds in the escrow account.

## 5. Resources

Here are some of the resources I found helpful:

- [Stellar Laboratory:](https://www.stellar.org/laboratory/) I constantly had this tab open to test various operations, transactions, etc.
- [Michiel Mulders Article:](https://medium.com/wearetheledger/stellar-escrow-smart-contract-development-4c43ef32ac4b) Helps you get a little more familiar with the concept of account signers.
- [Sylvain Faucherand Article:](https://medium.com/coinmonks/simple-escrow-contract-using-stellar-67aa799f7db) Covers a basic escrow account, but doesn't address how to make it time-locked.
- [Robert Durst Article:](https://hackernoon.com/i-just-wrote-a-stellar-smart-contract-pt-2-lets-dive-a-little-deeper-a8dae19b9d0a) If you're still scratching your head about account signatures.
