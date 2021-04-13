const moment = require ('moment');

function messageObj (username, text) {
   return {
      username,
      text,
      time: moment().format('yyyy HH:MM:ss')
   };
}

module.exports = messageObj;