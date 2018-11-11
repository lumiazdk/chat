function uploadImg(parametric) {
	var thisObj = {
		maxWidth: parametric.maxNum || 680,
		rate: parametric.rate || 0.8,
		callback: parametric.callback || function () {
			alert("回调函数未定义!")
		}
	}
	$("#uploadImg").on("change", function (e) {
		if ($(this).val() == "") {
			return;
		}
		var _this = this;
		var file = this.files[0];
		var reader0 = new FileReader();
		var compressBas;
		reader0.readAsDataURL(file); //调用自带方法进行转换
		reader0.onload = function (e) {
			$(".utilsCover").css("display", "block");
			var dataUrl = this.result;//得到base64url
			var fileType = file.type;
			var image = new Image();
			image.src = dataUrl;
			image.onload = function (e) {
				var width = image.width, height = image.height;
				var scale = width / height;
				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext('2d');
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				if (width - height >= 0) {
					width1 = thisObj.maxWidth;
					height1 = parseInt(width1 / scale);
					if (width >= width1) {
						canvas.width = width1;
						canvas.height = height1;
						ctx.drawImage(image, 0, 0, width1, height1);
					} else {
						canvas.width = width;
						canvas.height = height;
						ctx.drawImage(image, 0, 0, width, height);
					}
				} else {
					scale = height / width;
					height1 = thisObj.maxWidth;
					width1 = parseInt(height1 / scale);
					if (height >= height1) {
						canvas.width = width1;
						canvas.height = height1;
						ctx.drawImage(image, 0, 0, width1, height1);
					} else {
						canvas.width = width;
						canvas.height = height;
						ctx.drawImage(image, 0, 0, width, height);
					}
					
				}
				var cropStr = canvas.toDataURL("image/jpeg", thisObj.rate);
				thisObj.callback(cropStr);
			}
		}
	})
}