// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
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
    errorMessageHandling('hidden');
    window.location = "./manager-deck.html";
  } else if (customerCheck.includes($("#username-input").val())
  && $("#password-input").val() === 'overlook2019') {
    errorMessageHandling('hidden');
    window.location = "./customer-deck.html";
  } else {
    errorMessageHandling('visible');
  }
}

function errorMessageHandling(show) {
    $("#username-input").val('');
    $("#password-input").val('');
    $("#error-message").css('visibility', show);
}

function makeCustomerNameCheck() {
  let customerOptions = [];
  for (var i = 1; i < 51; i++) {
    customerOptions.push(`customer${i}`);
  }
  return customerOptions;
}
