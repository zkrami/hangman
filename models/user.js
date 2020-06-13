
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        default: 'default'
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique : true , 
        dropDups : true 
    }

} );

UserSchema.methods = {
    verifyPassword : async function (password){ 
        return await bcrypt.compare(password , this.password); 
    }
}

UserSchema.pre('save', async function (next) {
    try {

        let user = this;
        user.password = await bcrypt.hash(user.password, 10);
        next();
    } catch (ex) {
        next(ex);
    }

});

module.exports = mongoose.model('user', UserSchema);