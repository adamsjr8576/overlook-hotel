import chai from 'chai';
const expect = chai.expect;

import User from '../src/User';
import bookingsData from './bookings-sample';
import roomsData from './rooms-sample';
import usersData from './users-sample';

describe('User', () => {

  let user;

  beforeEach(() => {
    user = new User(usersData, bookingsData, roomsData, 1);
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should have the bookings data as a default property', function() {
    expect(user.bookings).to.deep.equal([
      {
        id: 1572293130156,
        userID: 19,
        date: "2019/11/06",
        roomNumber: 18,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 16,
        date: "2019/11/06",
        roomNumber: 7,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 8,
        date: "2019/11/22",
        roomNumber: 1,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 3,
        date: "2019/11/22",
        roomNumber: 9,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 47,
        date: "2019/12/09",
        roomNumber: 14,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 20,
        date: "2019/12/01",
        roomNumber: 23,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 11,
        date: "2019/11/22",
        roomNumber: 8,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 23,
        date: "2019/12/07",
        roomNumber: 16,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 44,
        date: "2019/11/16",
        roomNumber: 12,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 7,
        date: "2019/11/01",
        roomNumber: 12,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 39,
        date: "2019/11/13",
        roomNumber: 21,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 46,
        date: "2019/12/03",
        roomNumber: 2,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 5,
        date: "2019/12/14",
        roomNumber: 11,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 45,
        date: "2019/11/10",
        roomNumber: 16,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 25,
        date: "2019/12/01",
        roomNumber: 9,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 30,
        date: "2019/11/06",
        roomNumber: 11,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 49,
        date: "2019/11/16",
        roomNumber: 5,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 18,
        date: "2019/12/16",
        roomNumber: 16,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 34,
        date: "2019/11/10",
        roomNumber: 12,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 31,
        date: "2019/11/17",
        roomNumber: 1,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 26,
        date: "2019/12/15",
        roomNumber: 22,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 10,
        date: "2019/11/24",
        roomNumber: 12,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130160,
        userID: 1,
        date: "2019/11/18",
        roomNumber: 5,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130161,
        userID: 9,
        date: "2019/11/07",
        roomNumber: 5,
        roomServiceCharges: [ ]
      },
      {
        id: 1572293130161,
        userID: 22,
        date: "2019/11/15",
        roomNumber: 15,
        roomServiceCharges: [ ]
      }
    ]);
  });

  it('should have the rooms data as a default property', function() {
    expect(user.rooms).to.deep.equal([
      {
        number: 1,
        roomType: "residential suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 358.4
      },
      {
        number: 2,
        roomType: "suite",
        bidet: false,
        bedSize: "full",
        numBeds: 2,
        costPerNight: 477.38
      },
      {
        number: 3,
        roomType: "single room",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 491.14
      },
      {
        number: 4,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 429.44
      },
      {
        number: 5,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 340.17
      },
      {
        number: 6,
        roomType: "junior suite",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 397.02
      },
      {
        number: 7,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 2,
        costPerNight: 231.46
      },
      {
        number: 8,
        roomType: "junior suite",
        bidet: false,
        bedSize: "king",
        numBeds: 1,
        costPerNight: 261.26
      },
      {
        number: 9,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 200.39
      },
      {
        number: 10,
        roomType: "suite",
        bidet: false,
        bedSize: "twin",
        numBeds: 1,
        costPerNight: 497.64
      }
    ]);
  });

  it('should be able to calculate the rooms available for any given day', function() {
    expect(user.getRoomsAvailableDay("2019/11/22")).to.deep.equal([ { number: 2,
    roomType: 'suite',
    bidet: false,
    bedSize: 'full',
    numBeds: 2,
    costPerNight: 477.38 },
  { number: 3,
    roomType: 'single room',
    bidet: false,
    bedSize: 'king',
    numBeds: 1,
    costPerNight: 491.14 },
  { number: 4,
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 429.44 },
  { number: 5,
    roomType: 'single room',
    bidet: true,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 340.17 },
  { number: 6,
    roomType: 'junior suite',
    bidet: true,
    bedSize: 'queen',
    numBeds: 1,
    costPerNight: 397.02 },
  { number: 7,
    roomType: 'single room',
    bidet: false,
    bedSize: 'queen',
    numBeds: 2,
    costPerNight: 231.46 },
  { number: 10,
    roomType: 'suite',
    bidet: false,
    bedSize: 'twin',
    numBeds: 1,
    costPerNight: 497.64 } ]);
  });

  it('should be able to get all bookings for any user', function() {
    expect(user.getUserAllBookings(1)).to.deep.equal([ { id: 1572293130160,
    userID: 1,
    date: '2019/11/18',
    roomNumber: 5,
    roomServiceCharges: [] } ]);
  });

  it('should be able to get the total cost of rooms booked for any user', function() {
    expect(user.getTotalSpent()).to.equal(340.17);
  });
});
