// this is an example of improting data from JSON
//import orders from "../data/orders.json";
//import users from "../data/users.json";
import css from "../css/main.css";

export default (function() {
  const url = "http://localhost:9000/api/";
  let tableOrders;
  let orders;
  let users;
  const searchUserByID = function(id, users) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].id === id) {
        return users[i];
      }
    }
  };
  const splice = function(cardNumber) {
    // string to modify, start index, end index, and what to replace that selection with
  
    var head = cardNumber.substring(0, 2);
    var tail = cardNumber.substring(cardNumber.length - 4, cardNumber.length);
    let replacement = "";
    for (let i = 0; i < cardNumber.length - 6; i++) {
      replacement += "*";
    }
  
    var result = head + replacement + tail;
  
    return result;
  };
  const formatDate = function (inDate) {
    var date = new Date();
    date.setTime(inDate);
    var DD = date.getDate();
    var MM = date.getMonth() + 1; //January is 0!
    var YYYY = date.getFullYear();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    if (DD < 10) {
        DD = '0' + DD;
    } 
    if (MM < 10) {
        MM = '0' + MM;
    } 
    if (hh < 10) {
        hh = '0' + hh;
    } 
    if (mm < 10) {
        mm = '0' + mm;
    } 
    if (ss < 10) {
        ss = '0' + ss;
    } 
    return DD + '/' + MM + '/' + YYYY + ' ' + hh + ':' + mm + ':' + ss;
  };

  const addOrder = function(rows) {
    const newRow = tableOrders.insertRow();
    newRow.setAttribute('id', 'order_' + rows.id);
    const transactionId = newRow.insertCell();
    transactionId.innerHTML = rows.transaction_id;

    const userId = newRow.insertCell();
    userId.setAttribute('class', 'user_data');
    const user = searchUserByID(rows.user_id, users);
    const gender = user.gender === 'Male' ? 'Mr. ' : 'Ms. '
    userId.innerHTML = '<a href="#">' + gender + user.first_name + ' ' + user.last_name + '</a>';

    const orderDate = newRow.insertCell();
    let date = new Date();
    date.setTime(rows.created_at);
    orderDate.innerHTML = formatDate(rows.created_at);

    const orderAmount = newRow.insertCell();
    orderAmount.innerHTML = "$" + rows.total;

    const cardNumber = newRow.insertCell();
    cardNumber.innerHTML = splice(rows.card_number);

    const cardType = newRow.insertCell();
    cardType.innerHTML = rows.card_type;

    const location = newRow.insertCell();
    location.innerHTML = rows.order_country + ' (' + rows.order_ip + ')';
  };
  const loadOrders = function() {
    tableOrders = document.querySelector("#orders");
    orders.forEach(function(order) {
      addOrder(order);
    });
  };
  var request = new XMLHttpRequest();
  request.open("GET", url + "orders.json");
  request.responseType = "json";
  request.onload = function() {
    orders = request.response;
    var request2 = new XMLHttpRequest();
    request2.open("GET", url + "users.json");
    request2.responseType = "json";
    request2.onload = function() {
      users = request2.response;
      loadOrders();
    };
    request2.send();
  };
  request.send();
})();
