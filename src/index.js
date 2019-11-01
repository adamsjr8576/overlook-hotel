import $ from 'jquery';

import './css/base.scss';

import './images/turing-logo.png'
import './images/login-background.jpg'
import './images/silva-logo.png'

$("#login-submit-button").click(loginHandler);

function loginHandler() {
  let customerCheck = makeCustomerNameCheck();
  login(customerCheck);
}

function login(customerCheck) {
  if($("#username-input").val() === 'manager'
  && $("#password-input").val() === 'overlook2019') {
    displayManagerPage()
  } else if (customerCheck.includes($("#username-input").val())
  && $("#password-input").val() === 'overlook2019') {
    displayCustomerPage()
  } else {
    errorMessageHandling();
  }
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

function displayManagerPage() {
  $("body").html('');
  $("body").html(
    `<header>
      <h1>Hotel</h1>
      <img class="silva-logo" src="./images/silva-logo.png" alt="Silva logo">
      <h1>Silva</h1>
    </header>
    <main>
      <h1>manager</h1>
    </main>`
  )
}

function displayCustomerPage() {
  $("body").html('');
  $("body").html(
    `<header>
      <h1>Hotel</h1>
      <img class="silva-logo" src="./images/silva-logo.png" alt="Silva logo">
      <h1>Silva</h1>
    </header>
    <main>
      <h1>customer</h1>
    </main>`
  )
}
