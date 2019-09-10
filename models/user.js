const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {type:String, min:3, max: 15, required: true},
    password: {type:String, required: true},
    date_joined: {type:Date, default: Date.now, required: true},
    icon_url: {type:String},
    admin: {type: Boolean}
  }
)

UserSchema
.virtual('otherposts')
.get(function() {
  return '/search/' + this._id;
});

module.exports = mongoose.model('User',UserSchema);
