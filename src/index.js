import $ from 'jquery';

import './css/base.scss';

import './images/turing-logo.png'
import './images/login-background.jpg'
import './images/silva-logo.png'
import './images/user-page.png'

$("#login-submit-button").on('click', loginHandler);
$("#user-header-logout").on('click', logout);

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
