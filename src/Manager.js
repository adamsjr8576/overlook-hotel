import User from '../src/User';

class Manager extends User {
  constructor(users, bookings, rooms, id) {
    super(users, bookings, rooms, id);
    this.user = null;
    this.users = users;
  }

  getRevenueToday(date) {
    let roomsAvailable = this.getRoomsAvailableDay(date);
    let roomsBooked = this.rooms.filter(room => {
      return !roomsAvailable.includes(room);
    });
    return roomsBooked.reduce((revenue, bookedRoom) => {
      revenue += bookedRoom.costPerNight;
      return revenue;
    }, 0);
  }

  getPercentageOccupancy(date) {
    let roomsAvailable = this.getRoomsAvailableDay(date);
    let roomsBookedNum = this.rooms.length - roomsAvailable.length;
    let percentage = (roomsBookedNum / this.rooms.length) * 100;
    return percentage;
  }

  getAllUserNames() {
    return this.users.map(user => user = user.name);
  }

  findUserInfo(name) {
    return this.users.find(user => user.name === name);
  }

  deleteBooking() {

  }

}

export default Manager;
