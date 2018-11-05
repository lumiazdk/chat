import { Meteor } from "meteor/meteor";
Router.route('/', function () {
});
Router.route('/upload', function () {
    var req = this.request;
    var res = this.response;
    console.log(req)
    var formidable = Meteor.npmRequire('formidable')
    var path = Meteor.npmRequire('path')

    var qiniu = Meteor.npmRequire('qiniu')
    var accessKey = 'O-rXACtEjSudhKbP4H-aJaEH6-Wat4bnAHmnZ5df';
    var secretKey = '1ezSH3zqjlIJpt0zsMCyWveZN0YAA07aimyXpyIL';
    var bucket = 'chat'
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var options = {
        scope: bucket,
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);
    var config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z2;
    var localFile = "/Users/11265/aa.jpg";
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    var key = '';
    var form = formidable.IncomingForm();
    // 文件上传
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log(err);
        }
        key = files.files.path.split(path.sep).pop();
        formUploader.putFile(uploadToken, key, files.files.path, putExtra, function (respErr,
            respBody, respInfo) {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode == 200) {
                console.log(respBody);
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
            }
        })
    })
    res.end();
}, { where: 'server' });
