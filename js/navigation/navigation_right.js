$(document).ready( function () {

    // When Open
    $('#Navigation_Right_Opener').click( function () {
        
        var cssProperties = anime({
            targets: '#Navigation_Right',
            left: '0',
            easing: 'easeInOutQuad',
            duration: 500
        });

    });

    // When Close
    $('#Navigation_Right_Closer').click( function () {
        var cssProperties = anime({
            targets: '#Navigation_Right',
            left: '100%',
            easing: 'easeInOutQuad',
            duration: 500
        });
    });

    
});
