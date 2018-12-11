$(document).ready( function () {

    $('.More a').click( function () {
        $('#Loading_Container').removeClass('d-none');

        setTimeout(function () {
            $('#Loading_Container').addClass('d-none');
        }, 3000);
    });

});