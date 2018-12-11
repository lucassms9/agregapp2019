myApp.onPageInit("fale_conosco", function (page) {
  $("#voltar-conosco").on("click", function (event) {
    history.length = 0;
    mainView.router.loadPage("pages/Dashboard/dashboard.html");
  });

  var motorista_id = localStorage.getItem('motorista.id');

  function rolarBox() {
    $("#list-messages").scrollTop(4000);
  }

  var templeteMotorista =
    '<li class="replies">' +
    '<div class="box-message">' +
    '<p>{texto}</p>' +
    '</div>' +
    '</li>';

  var templeteOperador =
   '<li class="sent">' +
   '<div class="box-message">' +
   '<p>{texto}</p>' +
   '</div>' +
   '</li>';


  function pushMessage(messages) {
    var msgBody = '';
    console.log(messages)

    $.each(messages, function (index, message) {

      if (message.motorista_sender == 1) {
        msgBody = templeteMotorista.replace("{texto}", message.texto);
      } else if (message.motorista_sender == 0) {
        msgBody = templeteOperador.replace("{texto}", message.texto);
      }

      $('#message-lista').append(msgBody);
      $('#message-text').val('');
       rolarBox()
    });
  }

  var getNewMessages = function (data) {

    var successCallback = function (data) {
      console.log(data.result)
      if (data.result.status == 302) {
        pushMessage(data.result.messages);
      }
    }

    var parameters = {
      motorista_id: motorista_id
    }

    RestService.connect(
      "chat/newMessages/",
      "GET",
      parameters,
      true,
      successCallback,
      null,
      null,
      true
    );
  }


  $('#OpenChat').click(function (e) {
    e.preventDefault();

    var successCallback = function (data) {
      $('#message-lista').html('');
      pushMessage(data.result.messages)
    }

    var parameters = {
      motorista_id: motorista_id
    }

    RestService.connect(
      "chat/",
      "GET",
      parameters,
      true,
      successCallback
    );

    myApp.popup('.popup-chat');
    $('#list-messages').removeClass('messages-auto-layout');
    setInterval(getNewMessages, 2000);
    rolarBox()
  });


  $('#newMessage').click(function (e) {
    e.preventDefault();
    var text = $('#message-text').val();
    if (text == '') {
      return myApp.alert('Digite sua menssagem');
    }
    var successCallback = function (data) {
      pushMessage(data.result);
    }

    var parameters = {
      motorista_id: motorista_id,
      texto: text
    }

    RestService.connect(
      "chat/add",
      "POST",
      parameters,
      true,
      successCallback
    );
  });

});