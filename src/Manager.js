import User from '../src/User';

class Manager extends User {
  constructor(users, bookings, rooms, id) {
    super(users, bookings, rooms, id);
    this.user = null;
  }

}

export default Manager;
