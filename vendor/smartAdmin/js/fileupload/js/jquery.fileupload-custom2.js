/* jquery file upload custom - 2013-09-25 by David */
$(function () {
    'use strict';
	
	// set update, delete button - 2013-09-24 by David 
		//var url = 'extras/';
		//var url = '../extras/';
		var url = '../extras/index2.php';
		var uploadButton = $('<button/>')
				.addClass('btn btn-primary')
				.prop('disabled', true)
				.text('Processing...')
				.on('click', function () {
					var $this = $(this),
						data = $this.data();
					$this
						.off('click')
						.text('Abort')
						.on('click', function () {
							$this.remove();
							data.abort();
						});
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
					$par.find('span.btn').show();
					$par.find('.progress-bar').css('width','0%');
					//$this.parent().remove();
					$this.parent().html('');
				});

	// Add library all element of jquery file upload  - 2013-09-24 by David
	$('body').find('.OBJFU').each(function(){
		
		$(this).find('.newFileUpload').fileupload({
			url: url,
			//xhrFields: {withCredentials: true},
			dataType: 'json',
			autoUpload: false,
			//acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			acceptFileTypes: /(\.|\/)(png|mp3)$/i,
			maxFileSize: 20000000, // 2 MB
			// Enable image resizing, except for Android and Opera,
			// which actually support image resizing, but fail to
			// send Blob objects via XHR requests:
			//disableImageResize: /Android(?!.*Chrome)|Opera/
			//	.test(window.navigator.userAgent),
			previewMaxWidth: 60,
			previewMaxHeight: 60,
			previewCrop: true
		}).on('fileuploadadd', function (e, data) {
			data.context = $(this).parent().parent().find(".files").append($('<div/>'));
			var fname = $(this).parent().find(".newFileUpload").attr('fname');
			

			$.each(data.files, function (index, file) {
				var node = $('<p/>')
						.append($('<span/>').text(fname));
						//.append($('<span/>').text(file.name));
				if (!index) {
					node
						.append('<p />')
						.append(uploadButton.clone(true).data(data));
				}
				node.appendTo(data.context);
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
				data.context.find('button')
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
				$(data.context)
					.append(deleteButton.clone(true).data("url",file.url));
			});
			$(".idBox").hide();
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
			var fname = $(this).parent().find(".newFileUpload").attr('fname');
			var fdname = $("#foldername").val();
			data.formData = {example: input.attr('name'),"Fname":fname,"Fdname":fdname};
		}).prop('disabled', !$.support.fileInput)
			.parent().addClass($.support.fileInput ? undefined : 'disabled');
	});
//-----------------------------------------------------------------------------------------------------------------------------------------------	
	
	
	// set update, delete button - 2013-09-24 by David 
		//var url = 'extras/';
		//var url = '../extras/';
		var url2 = '../extras/index.php';
		var uploadButton2 = $('<button/>')
				.addClass('btn btn-primary')
				.prop('disabled', true)
				.text('Processing...')
				.on('click', function () {
					var $this = $(this),
						data = $this.data();
					$this
						.off('click')
						.text('Abort')
						.on('click', function () {
							$this.remove();
							data.abort();
						});
					data.submit().always(function () {
						$this.remove();
					});
					return false;
				});
		var deleteButton2 = $('<button/>')
				.addClass('btn btn-primary deleteBtn')
				.text('Delete')
				.on('click', function () {
					var $this = $(this),data = $this.data();
					// show for add more files - David
					var $par = $(this).parent().parent().parent();
					$par.find('span.btn').show();
					$par.find('.progress-bar').css('width','0%');
					//$this.parent().remove();
					$this.parent().html('');
				});
				
	// Add library all element of jquery file upload  - 2013-09-24 by David
	$('body').find('.JFU').each(function(){
		
		$(this).find('.newFileUpload').fileupload({
			url: url2,
			//xhrFields: {withCredentials: true},
			dataType: 'json',
			autoUpload: false,
			//acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
			acceptFileTypes: /(\.|\/)(png)$/i,
			maxFileSize: 2000000, // 2 MB
			// Enable image resizing, except for Android and Opera,
			// which actually support image resizing, but fail to
			// send Blob objects via XHR requests:
			//disableImageResize: /Android(?!.*Chrome)|Opera/
			//	.test(window.navigator.userAgent),
			previewMaxWidth: 120,
			previewMaxHeight: 120,
			previewCrop: true
		}).on('fileuploadadd', function (e, data) {
			data.context = $(this).parent().parent().find(".files").append($('<div/>'));
			var fname = $(this).parent().find(".newFileUpload").attr('fname');
			

			$.each(data.files, function (index, file) {
				var node = $('<p/>')
						.append($('<span/>').text(fname));
						//.append($('<span/>').text(file.name));
				if (!index) {
					node
						.append('<p />')
						.append(uploadButton2.clone(true).data(data));
				}
				node.appendTo(data.context);
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
				data.context.find('button')
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
				$(data.context)
					.append(deleteButton2.clone(true).data("url",file.url));
			});
			$(".idBox").hide();
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
			var sponsor_no = $("#SPONSOR_NO option:selected").val();			
			data.formData = {example: input.attr('name'),"SPONSOR_NO":sponsor_no};
		}).prop('disabled', !$.support.fileInput)
			.parent().addClass($.support.fileInput ? undefined : 'disabled');
	});
	
});