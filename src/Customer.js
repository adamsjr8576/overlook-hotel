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
    })
  }

  // postBooking(date, roomNumber) {
  //   return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       userID: this.user.id,
  //       date: date,
  //       roomNumber: roomNumber
  //     })
  //   })
  // }

}

export default Customer;
