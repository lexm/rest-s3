var bcrypt = require('bcrypt');


module.exports = (mongoose, models) => {
  var Schema = mongoose.Schema;
  var userSchema = new mongoose.Schema({
    name: String,
    password: String,
    files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}]
  });
  userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
  })

  var User = mongoose.model('User', userSchema);
  models.User = User;
}
