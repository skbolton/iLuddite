
var mongoose= require('mongoose')
var router= express.Router();

var userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  currentBook:{type: String},
  bookQueue:{type: String},
  friendsList:{type: String},
  favoriteBooks:{type: Number}
});



var User = mongoose.model('User', userSchema);


module.exports= User;