class User {
  constructor(users, bookings, rooms, id) {
    this.bookings = bookings;
    this.rooms = rooms;
  }

  getUserInfo(users, id) {
    let newUser = users.find(user => user.id === id);
    this.userSelected = newUser;
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

  getUserTotalSpent() {
    let roomsBooked = this.getUserAllBookings(1).map(booking => booking = booking.roomNumber);
    return this.rooms.reduce((totalCost, room) => {
      if (roomsBooked.includes(room.number)) {
        totalCost += room.costPerNight;
      }
      return totalCost;
    }, 0);
  }

  bookUserRoom() {

  }

}

export default User;
