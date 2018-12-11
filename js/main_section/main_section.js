$(document).ready( function () {

    $('.More').click( function () {
        $('#Loading_Container').removeClass('d-none');

        setTimeout(function () {
            $('#Loading_Container').addClass('d-none');
        }, 2000);
    });

});