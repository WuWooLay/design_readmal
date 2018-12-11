$(document).ready( function () {

    $('.More a').click( function () {
        $('#Loading_Container').removeClass('d-none');

        setTimeout(function () {
            $('#Loading_Container').addClass('d-none');
            $('#Story_Model').removeClass('d-none');
        }, 2500);
    });


    $('#Back').click( function () {
        $('#Story_Model').addClass('d-none');
    });

});