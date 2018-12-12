$(document).ready( function () {

    navigator.vibrate = navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate;

    if(!navigator.vibrate) {
        alert('Your Web Browser not supported Vibrate');
    }


    var buildMessage = function (Message_Position, Message_Color, Message, Message_Teller) {
        var c = 'Message_'+ Message_Position;
        var word = '<li class="Message_Story '+ c +' zoomIn animated" data-color="" >';
        word += '<span class="Message" style="background-color: '+ Message_Color +'"> '+ Message +' </span>';
        word += '<span class="Name" style="color: '+ Message_Color +'"> '+ Message_Teller +' </span>';
        word += '</li>';

        return word;
    };

    var messageArray = [
        {id: '1', name: 'ေကာင္းထက္', position: 'Left', type: 'message', message: 'ဘာမွမျဖစ္ေလာက္ပါဘူးကြာ', color: '#43a047', vibrate: true, vibrate_pattern: '800', background_change: false, background_image: ''},
        {id: '2', name: 'ေက်ာ္ေက်ာ္', position: 'Left', type: 'message', message: 'ေအးဆုိ', color: '#0b93f6', vibrate: false, vibrate_pattern: '', background_change: false, background_image: ''},
        {id: '3', name: 'ေက်ာ္ေက်ာ္', position: 'Left', type: 'message', message: 'ခုခ်ိန္ဆုိ ဘယ္သူ့မွလည္းရွိမွာမဟုတ္သးဘူး', color: '#0b93f6', vibrate: true, vibrate_pattern: '300,100,300,100,0,800,', background_change: true, background_image: '/images/wall_paper/Evil_With_Sword_in_Dark.jpg'},
        {id: '4', name: 'ေက်ာ္ေက်ာ္', position: 'Left', type: 'message', message: 'ေတြ့လားသားေလး', color: '#0b93f6', vibrate: false, vibrate_pattern: '', background_change: false, background_image: ''},
    ];

    var count = 0;

    
    $('#Story_Model_Content_Message_Section').click( function () {
       
        if(count >= messageArray.length) {
            alert('The End');
            return false;
        }

        if(messageArray[count].background_change) {
            $('#Story_Model').css('background-image','url('+messageArray[count].background_image+')');
        }

        var build = buildMessage(messageArray[count].position, messageArray[count].color, messageArray[count].message , messageArray[count].name  );
        $('#Message_Story_List').append(build);

        var messageContainer = document.getElementById('Message_Story_List');

        $('#Story_Model_Content_Message_Section').stop().animate(
        {
                scrollTop:$('#Story_Model_Content_Message_Section')[0].scrollHeight
        }, 500);

        if(navigator.vibrate) {
            navigator.vibrate([800]);
        }
       
        count++;
    });

    
    
});