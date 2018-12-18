$(document).ready( function () {
    // Selected User 
    var selectedUser = {};


    // Hash Code For Every Milli Second
    var hash = function () {
        var date = moment().format('MMMM Do YYYY, h:mm:ss a');
        return CryptoJS.HmacMD5(date, "Wuwoo" ).toString();
    };

    // Main Format 
    var mainFormat = function (Title, Episode, WrittenBy, FacebookId) {
        this.id = hash();
        this.title = Title;
        this.episode = Episode;
        this.writtenBy = WrittenBy;
        this.facebookId = FacebookId;
        this.messages = [];
        this.audio = [];
        this.bg_images = [];
        this.users = [];
        this.themeSound = '';
    };

    // Audio Format
    var audioFormat = function (url) {
        this.id = hash();
        this.url = url;
    };

    // bgImgFormat
    var bgImgFormat = function (url) {
        this.id = hash();
        this.url = url;
    };

    // User Format
    var usersFormat = function (UserName, ColorHexCode, position = 'Left') {
        this.id = hash();
        this.name = UserName;
        this.color = ColorHexCode;
        this.position = position;
    };

    // MessageFormat
    var messagesFormat = function (hash, UserName, position = 'Left', Type = 'Message', Message ) {
        // {id: '1', name: 'ေသာ္တာ', position: 'Left',
        //  type: 'message', message: 'အေဖဘယ္မွာလဲ', color: '#ff5757', 
        // vibrate: true, vibrate_pattern: [800], background_change: true, 
        // background_image: '/images/bg_images/ghost/house/house_1.jpg',  
        // audio: true, audio_url: '/audio/ghost/phone_ring/pr_1.mp3'},
       
        this.id = hash;
        this.name = UserName;
        this.position = position;
        this.type = Type;
        this.message = Message;
        
        this.vibrate = false;
        this.vibrate_pattern = [];

        this.background_change = false;
        this.background_image = '';
       
        this.audio = false;
        this.audio_url = '';

    };

    var newContent = new mainFormat('Title New ', 1, 'Lwin Moe Paing', 'greenmoezat');

    // newContent.audio.push(new audioFormat('/audio/ghost/phone_ring/pr_1.mp3'));
    // newContent.bg_images.push(new bgImgFormat('/images/wall_paper/Evil_With_Sword_in_Dark.jpg'));
    // newContent.users.push(new usersFormat('လြင္ေအာင္', '#ff3333'));
    // var newMessage = new messagesFormat('လြင္ေအာင္', 'Left', 'message', 'Hey Kaung dway');
    // newContent.messages.push(newMessage);
    // messageCreate(hash(), 'Message', newContent.users[0].position, newContent.users[0].name, newContent.users[0].color).appendTo('#Admin_Message_Show_Ul');
  
    console.log(newContent);

    // Create Message List To Show In Center Edit Box
    var createMessage = function (messageId, Message, position, Name, colorCode) {
        return $('<li>', {class: 'Li',id:messageId})
        .append(
            $('<div>', {class: 'Message'})
            .append(
                $('<span>', {class: position , style: 'background-color: ' + colorCode}).html(Message)
            )
        )
        .append(
            $('<div>', {class:'NameAndEdit'})
            .append(
                $('<div>', {class: 'NameAndEditContainer ' + position})
                .append(
                    $('<span>', {class: 'Name', style: 'color:' + colorCode}).html(Name)
                )
                .append(
                    $('<span>', {class: 'button'})
                    .append(
                        $('<i>', {class: 'icon ion-md-play'})
                    )
                )
                .append(
                    $('<span>', {class: 'button'})
                    .append(
                        $('<i>', {class: 'icon ion-ios-cellular'})
                    )
                    
                )
                .append(
                    $('<span>', {class: 'button'})
                    .append(
                        $('<i>', {class: 'icon ion-ios-image'})
                    )
                )
                .append(
                    $('<span>', {class: 'button'})
                    .append(
                        $('<i>', {class: 'icon ion-ios-musical-notes'})
                    )
                )
                .append(
                    $('<span>', {class: 'button text-danger'})
                    .append(
                        $('<i>', {class: 'icon ion-md-close'})
                    )
                )
            )
        );

    };

    // Create User list <div> 
    var createUserList = function (userId, userName, color) {
        return $('<li>', {
            class: 'list-group-item text-white', 
            style: 'background-color:'+color,
            'data-color': color,
            'id': userId
        })
        .append(
            $('<div>', {class: 'row'})
            .append(
                $('<div>', {class: 'col-8'})
                .append(
                    $('<button>', {
                        type:'button', class:'btn btn-outline-light btn-sm btn-block Update_Name',
                        'data-id': userId, 'data-color': color
                    }).html(userName).click( function () {

                        var nowClickId = $(this).data('id');
                      
                        if(nowClickId == selectedUser.id) {
                            selectedUser = {};
                            $(this).removeClass('active');
                            return false;
                        }

                        $('#UserListShow > li button.active').removeClass('active');
                        $(this).addClass('active');

                        newContent.users.map(function (v,k) {
                            var checkUserObj = JSON.parse(JSON.stringify(v));

                            if(nowClickId == checkUserObj.id) {
                                selectedUser = checkUserObj;
                            }

                        });

                        console.log(selectedUser);
                    })
                )
            )
            .append(
                $('<div>', {class: 'col-4', 'data-id': userId, 'data-color': color})
                .append(
                    $('<button>', {
                        type:'button', class:'btn btn-light btn-sm Update_Color',
                        'data-id': userId, 'data-color': color
                    }).html(color).click(function () {
                        $('#UserEditModel').modal('show');

                        var user = '';
                        var id = $(this).data('id');
                        
                        newContent.users.map(function (v, k) {
                            if (v.id ==  id) user = v;
                        });

                        $('#NameEditAdd').val(user.name);
                        $('#HexCodeEditAdd').val(user.color.replace(/#/ , ''));

                        console.log(user);
                    })
                )
            )
        );
    };

    // ColorBox Initial
    $('.colorBox').each(function (k,v) {
        console.log(v);
        $(v).css('background-color', $(v).data('color'));
        $(v).click(function () {
            $('#HexCodeAdd').val($(v).data('color').replace(/#/g, ""));
        });
    });


    // Added User , Name Position
    $('#AddNameFormClick').click( function () {

        var name = $('#NameAdd').val();
        var hexCode = $('#HexCodeAdd').val();
        var position = $('input[name=Position_Radio]:checked', '#AddNameForm').val();
        name = name.trim();

        if(
            name.length == 0 || name == ' ' || name == '  ' || 
            hexCode.length < 6 || hexCode == ' ' || hexCode == '  ' 
        ) {
            alert("Error");
            return false;
        }

        hexCode = '#' + hexCode;

        
        newContent.users.push(new usersFormat(name, hexCode, position ));
        createUserList(newContent.users[newContent.users.length - 1].id, name, hexCode).appendTo('#UserListShow');
        console.log(newContent);
        $('#NameAdd').val('');
        $('#HexCodeAdd').val('');
    });

    // Added Message
    $('#AddedMessageButton').click( function () {
        var message = $('#AddedMessage').val();

        if( !Object.keys(selectedUser).length 
            || typeof selectedUser != "object" 
            || message.length == 0
            || message.trim().length <= 1
            ){
            // Check User Shi Ma SHi   
            alert('Error');
            return false;
        }

        
        // createMessage = function (messageId, Message, position, Name, colorCode)
        // messageCreate(hash(), 'Message', newContent.users[0].position, newContent.users[0].name, newContent.users[0].color).appendTo('#Admin_Message_Show_Ul');
        var makeHash = hash();
        var makeNewMessage = new messagesFormat(makeHash ,selectedUser.name, selectedUser.position, 'Message', message);
        newContent.messages.push(makeNewMessage);

        createMessage(makeHash, message, selectedUser.position, selectedUser.name, selectedUser.color)
        .appendTo('#Admin_Message_Show_Ul') ;

        $('#AddedMessage').val('');
       
        $('#Admin_Message_Show_Container').stop().animate(
        {
                scrollTop:$('#Admin_Message_Show_Container')[0].scrollHeight
        }, 500);

    });


    // Create Audio Folder
    var create_audio_folder = function (FolderName) {

        return  $('<li>', {class:'Pointer'})
        .append(
            $('<i>', {class: 'icon ion-md-folder'})
        )
        .append(
            $('<span>').html(' ' + FolderName + ' ' )
        )
        .append(
            $('<span>', {class: 'Folder_Loading d-none'})
            .append(
                $('<img>', { src: '/images/loading/ghost_loading.svg'})
            )
        ).click(function () {
            // Search Sound In Folder 
            console.dir($(this));
            var loader = $(this)["0"].children[2];
            console.dir(loader);
            $(loader).removeClass('d-none');

            setTimeout( function () {
                $(loader).addClass('d-none');

                // If Get Audio File
                $('#Audio_List ul li').remove();

                var data = [
                    {'id': 1, url: '/audio/ghost/door/door_1.mp3'}
                ];
    
                data.map( function (v, k) {
                    $('#Audio_List ul').append(create_audio_file(v.url));
                });

                $('#Audio_List').removeClass('d-none');
            }, 1000);
        });
       
    }

    // Create Audio File
    var create_audio_file = function (FileName) {

        return $('<li>', {class: 'Pointer'})
        .append(
           $('<div>')
           .append(
                $('<a>', {href: '#!', class: 'mr-1'})
                .append(
                    $('<i>', {class: 'icon ion-ios-musical-notes'})
                )
                .append(' ' + FileName + ' ')
           )
           .append(
            $('<a>', {href: '#!', class: 'ml-2'})
                .append(
                    $('<i>', {class: 'icon ion-md-play'})
                )
           )
        );
    }

    // Theme Audio Folder Click
    $('#ThemeAudio li').click( function () {
        var thiS = $(this);
        var loader = thiS["0"].children[2];

        $(loader).removeClass('d-none');

        setTimeout(function () {
            $(loader).addClass('d-none');

            var data = [
                {'id': 1, url: '/audio/ghost/theme/theme_1.mp3'}
            ];

            // Audio File Read & Show

            $('#ThemeAudio_List ul li').remove();
            data.map( function (v, k) {
                $('#ThemeAudio_List ul').append(create_audio_file(v.url));
            });

        }, 1000);

    });

    //Audio Folder Li Click
    $('#Audio li').click( function () {
        var thiS = $(this);
        var loader = thiS["0"].children[2];

        $(loader).removeClass('d-none');

        setTimeout(function () {
            $(loader).addClass('d-none');

            // Parent Folder Hide
            $('#Audio').addClass('d-none');

            // Get Array Folder
            $('#AudioInside li').remove();
            $('#AudioInside').append(create_audio_folder('Door'));
            $('#AudioInside').append(create_audio_folder('Voice'));
            $('#AudioInside').removeClass('d-none');
        }, 1000);
    });

    // Audio Folder Back
    $('#AudioFolderBack').click( function () {
        $('#AudioInside').addClass('d-none');
        $('#Audio').removeClass('d-none');
        $('#Audio_List ul li').remove();
    });

    // Create Bg Image Folder 
    var create_bgImg_folder = function (FolderName) {

        return  $('<li>', {class:'Pointer'})
        .append(
            $('<i>', {class: 'icon ion-md-folder'})
        )
        .append(
            $('<span>').html(' ' + FolderName + ' ' )
        )
        .append(
            $('<span>', {class: 'Folder_Loading d-none'})
            .append(
                $('<img>', { src: '/images/loading/ghost_loading.svg'})
            )
        ).click(function () {
            // Search Sound In Folder 
            console.dir($(this));
            var loader = $(this)["0"].children[2];
            console.dir(loader);
            $(loader).removeClass('d-none');

            setTimeout( function () {
                $(loader).addClass('d-none');

                // If Get Audio File
                $('#ImageFolder_List div').remove();
                $('#ImageFolder_List').append(create_bgImg_file('/images/wall_paper/Evil_With_Sword_in_Dark.jpg'));
                $('#ImageFolder_List').append(create_bgImg_file('/images/story_card/Horror-City-Wallpaper-From-Game-800x600.jpg'));
                $('#ImageFolder_List').removeClass('d-none');
            }, 1000);
        });

    }

    // Create Bg Image File
    var create_bgImg_file = function (FileNameUrl) {
        
        return $('<div>', {class:'col-6 ImageDiv', style: "background-image:url('"+ FileNameUrl +"')"})
        .append(
            ' '
        );
    }

    // Image Folder Li Click
    $('#ImageFolder li').click( function () {
            var thiS = $(this);
            var loader = thiS["0"].children[2];

            $(loader).removeClass('d-none');

            setTimeout(function () {
                $(loader).addClass('d-none');

                // Parent Folder Hide
                $('#ImageFolder').addClass('d-none');

                // Get Array Folder
                $('#ImageFolderInside li').remove();
                $('#ImageFolderInside').append(create_bgImg_folder('House'));
                $('#ImageFolderInside').append(create_bgImg_folder('Fields'));
                $('#ImageFolderInside').append(create_bgImg_folder('Door'));
                $('#ImageFolderInside').removeClass('d-none');
            }, 1000);
    });

    // Image Folder Back
    $('#ImageFolderBack').click( function () {
        $('#ImageFolderInside').addClass('d-none');
        $('#ImageFolder').removeClass('d-none');
        $('#ImageFolder_List div').remove();
    });

});