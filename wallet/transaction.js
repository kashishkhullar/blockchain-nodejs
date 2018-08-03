const ChainUtil = require('../chain-util');

class Transaction{
    constructor(){
        this.id = ChainUtil.id();
        this.input = null;
        this.outputs = [];
    }

    /**
     * add extra ouputs to the transactions
     */

    update(senderWallet,recipient,amount){
        const senderOutput = this.outputs.find(output => output.address === senderWallet.publicKey);

        if(amount > senderWallet.amount){
            console.log(`Amount ${amount} exceeds balance`);
            return;
        }

        senderOutput.amount = senderOutput.amount - amount;
        this.outputs.push({amount: amount,address: recipient});
        Transaction.signTransaction(this,senderWallet);

        return this;
    }

    /**
     * create a new transaction
     */

    static newTransaction(senderWallet,recipient,amount){
        const transaction = new this();

        if(amount > senderWallet.balance){
            console.log(`Amount : ${amount} exceeds the balance`);
            return;
        }

        transaction.outputs.push(...[{amount: senderWallet.balance -amount,address: senderWallet.publicKey},
        {amount: amount,address: recipient}])
        
        Transaction.signTransaction(transaction,senderWallet);
        return transaction;
    }

    /**
     * create input and sign the outputs
     */

    static signTransaction(transaction,senderWallet){
        transaction.input = {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(ChainUtil.hash(transaction.outputs))
        }
    }

    /**
     * verify the transaction by decrypting and matching
     */

    static verifyTransaction(transaction){
        return ChainUtil.verifySignature(
            transaction.input.address,
            transaction.input.signature,
            ChainUtil.hash(transaction.outputs)
        )
    }
}

module.exports = Transaction;