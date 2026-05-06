// unit.test.js

import {
  isPhoneNumber,
  isEmail,
  isStrongPassword,
  isDate,
  isHexColor,
} from '../code-to-unit-test/unit-test-me';

// isPhoneNumber
test('valid phone number with area code in parens returns true', () => {
  expect(isPhoneNumber('(555) 123-4567')).toBe(true);
});

test('valid phone number with dashed area code returns true', () => {
  expect(isPhoneNumber('555-123-4567')).toBe(true);
});

test('phone number with no dashes returns false', () => {
  expect(isPhoneNumber('1234567890')).toBe(false);
});

test('phone number with letters returns false', () => {
  expect(isPhoneNumber('abc-defg')).toBe(false);
});

// isEmail
test('valid email with .com domain returns true', () => {
  expect(isEmail('user@example.com')).toBe(true);
});

test('valid email with .org domain returns true', () => {
  expect(isEmail('hello@test.org')).toBe(true);
});

test('string with no @ symbol returns false', () => {
  expect(isEmail('notanemail')).toBe(false);
});

test('email with no TLD returns false', () => {
  expect(isEmail('user@domain')).toBe(false);
});

// isStrongPassword
test('password starting with letter and 8 chars returns true', () => {
  expect(isStrongPassword('Hello123')).toBe(true);
});

test('password with exactly 4 characters returns true', () => {
  expect(isStrongPassword('abcd')).toBe(true);
});

test('password starting with a digit returns false', () => {
  expect(isStrongPassword('1password')).toBe(false);
});

test('password shorter than 4 characters returns false', () => {
  expect(isStrongPassword('hi')).toBe(false);
});

// isDate
test('valid date in MM/DD/YYYY format returns true', () => {
  expect(isDate('12/25/2023')).toBe(true);
});

test('valid date with single-digit month and day returns true', () => {
  expect(isDate('1/1/2000')).toBe(true);
});

test('date with dashes instead of slashes returns false', () => {
  expect(isDate('12-25-2023')).toBe(false);
});

test('date in YYYY/MM/DD format returns false', () => {
  expect(isDate('2023/12/25')).toBe(false);
});

// isHexColor
test('valid 3-character hex color with hash returns true', () => {
  expect(isHexColor('#fff')).toBe(true);
});

test('valid 6-character hex color with hash returns true', () => {
  expect(isHexColor('#aabbcc')).toBe(true);
});

test('hex color with invalid characters returns false', () => {
  expect(isHexColor('#gggggg')).toBe(false);
});

test('non-hex letters without hash return false', () => {
  expect(isHexColor('xyz')).toBe(false);
});
