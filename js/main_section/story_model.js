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
        var word = '<li class="Message_Story Color_Message '+ c +' zoomIn animated" data-color="'+Message_Color+'" >';
        word += '<span class="Message" "> '+ Message +' </span>';
        word += '<span class="Name" style="color: '+ Message_Color +'"> '+ Message_Teller +' </span>';
        word += '</li>';

        return word;
    };

    // Color List
    var buildMessage = function (Message_Position, Message_Color, Message, Message_Teller) {
        var c = 'Message_'+ Message_Position;
        var word = '<li class="Message_Story Color_Message '+ c +' zoomIn animated" data-color="'+Message_Color+'" >';
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

    // {id: '1', name: 'ေကာင္းထက္', position: 'Left', type: 'message', message: 'ဘာမွမျဖစ္ေလာက္ပါဘူးကြာ', color: '#2cc34e', vibrate: true, vibrate_pattern: [800], background_change: true, background_image: '/images/story_card/Horror-City-Wallpaper-From-Game-800x600.jpg',  audio: false, audio_url: ''},
    var messageArray = [
        {id: '1', name: 'ေသာ္တာ', position: 'Left', type: 'message', message: 'အေဖဘယ္မွာလဲ', color: '#ff5757', vibrate: true, vibrate_pattern: [800], background_change: true, background_image: '/images/bg_images/ghost/house/house_1.jpg',  audio: true, audio_url: '/audio/ghost/phone_ring/pr_1.mp3'},
        {id: '2', name: 'အေမ', position: 'Right', type: 'message', message: 'သမီးက အခုဘယ္မွာမုိ့လုိ့လဲ', color: '#0097ce', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '',  audio: false, audio_url: ''},
        {id: '3', name: 'ေသာ္တာ', position: 'Left', type: 'message', message: 'သမီးတုိ့ အရင္ေနခဲ့တယ့္ အိမ္ကိုေရာက္ေနတာ', color: '#ff5757', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '',  audio: false, audio_url: ''},
        {id: '4', name: 'အေမ', position: 'Right', type: 'message', message: 'သမီးက ဘာလုိ့အဲ့ကို ေရာက္ေနတာလဲ ?', color: '#0097ce', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '',  audio: false, audio_url: ''},
        {id: '5', name: 'ေသာ္တာ', position: 'Left', type: 'message', message: 'သမီးမွာ အရင္အိမ္ေဟာင္းက ေသာ့ရွိေသးတယ္ေလ', color: '#ff5757', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '',  audio: false, audio_url: ''},
        {id: '6', name: 'အေမ', position: 'Right', type: 'message', message: 'အဲ့အိမ္မွာ ဘာသြားလုပ္တာလဲ ?', color: '#0097ce', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '',  audio: false, audio_url: ''},
        {id: '7', name: 'ေသာ္တာ', position: 'Left', type: 'message', message: 'ေမေမ ဘာလုိ့ ဒီပါတ္၀န္းက်င္မွာ အရင္ကထက္ရွဳပ္ပြေနတာလဲ', color: '#ff5757', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '',  audio: false, audio_url: ''},
        {id: '8', name: 'အေမ', position: 'Right', type: 'message', message: 'နင္အခု ခ်က္ခ်င္း အဲ့အိမ္ကေန ထြက္ခဲ့ေတာ့...', color: '#0097ce', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '',  audio: false, audio_url: ''},
        {id: '9', name: 'ေသာ္တာ', position: 'Left', type: 'message', message: 'ခဏေလး သမီးအိမ္ထဲ၀င္ၾကည့္လိုက္ဦးမယ္ ..။', color: '#ff5757', vibrate: false, vibrate_pattern: '', background_change: true, background_image: '/images/bg_images/ghost/door/door_1.jpg', audio: true, audio_url: '/audio/ghost/door/door_1.mp3'},
        {id: '10', name: 'ေသာ္တာ', position: 'Left', type: 'message', message: 'အိမ္ထဲမွာ ေမွာင္မဲေနတာပဲ မီးေတြပ်က္ေနတာလား မသိဘူး....', color: '#ff5757', vibrate: true, vibrate_pattern: [800], background_change: false, background_image: '', audio: true, audio_url: '/audio/ghost/female_scary/female_scary_low_1.mp3'},
        {id: '11', name: 'အေမ', position: 'Right', type: 'message', message: 'နင္အခု ခ်က္ခ်င္း အဲ့အိမ္ကေန ထြက္ခဲ့ေတာ့...', color: '#0097ce', vibrate: false, vibrate_pattern: '', background_change: false, background_image: '',  audio: false, audio_url: ''},
        {id: '12', name: 'ေသာ္တာ', position: 'Left', type: 'message', message: 'ခဏေလး အေမ အေရွ့မွာဘာေတြလဲမသိဘူး', color: '#ff5757', vibrate: true, vibrate_pattern: [800], background_change: true, background_image: '/images/bg_images/ghost/bats/bats_1.jpg', audio: true, audio_url: '/audio/ghost/bats_sound/bats_sound_1.mp3'},
        {id: '13', name: 'ေသာ္တာ', position: 'Center', type: 'think', message: 'ဘယ္ကဘယ္လို လင္းႏုိ ့ ေတြေရာက္လာတာလဲမသိဘူး..... ငါစိတ္ထဲတစ္မ်ိဳးပဲ', color: '#ff5757', vibrate: true, vibrate_pattern: [800], background_change: true, background_image: '/images/bg_images/ghost/bats/bats_1.jpg', audio: true, audio_url: '/audio/ghost/bats_sound/bats_sound_1.mp3'},
    ];

    var audioInitialArray = [
        {id: 1, url: "/audio/ghost/phone_ring/pr_1.mp3"},
        {id: 2, url: "/audio/ghost/female_scary/female_scary_low_1.mp3"},
        {id: 3, url: "/audio/ghost/bats_sound/bats_sound_1.mp3"},
        {id: 4, url: "/audio/ghost/door/door_1.mp3"},
    ]; 


    var makeAudio = function (url) {
        this.status = false;
        this.url = url;
        this.audio = new Audio(url);
    };


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
    // Vibrate
    var isOffVibrate = false;
    // Night is?
    var isNightModeCheck = false;
    // ThemeSound
    var themeSound = "/audio/ghost/theme/theme_1.mp3";
    var makeThemeSound = '';
    

    var audioPlay = function (Audio_Url) {
        if(isAudioMuted) {
            return false;
        }

        
        audioArray.map(function(v,k) {
            if(v.url == Audio_Url) {
                v.audio.play();
            }
        });

        
        // audioArray.push(new Audio(Audio_Url));
        // audioArray[audioArray.length - 1].play();
        
    };



    var workingFunc = function () {
        
        if(count >= messageArray.length) {
            alert('The End');
            return false;
        }

        if(count == 1) {
            console.log(makeThemeSound);
            makeThemeSound.audio.loop = true;
            makeThemeSound.audio.play();
        }
        

        // console.dir(audioArray);
        var build = '';

        
        if(messageArray[count].type == 'message') {
            if(isNightModeCheck) {
                build = buildNormalMessage(messageArray[count].position, messageArray[count].color, messageArray[count].message , messageArray[count].name  );
            } else {
                build = buildMessage(messageArray[count].position, messageArray[count].color, messageArray[count].message , messageArray[count].name  );
            }
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

        if(navigator.vibrate && messageArray[count].vibrate && !isOffVibrate) {
            navigator.vibrate(messageArray[count].vibrate_pattern);
        }

        if(messageArray[count].audio) {
                audioPlay(messageArray[count].audio_url);
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

            var audio_icon_timeline = anime.timeline();

            audio_icon_timeline
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

            audioArray.map(function(v,k) {
                     console.log(v);
                     v.audio.muted = true;
            });

            makeThemeSound.audio.muted = true;
           
           
        } else {
            var audio_icon_timeline = anime.timeline();

            audio_icon_timeline
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


            audioArray.map(function(v,k) {
                     console.log(v);
                     v.audio.muted = false;
            });

            makeThemeSound.audio.muted = false;
            
        }

        

    });

    // When Click Vibrate Option
    $('#Vibrate_Option').click( function () {
        var vibrate_condition =  $(this).data('muted');
        $(this).data('muted', !vibrate_condition);

        if(!vibrate_condition) {
            // console.log('Pate');
            isOffVibrate = true;

            var vibrate_icon_timeline = anime.timeline();

            vibrate_icon_timeline
              .add({
                  targets: '#Vibrate_Option_Close polyline',
                  scale: 0,
                  duration: 300,
                  easing: 'easeInOutBack'
              })
              .add({
                  targets: '#Vibrate_Option_Open',
                  rotate: 18,
                  duration: 100,
                  easing: 'linear'
              });
            
        } else {
            // console.log('Phwint');
            isOffVibrate = false;

            var vibrate_icon_timeline = anime.timeline();

            vibrate_icon_timeline
              .add({
                  targets: '#Vibrate_Option_Open',
                  rotate: 0,
                  duration: 100,
                  easing: 'linear'
              })
              .add({
                  targets: '#Vibrate_Option_Close polyline',
                  scale: 1.2,
                  duration: 300,
                  easing: 'easeInOutBack'
              });

        }


    });

    
    // When Night Mode Is On
    $('#Night_Mode').click( function () {
               
        var isNightMode = $(this).data('muted');
        $(this).data('muted', !isNightMode);
        if(!isNightMode) {
            isNightModeCheck = true;
            var nigthMode =  anime.timeline();
                nigthMode
                .add({
                    targets: '#San_x5F_Tips',
                    scale: 0,
                    duration: 200,
                    easing: 'easeInOutBack'
                })
                .add({
                    targets: '#Earth_x5F_Moon',
                    d: [
                        { value: 'M42.6,51.6c6,16.2,34.5,21.6,18.3,27.7s-34.2-2.2-40.2-18.4s2.2-34.2,18.4-40.2S36.6,35.5,42.6,51.6z' },
                    ],
                    easing: 'linear',
                    duration: 200 ,
                }).add({
                    targets: '#Star_x5f_Tips',
                    scale: 1,
                    duration: 300,
                    easing: 'easeInOutBack'
                });

                $.each($('.Color_Message'), function (k,v) {
                   $(v)[0].children[0].style="";
                });

        } else {
            isNightModeCheck = !isNightModeCheck;
            var nigthMode =  anime.timeline();
                nigthMode
                .add({
                    targets: '#Star_x5f_Tips',
                    scale: 0,
                    duration: 200,
                    easing: 'easeInOutBack'
                })
                .add({
                    targets: '#Earth_x5F_Moon',
                    d: [
                        { value: 'M81.1,39.4c6,16.2-4,33.9-20.2,39.9s-34.2-2.2-40.2-18.4s2.2-34.2,18.4-40.2S75.1,23.2,81.1,39.4z' },
                    ],
                    easing: 'linear',
                    duration: 200 ,
                }).add({
                    targets: '#San_x5F_Tips',
                    scale: 1,
                    duration: 300,
                    easing: 'easeInOutBack'
                });

                $.each($('.Color_Message'), function (k,v) {
                    $(v)[0].children[0].style.backgroundColor = $(v).data('color');
                });
        }


    });


    // When Back Click 
    $('#Back').click( function () {

        pause();

        audioArray.map(function(v,k) {
            v.audio.muted = true;
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

            makeThemeSound = new makeAudio(themeSound);
            makeThemeSound.audio.oncanplaythrough = function () {

            };

            audioInitialArray.map(function (v, k) {
                // console.log(v.url);
                audioArray.push(new makeAudio(v.url));
                audioArray[k].audio.oncanplaythrough = function () {
                    audioArray[k].status = true;
                };
            });


            

            $('#Loading_Container').addClass('d-none');
            $('#Story_Model').removeClass('d-none');
            $('#Message_Story_List > li').remove();
            
            workingFunc();
        }, 1500);

    });

    

    
    
});