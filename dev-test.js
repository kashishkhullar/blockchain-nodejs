// // file used to explore block class

// const Block = require('./blockchain/block');

// //creating a new instance
// // const block = new Block('foo','bar','zoo','bas');

// //testing the toString function
// // console.log(block.toString());

// //testing the genesis function
// // console.log(Block.genesis().toString());

// //testing the mineBlock function
// const fooBlock = Block.mineBlock(Block.genesis(),"foo");
// console.log(fooBlock.toString());

// const Blockchain = require('./blockchain');

// const blockchain = new Blockchain();

// for(let i=0;i<10;i++){
//     console.log(blockchain.addBlock(`foo ${i}`).toString());
// }

const Wallet = require('./wallet');
const wallet = new Wallet();
console.log(wallet.toString());