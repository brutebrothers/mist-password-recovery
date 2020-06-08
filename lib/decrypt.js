const ethutil = require('ethereumjs-util');
const scrypt = require('scryptsy');

decrypt = function (json, password) {
	let derivedKey;
	let kdfparams;
	kdfparams = json.crypto.kdfparams;
	derivedKey = scrypt(Buffer.from(password), Buffer.from(kdfparams.salt, 'hex'), kdfparams.n, kdfparams.r, kdfparams.p, kdfparams.dklen);
	var ciphertext = Buffer.from(json.crypto.ciphertext, 'hex')
	var mac = ethutil.keccak(Buffer.concat([derivedKey.slice(16, 32), ciphertext]))
	if (mac.toString('hex') !== json.crypto.mac) {
		return false
	} else {
		return true
	}
}

module.exports = decrypt;