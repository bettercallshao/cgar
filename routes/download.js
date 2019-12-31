const Recaptcha = require("express-recaptcha").RecaptchaV2;
const S3 = require("aws-sdk").S3;
const S3S = require("s3-streams");
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
      let download = S3S.ReadStream(
        new S3({
          accessKeyId: el.accessKeyId,
          secretAccessKey: el.secretAccessKey,
          endpoint: el.endpoint,
          s3ForcePathStyle: true,
          signatureVersion: "v4"
        }),
        {
          Bucket: el.bucket,
          Key: el.key
        }
      );
      download.pipe(res);
    }
  });
});

module.exports = router;
