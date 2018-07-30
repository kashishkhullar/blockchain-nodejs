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

    listen(){
        const server = new WebSocket.Server({ port: P2P_PORT });
        server.on('connection',socket => this.connectSocket(socket));
        console.log(`Listening for peer to peer connection on port : ${P2P_PORT}`);
    }
    
    connectSocket(socket){
        this.sockets.push(socket);
        console.log("Socket connected");
    }
}