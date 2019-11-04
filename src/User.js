class User {
  constructor(users, bookings, rooms, id) {
    this.bookings = bookings.bookings;
    this.rooms = rooms.rooms;
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

  getUserTotalSpent(id) {
    let roomsBooked = this.getUserAllBookings(id).map(booking => booking = Number(booking.roomNumber));
    let correctRoomsBooked = roomsBooked.filter(roomNumber => roomNumber < 51)
    let roomNums = this.rooms.map(room => room = room.number);
    let amountSpent = correctRoomsBooked.reduce((totalCost, roomNumber) => {
      let roomFound = this.rooms.find(room => {
        return room.number === roomNumber
      })
      totalCost += roomFound.costPerNight;
      return totalCost;
    }, 0);
    return Math.round(amountSpent);
  }

  postBooking(date, roomNumber) {
    return fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userID: this.user.id,
        date: date,
        roomNumber: roomNumber
      })
    })
  }

}

export default User;
