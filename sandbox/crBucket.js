var AWS = require('aws-sdk');

AWS.config.update({region: 'us-west-2'});

var s3 = new AWS.S3();

var bName = 'lex-bucket-test';
var kName = 'new-test-key';


var params = {Bucket: 'lex-bucket-test', Key: 'new-test-key', Body: 'hello world'};
s3.upload(params, function(err, data) {
  if(err) {
    console.log('2');
    console.log(err);
  }
  else {
    console.log('Successfully loaded data to ' + bName + '/' + kName);
  }
});

console.log(AWS.config);
// s3.createBucket({Bucket: bName}, function(err) {
//   if(err) {
//     console.log('1');
//     console.log(err);
//   }
// });
