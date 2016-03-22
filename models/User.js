module.exports = (mongoose, models) => {
  var userSchema = new mongoose.Schema({
    name: String,
    files: [{type: mongoose.Schema.Types.ObjectId, ref: 'File'}]
  });
  var User = mongoose.model('User', userSchema);
  models.User = User;
};
