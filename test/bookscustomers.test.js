import * as chai from 'chai';
import sinon from 'sinon';
import { Customers } from '../server.js'; // Adjust the import path as needed

const expect = chai.expect;

describe('Customers Model', () => {
  describe('create()', () => {
    it('should create a new customer record', async () => {
      // Mock the create method
      const createStub = sinon.stub(Customers, 'create').resolves({
        CustomerID: 1,
        MemberID: 100,
        CustomerName: 'John Doe',
        Sex: 'Male',
        Age: 30,
        Contact: 1234567890,
        Address: '123 Main St, Anytown, USA'
      });

      // Call the method with mock data
      const customerData = {
        MemberID: 100,
        CustomerName: 'John Doe',
        Sex: 'Male',
        Age: 30,
        Contact: 1234567890,
        Address: '123 Main St, Anytown, USA'
      };
      const result = await Customers.create(customerData);

      // Assertions to verify the result
      expect(result).to.have.property('CustomerID');
      expect(result.CustomerID).to.equal(1);
      expect(result.MemberID).to.equal(100);
      expect(result.CustomerName).to.equal('John Doe');
      expect(result.Sex).to.equal('Male');
      expect(result.Age).to.equal(30);
      expect(result.Contact).to.equal(1234567890);
      expect(result.Address).to.equal('123 Main St, Anytown, USA');

      // Ensure the stub was called once
      sinon.assert.calledOnce(createStub);

      // Restore the original method
      createStub.restore();
    });
  });
});
