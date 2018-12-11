myApp.onPageInit("login", function(page) {
  $("#cpf_login").mask("000.000.000-00", { reverse: true });

  var cpf1 = $("#cpf_login").val();

  var eInput = document.getElementById("cpf_login");
  var maxLength = eInput.maxLength;

  eInput.onkeyup = function(e) {
    if (eInput.value.length > 15) {
      eInput.value = eInput.value.slice(0, -1);
      e.preventDefault();
    }
  };

  $("#Button-login").on("click", function(event) {
    myApp.showPreloader();
    
    var cpf = $("#cpf_login").val();
    var senha = $("#senha").val();

    if (cpf == "" || senha == "") {
      myApp.hidePreloader();
      return myApp.alert("Preencher Todos os Campos");
    }

    var parameter = { cpf: pontuacaoCpf(cpf), senha: senha };

    var successCallback = function(data) {
      myApp.hidePreloader();
      console.log(data);
      if (data.result.status === 200) {
        
        localStorage.setItem('motorista.id', data.result.motorista.id);
        localStorage.setItem('motorista.nome_completo', data.result.motorista.nome_completo);
        localStorage.setItem('motorista.apelido', data.result.motorista.apelido);
        localStorage.setItem('motorista.celular', data.result.motorista.celular);
        localStorage.setItem('motorista.cpf', data.result.motorista.cpf);
        localStorage.setItem('motorista.img_url', data.result.motorista.img_url);
        localStorage.setItem('motorista.token', data.result.token);
        
        var elementFoto = document.getElementById('minhafotoPerfil');

        if (data.result.motorista.img_url != null){
          elementFoto.src = BASE_URL_IMAGE + '/motoristas/' + data.result.motorista.img_url;
        }else{
          elementFoto.src = 'assets/img/user-profile.png';
        }

        mainView.router.loadPage("pages/Dashboard/dashboard.html");
        const motorista_id = data.result.motorista.id;
        PushNotificationService.pushNotification(motorista_id);
      }
      if (data.result.status === 500) {
        myApp.alert(data.result.message);
      }
    };
    
    RestService.connect(
      "motoristas/login/",
      "POST",
      parameter,
      null,
      successCallback
    );
  });
});
