module.exports = (mongoose, models) => {
  var Schema = mongoose.Schema;
  var userSchema = new mongoose.Schema({
    name: String
  });
  var User = mongoose.model('User', userSchema);
  models.User = User;
}
