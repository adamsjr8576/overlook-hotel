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
$("body").on('click', "#user-search-button", userSearchHandler);
$("body").on('click', "#user-amount-button", addUserSelectedSpent);
$("body").on('click', "#user-info-delete-button", removeSelectUserInfo);
$("body").on('click', "#daily-revenue-button", addTodayRevenue);
$("body").on('click', "#daily-percent-button", addTodayPercent);
$("body").on('click', "#user-book-button", addSelectedCustomerBooking);
$("body").on('click', "#user-delete-button", deleteBookingHandler);
$("body").on("click", "#user-booking-delete-button", addUserBookingsToDelete);

usersData = getData('users/users', 'users');
roomsData = getData('rooms/rooms', 'rooms');
bookingsData = getData('bookings/bookings', 'bookings');

Promise.all([usersData, roomsData, bookingsData]).then((promise) => {
  usersData = promise[0];
  roomsData = promise[1];
  bookingsData = promise[2];
}).then(data => {
  usersData = usersData.users;
  console.log('done!!!!');
})

function getData(type, dataName) {
  const root = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/';
  const url = `${root}${type}`;
  const promise = fetch(url)
  .then(response => response.json())
  return promise;
}

function formatDate(date) {
  var day = ("0" + date.getDate()).slice(-2);
  var monthIndex = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();
  return year + '/' + monthIndex + '/' + day;
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
  if (!customer) {
    var info = addAvailableRoomsCustomer(manager);
  } else {
    var info = addAvailableRoomsCustomer(customer);
  }
  displaySelectedDate(info.date);
  clearRoomSelected();
}

function customerPageHandler() {
  id = Number($("#username-input").val().split('r')[1]);
  addCustomerHTML();
  instantiateCustomer(id);
  addUserRoomBookings(customer, id, "#customer-bookings");
  $("#dollars-spent").text(`$${customer.getUserTotalSpent(id)}`);
  addDatePicker();
}

function managerPageHandler(date) {
  addManagerHTML();
  instantiateManager();
  addTodaysAvailability(date);
  getAllUserNames();
  $("#user-selected-bookings").empty();
}

function bookRoomHandler() {
  if ($("#user-header").hasClass('manager')) {
    bookRoomManager();
  } else {
    bookRoomCustomer();
  }
}

function deleteBookingHandler() {
  if (manager.user) {
    addUserDeleteBooking();
    addUserRoomBookingsToDelete();
  }
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

function addUserRoomBookings(user, id, appendLocation) {
  let bookings = user.getUserAllBookings(id);
  $(appendLocation).empty();
  bookings.forEach(booking => {
    $(appendLocation).append(`
    <section class="booking-section">
      <div class="availability-room-num">
      <p class="availability-room-p">Room ${booking.roomNumber}</p>
      </div>
      <div class="availability-room-info">
      <p>Booking Date: ${booking.date}</p>
      <p class="booking-id">Confirmation#: ${booking.id}</p>
      </div>
    </section>
    `);
  });
}

function addUserRoomBookingsToDelete() {
  let bookings = manager.getUserAllBookings(manager.user.id);
  $("#user-selected-bookings").empty();
  bookings.forEach(booking => {
    $("#user-selected-bookings").append(`
    <section class="booking-section">
      <div class="availability-room-num">
        <p class="availability-room-p">Room ${booking.roomNumber}</p>
      </div>
      <div class="availability-room-info">
        <p>Booking Date: ${booking.date}</p>
        <p class="booking-id">Confirmation#: ${booking.id}</p>
        <button type="button" class="user-info-button" id="user-booking-delete-button">Select</button>
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
    addAvailableRoomsCustomer(customer);
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

function addAvailableRoomsCustomer(user) {
  $("#customer-availability-container").empty();
  let date = $("#datepicker").val();
  let roomsAvailable = user.getRoomsAvailableDay(date);
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

function bookRoomManager() {
  let roomNumP = $("#customer-selection-container").children().children().children('p.availability-room-p')[0].innerText;
  let roomNum = Number(roomNumP.split(' ')[1]);
  let date = $("#datepicker").val();
  manager.postBooking(date, roomNum)
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
      bookingsData.bookings = data.bookings;
      manager.bookings = bookingsData.bookings;
      addUserRoomBookings(manager, manager.user.id, "#user-selected-bookings");
    })
  })
  .catch(err => {
    $("#customer-selection-container").html(`<p class="post-message">Booking Unsuccessful! ${err}</p>`);
    setTimeout(function() {$("#customer-selection-container").empty()}, 3000);
  });
}

function bookRoomCustomer() {
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
      bookingsData.bookings = data.bookings;
      customer.bookings = bookingsData.bookings;
      addUserRoomBookings(customer, id, "#customer-bookings");
      $("#dollars-spent").text(`$${customer.getUserTotalSpent(id)}`);
    })
  })
  .catch(err => {
    $("#customer-selection-container").html(`<p class="post-message">Booking Unsuccessful! ${err}</p>`);
    setTimeout(function() {$("#customer-selection-container").empty()}, 3000);
  });
}

$("body").on('click', "#delete-room-button", deleteBooking);

function deleteBooking() {
  // console.log($("#customer-selection-container").children().children().children('p.booking-id')[0].innerText)
  let roomNumP = $("#customer-selection-container").children().children().children('p.booking-id')[0].innerText;
  let roomNum = Number(roomNumP.split(' ')[1]);
}

function clearRoomSelected() {
  $("#customer-selection-container").empty();
}

function cancelRoomSelected() {
  $("#customer-availability-container").append($("#customer-selection-container").children());
}

$("body").on('click', "#cancel-room-button", cancelRoomSelectedToDelete);

function cancelRoomSelectedToDelete() {
  $("#customer-selection-container").children().children().next().append(`
    <button type="button" class="user-info-button" id="user-booking-delete-button">Select</button>`)
  $("#user-selected-bookings").append($("#customer-selection-container").children());
}

function displayRoomSelected() {
  if ($("#customer-selection-container").html().length === 0) {
    $("#customer-selection-container").append(this);
  }
}

function removeSelectUserInfo () {
  if (manager.user) {
    addUserRoomBookings(manager, manager.user.id, "#user-selected-bookings");
  }
  $("#user-selector-container").empty();
}

function getAllUserNames() {
  let userNames = manager.getAllUserNames();
  userNames.forEach(userName => {
    $("#user-names").append(`<option value="${userName}">`);
  })
}

function createUser(name) {
  let userInfo = manager.findUserInfo(name);
  let customer = new Customer(usersData, bookingsData, roomsData, userInfo.id);
  return customer
}

function addUserBookingsToDelete() {
  if ($("#customer-selection-container").html().length === 0) {
    $("#customer-selection-container").append($(this).parent().parent());
    $(this).remove();
  }
}

function userSearchHandler() {
  let userName = $("#name-selection").val();
  let customerSelected = createUser(userName);
  manager.getUserInfo(manager.users, customerSelected.user.id);
  $("#manager-section-user-name").text(customerSelected.user.name);
  addUserRoomBookings(manager, customerSelected.user.id, "#user-selected-bookings")
  $("#name-selection").val('');
}

function addUserDeleteBooking() {
  $("#user-selector-container").empty();
  $("#user-selector-container").append(`
    <article class="today-info-article" id="user-info-article">
      <button type="button" class="user-info-delete-button" id="user-info-delete-button">X</button>
      <div class="select-user-selection-container" id="customer-selection-container">
      </div>
      <button class="user-info-button" type="button" id="delete-room-button">DELETE</button>
      <button class="user-info-button" type="button" id="cancel-room-button">cancel</button>
    </article>
    `);
    $("#customer-selection-container").empty();
}

function addSelectedCustomerBooking() {
  if (manager.user) {
    addUserRoomBookings(manager, manager.user.id, "#user-selected-bookings");
    $("#user-selector-container").empty();
    $("#user-selector-container").append(`
      <article class="today-info-article" id="user-info-article">
        <div>
          <input class="user-select-date" id="datepicker" placeholder="Select Date" />
          <button type="button" class="user-book-delete-button" id="user-info-delete-button">X</button>
        </div>
        <div class="select-user-availability-container" id="customer-availability-container">
        </div>
        <div class="select-user-selection-container" id="customer-selection-container">
        </div>
        <button class="user-info-button" type="button" id="book-room-button">BOOK NOW</button>
        <button class="user-info-button" type="button" id="cancel-room-button">cancel</button>
      </article>`);
      addDatePicker();
  }
}

function addUserSelectedSpent(id) {
  if (manager.user) {
    addUserRoomBookings(manager, manager.user.id, "#user-selected-bookings");
    $("#user-selector-container").empty();
    $("#user-selector-container").append(`
      <article class="today-info-article" id="user-info-article">
        <button type="button" class="user-info-delete-button" id="user-info-delete-button">X</button>
        <h2 class="user-selected-spent-h2">Money Spent</h2>
        <p class="user-selected-spent-p">$${manager.getUserTotalSpent(manager.user.id)}</p>
      </article>
    `);
  }
}

function addTodayPercent() {
  if (manager.user) {
    addUserRoomBookings(manager, manager.user.id, "#user-selected-bookings");
  }
  $("#user-selector-container").empty();
  $("#user-selector-container").append(`
    <article class="today-info-article" id="today-percentage">
      <button type="button" class="user-info-delete-button" id="user-info-delete-button">X</button>
      <p class="manager-today-p">Percentage Booked</p>
      <p class="manager-today">${manager.getPercentageOccupancy(date)}%<p>
    </article>`);
}

function addTodayRevenue() {
  if (manager.user) {
    addUserRoomBookings(manager, manager.user.id, "#user-selected-bookings");
  }
  $("#user-selector-container").empty();
  $("#user-selector-container").append(`
    <article class="today-info-article" id="today-revenue">
      <button type="button" class="user-info-delete-button" id="user-info-delete-button">X</button>
      <p class="manager-today-p">Revenue</p>
      <p class="manager-today">$${manager.getRevenueToday(date)}<p>
    </article>`);
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
    <header class="user-page-header manager" id="user-header">
      <div class="manager-header-logo-container">
        <img class="user-silva-logo" src="./images/silva-logo.png" alt="Silva logo">
        <h1 class="manager-header-h1">Silva</h1>
      </div>
      <form class="manager-header-form">
        <input class="manager-user-search" list="user-names" id="name-selection" name="name-selection" placeholder="User Name Search" >
        <button type="button" class="user-search-button" id="user-search-button">Search</button>
      </form>
      <div class="manager-header-date-container">
        <h3 class="manager-header-date" id="manager-header-date">${formattedDate}</h3>
        <button type="button" class="user-header-logout" id="user-header-logout">Logout</button>
      </div>
    </header>
    <main class="user-page-main">
      <section class="manager-section">
        <article class="manager-section-article" id="manager-selected-user">
          <h2 class="manager-section-header" id="manager-section-user-name">User Name</h2>
          <div class="user-booking-container" id="user-selected-bookings">
          </div>
          <div class="user-info-button-container">
            <button type="button" class="user-info-button" id="user-amount-button">Customer Amount Spent</button>
            <button type="button" class="user-info-button" id="user-book-button">Make Customer Booking</button>
            <button type="button" class="user-info-button" id="user-delete-button">Delete Customer Booking</button>
          </div>
        </article>
      </section>
      <section class="manager-section" id="user-selector-container">
      </section>
      <section class="manager-section">
        <article class="manager-section-article">
          <h2 class="today-section-header">Current Availability</h2>
          <div class="today-booking-container" id="today-availability">
          </div>
          <div class="user-info-button-container">
            <button type="button" class="user-info-button" id="daily-revenue-button">Revenue</button>
            <button type="button" class="user-info-button" id="daily-percent-button">Percent Booked</button>
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
    <header class="user-page-header customer" id="user-header">
      <div class="manager-header-logo-container">
        <img class="user-silva-logo" src="./images/silva-logo.png" alt="Silva logo">
        <h1 class="manager-header-h1">Silva</h1>
      </div>
      <input class="customer-user-search" id="datepicker" placeholder="Select Date" />
      <div class="manager-header-date-container">
        <h3 class="manager-header-date" id="manager-header-date">${formattedDate}</h3>
        <button type="button" class="user-header-logout" id="user-header-logout">Logout</button>
      </div>
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
