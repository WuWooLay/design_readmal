$(document).ready( function () {
    // Selected User 
    var selectedUser = {};
    var centerSelectedUser = {};


    // Hash Code For Every Milli Second
    var hash = function () {
        var date = moment().format('HH_mm_SSS');
        return 'WuWoo_' + date + '_' + Math.random().toString(36).substr(2, 16);
         
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
        this.themeSound = false;
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
    var usersFormat = function (UserName, ColorHexCode, position) {

        if(position == null ) {
            position = "Left";
        }
        this.id = hash();
        this.name = UserName;
        this.color = ColorHexCode;
        this.position = position;
    };

    // MessageFormat
    var messagesFormat = function (hash, UserName, User_Id, position , Type , Message, color) {
        // {id: '1', name: 'ေသာ္တာ', position: 'Left', type: 'message', message: 'အေဖဘယ္မွာလဲ', color: '#ff5757', vibrate: true, vibrate_pattern: [800], background_change: true, background_image: '/images/bg_images/ghost/house/house_1.jpg',  audio: true, audio_url: '/audio/ghost/phone_ring/pr_1.mp3'},

        if(position == null ) {
            position = "Left";
        }
        if(Type == null ) {
            Type = "message";
        }
       
        this.id = hash;
        this.name = UserName;
        this.user_id = User_Id;
        this.position = position;
        this.type = Type;
        this.message = Message;
        
        this.vibrate = false;
        this.vibrate_pattern = [];

        this.background_change = false;
        this.background_image = false;
       
        this.audio = false;
        this.audio_url = false;

        this.color = color;
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
    var createMessage = function (messageId, Message, position, Name, colorCode, type) {

        if(type == undefined) {
            type = 'message';
        }

        if(type == 'think') {
            position = 'Center';
            colorCode = '';
        }

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
                        $('#AddedMessage').focus();
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
                        $('#NameEditUserId').val(user.id);

                        if(user.position == 'Left') {
                            $("#Left_Edit_Radio").prop("checked", true);
                            // $('#Left_Edit_Radio').attr('checked', true);
                        } if(user.position == 'Right') {
                            $("#Right_Edit_Radio").prop("checked", true);
                            // $('#Right_Edit_Radio').attr('checked', true);
                        }

                        // $('input:radio[name=sex]:nth(1)').attr('checked',true);

                        // console.log(user);
                    })
                )
            )
        );
    };

    var createCenterUserList = function (userId) {
        var centerUser = {};
        newContent.users.map( function (v,k) {
            if(v.id == userId) {
                centerUser = v;
            }
        });

        return $('<li>', {class: "list-group-item Pointer ", id: "Center_" + userId, 'data-user-id': userId})
        .html(centerUser.name)
        .click( function () {
            console.log('Alert Click');
            $('#centerText li.active').removeClass('active');
            $(this).addClass('active');

            var user_id = $(this).data('user-id');
            newContent.users.map( function (v,k) {
                if(v.id == user_id) {
                    centerSelectedUser = v;
                }
            });

            $('#Vibrate').focus();
        });
    }


    // ColorBox Initial
    $('.colorBox').each(function (k,v) {
        $(v).css('background-color', $(v).data('color'));
        $(v).click(function () {
            $('#HexCodeAdd').val($(v).data('color').replace(/#/g, ""));
        });
    });

    // Added User , Name , Position
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
        createCenterUserList(newContent.users[newContent.users.length - 1].id).appendTo('#centerText');
        console.log(newContent);
        $('#NameAdd').val('');
        $('#HexCodeAdd').val('');
        $('#NameAdd').focus();
    });
    $('#HexCodeAdd').keyup( function (e) {
        // console.log(e);
        if(e.which == 13 ) {
            $('#AddNameFormClick').click();
        }
    });
   
    // Edit User 
    $('#AddNameEditFormClick').click( function () {
        var id = $('#NameEditUserId').val();
        var name = $('#NameEditAdd').val();
        var color = "#" + $('#HexCodeEditAdd').val();
        var position = $('input[name=Edit_Position_Radio]:checked', '#AddNameEditForm').val();
        
        var obj = {};

        obj.oldName = '';
        obj.changeName = false;
        obj.oldPosition = '';
        obj.changePosition = false;
        obj.oldColor = '';
        obj.changeColor = false;

        // console.log('Id =>', id);
        // console.log('Name =>', name);
        // console.log('Color=>',color);
        // console.log('Position=>', position);


        var divName = $('#'+id)[0].children[0].children[0].children[0];
        var divBtn = $('#'+id)[0].children[0].children[1].children[0];
        $(divName).html(name);
        $(divBtn).html(color);
        $('#'+id).css('background-color', color);


        newContent.users.map(function (v) {
            if(v.id == id ) {
                
               
                if(v.position != position) {
                    obj.changePosition = true;
                    obj.oldPosition = v.position;
                    v.position = position;
                }

                if(v.color != color ) {
                    obj.changeColor = true;
                    obj.oldColor = v.color;
                    v.color = color;
                }

                if(v.name != name ) {
                    obj.changeName = true;
                    obj.oldName = v.name;
                    v.name = name;
                }

            }
        });


      if(obj.changeColor || obj.changeName || obj.changePosition ) {

            // If Change Position or Change Color
            if(obj.changePosition || obj.changeColor ) {
                console.log('Change Position Or Change Color');
                newContent.messages.map( function (v, k) {

                    if(v.user_id == id ) {
                        v.position = position;
                        v.color = color;
                    }

                    if(v.user_id == id && v.type == "message") {
                        
                        // Change Position
                        v.position = position;
                        var changeDiv_1 = $('#'+v.id)[0].children[0].children[0];
                        var changeDiv_2 = $('#'+v.id)[0].children[1].children[0];
    
                        $(changeDiv_1).removeClass(obj.oldPosition);
                        $(changeDiv_1).addClass(position);
                        $(changeDiv_2).removeClass(obj.oldPosition);
                        $(changeDiv_2).addClass(position);

                        // Change Color
                        v.color = color;
    
                        var changeDiv_3 = $('li#'+v.id)[0].children[0].children[0];
                        var changeDiv_4 = $('li#'+v.id)[0].children[1].children[0].children[0];
                        $(changeDiv_3).css('background-color', color);
                        $(changeDiv_4).css('color', color);

                    }
                    
                });
            }
    
          
    
            // If Change Name
            if(obj.changeName) {
                console.log('Change Name');
                newContent.messages.map( function (v, k) {
                    if(v.user_id == id ) {
                        // console.log($('#'+v.id));
                        // console.log($(changeDiv_2));
    
                        v.name = name;
    
                        var changeDiv_2 = $('li#'+v.id)[0].children[1].children[0].children[0];
                        $(changeDiv_2).html(name);
                    }
                });
            }
            
        }


        selectedUser = {};
        $('#UserListShow button.active').removeClass('active');


        console.log('After Edit=>', newContent);
        $('#UserEditModel').modal('hide');

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
        var makeNewMessage = new messagesFormat(makeHash ,selectedUser.name, selectedUser.id , selectedUser.position, 'message', message, selectedUser.color);
        newContent.messages.push(makeNewMessage);

        createMessage(makeHash, message, selectedUser.position, selectedUser.name, selectedUser.color)
        .appendTo('#Admin_Message_Show_Ul') ;

        $('#AddedMessage').val('');
       
        $('#Admin_Message_Show_Container').stop().animate(
        {
                scrollTop:$('#Admin_Message_Show_Container')[0].scrollHeight
        }, 500);


        $('#AddedMessage').focus();

    });
    $('#AddedMessage').keyup( function (e) {
        // console.log(e);
        if(e.which == 13 ) {
            $('#AddedMessageButton').click();
        }
        
    });

    // Added Center None Button
    $('#CenterTextNone').click( function () {
        centerSelectedUser = {};
        $('#centerText li').removeClass('active');
        $(this).addClass('active');
        $('#Vibrate').focus();
    });

    // Added Center Message 
    $('#CenterTextButton').click( function () {

        var message = $('#Vibrate').val();

        if( message.length == 0 || message.trim().length < 1 ){
            // Check User Shi Ma SHi   
            alert('Error');
            return false;
        }

        var makeHash = hash();
        var makeNewMessage = '';

        if( !Object.keys(centerSelectedUser).length || typeof centerSelectedUser != "object" ) {
            // If None
            var makeNewMessage = new messagesFormat(makeHash , '', '' , 'Center', 'think', message, '');
            createMessage(makeHash, message, 'Center', '', '', 'think')
            .appendTo('#Admin_Message_Show_Ul') ;
        } else {
            // If Selected
             var makeNewMessage = new messagesFormat(makeHash ,centerSelectedUser.name, centerSelectedUser.id , centerSelectedUser.position, 'think', message, centerSelectedUser.color);
             createMessage(makeHash, message, 'Center', centerSelectedUser.name, centerSelectedUser.color, 'think')
             .appendTo('#Admin_Message_Show_Ul') ;
              // centerSelectedUser
        }

        newContent.messages.push(makeNewMessage);
       
        $('#Admin_Message_Show_Container').stop().animate(
        {
                scrollTop:$('#Admin_Message_Show_Container')[0].scrollHeight
        }, 500);

        $('#Vibrate').val('');
        $('#Vibrate').focus();
        console.log("After => ", newContent);
       
    });
    $('#Vibrate').keyup( function (e) {
        // console.log(e);
        if(e.which == 13 ) {
            $('#CenterTextButton').click();
        }
        
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


    // Show Json 
    $('#showJson').click( function () {
        $('#JsonModal').modal('show');
        $('#JsonModalInside').html(JSON.stringify(newContent, null, 2));
        
        console.log(JSON.stringify(newContent, null, 2));
    });

});