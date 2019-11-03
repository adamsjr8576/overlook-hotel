import chai from 'chai';
const expect = chai.expect;

import Customer from '../src/Customer';
import bookingsData from './bookings-sample';
import roomsData from './rooms-sample';
import usersData from './users-sample';

describe('User', () => {

  let customer;

  beforeEach(() => {
    customer = new Customer(usersData, bookingsData, roomsData, 1);
  });

  it('should be a function', function() {
    expect(Customer).to.be.a('function');
  });

  it('should have the user info as a default property', function() {
    expect(customer.user).to.deep.equal({
      id: 1,
      name: "Leatha Ullrich"
    });
  });

  it('should be able to filter rooms available by type', function() {
    expect(customer.filterRoomsAvailable("2019/11/22", "junior suite")).to.deep.equal([{
      number: 6,
      roomType: "junior suite",
      bidet: true,
      bedSize: "queen",
      numBeds: 1,
      costPerNight: 397.02
    }]);
  });
});
