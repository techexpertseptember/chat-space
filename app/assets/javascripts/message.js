$(function(){

    function buildHTML(message){
        img = message.image.url ? `<img src=${message.image.url} ></img>` : ''

        var html =
        `<div class="message" data-message-id=${message.id}>
            <div class="upper-message">
                <div class="upper-message__user-name">
                ${message.user_name}
                </div>
                <div class="upper-message__date">
                ${message.date}
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
        alert('error');
       })

       });
   
var buildMessageHTML = function(message) {
    if (message.content && message.image.url) {
    var html = `<div class="message" data-id="${message.id}">
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
                  <img class="lower-message__image"${message.image.url}">
                  </div>
                </div>`
    } else if (message.content) {
      var html = `<div class="message" data-id="${message.id}">
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
                    </div>`
    } else if (message.image.url) {

      var html = `<div class="message" data-id="${message.id}">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="lower-message">
                     <img class="lower-message__image"${message.image.url}">
                    </div>
                  </div>`
    };
    return html;
  };

    var reloadMessages = function() {
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        last_message_id = $('.message:last').data('id');
        if (window.location.href.match(/\/groups\/\d+\/messages/)){

        $.ajax({
          //ルーティングで設定した通りのURLを指定
          url: 'api/messages',
          //ルーティングで設定した通りhttpメソッドをgetに指定
          type: 'get',
          dataType: 'json',
          //dataオプションでリクエストに値を含める
          data: {id: last_message_id}
        })
        .done(function(messages) {
          var insertHTML = '';
          messages.forEach(function (message){
            insertHTML = buildMessageHTML(message);
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