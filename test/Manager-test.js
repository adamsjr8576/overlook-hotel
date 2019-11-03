import chai from 'chai';
const expect = chai.expect;

import Manager from '../src/Manager';
import bookingsData from './bookings-sample';
import roomsData from './rooms-sample';
import usersData from './users-sample';

describe('Manager', () => {

  let manager;

  beforeEach(() => {
    manager = new Manager(usersData, bookingsData, roomsData);
  });

  it('should be a function', function() {
    expect(Manager).to.be.a('function');
  });

  it('should have the user info equal null as a default property', function() {
    expect(manager.user).to.equal(null);
  });

  it('should be able to find the user info for any user', function() {
    manager.getUserInfo(usersData, 2);
    expect(manager.user).to.deep.equal({
      id: 2,
      name: "Rocio Schuster"
    });
  });

  it('should be able to find the revenue for any given day', function() {
    expect(manager.getRevenueToday("2019/11/22")).to.equal(820.05);
  });

  it('should be able to find the percentage of rooms booked for any given day', function() {
    expect(manager.getPercentageOccupancy("2019/11/22")).to.equal(30);
  });
});
