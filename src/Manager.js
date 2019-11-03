import User from '../src/User';

class Manager extends User {
  constructor(users, bookings, rooms, id) {
    super(users, bookings, rooms, id);
    this.user = null;
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

  deleteBooking() {

  }

}

export default Manager;
