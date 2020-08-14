const moment = require('moment');

module.exports = (value) => {
  const dateObject = moment(value).locale('el');
  return `${dateObject.format('ll')}`
}