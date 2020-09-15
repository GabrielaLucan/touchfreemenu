const config = require('../../config');

const AWS = require('aws-sdk');
AWS.config.update({ accessKeyId: config.aws.accessKey, secretAccessKey: config.aws.secretKey });

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
