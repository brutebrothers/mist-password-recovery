const assert = require('assert');
const decrypt = require('../lib/decrypt');
const wallet = {"address":"d728e1873ed53618c467ce06b6f20163eb39eaf5","crypto":{"cipher":"aes-128-ctr","ciphertext":"647c528ef918b2e10994f2d06bf174c04173aadfe8e07ffe0adbc87905e4f8d1","cipherparams":{"iv":"4119d65040dc656c6ae93a1e5b652eb8"},"kdf":"scrypt","kdfparams":{"dklen":32,"n":262144,"p":1,"r":8,"salt":"1e1cdfc95a53026cdf09df021a930a98774b7c6f211115963c48c83c375c4219"},"mac":"b57d71b99b40d4a5b49f4875bd423c8ad98f302a7332c49a8c613379d99d07f1"},"id":"0e6d086e-46dd-4eb1-a7c7-c03831ecf4ae","version":3}
const password = '123123123';
const wrongpassword = 'wrong';

describe('Mist wallet decrypt', function () {
  it('Should successfully decrypt a mist wallet', function () {
    this.timeout(30000);
    assert(decrypt(wallet, password));
  });

  it('Should failed to decrypt a mist wallet with the wrong password', function () {
    this.timeout(30000);
    assert(!decrypt(wallet, wrongpassword));
  });
});