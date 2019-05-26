const server = '127.0.0.1:27017';
const database = '4x4';

module.exports = () => {
    const mongoose = require('mongoose').connect(`mongodb://${server}/${database}`)
       .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       });
       return mongoose
  }