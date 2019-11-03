class User {
  constructor(users, bookings, rooms, id) {
    this.bookings = bookings;
    this.rooms = rooms;
  }

  getUserInfo(users, id) {
    let newUser = users.find(user => user.id === id);
    this.user = newUser;
    return newUser;
  }

  getRoomsAvailableDay(date) {
    let roomsBooked = this.bookings.filter(booking => booking.date === date)
    .map(booking => booking = booking.roomNumber);
    return this.rooms.filter(room => {
      return !roomsBooked.includes(room.number);
    });
  }

  getUserAllBookings(id) {
    return this.bookings.filter(booking => booking.userID === id);
  }

  getTotalSpent() {

  }

  bookUserRoom() {

  }

}

export default User;
