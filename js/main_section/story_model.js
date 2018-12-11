$(document).ready( function () {
    
    $('#Story_Model_Content_Message_Section').click( function () {
        
        var c = 'Message_Left';
        var word = '<li class="Message_Story '+ c +' zoomIn animated" data-color="" >';
        word += '<span class="Message" style="background-color: #0b93f6"> ဒီအိမ္ၾကီးလားေဟ်ာင့္</span>';
        word += '<span class="Name" style="color: #0b93f6">  ေက်ာ္ေက်ာ္ </span>';
        word += '</li>';

        $('#Message_Story_List').append(word);

        var messageContainer = document.getElementById('Message_Story_List');

        $('#Story_Model_Content_Message_Section').stop().animate(
        {
                scrollTop:$('#Story_Model_Content_Message_Section')[0].scrollHeight
        }, 500);
        
    });
    
});