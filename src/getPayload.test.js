import getPayload from './getPayload';

const validPayload = `[{"field": "test", "type": "text", "payload": 42}]`;
const invalidPayload = `foo`;

test('must return valid parsed data', () => {
  expect(Array.isArray(getPayload(validPayload))).toBe(true);
});

test('must return null array if payload is invalid', () => {
  expect(getPayload(invalidPayload)).toBe(null);
});
