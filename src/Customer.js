import User from '../src/User';

class Customer extends User {
  constructor(users, bookings, rooms, id) {
    super(users, bookings, rooms, id);
    this.user = this.getUserInfo(users, id);
  }

  filterRoomsAvailable(date, roomType) {
    let roomsavailable = this.getRoomsAvailableDay(date);
    return roomsavailable.filter(room => {
      return room.roomType === roomType;
    });

  }
}

export default Customer;
