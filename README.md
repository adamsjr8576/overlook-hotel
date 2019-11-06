# Hotel Silva - Turing Mod 2 Solo Final Project

## Abstract

The overarching goal of this project is to create a hotel management tool for both customers and hotel staff to manage bookings and total spent/revenue. The general set up of the site is to have both manager and customer arrive at the same landing page that contains a username and password login. Based on their login info, they will either be taking to the customer page or the manager page, which contains the interactions and functionality pertinent to the user.

 - A customer on login is shown their total bookings (in chronological order), past and present, along with the total amount spent. They are prompted to select a date and once selected the rooms available for that date are displayed in. They have the option to filter the rooms available by the Room Type.  they are then able to select only a single room and then prompted to proceed with booking or cancel. Once booked their total bookings and dollars spent are updated.

  - A Manager on login is shown todays availability, percent booked and revenue. The manager has the option to select any of the users and on selection is shown their bookings across all time. The manager then has access to see their total spent, making a new booking for that customer for a chosen date, and deleting a booking for that customer. Anytime a booking is made or deleted the user total bookings and dollars spent is updated. both users have the ability to logout and be taken back to login screen.


## Set Up

### Clone Down & Run Locally:

1. Fork repo and clone down or just clone down
2. cd into directory and run ```npm install``` to install library dependencies
3. In terminal run ```npm run start``` to create locally hosted served to run app
4. You will see a bunch of code - find `http://localhost:8080/` and copy into your web browser
5. Manager Login: username: manager password: overlook2019
6. Customer Login: username customer[1-50] password: overlook2019

## Goals

 - Use OOP to drive the design of the application and the code
 - Work with an API to send, receive and delete data
 - Solidify the code review process via GH PR reviews
 - Create a robust test suite that thoroughly tests all functionality of a client-side application (using spies)
 - Implement the use of SCSS.
 - implement accurate use cases for inheritance in class structure
 - Solidify JQuery knowledge and implementation
 - Creating a fully accessible site

## Overview of Technologies

 - HTML5 - CSS3 - SASS - JavaScript - JQuery - Webpack - Hotel API

## UI/UX Flow

Manager:
![Manager workflow](/src/images/manager.gif)

---

Customer:
![Customer workflow](/src/images/customer.gif)



If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
