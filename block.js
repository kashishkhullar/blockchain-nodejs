const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp,lastHash,hash,data){
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
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
        Data     : ${this.data}`;
    }

    /**
     * function to create the first block or the genesis block
     */

    static genesis(){
        return new this('Genesis time','----','f1574-h4gh',[]);
    }

    /**
     * function to create new blocks or to mine new blocks
     */

    static mineBlock(lastBlock,data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp,lastHash,data);

        return new this(timestamp,lastHash,hash,data);
    }

    /**
     * function to create the hash value of the block data
     */

    static hash(timestamp,lastHash,data){
        return SHA256(`${timestamp}${lastHash}${data}`).toString();
    }

    /**
     * return the hash value of the passed block
     */

    static blockHash(block){
        //destructuring
        const {timestamp, lastBlock, data } = block;
        return Block.hash(timestamp,lastHash,data);
    }

}

// share this class by exporting it

module.exports = Block;