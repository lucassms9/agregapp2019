myApp.onPageInit("oferta_detalhes", function(page) {
  myApp.hidePreloader();
  var motorista_id = localStorage.getItem("motorista.id");
  var oferta_id = localStorage.getItem("oferta_id");
  var parameters = {
    oferta_id: oferta_id
  };

  $("#valor_lance").mask("000.000.000.000.000,00", { reverse: true });
  
  var successCallback = function(data) {
    var oferta = data.result.oferta;
    var lance_atual;
    var numeroF;
    var index = oferta_id;
    if (oferta.data_previsao_destino != null) {
      let data_origem = quebraDatas(oferta.data_previsao_destino);
      let hora = data_origem[3];
      let min = data_origem[4];
      let ano = data_origem[2];
      let mes = data_origem[1];
      let dia = data_origem[0];
      mes_fim = datas[parseInt(mes)];

      var data_inicio = dia + "/" + mes_fim;
      var hora_inicio = hora + " h";
    }

    if (oferta.data_previsao_destino != null) {
      let data_origem = quebraDatas(oferta.data_previsao_destino);
      let hora = data_origem[3];
      let min = data_origem[4];
      let ano = data_origem[2];
      let mes = data_origem[1];
      let dia = data_origem[0];
      mes_fim = datas[parseInt(mes)];

      var data_fim = dia + "/" + mes_fim;
      var hora_fim = hora + " h";
    }

    imediato = oferta.imediato;

    if (imediato == 1) imediato = "IMEDIATO";
    else imediato = data_inicio + " - " + hora_fim;

    if (oferta.unidade_medida.id == 1) ton = "Ton";
    else ton = "Kg";

    valor_inicial_oferta = oferta.valor_lance_inicial;
    console.log(oferta.lances);
    if (typeof oferta.lances != "undefined" && oferta.lances != "") {
      lance_atual = oferta.lances[0].valor; // lance em primero lugar
    }
    if (lance_atual != "" && typeof lance_atual != "undefined") {
      numeroF1 = "R$ " + Moeda(lance_atual);
      numeroF = Moeda(lance_atual);
    } else {
      numeroF1 = "Seja o primeiro!";
      numeroF = Moeda(valor_inicial_oferta);
    }

    endereco_origem = oferta.cliente_origem.endereco.split(" ");
    endereco_origemMapa = endereco_origem.join("+");
    endereco_destino = oferta.entrega.endereco.split(" ");
    endereco_destinoMapa = endereco_destino.join("+");
    count_cli = oferta.cliente_destino.nome;
    cliente_destino = count_cli.substring(0, 35);
    var clienteDestinoNome = oferta.cliente_destino.nome.substring(0, 35);
    if (oferta.endereco_entrega == null) {
      enredecoEntrega = oferta.entrega.endereco;
      enredecoEntregaCurto = oferta.entrega.endereco.substring(0, 35);
    } else {
      enredecoEntrega = oferta.Oferta.endereco_entrega;
      enredecoEntregaCurto = oferta.Oferta.endereco_entrega.substring(0, 35);
    }

    var DetalhesOfertaLeilao =
      '<div style="margin-bottom: 10px;" class="card segundoCard">' +
      '<div class="card-content">' +
      '<div style="    padding: 5px; !important;" class="card-content-inner">' +
      '<div class="row">' +
      '<div style="width: 100%" class="col-50">CONTRATO: ' +
      oferta.doc_transporte +
      "</div>" +
      "</div></div></div></div>" +
      '<div id="card1-' +
      index +
      '" class="card">' +
      '<div class="card-content">' +
      '<div style="padding-bottom: 10px; !important;" class="card-content-inner">' +
      '<div class="row linha-inicial">' +
      '<div class="col-30">' +
      '<div id="caminhao1-' +
      index +
      '" class="caminhao-inicial">' +
      '<div class="ponto-inicial">' +
      '<img id="carreta-bombril1-' +
      index +
      '" class="caminhao-bombril" src="assets/img/carreta_bombril.png" width="140%">' +
      '<img id="carreta-tigre1-' +
      index +
      '" class="caminhao-tigre" src="assets/img/ic-carreta_tigre.png" width="140%">' +
      '<div class="text-uf-inicial">' +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div id="truck1-' +
      index +
      '" class="truck-inicial">' +
      '<div class="ponto-inicial">' +
      '<img id="truck-bombril1-' +
      index +
      '" class="truck-bombril" src="assets/img/truck-bombril.png">' +
      '<img id="truck-trigre1-' +
      index +
      '" class="truck-trigre" src="assets/img/ic-truck-tigre.png">' +
      '<div class="text-uf-inicial-truck">' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="col-30 center1"><div class="fluxo">' +
      '<div id="sateliteimg1-' +
      index +
      '" class="sateliteimg">' +
      '<img class="ic-satelite" src="assets/img/ic-satelite1.png">' +
      '</div><img style="width: 60%;" src="assets/img/ic-seta1.png">' +
      '<div class="peso-info"  style="font-size: 11px">' +
      oferta.peso_carga +
      " " +
      ton +
      "/vol " +
      oferta.volume_carga +
      "</div></div></div>" +
      '<div class="col-30">' +
      '<div class="ponto-final">' +
      '<img class="horas" src="assets/img/ico-horas.png">' +
      '<div class="text-uf-final">' +
      oferta.entrega.estado +
      "</div>" +
      '<img style="width: 100%;" src="assets/img/ic-casa1.png">' +
      "</div></div></div>" +
      '<div class="row linha2-inicial"><div class="col-50"><b>' +
      oferta.cliente_origem.cidade.nome +
      " - " +
      oferta.cliente_origem.estado +
      "</b>" +
      "<br>R$ " +
      numeroF +
      "</div>" +
      '<div class="col-50 text-destino"><b>' +
      oferta.entrega.cidade.nome +
      " - " +
      oferta.entrega.estado +
      "</b><br>" +
      // dia1+'/'+mes1+' - '+hora1+' h<br>'+
      "</div></div></div></div></div>" +
      '<div style=" display: flex;margin-top: 10px;margin-bottom: 10px;" class="row">' +
      '<div style="    height: 80px;    padding: 5px 5px 2px 15px; box-shadow: 0 1px 8px rgba(0,0,0,.3) !important; background-color: #F3F3F3;" class="col-50">' +
      "<b>Prev: " +
      imediato +
      "</b><br>" +
      oferta.cliente_origem.nome +
      "</div>" +
      '<div style="     height: 80px;   padding: 5px 5px 2px 15px;;box-shadow: 0 1px 8px rgba(0,0,0,.3) !important;  background-color: #F3F3F3;"  class="col-50">' +
      '<span class="agendado-123" id="agendado-true123-' +
      index +
      '">Até </span>' +
      data_fim +
      " - " +
      hora_fim +
      " h<br>" +
      clienteDestinoNome +
      "</div>" +
      "</div>" +
      '<div style="margin-top: 10px;margin-bottom: 10px;box-shadow: 0 1px 8px rgba(0,0,0,.3) !important;" class="list-block accordion-list">' +
      '<ul style="background-color: #F3F3F3;">' +
      '<li class="accordion-item">' +
      '<a href="" class="item-link item-content">' +
      '<div class="item-inner">' +
      '<div class="item-title">VER ROTA NO MAPA</div>' +
      "</div>" +
      "</a>" +
      '<div class="accordion-item-content">' +
      '<iframe  style="width: 100%;margin-bottom: 7px; border:0" src="https://www.google.com/maps/embed/v1/directions?key='+KEYGMAPS+'&origin=' +
      endereco_origemMapa +
      "&destination=" +
      endereco_destinoMapa +
      '"></iframe>' +
      "</div>" +
      "</li>" +
      "</ul>" +
      "</div>" +
      '	<div class="card segundoCard">' +
      '<div class="card-content">' +
      '<div class="card-content-inner">' +
      '<div class="row">' +
      '<div class="col-50">Tipo de Veiculo</div>' +
      '<div class="col-50"><b>' +
      oferta.veiculo_tipo.nome +
      "</b></div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-50">Tipo de carroceria</div>' +
      '<div class="col-50"><b>' +
      oferta.carroceria.nome +
      "</b></div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-50">Peso liquido</div>' +
      '<div class="col-50"><b>' +
      oferta.peso_carga +
      " " +
      oferta.unidade_medida.nome +
      "</b></div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-50">Cubagem</div>' +
      '<div class="col-50"><b>' +
      oferta.volume_carga +
      " m³</b></div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-50">Mercadoria</div>' +
      '<div class="col-50"><b>' +
      oferta.produto.nome +
      "</b></div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-50">Cliente carga</div>' +
      '<div class="col-50"><b>' +
      oferta.cliente_origem.nome +
      "</b></div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-50">Cliente descarga</div>' +
      '<div class="col-50"><b>' +
      enredecoEntrega +
      "</b></div>" +
      "</div>" +
      '<div style="display:none;" id="info-adicio" class="row">' +
      '<div class="col-50">Informações Adicionais</div>' +
      '<div style="text-align: justify;" class="col-50"><b>' +
      oferta.observacao +
      "</b></div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div style="margin-top: 10px;"  class="card" id="card3">' +
      '<div class="card-content">' +
      '<div class="card-content-inner">' +
      '<div class="row">' +
      '<div class="col-50">Lance Atual</div>' +
      '<div class="col-50"><span class="cifra"></span>' +
      numeroF1 +
      "</div>" +
      "</div>" +
      '<div class="row" id="posicao2" style="line-height: 40px;">' +

      '<div class="row" style="text-align: center; line-height: 35px; font-size:17px" >' +
      '<div id="getting-started-' +index +'" style="display: block;margin-left: auto;margin-right: auto;"></div>'+
      '</div></div>' +

      '<div class="row" style="text-align: center;font-size: 15px;">' +
      '<div id="text-finalizado-' +
      index +
      '" style="display:none; margin-left: auto;' +
      'margin-right: auto; margin-top:10px;">Lance Finalizado</div></div>' +
      '<div id="Minhaoferta" class="list-block no-hairlines-between no-hairlines-between" style="">' +
      "<ul>" +
      "<li>" +
      '<div class="item-content">' +
      '<div class="item-inner">' +
      '<div class="item-title label">Seu Lance</div>' +
      '<div class="item-input">' +
      '<input id = "valor_lance" type="text" />' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</li>" +
      "</ul>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<a class="button button-index" id="buttonSubmit1">LANCE</a><br>';

    $("#Detalhes-Leilao").append(DetalhesOfertaLeilao);
    console.log(numeroF);
    if(oferta.lances.length < 1){
      $("#valor_lance").val(numeroF);
    }
    if (
      oferta.veiculo_tipo.nome == "BITRUCK" ||
      oferta.veiculo_tipo.nome == "TRUCK" ||
      oferta.veiculo_tipo.nome == "TOCO" ||
      oferta.veiculo_tipo.nome == "3/4" ||
      oferta.veiculo_tipo.nome == "VLC"
    ) {
      if (oferta.cliente_origem.operacao.nome == "BBLOG") {
        $("#truck-bombril1-" + index).show();
      }

      if (oferta.cliente_origem.operacao.nome == "TLOG") {
        $("#truck-trigre1-" + index).show();
      }
    } else {
      if (oferta.cliente_origem.operacao.nome == "BBLOG") {
        $("#carreta-bombril1-" + index).show();
      }

      if (oferta.cliente_origem.operacao.nome == "TLOG") {
        $("#carreta-tigre1-" + index).show();
      }
    }

    if (oferta.caminhao_rastreado == 1) $("#sateliteimg1-" + index).show();
    if (oferta.agendado == 1) {
      $("#horas-" + index).show();
      $("#agendado-true123-" + index).hide();
    }

    // contador cronometro
    var data_encerramento = ConvertDataTime(oferta.data_encerramento_oferta);
    $("#getting-started-" + index).countdown(data_encerramento, function(
      event
    ) {
      var dia = event.strftime("%D");
      var hora = event.strftime("%H");
      var min = event.strftime("%M");
      var seg = event.strftime("%S");

      if (dia == "00" && hora == "00" && min == "00" && seg == "00") {
        $("#getting-started-" + index).hide();
        $("#Minhaoferta").hide();
        $("#buttonSubmit1").hide();

        $("#text-finalizado-" + index).show();
      }

      $(this).text(event.strftime("Oferta encerra em %D Dias e %H:%M Horas"));
    });

    $("#buttonSubmit1").on("click", function(event) {
      var valor = $("#valor_lance").val();
      if (valor == "") {
        $("#valor_lance").focus();
        return myApp.alert("Preencha o campo com seu Lance");
      }

      var parameters = {
        motorista_id: motorista_id,
        oferta_id: oferta.id,
        valor: toDecimal(valor)
      };

      var successCallback = function(data) {
        console.log(data);
        if (data.result.status == 201) {
          mainView.router.loadPage("pages/Lances/lances.html");
        } else {
          if (
            typeof data.result[0].tipo_erro != "undefined" &&
            data.result[0].tipo_erro == "lance_minimo"
          ) {
            var valor = Moeda(data.result[0]["valor_permitido"].toString());
            var msgAlerta =
              "O Menor Lance Permitido é de " +
              valor +
              ". Você deseja dar um lance nesse valor?";
            console.log(msgAlerta);
            myApp.confirm(msgAlerta, function() {
              var parameters = {
                motorista_id: motorista_id,
                oferta_id: oferta.id,
                valor: data.result[0]["valor_permitido"]
              };

              var successCallback = function(data) {
                mainView.router.loadPage("pages/Lances/lances.html");
              };
              RestService.connect(
                "ofertas/cadastrarLance/",
                "POST",
                parameters,
                true,
                successCallback
              );
            });
          } else {
             if (data.result[0].status == 204) {
               myApp.alert(data.result[0].msg, 'AGREGA TRUCK', function () {
                 localStorage.setItem('navAtiva', 'perfil');
                 mainView.router.loadPage(
                   "pages/Opcoes/opcoes.html"
                 );
               });
             } else {
               return myApp.alert(data.result[0].msg);
             }
          }
        }
      };

      RestService.connect(
        "ofertas/cadastrarLance/",
        "POST",
        parameters,
        true,
        successCallback
      );
    });
  };
  
  RestService.connect(
    "ofertas/ofertasDetalhes",
    "GET",
    parameters,
    true,
    successCallback
  );
});
