var OfertaService = new function() {
  this.abrirDetalhes = function(oferta_id, oferta_tipo) {
    clearStorage();
    if (oferta_tipo == 1) {
      localStorage.setItem("oferta_id", oferta_id);
      mainView.router.loadPage("pages/Lances/lances.html");
    } else {
      localStorage.setItem("oferta_id", oferta_id);
      mainView.router.loadPage("pages/Oferta-Direta/tipo_oferta.html");
    }
  },
  this.abrirDetalhesList = function(oferta_id, oferta_tipo, motorista_id) {
      myApp.showPreloader("Carregando...");

      localStorage.setItem("oferta_id", oferta_id);

      if (oferta_tipo == 1) {
        var parameters = { oferta_id: oferta_id, motorista_id: motorista_id };

        var successCallback = function(data) {
          if (data.result.status == 404) {
            mainView.router.loadPage(
              "pages/Ofertas-Detalhes/oferta_detalhes.html"
            );
          } else if (data.result.status == 201) {
            mainView.router.loadPage("pages/Lances/lances.html");
          }
        };
        RestService.connect(
          "ofertas/verificaLance",
          "POST",
          parameters,
          true,
          successCallback,
          true,
          null,
          true
        );
      } else {
        mainView.router.loadPage("pages/Oferta-Direta/tipo_oferta.html");
      }
    },
    this.checaResultado = function(oferta_id, motorista_id) {
      var parameters = { oferta_id: oferta_id, motorista_id: motorista_id };
      var successCallback = function(data) {
        console.log(data);
        if (data.result.resultado == "vencedor") {
          localStorage.setItem("oferta_id", oferta_id);
          mainView.router.loadPage("pages/Vencedor/vencedor.html");
        } else {
          localStorage.setItem("oferta_id", oferta_id);
          mainView.router.loadPage(
            "pages/Perdedor-Oferta-Direta/perdedor_Oferta.html"
          );
        }
      };
      RestService.connect(
        "ofertas/checaResultado",
        "GET",
        parameters,
        true,
        successCallback,
        null,
        null,
        null
      );
    },
    this.classificacao = function(lances, motorista_id) {
      var porcentagem = [];
      $.each(lances, function(index, lance) {
        if (index < 6) {
          var posicao = index + 1;
          var isMoto;
          var numeroF = lance.valor;
          var porcentagemView;

          porcentagem.push(lance.valor);

          if (porcentagem.length == 1) {
            porcentagemView = "-";
          } else {
            let div = lance.valor / porcentagem[0];
            div = div - 1;
            porcentagemView = (div.toFixed(2) * 100).toFixed(0);
          }

          if (lance.motorista_id == motorista_id) isMoto = "(Você)";
          else isMoto = "";

          var lista =
            '<div  class="row">' +
            '<div class="col-30">' +
            posicao +
            " " +
            isMoto +
            "</div>" +
            '<div class="col-30">R$ ' +
            Moeda(numeroF) +
            "</div>" +
            '<div  id="col-' +
            index +
            '" class="col-30">' +
            porcentagemView +
            "</div>" +
            "</div>";

          $("#mylista").append(lista);
        }
      });
    };
};
