import * as chai from 'chai';
import sinon from 'sinon';
import { Books } from '../server.js'; // Adjust the import path as needed

const expect = chai.expect;

describe('Books Model', () => {
  describe('create()', () => {
    it('should create a new book record', async () => {
      // Mock the create method
      const createStub = sinon.stub(Books, 'create').resolves({
        BookID: 1,
        BookName: 'The Great Gatsby',
        BookTypeID: 2,
        BookPrice: 19.99,
        Description: 'A classic novel by F. Scott Fitzgerald.'
      });

      // Call the method with mock data
      const bookData = {
        BookName: 'The Great Gatsby',
        BookTypeID: 2,
        BookPrice: 19.99,
        Description: 'A classic novel by F. Scott Fitzgerald.'
      };
      const result = await Books.create(bookData);

      // Assertions to verify the result
      expect(result).to.have.property('BookID');
      expect(result.BookID).to.equal(1);
      expect(result.BookName).to.equal('The Great Gatsby');
      expect(result.BookTypeID).to.equal(2);
      expect(result.BookPrice).to.equal(19.99);
      expect(result.Description).to.equal('A classic novel by F. Scott Fitzgerald.');

      // Ensure the stub was called once
      sinon.assert.calledOnce(createStub);

      // Restore the original method
      createStub.restore();
    });
  });
});
