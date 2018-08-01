const ChainUtil = require('../chain-util');
const { INITIAL_BALANCE } = require('../config');
const Transaction = require('./transaction');

class Wallet{
    /**
     * the wallet will hold the public key
     * and the private key pair
     * and the balance
     */
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString(){
        return `Wallet - 
        publicKey: ${this.publicKey.toString()}
        balance  : ${this.balance}`
    }

    sign(dataHash){
        return this.keyPair.sign(dataHash);
    }

    /**
     * combines the functionality to create a new transaction
     * update a transaction into one and also update the transaction
     * pool if the transaction exists already.
     */

    createTransaction(recipient, amount, transactionPool){
        if(amount > this.balance){
            console.log(`Amount: ${amount} exceeds the current balance: ${this.balance}`);
            return;
        }

        let transaction = transactionPool.existingTransaction(this.publicKey);

        if(transaction){
            // creates more outputs
            transaction.update(this,recipient,amount)
        }
        else{
            // creates a new transaction and updates the transaction pool
            transaction = Transaction.newTransaction(this,recipient,amount);
            transaction.updateOrAddTransaction(transaction);
        }

        return transaction;

    }
}

module.exports = Wallet;