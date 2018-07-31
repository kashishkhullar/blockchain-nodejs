const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }
    /**
     * utility function to add block to the blockchain
     * returns the added block
     */

    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1],data);
        this.chain.push(block);
        
        return block;
    }

    /**
     * checks if the chain recieved from another miner is valid or not
     */

    isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis()))
            return false;

        for(let i = 1 ; i<chain.length; i++){
            const block = chain[i];
            const lastBlock = chain[i-1];
            if((block.lastHash !== lastBlock.hash) || (
                block.hash !== Block.blockHash(block)))
            return false;
        }

        return true;

    }
    /**
     * replace the chain if the chain recieved from another miner
     * is longer and valid
     */

    replaceChain(newChain){
        if(newChain.length <= this.chain.length){
            console.log("Recieved chain is not longer than the current chain");
            return;
        }else if(!this.isValidChain(newChain)){
            console.log("Recieved chain is invalid");
        }
        
        console.log("Replacing the current chain with new chain");
        this.chain = newChain; 
    }
}

module.exports = Blockchain;