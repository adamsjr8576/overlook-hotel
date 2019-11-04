import $ from 'jquery';

import './css/base.scss';

import './images/turing-logo.png'
import './images/login-background.jpg'
import './images/silva-logo.png'
import './images/user-page.png'
import Customer from './Customer'
import Manager from './Manager'
import flatpickr from "flatpickr";

let usersData;
let roomsData;
let bookingsData;
let customer;
let manager;
let id;

$("body").on('click', "#user-header-logout", addloginHTML);
$("body").on('click', "#login-submit-button", loginHandler);
$("body").on('change', "#datepicker", roomsAvailableHandler);
$("body").on('click', "#customer-filter-form", filterRoomsHandler);
$("body").on('click', "#customer-room-available", displayRoomSelected);
$("body").on('click', "#cancel-room-button", cancelRoomSelected);
$("body").on('click', "#book-room-button", bookRoomHandler);

usersData = getData('users/users', 'users');
roomsData = getData('rooms/rooms', 'rooms');
bookingsData = getData('bookings/bookings', 'bookings');

Promise.all([usersData, roomsData, bookingsData]).then((promise) => {
  usersData = promise[0];
  roomsData = promise[1];
  bookingsData = promise[2];
}).then(data => {
  usersData = usersData.users;
});

function getData(type, dataName) {
  const root = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/';
  const url = `${root}${type}`;
  const promise = fetch(url)
  .then(response => response.json())
  return promise;
}

function formatDate(date) {
  var monthNames = [
    "1", "2", "3",
    "4", "5", "6", "7",
    "8", "9", "10",
    "11", "12"
  ];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  return year + '/' + monthNames[monthIndex] + '/' + day;
}

const date = formatDate(new Date());
const dateObject = new Date(date);
const options = {
	weekday: 'long',
	year: 'numeric',
	month: 'long',
	day: 'numeric'
}

const formattedDate = dateObject.toLocaleString('en', options);

function login(customerCheck) {
  if($("#username-input").val() === 'manager'
  && $("#password-input").val() === 'overlook2019') {
    managerPageHandler(date)
  } else if (customerCheck.includes($("#username-input").val())
  && $("#password-input").val() === 'overlook2019') {
    customerPageHandler();
  } else {
    errorMessageHandling();
  }
}

function loginHandler() {
  let customerCheck = makeCustomerNameCheck();
  login(customerCheck);
}

function filterRoomsHandler() {
  let info = filterRoomsAvailable();
  displaySelectedDate(info.date);
  clearSearch(info.roomType);
}

function roomsAvailableHandler() {
  let info = addAvailableRoomsCustomer();
  displaySelectedDate(info.date);
  clearRoomSelected();
}

function customerPageHandler() {
  id = Number($("#username-input").val().split('r')[1]);
  addCustomerHTML();
  instantiateCustomer(id);
  addUserRoomBookings(id);
  $("#dollars-spent").text(`$${customer.getUserTotalSpent(id)}`);
  addDatePicker();
}

function managerPageHandler(date) {
  addManagerHTML();
  instantiateManager();
  addTodaysAvailability(date);
  $("#today-revenue").html(`
    <p class="manager-today-p">Revenue</p>
    <p class="manager-today">$${manager.getRevenueToday(date)}<p>
    `);
  $("#today-percentage").html(`
    <p class="manager-today-p">Percentage Booked</p>
    <p class="manager-today">${manager.getPercentageOccupancy(date)}%<p>
    `);
    getAllUserNames();
}

function bookRoomHandler() {
  bookRoom();
  // addUserRoomBookings(id);
}

function errorMessageHandling() {
    $("#username-input").val('');
    $("#password-input").val('');
    $("#error-message").css('visibility', 'visible');
}

function instantiateCustomer(id) {
  customer = new Customer(usersData, bookingsData, roomsData, id);
}

function instantiateManager() {
  manager = new Manager(usersData, bookingsData, roomsData);
}

function makeCustomerNameCheck() {
  let customerOptions = [];
  for (var i = 1; i < 51; i++) {
    customerOptions.push(`customer${i}`);
  }
  return customerOptions;
}

function addUserRoomBookings(id) {
  let bookings = customer.getUserAllBookings(id);
  bookings.forEach(booking => {
    $("#customer-bookings").append(`
    <section class="booking-section">
      <div class="availability-room-num">
      <p class="availability-room-p">Room ${booking.roomNumber}</p>
      </div>
      <div class="availability-room-info">
      <p>Booking Date: ${booking.date}</p>
      <p>Confirmation #: ${booking.id}</p>
      </div>
    </section>
    `);
  });
}

function addTodaysAvailability(date) {
  let availability = manager.getRoomsAvailableDay(date);
  availability.forEach(room => {
    $("#today-availability").append(`<section class="manager-availability-section">
      <div class="availability-room-num">
      <p class="availability-room-p">Room ${room.number}</p>
      </div>
      <div class="availability-room-info">
      <p>Room Type: ${room.roomType}</p>
      <p>Bed Size: ${room.bedSize}</p>
      <p>Number of Beds: ${room.numBeds}</p>
      <p>Cost Per Night: ${room.costPerNight}</p>
      </div>
    </section>
    `)
  });
}

function displaySelectedDate(date) {
  let dateObject = new Date(date);
  let formatDate = dateObject.toLocaleString('en', options);
  $("#customer-availability-date").text(formatDate);
}

function clearSearch(roomType) {
  if (roomType === 'clear') {
    addAvailableRoomsCustomer();
  }
}

function filterRoomsAvailable() {
  let roomType = $('input[name="roomType"]:checked').val();
  let date = $("#datepicker").val();
  let filteredRooms = customer.filterRoomsAvailable(date, roomType);
  if (filteredRooms.length > 0) {
    $("#customer-availability-container").empty();
    addAvailableRoomsToDOM(filteredRooms);
  } else {
    $("#customer-availability-container").html(`<p>I am soooooo very sorry that no rooms
    are currently available within your selected criteria</p>`);
  }
  return {
    roomType: roomType,
    date: date,
    rooms: filteredRooms
  }
}

function addAvailableRoomsCustomer() {
  $("#customer-availability-container").empty();
  let date = $("#datepicker").val();
  let roomsAvailable = customer.getRoomsAvailableDay(date);
  if (roomsAvailable.length > 0) {
    addAvailableRoomsToDOM(roomsAvailable);
  } else {
    $("#customer-availability-container").html(`<p>I am soooooo very sorry that no rooms
    are currently available within your selected criteria</p>`);
  }
  return {
    date: date,
    rooms: roomsAvailable
  }
}

function addAvailableRoomsToDOM(rooms) {
  rooms.forEach(room => {
    $("#customer-availability-container").append(`
      <section class="availability-section" id="customer-room-available">
        <div class="availability-room-num">
          <p class="availability-room-p">Room ${room.number}</p>
        </div>
        <div class="availability-room-info">
          <p>Room Type: ${room.roomType}</p>
          <p>Bed Size: ${room.bedSize}</p>
          <p>Number of Beds: ${room.numBeds}</p>
          <p>Cost Per Night: ${room.costPerNight}</p>
        </div>
      </section>
    `)
  });
}

function addDatePicker() {
  flatpickr("#datepicker", {
    dateFormat: "Y/m/d"
  });
}

function bookRoom() {
  let roomNumP = $("#customer-selection-container").children().children().children('p.availability-room-p')[0].innerText;
  let roomNum = Number(roomNumP.split(' ')[1]);
  let date = $("#datepicker").val();
  customer.postBooking(date, roomNum)
  .then(response => {
    if (response.ok) {
      return response.json()
    } else {
      return Promise.reject(`error ${response.status} - ${response.statusText}`);
    }
  })
  .then(data => {
    $("#customer-selection-container").html(`<p class="post-message">Booking Successful!</p>`);
    setTimeout(function() {$("#customer-selection-container").empty()}, 3000);
    getData('bookings/bookings', 'bookings')
    .then(data => {
      bookingsData = data.bookings;
      customer.bookings = bookingsData;
      addUserRoomBookings(id);
      $("#dollars-spent").text(`$${customer.getUserTotalSpent(id)}`);
    })
  })
  .catch(err => {
    $("#customer-selection-container").html(`<p class="post-message">Booking Unsuccessful! ${err}</p>`);
    setTimeout(function() {$("#customer-selection-container").empty()}, 3000);
  });
}

function clearRoomSelected() {
  $("#customer-selection-container").empty();
}

function cancelRoomSelected() {
  $("#customer-availability-container").append($("#customer-selection-container").children());
}

function displayRoomSelected() {
  if ($("#customer-selection-container").html().length === 0) {
    $("#customer-selection-container").append(this);
  }
}

function getAllUserNames() {
  let userNames = manager.getAllUserNames();
  userNames.forEach(userName => {
    $("#user-names").append(`<option value="${userName}">`);
  })
}

function addloginHTML() {
  $("#login-page-body").empty();
  $("#login-page-body").html(`
    <header class="login-page-header">
      <h1>Hotel</h1>
      <img class="silva-logo" src="./images/silva-logo.png" alt="Silva logo">
      <h1>Silva</h1>
    </header>
    <main>
      <form>
        <section class="login-input-section">
          <div class="login-input-container">
            <label class="login-label" for="username-input">Username:</label>
            <input class="login-input" id="username-input" type="text" placeholder="Username...">
          </div>
          <div class="login-input-container">
            <label class="login-label" for="password-input">Password:</label>
            <input class="login-input" id="password-input" type="password" placeholder="Password...">
          <div>
        </section>
        <p class="error-message hidden" id="error-message">Username/Password not found - please enter again</p>
        <button type="button" class="login-submit-button" id="login-submit-button">LOGIN</button>
      </form>
    </main>
    `);
}

function addManagerHTML() {
  $("#login-page-body").empty();
  $("#login-page-body").html(`
    <header class="user-page-header">
      <img class="user-silva-logo" src="./images/silva-logo.png" alt="Silva logo">
      <h1 class="manager-header-h1">Silva</h1>
      <form class="manager-header-form">
        <input class="manager-user-search" list="user-names" id="name-selection" name="name-selection" placeholder="User Name Search" >
        <button type="button" class="user-search-button" id="user-search-button">Search</button>
      </form>
      <h3 class="manager-header-date" id="manager-header-date">${formattedDate}</h3>
      <button type="button" class="user-header-logout" id="user-header-logout">Logout</button>
    </header>
    <main class="user-page-main">
      <section class="manager-section">
        <article class="manager-section-article">
          <h2 class="manager-section-header">User Name</h2>
          <div class="user-booking-container" id="today-bookings">
          </div>
          <div class="user-info-button-container">
            <button type="button" class="user-info-button" id="user-amount-button">Customer Amount Spent</button>
            <button type="button" class="user-info-button" id="user-book-button">Make Customer Booking</button>
            <button type="button" class="user-info-button" id="user-delete-button">Delete Customer Booking</button>
          </div>
        </article>
        <article class="user-info-article">
          <p>user info</p>
        </article>
      </section>
      <section class="manager-section">
        <div class="today-info-container">
          <article class="today-info-article" id="today-revenue">
          </article>
          <article class="today-info-article" id="today-percentage">
          </article>
        </div>
        <article class="manager-section-article">
          <h2 class="today-section-header">Current Availability</h2>
          <div class="today-booking-container" id="today-availability">
          </div>
        </article>
      </section>
    </main>
    <datalist id="user-names"></datalist>
    `)
}

function addCustomerHTML() {
  $("#login-page-body").empty();
  $("#login-page-body").html(`
    <header class="user-page-header">
      <img class="user-silva-logo" src="./images/silva-logo.png" alt="Silva logo">
      <h1 class="manager-header-h1">Silva</h1>
      <input class="manager-user-search" id="datepicker" placeholder="Select Date" />
      <h3 class="manager-header-date" id="manager-header-date">November 2, 2019</h3>
      <button type="button" class="user-header-logout" id="user-header-logout">Logout</button>
    </header>
  <main class="user-page-main">
    <section class="customer-availability-section">
      <h2 class="customer-section-header">Available Rooms</h2>
      <p class="customer-availability-date" id="customer-availability-date"></p>
      <div class="customer-availability-container" id="customer-availability-container">
      </div>
    </section>
    <section class="customer-book-section">
      <article class="customer-filter-room-article">
        <h2 class="customer-section-header">Filter Rooms</h2>
        <form id="customer-filter-form" class="customer-filter-form">
          <p class="filter-radio"><input class="customer-filter-input" type="radio" name="roomType" value="residential suite" /> Residential Suite</p>
          <p class="filter-radio"><input class="customer-filter-input" type="radio" name="roomType" value="suite"> Suite</p>
          <p class="filter-radio"><input class="customer-filter-input" type="radio" name="roomType" value="junior suite"> Junior Suite</p>
          <p class="filter-radio"><input class="customer-filter-input" type="radio" name="roomType" value="single room"> Single Room</p>
          <p class="filter-radio"><input class="customer-filter-input" type="radio" name="roomType" value="clear"> Clear Search</p>
        </form>
      </article>
      <article class="customer-select-room-article">
        <h2 class="customer-section-header">Selected Room</h2>
        <div class="customer-selection-container" id="customer-selection-container">
        </div>
        <button class="user-info-button" type="button" id="book-room-button">BOOK NOW</button>
        <button class="user-info-button" type="button" id="cancel-room-button">cancel</button>
      </article>
    </section>
    <section class="customer-info-section">
      <h2 class="today-section-header">User Bookings</h2>
      <div class="customer-availability-container" id="customer-bookings">
      </div>
      <p class="customer-amount-spent">Total Spent</p>
      <p class="dollars-spent" id="dollars-spent"></p>
    </section>
  </main>
    `)
}
