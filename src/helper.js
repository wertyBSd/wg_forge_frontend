export default (function() {
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

  const formatDate = function(inDate) {
    var date = new Date();
    date.setTime(inDate);
    var DD = date.getDate();
    var MM = date.getMonth() + 1; //January is 0!
    var YYYY = date.getFullYear();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    if (DD < 10) {
      DD = "0" + DD;
    }
    if (MM < 10) {
      MM = "0" + MM;
    }
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (ss < 10) {
      ss = "0" + ss;
    }
    return DD + "/" + MM + "/" + YYYY + " " + hh + ":" + mm + ":" + ss;
  };
})();
