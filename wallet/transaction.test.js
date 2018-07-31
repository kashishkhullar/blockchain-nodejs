const Transaction = require('./transaction');
const Wallet = require('./index');

let transaction,wallet, recipient, amount;


describe('Transaction',()=>{


    beforeEach(()=>{
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13nt';
        transaction = Transaction.newTransaction(wallet,recipient,amount);


    });

    it('outputs the `amount` subtracted from the wallet balance',()=>{
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    });

    it('outputs the `amount` added to the recipient',()=>{
        expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
    });


});

describe('transacting with less balance',()=>{
    beforeEach(()=>{
        amount = 5000;
        transaction = Transaction.newTransaction(wallet,recipient,amount);
    });

    it('does not create the transaction',()=>{
        expect(transaction).toEqual(undefined);
    })
})