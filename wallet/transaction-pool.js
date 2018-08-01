class TransactionPool{
    constructor(){
        // represents a collections of transactions in the pool
        this.transactions = [];
    }

    /** 
     * this method will add a transaction
     * it is possible that the transaction exists already
     */
    updateOrAddTransaction(transaction){
        // get the transaction while checking if it exists
        let transactionWithId = this.transactions.find(t => t.id === transaction.id);

        if(transactionWithId){
            this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
        }
        else{
            this.transactions.push(transaction);
        }
    }

    /**
     * returns a existing transaction from the pool
     * if the inputs matches
     */

    existingTransaction(address){
        return this.transactions.find(t => t.input.address === address);
    }
}

module.exports = TransactionPool;