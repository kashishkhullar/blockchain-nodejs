const WebSocket = require('ws');

//declare the peer to peer server port 
const P2P_PORT = process.env.P2P_PORT || 5001;

//list of address to connect to
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pserver{
    constructor(blockchain){
        this.blockchain = blockchain;
        this.sockets = [];
    }

    // create a new p2p server and connections

    listen(){
        // create the p2p server with port as argument
        const server = new WebSocket.Server({ port: P2P_PORT });

        // event listener and a callback function for any new connection
        server.on('connection',socket => this.connectSocket(socket));

        // to connect to the peers that we have specified
        this.connectToPeers();

        console.log(`Listening for peer to peer connection on port : ${P2P_PORT}`);
    }

    //push the new socket to the sockets array
    connectSocket(socket){

        this.sockets.push(socket);
        console.log("Socket connected");

        this.messageHandler(socket);

        // on new connection send the blockchain chain to the peer

        this.sendChain(socket);
    }

    connectToPeers(){

        //connect to each peer
        peers.forEach(peer => {

            // create a socket for each peer
            const socket = new WebSocket(peer);
            
            // open event listner is emitted when a connection is established
            // saving the socket in the array
            socket.on('open',() => this.connectSocket(socket));

        });
    }

    messageHandler(socket){
        //on recieving a message execute a callback function
        socket.on('message',message =>{
            const data = JSON.parse(message);
            console.log("data ", data);
            /**
             * call replace blockchain if the 
             * recieved chain is longer
             */
            this.blockchain.replaceChain(data);
        });
    }
    /**
     * helper function to send the chain instance
     */

    sendChain(socket){
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    /**
     * utility function to sync the chain
     * whenever a new block is added to
     * the blockchain
     */

    syncChain(){
        this.sockets.forEach(socket =>{
            this.sendChain(socket);
        });
    }



}

module.exports = P2pserver;