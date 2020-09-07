$(document).ready(function () {
    var url = window.location;
    $('#menu-content li').find('.active').removeClass('active');
    $('#menu-content li a').each(function () {
        if (this.href == url) {
            $(this).parent().addClass('active');
        }
    });
});