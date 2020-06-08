const fs = require('fs');
const decrypt = require('./lib/decrypt');
const {
  program
} = require('commander');

let wallet;
let wordlist = [];

program
  .option('-p, --passwordlist <passwords file>', 'Your passwords file')
  .option('-w, --wallet <wallet file>', 'Your wallet file')

program.parse(process.argv);

if (!program.passwordlist || !program.wallet) {
  console.error('Wallet or Passwordlist were not defined')
  process.exit(1)
}

try {
  wallet = JSON.parse(fs.readFileSync(program.wallet, 'utf-8'));
} catch (x) {
  console.error('Could not parse wallet file correctly');
}

try {
  wordlistfile = fs.readFileSync(program.passwordlist, 'utf-8').toString();
  if (wordlistfile.includes('\r'))
    wordlist = wordlistfile.split('\r\n');
  else
    wordlist = wordlistfile.split('\n');
} catch (x) {
  console.error('Could not read password list file');
}
if (wordlist.length === 0) {
  console.error('Could not parse password list');
}

wordlist.forEach((word) => {
  if (decrypt(wallet, word)) {
    console.log(`PASSWORD RECOVERED: ${word}`)
    process.exit(0);
  }
  else {
    console.log(`Failed password: ${word}`)
  }
})