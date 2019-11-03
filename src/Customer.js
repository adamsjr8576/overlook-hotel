import User from '../src/User';

class Customer extends User {
  constructor(users, bookings, rooms, id) {
    super(users, bookings, rooms, id);
    this.user = this.getUserInfo(users, id);
  }

}

export default Customer;
