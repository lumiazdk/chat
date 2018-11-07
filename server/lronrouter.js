import { Meteor } from "meteor/meteor";

Router.route("/upload", { where: "server" }).post(function() {
    let req = this.request;
    let res = this.response;
    res.writeHead(200, { "Content-Type": "text/html;  charset=utf-8" });
    let formidable = Meteor.npmRequire("formidable");
    let path = Meteor.npmRequire("path");

    let qiniu = Meteor.npmRequire("qiniu");
    let accessKey = "O-rXACtEjSudhKbP4H-aJaEH6-Wat4bnAHmnZ5df";
    let secretKey = "1ezSH3zqjlIJpt0zsMCyWveZN0YAA07aimyXpyIL";
    let bucket = "chat";
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let options = {
        scope: bucket
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    let config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone.Zone_z2;
    let localFile = "/Users/11265/aa.jpg";
    let formUploader = new qiniu.form_up.FormUploader(config);
    let putExtra = new qiniu.form_up.PutExtra();
    let key = "";
    let form = formidable.IncomingForm();
    // 文件上传
    form.parse(req, function(err, fields, files) {
        if (err) {
            console.log(err);
        }
        key = files.files.path.split(path.sep).pop();
        formUploader.putFile(
            uploadToken,
            key,
            files.files.path,
            putExtra,
            function(respErr, respBody, respInfo) {
                if (respErr) {
                    throw respErr;
                }
                if (respInfo.statusCode == 200) {
                    let data = {
                        code: 0,
                        data: respBody,
                        message: "上传成功"
                    };
                    res.end(JSON.stringify(data), "utf-8");
                } else {
                    console.log(respInfo.statusCode);
                    console.log(respBody);
                }
            }
        );
    });
});
