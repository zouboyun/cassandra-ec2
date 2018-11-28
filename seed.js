const path = require('path');
const stream = require('fs').createReadStream(path.join(__dirname, './data/restaurantsNoSQL.csv'));
const readline = require('readline').createInterface({
  input: stream,
});
const connection = require('./connection');

let lineCounter = 0;

readline.on('line', (line) => {
  if (line) {
    readline.pause();
    const query = 'INSERT INTO reservations.restaurants JSON ? ;';
    connection.execute(query, [line], { prepare: true }, (error) => {
      if (error) {
        throw error;
      } else {
        lineCounter += 1;
        if (lineCounter % 20000 === 0) {
          console.clear();
          console.log(`${((lineCounter / 10000000) * 100).toFixed(2)}% completed`);
        }
        if (lineCounter === 10000000) {
          readline.close();
          connection.shutdown();
        }
        readline.resume();
      }
    });
  }
});