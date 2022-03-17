const {user, doctor, hospital} = require('../data')

const check = (type) => {
  if(type === 'user') return user
  else if(type === 'doctor') return doctor
  else if(type === 'hospital') return hospital
}

module.exports = check;