const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const uuidV1 = require('uuid/v1');

const SHA256 = require('crypto-js/sha256');

class ChainUtil{

    static genKeyPair(){
        return ec.genKeyPair();
    }

    static id(){
        return uuidV1();
    }

    static hash(data){
        return SHA256(JSON.stringify(data)).toString();
    }
    /**
     * verify the transaction signature to 
     * check its validity using the method provided
     * in EC module
     */

    static verifySignature(publicKey,signature,dataHash){
        return ec.keyFromPublic(publicKey,'hex').verify(dataHash,signature);
    }


}

module.exports = ChainUtil;