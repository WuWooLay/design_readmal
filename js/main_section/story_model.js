$(document).ready( function () {

    navigator.vibrate = navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate;

    if(!navigator.vibrate) {
        alert('Your Web Browser not supported Vibrate');
    }

    var audioPlay = function (Audio_Url) {
        var audio = new Audio(Audio_Url);
        audio.play();
    };

    var buildNormalMessage = function (Message_Position, Message_Color, Message, Message_Teller) {
        var c = 'Message_'+ Message_Position;
        var word = '<li class="Message_Story '+ c +' zoomIn animated" data-color="" >';
        word += '<span class="Message" "> '+ Message +' </span>';
        word += '<span class="Name" style="color: '+ Message_Color +'"> '+ Message_Teller +' </span>';
        word += '</li>';

        return word;
    };



    var buildMessage = function (Message_Position, Message_Color, Message, Message_Teller) {
        var c = 'Message_'+ Message_Position;
        var word = '<li class="Message_Story '+ c +' zoomIn animated" data-color="" >';
        word += '<span class="Message" style="background-color: '+ Message_Color +'"> '+ Message +' </span>';
        word += '<span class="Name" style="color: '+ Message_Color +'"> '+ Message_Teller +' </span>';
        word += '</li>';

        return word;
    };

    var buildThink = function (Message_Position, Message_Color, Message, Message_Teller) {
      
        var c = 'Message_'+ Message_Position;
        var word = '<li class="Message_Story '+ c +' zoomIn animated" data-color="" >';
        word += '<span class="Message"> '+ Message + '<span class="Name"> '+ Message_Teller +' </span>' +' </span>';
        word += '</li>';

        return word;
    };

    var messageArray = [
        {id: '1', name: 'ေကာင္းထက္', position: 'Left', type: 'message', message: 'ဘာမွမျဖစ္ေလာက္ပါဘူးကြာ', color: '#2cc34e', vibrate: true, vibrate_pattern: [800], background_change: false, background_image: '',  audio: true, audio_url: '/audio/ghost/ghost_bell.mp3'},
        {id: '2', name: 'ေက်ာ္ေက်ာ္', position: 'Left', type: 'message', message: 'ေအးဆုိ', color: '#0b93f6', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '', audio: false, audio_url: ''},
        {id: '3', name: 'ေက်ာ္ေက်ာ္', position: 'Left', type: 'message', message: 'ခုခ်ိန္ဆုိ ဘယ္သူ့မွလည္းရွိမွာမဟုတ္သးဘူး', color: '#0b93f6', vibrate: true, vibrate_pattern: [500,200,500,800,500,200,500], background_change: false, background_image: '', audio: false, audio_url: ''},
        {id: '4', name: 'ေက်ာ္ေက်ာ္', position: 'Left', type: 'message', message: 'ေတြ့လားသားေလး', color: '#0b93f6', vibrate: false, vibrate_pattern: '', background_change: true, background_image: '/images/story_card/ghost_door.jpg', audio: true, audio_url: '/audio/ghost/creaking_door.mp3'},
        {id: '5', name: 'ႏွင္းႏွင္း', position: 'Right', type: 'message', message: 'နင္တုိ့ကလည္းဟာ ဘာလုိ့ တံခါးအရင္မေခါက္တာလဲ..', color: '#dc3545', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '', audio: false, audio_url: ''},
        {id: '6', name: ' ', position: 'Center', type: 'think', message: 'ဒီလိုညၾကီးမွာ ကားပ်က္သြားတဲ့ သူငယ္ခ်င္းေတြအဖုိ့ေတာ့ ......  ', color: '#43a047', vibrate: true, vibrate_pattern: [800], background_change: false, background_image: '', audio: false, audio_url: ''},
        {id: '7', name: 'ေက်ာ္ေက်ာ္', position: 'Left', type: 'message', message: 'အာ့ေၾကာင့္ ငါေျပာသားပဲ မင္းတုိ့ အတြဲသာ ညဘက္ၾကီး ခရီးသြားဖို့ မေျပာခဲ့ရင္ ဘာမွျဖစ္မွာမဟုတ္ဘူး', color: '#0b93f6', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '', audio: false, audio_url: ''},
        {id: '8', name: 'ႏွင္းႏွင္း', position: 'Right', type: 'message', message: ' ရွဴး တုိးတုိးလုပ္ပါဟာ တျခားသူေတြ ၾကားရင္.. ငါေၾကာက္တယ္ဟ ', color: '#dc3545', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '', audio: false, audio_url: ''},
    ];

    var audio_list = [

    ];

    var count = 0;

    console.log(messageArray);
    
    $('#Story_Model_Content_Message_Section').click( function () {
       
        if(count >= messageArray.length) {
            alert('The End');
            return false;
        }

        var build = '';


        if(messageArray[count].audio) {
            audioPlay(messageArray[count].audio_url);
        }

        
        if(messageArray[count].type == 'message') {
            build = buildMessage(messageArray[count].position, messageArray[count].color, messageArray[count].message , messageArray[count].name  );
        } else if (messageArray[count].type == 'think') {
            build = buildThink(messageArray[count].position, messageArray[count].color, messageArray[count].message , messageArray[count].name  );
        } else {
            alert('The Error');
            return false;
        }
        $('#Message_Story_List').append(build);



        $('#Story_Model_Content_Message_Section').stop().animate(
        {
                scrollTop:$('#Story_Model_Content_Message_Section')[0].scrollHeight
        }, 500);

        
        if(messageArray[count].background_change) {
            $('#Story_Model').css('background-image','url('+messageArray[count].background_image+')');
        }

        if(navigator.vibrate && messageArray[count].vibrate) {
            navigator.vibrate(messageArray[count].vibrate_pattern);
        }
       
        count++;
    });


    // No Need

    $('.More a').click( function () {
        $('#Loading_Container').removeClass('d-none');

        count = 0;

        setTimeout(function () {
            $('#Loading_Container').addClass('d-none');
            $('#Story_Model').removeClass('d-none');

            $('#Message_Story_List > li').remove();

            if(messageArray[count].audio) {
                audioPlay(messageArray[count].audio_url);
            }

            if(messageArray[count].type == 'message') {
                build = buildMessage(messageArray[count].position, messageArray[count].color, messageArray[count].message , messageArray[count].name  );
            } else if (messageArray[count].type == 'think') {
                build = buildThink(messageArray[count].position, messageArray[count].color, messageArray[count].message , messageArray[count].name  );
            } else {
                alert('The Error');
                return false;
            }
            
            $('#Message_Story_List').append(build);
            count++;
        }, 1500);
    });
    
    
});