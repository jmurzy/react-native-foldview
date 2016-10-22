import { expect } from 'chai';
import { isEmptyObject } from '../modules/util';

describe('utils', () => {
  it('isEmptyObject should return true for empty objects', () => {
    const isEmpty = isEmptyObject({});
    expect(isEmpty).to.equal(true);
  });

  it('isEmptyObject should return false for non-empty objects', () => {
    const isEmpty = isEmptyObject({ key: 'value' });
    expect(isEmpty).to.equal(false);
  });
});
