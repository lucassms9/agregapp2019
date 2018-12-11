myApp.onPageInit("esqueci_senha2", function (page) {

  $("#back-to-esqueci").on("click", function (event) {
    history.length = 0;
    mainView.router.loadPage("pages/Esqueci-Senha/esqueci_senha.html");
  });

  $("#reenviar").on("click", function (event) {

    var documento = localStorage.getItem("cpf_esqueci");

    var parameters = {
      cpf: pontuacaoCpf(documento)
    };

    var successCallback = function (data) {
      myApp.hidePreloader();

      if (data.result.status === 500) {
        if (data.result.message != "") {
          myApp.alert(data.result.message);
        }
      }

      if (data.result.status === 204) {
        myApp.hidePreloader();
        myApp.alert("SMS ENVIADO!");
      }
    };

    RestService.connect(
      "motoristas/recuperar_senha",
      "POST",
      parameters,
      null,
      successCallback
    );

  });
});