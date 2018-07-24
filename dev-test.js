// file used to explore block class

const Block = require('./block');

//creating a new instance
// const block = new Block('foo','bar','zoo','bas');

//testing the toString function
// console.log(block.toString());

//testing the genesis function
// console.log(Block.genesis().toString());

//testing the mineBlock function
const fooBlock = Block.mineBlock(Block.genesis(),"foo");
console.log(fooBlock.toString());