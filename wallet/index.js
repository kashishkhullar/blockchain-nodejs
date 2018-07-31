const ChainUtil = require('../chain-util');
const { INITIAL_BALANCE } = require('../config');

class Wallet{
    /**
     * the wallet will hold the public key
     * and the private key pair
     * and the balance
     */
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString(){
        return `Wallet - 
        publicKey: ${this.publicKey.toString()}
        balance  : ${this.balance}`
    }
}

module.exports = Wallet;