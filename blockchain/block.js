const SHA256 = require('crypto-js/sha256');

const DIFICULTY = 4;

class Block{
    constructor(timestamp,lastHash,hash,data,nonce){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
    }

    /**
     * returns what the object looks like
     * substring is used to make it look nice
     * hashes are too big to printed on command line 
     */

    toString(){
        return `Block - 
        Timestamp: ${this.timestamp}
        Last Hash: ${this.lastHash.substring(0,10)}
        Hash     : ${this.hash.substring(0,10)}
        Nonce    : ${thos.nonce}
        Data     : ${this.data}`;
    }

    /**
     * function to create the first block or the genesis block
     */

    static genesis(){
        return new this('Genesis time','----','f1574-h4gh',[],0);
    }

    /**
     * function to create new blocks or to mine new blocks
     */

    static mineBlock(lastBlock,data){

        let hash;
        let timestamp;
        const lastHash = lastBlock.hash;

        let nonce = 0;
        //generate the hash of the block
        do {
            nonce++;
            timestamp = Date.now();
            hash = Block.hash(timestamp,lastHash,data,nonce);
            // checking if we have the required no of leading number of zeros
        } while(hash.substring(0,DIFICULTY) !== '0'.repeat(DIFICULTY));

        return new this(timestamp,lastHash,hash,data,nonce);
    }

    /**
     * function to create the hash value of the block data
     */

    static hash(timestamp,lastHash,data,nonce){
        return SHA256(`${timestamp}${lastHash}${data}${nonce}`).toString();
    }

    /**
     * return the hash value of the passed block
     */

    static blockHash(block){
        //destructuring
        const { timestamp, lastHash, data, nonce } = block;
        return Block.hash(timestamp,lastHash,data,nonce);
    }

}

// share this class by exporting it

module.exports = Block;