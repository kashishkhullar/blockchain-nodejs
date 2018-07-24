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

}

// share this class by exporting it

module.exports = Block;