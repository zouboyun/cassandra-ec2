/* eslint-disable no-console */
const path = require('path');
const LineByLine = require('n-readlines');

const csvFile = new LineByLine(path.join(__dirname, './data/restaurantsNoSQL.csv'));
const connection = require('./connection');

let lineCounter = 0;
let promise;

const writeToDatabase = (line, resolve, reject) => {
  const query = 'INSERT INTO reservations.restaurants JSON ? ;';
  connection.execute(query, [line], { prepare: true }, (error) => {
    if (error) {
      reject(error);
    } else {
      lineCounter += 1;
      if (lineCounter % 20000 === 0) {
        console.clear();
        console.log(`${((lineCounter / 10000000) * 100).toFixed(2)}% completed`);
      }
      resolve();
    }
  });
}

const getPromise = () => new Promise((resolve, reject) => {
  const line = csvFile.next().toString();
  console.log(line);
  if (line !== 'false') {
    writeToDatabase(line, () => {
      console.log(line);
      promise.then(getPromise);
      resolve();
    }, reject);
  } else {
    connection.shutdown();
    resolve();
  }
});

promise = getPromise();
