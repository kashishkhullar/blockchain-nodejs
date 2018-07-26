const Blockchain = require('./blockchain');
const Block = require('./block');
describe("Blockchain",()=>{
    let blockchain,blockchain2;

    beforeEach(()=>{
        blockchain = new Blockchain();
        blockchain2 = new Blockchain();
    });

    it('starts with the genesis block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it('adds a new block',()=>{
        const data = "foo";
        blockchain.addBlock(data);
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(data);
    });

    it('validates a valid chain',()=>{
        blockchain2.addBlock('foo');
        // conventional method for check true and false is toBe
        expect(blockchain.isValidChain(blockchain2.chain)).toBe(true);
    });

    it('invalidates a chain with a corrupt the genesis block',()=>{
        blockchain2.chain[0].data = 'bad data';

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    });

    it('invalidates a corrput chain',()=>{
        blockchain2.addBlock('foo');
        blockchain2.chain[1].data = 'not foo';

        expect(blockchain.isValidChain(blockchain2.chain)).toBe(false);
    })

})