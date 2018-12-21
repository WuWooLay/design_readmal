$(document).ready( function () {
    // Selected User 
    var selectedUser = {};
    var centerSelectedUser = {};
    
    // Vibrate
    var vibrate = {
        select: false,
        id: false,
    };

    // Audio Click Play
    var audio = {
        status : false,
        url : '',
        obj : false
    };

    // Audio Select 
    var audioSelect =  {
        select: false,
        id: false,
    };

     // Bg Select 
     var backgroundSelect = {
        select: false,
        id: false
    };


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
        this.audio = [];
        this.bgImages = [];
        this.users = [];
        this.themeSound = false;
        this.messages = [];
    };

    // Audio Format
    var audioFormat = function (url) {
        this.id = hash();
        this.url = url;
        this.iteration = 1;
    };

    // bgImgFormat
    var bgImgFormat = function (url) {
        this.id = hash();
        this.url = url;
        this.iteration = 1;
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
        this.vibrate_pattern = false;

        this.bgImage = false;
        this.bgImage_url = false;
       
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
            // Message Div
            $('<div>', {class: 'Message'})
            .append(
                $('<span>', {class: position , style: 'background-color: ' + colorCode})
                .html(Message)
                .click(function () {
                    //Start
                    $('#MessageEditModal').modal('show');
                    //End
                })
            )
            // Message Div End
        )
        .append(
            $('<div>', {class:'NameAndEdit'})
            .append(
                $('<div>', {class: 'NameAndEditContainer ' + position})
                .append(
                    $('<span>', {class: 'Name'}).html(Name)
                )
                .append(
                    // Play Click
                    $('<span>', {class: 'button play'})
                    .append(
                        $('<i>', {class: 'icon ion-md-play', 'data-action': 'nothing'})
                    )
                )
                .append(
                    // Vibrate
                    $('<span>', {class: 'button btnVibrate',
                      'data-action': 'nothing',
                      'data-id': messageId,
                      'id': 'Vibrate_' + messageId
                    })
                    .append(
                        $('<i>', {class: 'icon ion-ios-cellular'})
                    )
                    .click( function () {
                        var action = $(this).data('action');

                        if(action == 'nothing') {

                            // All Deselect Other Cursor
                            $('.btnVibrate.cursor').data('action', 'nothing');
                            $('.btnVibrate.cursor').removeClass('cursor');

                            // To Cursor Condition
                            $('#VibrateInput').focus();

                            vibrate.select = true;
                            vibrate.id = $(this).data('id');

                            $(this).addClass('cursor');
                            $(this).data('action', 'cursor');

                        } else if (action == 'cursor') {
                          
                            //  Cursor to Nothing
                            $(this).data('action', 'nothing');
                            $(this).removeClass('cursor');
                            vibrate.select = false;
                            vibrate.id = false;


                        } else if (action == 'active' ) {
                          
                            // Active to Nothing
                            $(this).data('action', 'nothing');
                            $(this).removeClass('active');

                            var id = $(this).data('id');

                            newContent.messages.map( function (v, k) {
                                if(v.id == id ) {
                                    v.vibrate = false;
                                    v.vibrate_pattern = false;
                                }
                            });

                            if( id == vibrate.id ) {
                                vibrate.select = false;
                                vibrate.id = false;
                            }
                            

                            // After Active to Nothing
                            console.log('After Active=>', newContent.messages);
                            
                        }
                        
                    })
                    
                )
                .append(
                    // Background Image
                    $('<span>', {
                        class: 'button btnImage',
                        'data-action': 'nothing',
                        'data-id': messageId,
                        'id': 'BackgroundImage_' + messageId
                    })
                    .append(
                        $('<i>', {class: 'icon ion-ios-image'})
                    )
                    .click( function () {
                        // Start
                        var action = $(this).data('action');

                        if(action == 'nothing') {

                            // All Deselect Other Cursor
                            $('.btnImage.cursor').data('action', 'nothing');
                            $('.btnImage.cursor').removeClass('cursor');

                            // To Cursor Condition
                            // $('#VibrateInput').focus();

                            backgroundSelect.select = true;
                            backgroundSelect.id = $(this).data('id');

                            $(this).addClass('cursor');
                            $(this).data('action', 'cursor');

                        } else if (action == 'cursor') {
                          
                            //  Cursor to Nothing
                            $(this).data('action', 'nothing');
                            $(this).removeClass('cursor');
                            backgroundSelect.select = false;
                            backgroundSelect.id = false;


                        } else if (action == 'active' ) {
                          
                            // Active to Nothing
                            $(this).data('action', 'nothing');
                            $(this).removeClass('active');

                            var id = $(this).data('id');
                            var old_url = '';

                            newContent.messages.map( function (v, k) {
                                if(v.id == id ) {
                                    old_url = v.bgImage_url;
                                    v.bgImage = false;
                                    v.bgImage_url = false;
                                }
                            });

                            // Check And Sub -1
                            newContent.bgImages.map( function (v, k) {
                                if(v.url == old_url) {
                                    v.iteration--;

                                    // if Coun 0 we 'll remove This Array Room
                                    if(v.iteration == 0 ) {
                                        newContent.bgImages.splice(k, 1) ;
                                    }
                                }
                            });

                            if( id == backgroundSelect.id ) {
                                backgroundSelect.select = false;
                                backgroundSelect.id = false;
                            }
                           
                            // After Active to Nothing
                            console.log('After Active BgImage=>', newContent.messages);
                            
                        }
                    
                        // End
                    })
                )
                .append(
                    // Audio
                    $('<span>', {
                        class: 'button btnAudio ', 
                        'data-action': 'nothing',
                        'data-id': messageId,
                        'id': 'Audio_' + messageId
                    })
                    .append(
                        $('<i>', {class: 'icon ion-ios-musical-notes'})
                    ).click( function () {
                       
                        var action = $(this).data('action');

                        if(action == 'nothing') {

                            // All Deselect Other Cursor
                            $('.btnAudio.cursor').data('action', 'nothing');
                            $('.btnAudio.cursor').removeClass('cursor');

                            // To Cursor Condition
                            // $('#VibrateInput').focus();

                            audioSelect.select = true;
                            audioSelect.id = $(this).data('id');

                            $(this).addClass('cursor');
                            $(this).data('action', 'cursor');

                        } else if (action == 'cursor') {
                          
                            //  Cursor to Nothing
                            $(this).data('action', 'nothing');
                            $(this).removeClass('cursor');
                            audioSelect.select = false;
                            audioSelect.id = false;


                        } else if (action == 'active' ) {
                          
                            // Active to Nothing
                            $(this).data('action', 'nothing');
                            $(this).removeClass('active');

                            var id = $(this).data('id');
                            var old_url = '';

                            newContent.messages.map( function (v, k) {
                                if(v.id == id ) {
                                    old_url = v.audio_url;
                                    v.audio = false;
                                    v.audio_url = false;
                                }
                            });

                            // Check And Sub -1
                            newContent.audio.map( function (v, k) {
                                if(v.url == old_url) {
                                    v.iteration--;

                                    // if Coun 0 we 'll remove This Array Room
                                    if(v.iteration == 0 ) {
                                        newContent.audio.splice(k, 1) ;
                                    }
                                }
                            });

                            if( id == audioSelect.id ) {
                                audioSelect.select = false;
                                audioSelect.id = false;
                            }

                           
                            // After Active to Nothing
                            console.log('After Active=>', newContent.messages);
                            
                        }
                    })
                )
                .append(
                    $('<span>', {class: 'button text-danger', 'data-id': messageId})
                    .append(
                        $('<i>', {class: 'icon ion-md-close'})
                    )
                    .click( function () {

                       if(!confirm('Are You Sure')) {
                           return false;
                       }

                       var id  = $(this).data('id');

                        //Vibrate Start    
                        var vibrateAction = $('#Vibrate_' + id).data('action');
                        
                        if(vibrateAction == 'cursor') {
                            
                            vibrate.select = false;
                            vibrate.id = false;

                            //    console.log('VIbrate Select');
                            //    console.log('Vibrate', vibrate);
                        }
                        //Vibrate End
                            

                        // AUdio Start
                        var audioAction = $('#Audio_'+ id).data('action');
                        if (audioAction == 'cursor') {
                                    //  Cursor to Nothing
                                    audioSelect.select = false;
                                    audioSelect.id = false;
                        }

                        newContent.messages.map(function (v, k) {
                            
                                //If Found This ID
                            if(v.id == id) {

                                // If Audio Check There is 1
                                if(v.audio == true) {

                                    // Check And Sub -1
                                    newContent.audio.map( function (vv, kk) {
                                        console.log('Wan lar p ');
                                        if(vv.url == v.audio_url) {
                                            console.log('Shar Twe P');
                                            console.log(vv.url);
                                            vv.iteration--;

                                            console.log('Iteration=>', vv.iteration);

                                            // if Coun 0 we 'll removve This Array Room
                                            if(vv.iteration == 0 ) {
                                                console.log('Key ya b =>', kk);
                                                newContent.audio.splice(kk, 1) ;
                                            }
                                        }
                                    });
                                }

                                console.log('Founded',v);
                                
                            }
                        });
                        // Audio End

                        // Bg Start
                        var bgAction = $('#BackgroundImage'+ id).data('action');
                        if (bgAction == 'cursor') {
                                //  Cursor to Nothing
                                backgroundSelect.select = false;
                                backgroundSelect.id = false;
                        }
                        newContent.messages.map(function (v, k) {
                        
                            //If Found This ID
                            if(v.id == id) {

                                // If Background Image Check There is 1
                                if(v.bgImage == true) {

                                    // Check And Sub -1
                                    newContent.bgImages.map( function (vv, kk) {
                                        console.log('Wan lar p ');
                                        if(vv.url == v.bgImage_url) {
                                            console.log('Shar Twe P');
                                            console.log(vv.url);
                                            vv.iteration--;

                                            console.log('Iteration=>', vv.iteration);

                                            // if Coun 0 we 'll removve This Array Room
                                            if(vv.iteration == 0 ) {
                                                console.log('Key ya b =>', kk);
                                                newContent.bgImages.splice(kk, 1) ;
                                            }
                                        }
                                    });
                                }

                                console.log('Founded',v);
                                newContent.messages.splice(k, 1) ;
                                $('#'+id).remove();
                            }

                           

                        });
                        // Bg End
                        

                       console.log('After =>', newContent);

                    })
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
    };


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
        $('#Center_'+ id).html(name);
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
                        // var changeDiv_4 = $('li#'+v.id)[0].children[1].children[0].children[0];
                        $(changeDiv_3).css('background-color', color);
                        // $(changeDiv_4).css('color', color);

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
            || message.trim().length < 1
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
    // $('#Vibrate').keyup( function (e) {
    //     // console.log(e);
    //     if(e.which == 13 ) {
    //         $('#CenterTextButton').click();
    //     }
        
    // });

    // Added Vibrate 
    $('#VibrateInputButton').click( function () {
       var val = $('#VibrateInput').val();
       console.log(vibrate);

       if(!vibrate.select || val.length <= 2) {
           alert('Error');
           return false;
       }

       // Check Message Array

       newContent.messages.map( function (v, k) {
           if(v.id == vibrate.id) {
               console.log($(v));
               v.vibrate = true;
               v.vibrate_pattern = [parseInt(val)];
               $('#Vibrate_'+ v.id).data('action', 'active');
               $('#Vibrate_'+ v.id).addClass('active');
               $('#Vibrate_'+ v.id).removeClass('cursor');

               vibrate.select = false;
               vibrate.id = false;
           }
       });

       $('#VibrateInput').val('');

       console.log(vibrate);
       console.log('After Vibrate =>', newContent);


    });
    $('#VibrateInput').keyup( function (e) {
        // console.log(e);
        e.preventDefault();
        if(e.which == 13 ) {
            $('#VibrateInputButton').click();
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
                    {'id': 1, name: 'door_1', url: '/audio/ghost/door/door_1.mp3'}
                ];
    
                data.map( function (v, k) {
                    $('#Audio_List ul').append(create_audio_file(v.name, v.url, 'audio'));
                });

                $('#Audio_List').removeClass('d-none');
            }, 1000);
        });
       
    };

    // Create Audio File
    var create_audio_file = function (FileName, FileUrl, Type) {

        return $('<li>', {class: 'Pointer'})
        .append(
           $('<div>')
           .append(
                $('<a>', {href: '#!', class: 'mr-1', 'data-url': FileUrl, 'data-type': Type})
                .append(
                    $('<i>', {class: 'icon ion-ios-musical-notes'})
                )
                .append(' ' + FileName + ' ')
                .click( function () {
                  
                   // Click Start
                   var type = $(this).data('type');
                   if(type == 'theme')  {
                    //    console.log('theme');
                       newContent.themeSound = $(this).data('url');
                       $('#ThemeSoundChecked').removeClass('d-none');
                       $('#ThemeSoundModal').modal('hide');

                   } else if( type == 'audio') {

                            console.log(audioSelect);
                            if(!audioSelect.select || !audioSelect.id ) {
                                alert('Error');
                                return false;
                            }

                            var val = $(this).data('url');
                            var isOld = false;
                            console.log(audioSelect);
                                    
                            // Check Message Array
                            newContent.messages.map( function (v, k) {
                                if(v.id == audioSelect.id) {
                                    console.log($(v));
                                    v.audio = true;
                                    v.audio_url = val;
                                    $('#Audio_'+ v.id).data('action', 'active');
                                    $('#Audio_'+ v.id).addClass('active');
                                    $('#Audio_'+ v.id).removeClass('cursor');
                            
                                    // vibrate.select = false;
                                    // vibrate.id = false;
                                }
                            });
                            
                            // Initial Check This is Old From Audio Array
                            newContent.audio.map( function (v, k) {
                                if(v.url == val) {
                                    isOld = true;
                                    v.iteration++;
                                }
                            });

                            if(!isOld) {
                                newContent.audio.push( new audioFormat(val));
                            }
                            console.log('After Audio =>', newContent);
             
                   }
                   //   Click End
                })
           )
           .append(

                $('<a>', {href: '#!', class: 'ml-2 AudioPlayFile' , 'data-url': FileUrl, 'data-type': Type})
                .append(
                    $('<i>', {class: 'icon ion-md-play'})
                ).click( function () {
                    console.log('Play');
                    if(audio.obj) {
                        audio.obj.muted = true;
                        audio.obj = false;
                    }
                    audio.url = $(this).data('url');
                    audio.obj = new Audio(audio.url);
                    audio.obj.play();
                   console.log(audio);
                })

           )
        );
    };

    // Theme Audio Folder Click
    $('#ThemeAudio li').click( function () {
        var thiS = $(this);
        var loader = thiS["0"].children[2];

        $(loader).removeClass('d-none');

        setTimeout(function () {
            $(loader).addClass('d-none');

            var data = [
                {'id': 1, name: 'theme_1', url: '/audio/ghost/theme/theme_1.mp3'}
            ];

            // Audio File Read & Show

            $('#ThemeAudio_List ul li').remove();
            data.map( function (v, k) {
                $('#ThemeAudio_List ul').append(create_audio_file(v.name, v.url, 'theme'));
            });

        }, 1000);

    });

    // Theme Sound Clear
    $('#ThemeSoundClear').click( function () {
        newContent.themeSound = false;
        $('#ThemeSoundChecked').addClass('d-none');
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

    };

    // Create Bg Image File
    var create_bgImg_file = function (FileNameUrl) {
        
        return $('<div>', {
            class:'col-6 ImageDiv',
            'data-url': FileNameUrl,
            style: "background-image:url('"+ FileNameUrl +"')"
        })
        .append(
            ' '
        ).click( function () {
            // Start
            // console.log(backgroundSelect);
            if(!backgroundSelect.select || !backgroundSelect.id ) {
                alert('Error');
                return false;
            }

            var val = $(this).data('url');
            var isOld = false;
            // console.log(audioSelect);
                    
            // Check Message Array
            newContent.messages.map( function (v, k) {
                if(v.id == backgroundSelect.id) {
                    console.log($(v));
                    v.bgImage = true;
                    v.bgImage_url = val;
                    $('#BackgroundImage_'+ v.id).data('action', 'active');
                    $('#BackgroundImage_'+ v.id).addClass('active');
                    $('#BackgroundImage_'+ v.id).removeClass('cursor');
            
                }
            });
            
            // Initial Check This is Old From Audio Array
            newContent.bgImages.map( function (v, k) {
                if(v.url == val) {
                    isOld = true;
                    v.iteration++;
                }
            });

            if(!isOld) {
                newContent.bgImages.push( new bgImgFormat(val));
            }
            console.log('After BackgroundImage =>', newContent);

            // End
        });
    };

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

        console.log(newContent);
    });


});