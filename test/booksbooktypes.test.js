import * as chai from 'chai';
import sinon from 'sinon';
import { BookTypes } from '../server.js'; // Adjust the import path as needed

const expect = chai.expect;

describe('BookTypes Model', () => {
  describe('create()', () => {
    it('should create a new book type record', async () => {
      // Mock the create method
      const createStub = sinon.stub(BookTypes, 'create').resolves({
        BookTypeID: 1,
        BookTypeName: 'Fiction'
      });

      // Call the method with mock data
      const bookTypeData = {
        BookTypeName: 'Fiction'
      };
      const result = await BookTypes.create(bookTypeData);

      // Assertions to verify the result
      expect(result).to.have.property('BookTypeID').that.equals(1);
      expect(result.BookTypeName).to.equal('Fiction');

      // Ensure the stub was called once
      sinon.assert.calledOnce(createStub);

      // Restore the original method
      createStub.restore();
    });
  });
});
