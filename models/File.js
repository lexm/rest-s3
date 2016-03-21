module.exports = (mongoose, models) => {
  var Schema = mongoose.Schema;
  var fileSchema = new mongoose.Schema({
    fileName: String,
    fileUrl : String
  })
  var File = mongoose.model('File', fileSchema)
  models.File = File;
}
