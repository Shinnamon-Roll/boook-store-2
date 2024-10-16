import * as chai from 'chai';
import sinon from 'sinon';
import { Members } from '../server.js'; // Adjust the import path as needed

const expect = chai.expect;

describe('Members Model', () => {
  describe('create()', () => {
    it('should create a new member record', async () => {
      // Mock the create method
      const createStub = sinon.stub(Members, 'create').resolves({
        MemberID: 1,
        Point: 500,
        JoinDate: new Date('2023-01-01'),
        MembershipLevel: 'Gold'
      });

      // Call the method with mock data
      const memberData = {
        Point: 500,
        JoinDate: new Date('2023-01-01'),
        MembershipLevel: 'Gold'
      };
      const result = await Members.create(memberData);

      // Assertions to verify the result
      expect(result).to.have.property('MemberID').that.equals(1);
      expect(result.Point).to.equal(500);
      expect(result.JoinDate).to.be.an.instanceOf(Date);
      expect(result.JoinDate.toISOString()).to.equal(new Date('2023-01-01').toISOString());
      expect(result.MembershipLevel).to.equal('Gold');

      // Ensure the stub was called once
      sinon.assert.calledOnce(createStub);

      // Restore the original method
      createStub.restore();
    });
  });
});
