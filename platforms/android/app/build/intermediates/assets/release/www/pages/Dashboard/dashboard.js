myApp.onPageInit("dashboard", function (page) {
  var motorista_id = localStorage.getItem("motorista.id");



  var parametersLances = { motorista_id: motorista_id };
  var successCallback = function (data) {
    myApp.hidePreloader();
    var status = data.result.lances_motorista.status;
    var qtde_lances = data.result.lances_motorista.qtde_lances;

    if (status == 200) {
      $(".quadrado3p").css({ "margin-top": " 9%" });
      $("#numero-ofertas").text(qtde_lances);
      $(".mini-quadrado-notifica-ofertas").css({
        display: "inline-block"
      });
      // $("#title-ofertas").addClass("add-notifica");
      $("#notifica-ofertas").show();
    }
  };

  RestService.connect(
    "ofertas/meusLancesCount/",
    "GET",
    parametersLances,
    true,
    successCallback, null, null, true
  );

  var parametersViagens = { motorista_id: motorista_id };
  var successCallback = function (data) {
    myApp.hidePreloader();
    var status = data.result.viagens_motorista.status;
    if (status == 200) {
      $(".quadrado2p").css({ "margin-top": " 9%" });
      $(".mini-quadrado-notifica-viagens").css({
        display: "inline-block"
      });
      $("#title-viagens").addClass("add-notifica");
      $("#notifica-viagens").show();
      $('#numero-viagens').text(data.result.viagens_motorista.qtde_viagens)
    }
  };

  RestService.connect(
    "ofertas/minhasViagensCount/",
    "GET",
    parametersViagens,
    true,
    successCallback, null, null, true
  );

  var data = new Date();
  var hora = data.getHours(); // 0-23
  var min = data.getMinutes();
  var hora_min = hora + ":" + min;

  var sauda = "";

  if (hora >= 00 && hora <= 12) {
    sauda = "Bom dia";
  }

  if (hora > 12 && hora <= 18) {
    sauda = "Boa Tarde";
  }

  if (hora > 18 && hora <= 23) {
    sauda = "Boa Noite";
  }

  let nome = localStorage.getItem("motorista.nome_completo");
  let apelido = localStorage.getItem("motorista.apelido");
  let nome1 = nome.split(" ");
  var bemvindo;

  if (apelido !== null) {
    bemvindo = sauda + " " + apelido + "!";
  } else {
    bemvindo = sauda + " " + nome1[0] + "!";
  }

  $("#bemvindo").append(bemvindo);

  function verificaAvisos() {
    var parameters = {
      motorista_id: motorista_id
    }
    var successCallback = function (data) {
      console.log(data)
      if (data.result.status == 201) {
        $('#count-avisos').show()
        $('#count-avisos').text(data.result.avisos)
      }
    }
    RestService.connect(
      "motoristas/avisosCount/",
      "GET",
      parameters,
      true,
      successCallback,
      null, null, true
    );
  }
  verificaAvisos();

  $('.open-avisos').click(function (e) {
    mainView.router.loadPage("pages/Avisos/Avisos.html");
  });

});
