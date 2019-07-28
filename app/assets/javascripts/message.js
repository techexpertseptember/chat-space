$(window).on('load', function(){
    function buildHTML(message){
        img = message.image.url ? `<img src=${message.image.url} ></img>` : ''
        var html =
        `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
                <div class="upper-message__user-name">
                ${message.user_name}
                </div>
                <div class="upper-message__date">
                ${message.created_at}
                </div>
            </div>
            <div class="lower-message">
                <p class="lower-message__content">
                ${message.content}
                </p>
            </div>
                ${img}
            </div>`
        return html;
    }
    $(".new_message").on("submit", function(e){
        e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
       .done(function(data){
         var html = buildHTML(data);
         $('.messages').append(html);      
         $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
         $('form')[0].reset();
         $('.form__submit').prop('disabled', false);
       })
       .fail(function(){
        $('.form__submit').prop('disabled', false);
        alert('error');
       })

       });


    var reloadMessages = function() {
        last_message_id = $('.message:last').data('id');
        if (window.location.href.match(/\/groups\/\d+\/messages/)){
        $.ajax({
          url: 'api/messages',
          type: 'get',
          dataType: 'json',
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function (message){
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);      
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
         })
        })
        .fail(function() {
         alert('自動更新に失敗しました');
        });
       } 
     };
     setInterval(reloadMessages, 5000);
});