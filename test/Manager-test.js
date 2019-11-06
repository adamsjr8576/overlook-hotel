import chai from 'chai';
const expect = chai.expect;
import spies from "chai-spies";

import Manager from '../src/Manager';
import bookingsData from './bookings-sample';
import roomsData from './rooms-sample';
import usersData from './users-sample';

chai.use(spies);

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
    expect(manager.getRevenueToday("2019/11/22")).to.equal(819);
  });

  it('should be able to find the percentage of rooms booked for any given day', function() {
    chai.spy.on(manager, 'getRoomsAvailableDay', () => {
      return [
        {
          number: 5,
          roomType: "single room",
          bidet: true,
          bedSize: "queen",
          numBeds: 2,
          costPerNight: 340.17
        }];
    });
    expect(manager.getPercentageOccupancy("2019/11/22")).to.equal(90);
  });

  it('should be able to find the name of all users', function() {
    expect(manager.getAllUserNames()).to.deep.equal([ 'Leatha Ullrich',
  'Rocio Schuster',
  'Kelvin Schiller',
  'Kennedi Emard',
  'Rhiannon Little' ]);
  });

  it('should be able to find user info for a user based on name', function() {
    expect(manager.findUserInfo("Rocio Schuster")).to.deep.equal({
      id: 2,
      name: "Rocio Schuster"
    });
  });
});
