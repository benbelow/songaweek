/* global describe it, before */
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const { createSerializer } = require('enzyme-to-json');

Enzyme.configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

// Fail tests on any warning
// eslint-disable-next-line no-console
console.error = message => {
  throw new Error(message);
};
