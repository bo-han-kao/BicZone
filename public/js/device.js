$(document).ready(function () {

	var countInterval = setInterval(function interval() {
		$.ajax({
			url: "http://127.0.0.1:5000/v1/device",
			success: function (data) {
				console.log(data.payload)
				// console.log(state);
				let devicesdata = data.payload.devices
				let str = "";
				for (let i = 0; i < devicesdata.length; i++) {
					str += ' <div class="col mb-4">'
					str += ' <div class="card h-100">'
					str += ' <div class="row no-gutters">'
					str += ' <div class="col-md-4">'
					str += ' <img src="/images/bulb_PNG1251.png" class="card-img" alt="...">'
					str += ' </div>'
					str += ' <div class="col-md-8">'
					str += ' <div class="card-body" style="height:180px">'
					str += '<h5 class="card-title">' + devicesdata[i].name + '</h5>'
					str += '<div class="toggle-btn active">'
					str += '<input  data-id=' + devicesdata[i].device_id + ' type="checkbox" checked class="cb-value" />'
					str += '<span class="round-btn"></span>'
					str += '</div>'
					str += ' <div class="slidecontainer ">'
					str += '<input type="range" min="0" max="100" value="0" class="sliderlight" id="myRange"  data-id=' + devicesdata[i].device_id + '>'
					str += '<p>Value: <span class="demo" >0</span></p>'
					str += '</div>'
					str += '</div>'
					str += '</div>'
					str += '</div>'
					str += '</div>'
					str += '</div>'
				}
				$('#listdevice').html(str);
				// -------------------toggle-----------------------------------------
				
				$('.cb-value').off("click").on("click", function (e) {
					let mainParent = $(this).parent('.toggle-btn');
					if ($(mainParent).find('input.cb-value').is(':checked')) {
						$(mainParent).addClass('active');
					} else {
						$(mainParent).removeClass('active');
					}

					let _id = e.target.getAttribute("data-id");
					let state = $(this).is(':checked');
				
					// console.log(state);
					let device = {
						"device_id": _id,
						"state": {
							"onOff": state
						}
					}
					

					$.ajax({
						url: "http://127.0.0.1:5000/v1/device",
						data: JSON.stringify({ device: device }),
						type: "PATCH",
						dataType: "json",
						contentType: "application/json;charset=utf-8",
						success: function (returnData) {
							console.log(returnData);
						},
						error: function (xhr, ajaxOptions, thrownError) {
							console.log(xhr.status);
							console.log(thrownError);
						}
					})
				});

				// -------------------toggle------------------------------------------
				// ---------------inputRange--------------------------------------

				$('.sliderlight').off("mouseenter").on('mouseenter', function (e) {
					r = $(this);
					var p = r.val();
					r.on('click', function () {
						p = r.val();
						bg(p);
					});
					r.on('mousemove', function () {
						p = r.val();
						bg(p);
					});

					function bg(n) {
						r.css({
							'background-image': '-webkit-linear-gradient(left ,#f22 0%,#f22 ' + n + '%,#fff ' + n + '%, #fff 100%)'
						});
					}


					r.off("input").on('input', function (e) {
						let _id = e.target.getAttribute("data-id");
						console.log(_id);
						let a = $(this).val();
						var viewval = $(this).parent().find('span');
						var togglestate=$(this).parent().parent().find('.cd-value');
						let state=togglestate.is(':checked');
						console.log(state);
						viewval.html(a);
						let lightval = Math.round((a * 655.34) - 32767);
						console.log('lightval' + lightval)

						let device = {
							"device_id": _id,
							"state": {
								"level1": lightval
							}
						}
						$.ajax({
							url: "http://127.0.0.1:5000/v1/device",
							data: JSON.stringify({ device: device }),
							type: "PATCH",
							dataType: "json",
							contentType: "application/json;charset=utf-8",
							success: function (returnData) {
								console.log(returnData);
							},
							error: function (xhr, ajaxOptions, thrownError) {
								console.log(xhr.status);
								console.log(thrownError);
							}
						})
					})

				});

				// ---------------inputRange--------------------------------------

			},
			"error": function (error) {
				console.log(error);
			}



		})

		return interval;
	}(), 100000);






	// -------------------tabs------------------
	$(function () {
		var $li = $('ul.tab-title li');
		$($li.eq(0).addClass('active').find('a').attr('href')).siblings('.tab-inner').hide();

		$li.click(function () {
			$($(this).find('a').attr('href')).show().siblings('.tab-inner').hide();
			$(this).addClass('active').siblings('.active').removeClass('active');
		});
	});
	// -------------------tabs------------------




})

