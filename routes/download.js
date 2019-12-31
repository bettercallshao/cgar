const Recaptcha = require("express-recaptcha").RecaptchaV2;
const S3 = require("aws-sdk").S3;
const router = require("express").Router();
const config = require("../config");

const recaptcha = new Recaptcha(
  config.RECAPTCHA_SITE_KEY,
  config.RECAPTCHA_SECRET_KEY
);

config.downloads.forEach(el => {
  router.get(`/${el.id}`, recaptcha.middleware.render, (req, res) => {
    res.render("recaptcha", { captcha: res.recaptcha });
  });
  router.post(`/${el.id}`, recaptcha.middleware.verify, (req, res) => {
    if (req.recaptcha.error) {
      res.locals.message = "try again";
      res.locals.error = {};
      res.status(400);
      res.render("error");
    } else {
      res.attachment(el.key);
      let s3 = new S3({
        accessKeyId: el.accessKeyId,
        secretAccessKey: el.secretAccessKey,
        endpoint: el.endpoint,
        s3ForcePathStyle: true,
        signatureVersion: "v4"
      });
      s3.getObject({
        Bucket: el.bucket,
        Key: el.key
      })
        .createReadStream()
        .pipe(res);
    }
  });
});

module.exports = router;
