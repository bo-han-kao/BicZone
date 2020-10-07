$(document).ready(function () {








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
	// -------------------toggle------------------
	$("#provide-muffins").click(function () {
		checkis = $(this).is(":checked");
		// var checkis = $(this).val();
		console.log(checkis);
	});
	// console.log(checkis);
	// -------------------toggle------------------



})

