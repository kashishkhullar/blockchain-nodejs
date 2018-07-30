const Block = require('./block');
const { DIFFICULTY } = require('../config.js');

/**
 * describe is jest specific function
 * @prarams
 * name of the object as string for which the test is written
 * function that will define a series of tests
 */
describe("Block",()=>{

    let data,lastBlock,block;
    /**
     * beforeEach allows us to run some code before
     * running any test
     * example creating an instance
     */
    beforeEach(()=>{
         data = 'bar';
         lastBlock = Block.genesis();
         block = Block.mineBlock(lastBlock,data);
    });
    /**
     * it function is used to write unit tests
     * first param is a description
     * second param is callback arrow function
     */
    it("sets the `data` to match the input",()=>{
        /**
         * expect is similar to assert
         * it expects something
         */
        expect(block.data).toEqual(data);
    });

    it("sets the `lastHash` to match the hash of the last block",()=>{
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('generates a hash that matches the difficutly',()=>{
        expect(block.hash.substring(0,block.difficulty)).toEqual('0'.repeat(block.difficulty));
    });

    it('lower the difficulty for a slower generated block',()=>{
        expect(Block.adjustDifficulty(block,block.timestamp + 300000)).toEqual(block.difficulty - 1);
    });

    it('raise the difficulty for a faster generated block',()=>{
        expect(Block.adjustDifficulty(block,block.timestamp - 300000)).toEqual(block.difficulty + 1);
    })
})