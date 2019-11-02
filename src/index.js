import $ from 'jquery';

import './css/base.scss';

import './images/turing-logo.png'
import './images/login-background.jpg'
import './images/silva-logo.png'
import './images/user-page.png'

let usersData;
let roomsData;
let bookingsData;
let users;
let rooms;
let bookings;

$("#login-submit-button").on('click', loginHandler);
$("#user-header-logout").on('click', logout);
getDataOnUserPageLoad();

function getDataOnUserPageLoad() {
  if($(".user-page-header").length > 0) {
    usersData = getData('users/users', 'users');
    roomsData = getData('rooms/rooms', 'rooms');
    bookingsData = getData('bookings/bookings', 'bookings');
    Promise.all([usersData, roomsData, bookingsData]).then((promise) => {
      usersData = promise[0];
      roomsData = promise[1];
      bookingsData = promise[2];
    }).then(data => {

    });
  }
}

function getData(type, dataName) {
  const root = 'https://fe-apps.herokuapp.com/api/v1/overlook/1904/';
  const url = `${root}${type}`;
  const promise = fetch(url)
  .then(response => response.json())
  return promise;
}

function loginHandler() {
  let customerCheck = makeCustomerNameCheck();
  login(customerCheck);
}

function login(customerCheck) {
  if($("#username-input").val() === 'manager'
  && $("#password-input").val() === 'overlook2019') {
    window.location = "./manager-page.html";
  } else if (customerCheck.includes($("#username-input").val())
  && $("#password-input").val() === 'overlook2019') {
    window.location = "./customer-page.html";
  } else {
    errorMessageHandling();
  }
}

function logout() {
  window.location = "./index.html";
}

function errorMessageHandling() {
    $("#username-input").val('');
    $("#password-input").val('');
    $("#error-message").css('visibility', 'visible');
}

function makeCustomerNameCheck() {
  let customerOptions = [];
  for (var i = 1; i < 51; i++) {
    customerOptions.push(`customer${i}`);
  }
  return customerOptions;
}
