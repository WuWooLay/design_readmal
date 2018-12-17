$(document).ready( function () {
    
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
    var messagesFormat = function (UserName, position = 'Left', Type = 'Message', Message ) {
        // {id: '1', name: 'ေသာ္တာ', position: 'Left',
        //  type: 'message', message: 'အေဖဘယ္မွာလဲ', color: '#ff5757', 
        // vibrate: true, vibrate_pattern: [800], background_change: true, 
        // background_image: '/images/bg_images/ghost/house/house_1.jpg',  
        // audio: true, audio_url: '/audio/ghost/phone_ring/pr_1.mp3'},
       
        this.id = hash();
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
                    $('<span>', {class: 'Name'}).html(Name)
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
                        type:'button', class:'btn btn-outline-light  btn-block Update_Name',
                        'data-id': userId, 'data-color': color
                    }).html(userName)
                )
            )
            .append(
                $('<div>', {class: 'col-4', 'data-id': userId, 'data-color': color})
                .append(
                    $('<button>', {
                        type:'button', class:'btn btn-light btn-sm Update_Color',
                        'data-id': userId, 'data-color': color
                    }).html(color)
                )
            )
        );
    };


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

        console.log(name.length);
        console.log(hexCode);
        console.log(position);
        
        newContent.users.push(new usersFormat(name, hexCode, position ));
        createUserList(newContent.users[newContent.users.length - 1].id, name, hexCode).appendTo('#UserListShow');
        console.log(newContent);
    });

    // Each User Selected
    $("#list").click( function () {

        console.log(hash());
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
                $('#Audio_List ul').append(create_audio_file('Knock'));
                $('#Audio_List ul').append(create_audio_file('Voice'));
                $('#Audio_List ul').append(create_audio_file('Heart'));
                $('#Audio_List').removeClass('d-none');
            }, 1000);
        });
       
    }

    // Create Audio File
    var create_audio_file = function (FileName) {

        return $('<li>', {class: 'Pointer'})
        .append(
            $('<a>', {href: '#!'})
            .append(
                $('<i>', {class: 'icon ion-ios-musical-notes'})
            )
            .append(' ' + FileName + ' ')
        );
    }

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