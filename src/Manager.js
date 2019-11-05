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
      return Math.round(revenue);
    }, 0);
  }

  getPercentageOccupancy(date) {
    let roomsAvailable = this.getRoomsAvailableDay(date);
    let roomsBookedNum = this.rooms.length - roomsAvailable.length;
    let percentage = (roomsBookedNum / this.rooms.length) * 100;
    return Math.round(percentage);
  }

  getAllUserNames() {
    return this.users.map(user => user = user.name);
  }

  findUserInfo(name) {
    return this.users.find(user => user.name === name);
  }

  deleteBooking(confirmationNum) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        id: confirmationNum
      })
    });
  }

}

export default Manager;
