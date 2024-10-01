$(document).ready(function() {
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();

        if (scrollTop > 80) {
            $('.button-group').css({
                top: '0',
            });
        } else {
            $('.button-group').css({
                top: '80px',
            });
        }
    });
});
