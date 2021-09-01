const mongoose = require ('mongoose');
let Schema = mongoose.Schema;

const dataSchema = new Schema({
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    selectStatus: '',
    password: ''
})

module.exports = mongoose.model('Users', dataSchema);
