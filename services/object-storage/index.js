const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY });

module.exports.uploadPdf = async (localPath, restaurantSlug) =>
  new Promise((resolve, reject) => {
    const s3 = new AWS.S3();

    const key = `${restaurantSlug}/${new Date().toISOString()}.pdf`;
    const params = {
      Bucket: config.aws.bucketName,
      Key: key,
      Body: localPath,
      ACL: 'public-read',
      ContentType: 'application/pdf',
    };

    s3.upload(params, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
