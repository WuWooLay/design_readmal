$(document).ready( function () {

    navigator.vibrate = navigator.vibrate ||
    navigator.webkitVibrate ||
    navigator.mozVibrate ||
    navigator.msVibrate;

    if(!navigator.vibrate) {
        alert('Your Web Browser not supported Vibrate');
    }
   

    // Normal List
    var buildNormalMessage = function (Message_Position, Message_Color, Message, Message_Teller) {
        var c = 'Message_'+ Message_Position;
        var word = '<li class="Message_Story '+ c +' zoomIn animated" data-color="" >';
        word += '<span class="Message" "> '+ Message +' </span>';
        word += '<span class="Name" style="color: '+ Message_Color +'"> '+ Message_Teller +' </span>';
        word += '</li>';

        return word;
    };

    // Color List
    var buildMessage = function (Message_Position, Message_Color, Message, Message_Teller) {
        var c = 'Message_'+ Message_Position;
        var word = '<li class="Message_Story '+ c +' zoomIn animated" data-color="" >';
        word += '<span class="Message" style="background-color: '+ Message_Color +'"> '+ Message +' </span>';
        word += '<span class="Name" style="color: '+ Message_Color +'"> '+ Message_Teller +' </span>';
        word += '</li>';

        return word;
    };

    // Think Box
    var buildThink = function (Message_Position, Message_Color, Message, Message_Teller) {
      
        var c = 'Message_'+ Message_Position;
        var word = '<li class="Message_Story '+ c +' zoomIn animated" data-color="" >';
        word += '<span class="Message"> '+ Message + '<span class="Name"> '+ Message_Teller +' </span>' +' </span>';
        word += '</li>';

        return word;
    };

    var messageArray = [
        {id: '1', name: 'ေကာင္းထက္', position: 'Left', type: 'message', message: 'ဘာမွမျဖစ္ေလာက္ပါဘူးကြာ', color: '#2cc34e', vibrate: true, vibrate_pattern: [800], background_change: true, background_image: '/images/story_card/Horror-City-Wallpaper-From-Game-800x600.jpg',  audio: false, audio_url: ''},
        {id: '2', name: 'ေက်ာ္ေက်ာ္', position: 'Left', type: 'message', message: 'ေအးဆုိ', color: '#0b93f6', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '', audio: true, audio_url: '/audio/ghost/ghost_bell.mp3'},
        {id: '3', name: 'ေက်ာ္ေက်ာ္', position: 'Left', type: 'message', message: 'ခုခ်ိန္ဆုိ ဘယ္သူ့မွလည္းရွိမွာမဟုတ္သးဘူး', color: '#0b93f6', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '', audio: false, audio_url: ''},
        {id: '4', name: 'ေက်ာ္ေက်ာ္', position: 'Left', type: 'message', message: 'ေတြ့လားသားေလး', color: '#0b93f6', vibrate: false, vibrate_pattern: '', background_change: true, background_image: '/images/story_card/ghost_door.jpg', audio: true, audio_url: '/audio/ghost/creaking_door.mp3'},
        {id: '5', name: 'ႏွင္းႏွင္း', position: 'Right', type: 'message', message: 'နင္တုိ့ကလည္းဟာ ဘာလုိ့ တံခါးအရင္မေခါက္တာလဲ..', color: '#dc3545', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '', audio: false, audio_url: ''},
        {id: '6', name: ' ', position: 'Center', type: 'think', message: 'ဒီလိုညၾကီးမွာ ကားပ်က္သြားတဲ့ သူငယ္ခ်င္းေတြအဖုိ့ေတာ့ ......  ', color: '#43a047', vibrate: true, vibrate_pattern: [800], background_change: false, background_image: '', audio: false, audio_url: ''},
        {id: '7', name: 'ေက်ာ္ေက်ာ္', position: 'Left', type: 'message', message: 'အာ့ေၾကာင့္ ငါေျပာသားပဲ မင္းတုိ့ အတြဲသာ ညဘက္ၾကီး ခရီးသြားဖို့ မေျပာခဲ့ရင္ ဘာမွျဖစ္မွာမဟုတ္ဘူး', color: '#0b93f6', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '', audio: false, audio_url: ''},
        {id: '8', name: 'ႏွင္းႏွင္း', position: 'Right', type: 'message', message: ' ရွဴး တုိးတုိးလုပ္ပါဟာ တျခားသူေတြ ၾကားရင္.. ငါေၾကာက္တယ္ဟ ', color: '#dc3545', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '', audio: false, audio_url: ''},
        {id: '9', name: 'ေကာင္းထက္', position: 'Left', type: 'message', message: 'ခ်စ္ရာ အရမ္းလည္း မေၾကာက္ပါနဲ ့ ကိုကိုရွိတယ္ အဟဲ...', color: '#2cc34e', vibrate: true, vibrate_pattern: [800], background_change: false, background_image: '',  audio: true, audio_url: '/audio/ghost/ghost_bell.mp3'},
    ];


    // Message Array Count
    var count = 0;
    // Done Or Not
    var storyDone = false;
    // Auto Play Or Not and Control For Tap 
    var autoPlay = false;
    // Set Interval 
    var autoPlayCount = "";
    // Audio Array
    var audioArray = [];
    // Audio Mute
    var isAudioMuted = false;

    var audioPlay = function (Audio_Url) {
        if(isAudioMuted) {
            return false;
        }
        audioArray.push(new Audio(Audio_Url));
        audioArray[audioArray.length - 1].play();
    };



    var workingFunc = function () {
        
        if(count >= messageArray.length) {
            alert('The End');
            return false;
        }

        console.dir(audioArray);

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
    };
    
    $('#Story_Model_Content_Message_Section').click( function () {
        if(!autoPlay) {
            workingFunc();
        }
    });

    $('#Story_Model_Content_Auto_Section_Content').click(function () {
        if(!autoPlay) {
            workingFunc();
        }
    });


    // Pause or Unpause 
    var play = function () {
        anime({
            targets: '#AutoPlay_1 ',
            points: [
                { value: '39.6,4.8 39.6,95.8 10.5,95.8 10.5,4.8' },
            ],
            easing: 'linear',
            duration: 400 ,
        });
        anime ({
            targets: '#AutoPlay_2 ',
            points: [
                { value: '89.6,96.3 90,4.7 60.2,4.5 60.5,96.3 ' },
            ],
            easing: 'linear',
            duration: 400 ,
        });

        $('.Pause_Unpause_Circle svg').css('transform', 'translate(0,0)');
        $('#Pause_Unpause_Circle').data('pause',true);
       
        autoPlay = true;

        // When Play
        if(count < messageArray.length) {
            workingFunc();

            autoPlayCount = setInterval( function () {
                if(count >= messageArray.length) {
                    clearInterval(autoPlayCount);
                    pause();
                }

                workingFunc();
            }, 3500);

        }

    }

    var pause = function () {
        anime({
            targets: '#AutoPlay_1 ',
            points: [
                { value: '48.3,26.5 48.3,74.1 10.5,95.8 10.5,4.8 ' },
            ],
            easing: 'linear',
            duration: 400 ,
        });
        anime ({
            targets: '#AutoPlay_2 ',
            points: [
                { value: '89.7,50.4 68.5,38.2 48.6,26.8 48.6,73.8 ' },
            ],
            easing: 'linear',
            duration: 400 ,
        });

        $('.Pause_Unpause_Circle svg').css('transform', 'translate(2px,0)');

        $('#Pause_Unpause_Circle').data('pause',false);

        // When Pause
        autoPlay = false;

        if(autoPlayCount) {
            clearInterval(autoPlayCount);
        }
    }

    // Pause or unpause Circle Click
    $('#Pause_Unpause_Circle').click( function () {
        var pause_or_not = $(this).data('pause');
        
        // console.log(pause_or_not);
        if(count >= messageArray.length) {
            return false;
        }

        if(!pause_or_not) {

            play();
            
        } else {
           
           pause();

        }

    }) ;


    // When CLick Volume Option 

    $('#Volume_Option').click( function () {

        isAudioMuted = !$(this).data('muted');
        $(this).data('muted', isAudioMuted);

        if(isAudioMuted) {

            var basicTimeline = anime.timeline();

            basicTimeline
            .add({
                targets: '#Volume_Option_Open',
                scale: 0,
                duration: 100,
                easing: 'easeInOutBack'
            })
            .add({
                targets: '#Volume_Option_Close line',
                scale: 1.1,
                duration: 300,
                easing: 'easeInOutBack'
            });

            audioArray.forEach( function (e) {
                e.muted = true;
            });
           
        } else {
            var basicTimeline = anime.timeline();

            basicTimeline
            .add({
                targets: '#Volume_Option_Close line',
                scale: 0,
                duration: 100,
                easing: 'easeInOutBack'
            })
            .add({
                targets: '#Volume_Option_Open ',
                scale: 1.1,
                duration: 300,
                easing: 'easeInOutBack'
            });

            audioArray.forEach( function (e) {
                e.muted = false;
            });
        }

        

    });


    // When Back Click 
    $('#Back').click( function () {

        pause();
        audioArray.forEach( function (e) {
            e.muted = true;
        });

        count = 0 ;
        audioArray = [];

        $('#Story_Model').addClass('d-none');

    });


    // No Need
    $('.More a').click( function () {
        $('#Loading_Container').removeClass('d-none');

        count = 0;
        audioArray = [];
        
        setTimeout(function () {
            $('#Loading_Container').addClass('d-none');
            $('#Story_Model').removeClass('d-none');

            $('#Message_Story_List > li').remove();
            
            workingFunc();
        }, 1500);

    });

    

    
    
});