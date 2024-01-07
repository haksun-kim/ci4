/* jquery file upload custom */
$(function () {
    'use strict';
	var str = $("#rootPath").val();

	var url = '/library/common/fileupload.php';
	
		var uploadButton = $('<button/>')
				.addClass('btn btn-primary upload')
				.prop('disabled', true)
				.text('Processing...')
				.on('click', function () {
					var $this = $(this),
						data = $this.data();
					data.submit().always(function () {
						$this.remove();
					});
					return false;
				});
		var deleteButton = $('<button/>')
				.addClass('btn btn-primary deleteBtn')
				.text('Delete')
				.on('click', function () {
					var $this = $(this),data = $this.data();
					// show for add more files - David
					var $par = $(this).parent().parent().parent();
					/* $.ajax({
						url : url,
						type : 'DELETE',
						dataType : 'JSON',
						data : {'target':data.files[0].name},
						success : function(res){
							//alert(res);
						}
					}); */
					$par.find('.files').html('');
					$par.find('span.btn').show();
					$par.find('.progress-bar').css('width','0%');
					$par.find('canvas').remove();
					//$this.parent().remove();
					$this.parent().html('');
				});

	
	// Add library all element of jquery file upload 
	$('body').find('.JFU').each(function(){
				
		$(this).find('.newFileUpload').fileupload({
			url: url,
			//xhrFields: {withCredentials: true},
			dataType: 'json',
			autoUpload: true,
			//acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			acceptFileTypes: /(\.|\/)(png)$/i,
			maxFileSize: 2000000, // 2 MB
			// Enable image resizing, except for Android and Opera,
			// which actually support image resizing, but fail to
			// send Blob objects via XHR requests:
			//disableImageResize: /Android(?!.*Chrome)|Opera/
			//	.test(window.navigator.userAgent),
			
            imageMaxWidth: 2048,
            // The maximum height of resized images:
            imageMaxHeight: 1024,
            // Defines the image orientation (1-8) or takes the orientation
            // value from Exif data if set to true:
            imageOrientation: false,
            // Define if resized images should be cropped or only scaled:
            imageCrop: false,
            // Disable the resize image functionality by default:
            disableImageResize: true,
            // The maximum width of the preview images:
            previewMaxWidth: 80,
            // The maximum height of the preview images:
            previewMaxHeight: 80,
            // Defines the preview orientation (1-8) or takes the orientation
            // value from Exif data if set to true:
            previewOrientation: true,
            // Create the preview using the Exif data thumbnail:
            previewThumbnail: true,
            // Define if preview images should be cropped or only scaled:
            previewCrop: false,
            // Define if preview images should be resized as canvas elements:
            previewCanvas: false

		}).on('fileuploadadd', function (e, data) {
			data.context = $(this).parent().parent().find(".files").append($('<div/>'));
			$.each(data.files, function (index, file) {
				var node = $('<p/>')
						.append($('<span/>').text(file.name));
				if (!index) {
					node
						.append('<p />')
						.append(uploadButton.clone(true).data(data));
				}
				node.appendTo(data.context);
				node.append('&nbsp;');
				node.append(deleteButton.clone(true).data("url",file.url));
			});
			// hide for do not add more files - David
			$(this).parent().parent().find('span.btn').hide();
		}).on('fileuploadprocessalways', function (e, data) {
			var index = data.index,
				file = data.files[index],
				node = $(data.context.children()[index]);
			if (file.preview) {
				node
					.prepend('<br>')
					.prepend(file.preview);
				
			}
			if (file.error) {
				node
					.append('<br>')
					.append(file.error);
			}
			if (index + 1 === data.files.length) {
				data.context.find('.upload')
					.text('Upload')
					.prop('disabled', !!data.files.error);
			}
			
		}).on('fileuploadprogressall', function (e, data) {
			var progress = parseInt(data.loaded / data.total * 100, 10);
			$(this).parent().parent().find('.progress-bar').css(
				'width',
				progress + '%'
			);
		}).on('fileuploaddone', function (e, data) {
			$.each(data.result.files, function (index, file) {
				var link = $('<a>')
					.attr('target', '_blank')
					.prop('href', file.url);
				$(data.context.children()[index])
					.wrap(link);
				$('body').find("#voucher_image").val(file.url);
				$('body').find(".upload").remove();
			});
		}).on('fileuploadfail', function (e, data) {
			$.each(data.result.files, function (index, file) {
				var error = $('<span/>').text(file.error);
				$(data.context.children()[index])
					.append('<br>')
					.append(error);
			});
		}).bind('fileuploadsubmit', function (e, data) {
			// The example input, doesn't have to be part of the upload form:
			var input = $(this).parent().find(".newFileUpload");
			var rootpath = $("#rootPath").val();
			var folder = $("#folderName").val();
			
			data.formData = {example: input.attr('name'),"rootpath":rootpath,"folder":folder};
		}).prop('disabled', !$.support.fileInput)
			.parent().addClass($.support.fileInput ? undefined : 'disabled');
	});
});
