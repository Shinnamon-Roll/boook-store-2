import chai from 'chai';
import sinon from 'sinon';
import { BookStore } from '../server.js'; // Adjust the import path as needed

const expect = chai.expect;

describe('BookStore Model', () => {
  describe('create()', () => {
    it('should create a new book store sale record', async () => {
      // Mock the create method
      const createStub = sinon.stub(BookStore, 'create').resolves({
        SaleID: 1,
        CustomerID: 2,
        BookID: 3,
        PurchaseDate: new Date(),
        Quantity: 5
      });

      // Call the method
      const saleData = {
        CustomerID: 2,
        BookID: 3,
        PurchaseDate: new Date(),
        Quantity: 5
      };
      const result = await BookStore.create(saleData);

      // Assertions
      expect(result).to.have.property('SaleID');
      expect(result.CustomerID).to.equal(2);
      expect(result.BookID).to.equal(3);
      expect(result.Quantity).to.equal(5);

      // Restore the original method
      createStub.restore();
    });
  });
});
