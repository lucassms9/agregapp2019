myApp.onPageInit("esqueci_senha", function(page) {

  $("#cpf_esqueci").mask("000.000.000-00", { reverse: true });

  $("#back-to-login").on("click", function (event) {
     history.length = 0;
     mainView.router.loadPage("pages/Login/login.html");
  });

  $("#esqueceu_senha").on("click", function(event) {
    myApp.showPreloader();
    var documento = $("#cpf_esqueci").val();

    if (documento == "") {
      myApp.hidePreloader();
      myApp.alert("Inserir o CPF!");
      return false;
    }

	  var parameters = { cpf: pontuacaoCpf(documento) };

    var successCallback = function(data) {
      myApp.hidePreloader();

      if (data.result.status === 500) {
        if (data.result.message != "") {
          myApp.alert(data.result.message);
        }
      }

		if (data.result.status === 204) {
      myApp.hidePreloader();
      localStorage.setItem("cpf_esqueci", documento);
		  mainView.router.loadPage("pages/Esqueci-Senha/esqueci_senha2.html");
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
