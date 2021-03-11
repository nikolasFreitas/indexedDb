// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { access, constants, writeFileSync } from 'fs';
import path from 'path';

const file = path.resolve('src', 'mock', 'example.json');

access(file, constants.F_OK, (err) => {
  if (!err) {
    console.log('Fake resource is found. Continuing with React application');
    return;
  }
  console.log('Fake resource not found');
  console.log('Generating fake resources');

  const randomNumber = Math.round(Math.random() * 100);
  // @ts-ignore
  const fakeData = Array(randomNumber).fill().map(() => ({
    author: faker.name.firstName(),
    phrase: faker.hacker.phrase(),
    bank: faker.finance.amount(),
  }));
  console.log(fakeData);

  const fakeDataJson = JSON.stringify(fakeData, null, 4);
  try {
    writeFileSync(file, fakeDataJson);
    console.log("File was write with success");
  } catch (error) {
    console.log("There was an error with your process");
    process.exit(1);
  }
});

// To satisfact isolatedModules rule
export {};
