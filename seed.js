/* eslint-disable no-console */
const faker = require('faker');
const moment = require('moment');
const connection = require('./connection');
let lineCounter = 0;
let batchCounter = 0;

const writeToDatabase = (line, resolve, reject) => {
  const query = 'INSERT INTO reservations.restaurants JSON ? ;';
  connection.execute(query, [line], { prepare: true }, (error) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
}

const generateData = () => {
  const lines= [];
  for (let i = 0; i < 1000; i += 1) {
    const row = {};
    lineCounter += 1;
    const fakeName = `${faker.company.bsNoun()} ${faker.company.catchPhraseNoun()} ${faker.lorem.word()} ${lineCounter}`;
    let availableTable = (5 + Math.floor(Math.random() * 10));
    const totalTable = availableTable;
    let openingHour = 9 + Math.floor(Math.random() * 3);
    if (openingHour < 10) {
      openingHour = `0${openingHour}`;
    }
    if (Math.random() >= 0.5) {
      openingHour += ':30';
    } else {
      openingHour += ':00';
    }
    let closingHour = 20 + Math.floor(Math.random() * 4);
    if (Math.random() >= 0.5) {
      closingHour += ':30';
    } else {
      closingHour += ':00';
    }
    const reservationNumber = Math.floor(Math.random() * 5);
    const reservations = [];
    for (let j = 0; j < reservationNumber; j += 1) {
      const reservation = {};
      const fakePerson = `${faker.name.findName()}`;
      const randomReservation = faker.date.future(0.05);
      let randomTime = parseInt(12 + (Math.random() * 10), 10);
      if (Math.random() >= 0.5) {
        randomTime += ':30:00';
      } else {
        randomTime += ':00:00';
      }
      const fakeReservation = `${moment(randomReservation).format('YYYY-MM-DD')} ${randomTime}`;
      reservation.id = faker.random.uuid();
      reservation.reservee = fakePerson;
      reservation.reservation_time = fakeReservation;
      reservations.push(reservation);
      availableTable -= 1;
    }
    row.id = faker.random.uuid();
    row.name = fakeName;
    row.available_table = availableTable;
    row.total_table = totalTable;
    row.opening_hour = openingHour;
    row.closing_hour = closingHour;
    row.reservations = reservations;
    let line = JSON.stringify(row);
    lines.push(line);
  }
  return lines;
}

const getPromise = (line) => new Promise((resolve, reject) => {
  writeToDatabase(line, () => {
    if (lineCounter % 2000 === 0) {
      console.clear();
      console.log(`${lineCounter} lines in bacth ${batchCounter} completed`);
    }
    resolve();
  }, reject);
});

const seed = () => {
  const lines = generateData();
  const promises = lines.map(line => {
    return getPromise(line);
  });
  batchCounter += 1;
  Promise.all(promises).then(() => {
    if (batchCounter < 100) {
      seed();
    } else {
      connection.shutdown();
    }
  });
}

seed();