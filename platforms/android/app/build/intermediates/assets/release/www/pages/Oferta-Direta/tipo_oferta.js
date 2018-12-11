myApp.onPageInit("tipo_oferta", function (page) {
  var motorista_id = localStorage.getItem("motorista.id");
  var oferta_id = localStorage.getItem("oferta_id");
  var enredecoEntrega;
  var enredecoEntregaCurto;
  var endereco_origem;
  var endereco_origemMapa;
  var endereco_destino;
  var endereco_destinoMapa;
  var count_cli;
  var cliente_destino;
  var data_inicio;
  var data_fim;
  var multiplas
  var htmlMultipas = '';
  var parameters = { oferta_id: oferta_id };


  var successCallback = function (data) {

    myApp.hidePreloader();
    var oferta = data.result.oferta;
    multiplas = data.result.multiplas;
    if (typeof multiplas != 'undefined') {
      multiplas.forEach(multipla => {
        htmlMultipas += '<li><a href="#" class="item-link mutiplaID list-button" idOferta=' + multipla.id + ' >DT ' + multipla.doc_transporte + '</a></li>'
      });
    }

    var index = 0;
    console.log(data.result);

    if (oferta.data_previsao_origem != null) {
      let data_origem = quebraDatas(oferta.data_previsao_origem);
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
    else imediato = data_inicio + " - " + hora_inicio;

    if (oferta.unidade_medida.id == 1) ton = "Ton";
    else ton = "Kg";

    oferta_tipo = oferta.oferta_tipo_id;
    valor_inicial_oferta = oferta.valor_lance_inicial;
    lance = null;

    var valor = determinaValorFrete(oferta_tipo, valor_inicial_oferta, lance);
    if (valor != null) var numeroF = Moeda(valor);
    if(oferta.cliente_origem.endereco !== null){

      endereco_origem = oferta.cliente_origem.endereco.split(" ");
      endereco_origemMapa = endereco_origem.join("+");
      endereco_destino = oferta.cliente_destino.endereco.split(" ");
      endereco_destinoMapa = endereco_destino.join("+");
    }
    count_cli = oferta.cliente_destino.nome;
    cliente_destino = count_cli.substring(0, 35);
    var clienteDestinoNome = oferta.cliente_destino.nome.substring(0, 20);
    if (oferta.endereco_entrega == null) {
      enredecoEntrega = oferta.cliente_destino.endereco;
      enredecoEntregaCurto = oferta.cliente_destino.endereco.substring(0, 35);
    } else {
      enredecoEntrega = oferta.Oferta.endereco_entrega;
      enredecoEntregaCurto = oferta.Oferta.endereco_entrega.substring(0, 35);
    }

    var OfertaDireta =
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
      '<div style=" font-size:14px;   height: 80px;    padding: 5px 5px 2px 15px; box-shadow: 0 1px 8px rgba(0,0,0,.3) !important; background-color: #F3F3F3;" class="col-50">' +
      "<b>Prev: " +
      imediato +
      "</b><br>" +
      oferta.cliente_origem.nome +
      "</div>" +
      '<div style=" font-size:14px;height: 80px;padding: 5px 5px 2px 15px;;box-shadow: 0 1px 8px rgba(0,0,0,.3) !important;  background-color: #F3F3F3;"  class="col-50">' +
      '<span class="agendado-123" id="agendado-true123-' +
      index +
      '">Até </span>' +
      data_fim +
      " - " +
      hora_fim +
      "<br>" +
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

      '	<div style="display: none;margin: 0 0 10px 0;" id="container-multiplas" class="card segundoCard">' +
      '<div class="card-content">' +

      '<div class="card-content-inner">' +
      '<div><h4 style="color:#2196f3; margin: 0; " >Multiplas Entregas</h4></div>' +

      '<div class="list-block inset">' +
      '<ul>' +
      htmlMultipas +
      '</ul>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +

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
      '<a style="display:none" class="button button-index" id="buttonResultado-' +
      index +
      '">VER RESULTADO</a>' +
      '<a class="button button-index" id="oferta-' +
      index +
      '" >Pegar Oferta</a><br>';

    $("#OfertaDireta").append(OfertaDireta);
    if(oferta.multipla == true){
      $('#container-multiplas').show();
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

    if (oferta.caminhao_rastreado == 1) $("#sateliteimg-" + index).show();
    if (oferta.agendado == 1) {
      $("#horas-" + index).show();
      $("#agendado-true123-" + index).hide();
    }

    if (oferta.oferta_status_id != 1) {
      $("#oferta-" + index).hide();
      $("#buttonResultado-" + index).show();
    }

    $("#buttonResultado-" + index).on("click", function (event) {
      OfertaService.checaResultado(oferta.id, motorista_id);
    });


    $("#oferta-" + index).on("click", function (event) {

      myApp.modal({
        title: 'AGREGA TRUCK',
        text: 'Você deseja realmente fazer esse frete ?',
        buttons: [
          {
            text: 'NÃO',
            onClick: function () {

            }
          },
          {
            text: 'SIM',
            onClick: function () {

              var parameters = {
                motorista_id: motorista_id,
                oferta_id: oferta.id
              };

              var successCallback = function (data) {
                console.log(data)
                if (data.result.status == 201) {
                  OfertaService.checaResultado(oferta.id, motorista_id);
                } else {
                  if (data.result[0].status == 204){
                     myApp.alert(data.result[0].msg, 'AGREGA TRUCK', function () {
                       localStorage.setItem('navAtiva','perfil');
                          mainView.router.loadPage(
                            "pages/Opcoes/opcoes.html"
                          );
                     });
                  }else{
                    return myApp.alert(data.result[0].msg);
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

            }
          },
        ]
      });
    });

    $$('.mutiplaID').on('click', function () {

      var oferta_id = $(this).attr('idOferta')

      $.each(multiplas, function (index, oferta) {
        if (oferta_id == oferta.id) {

          var index = 0;
          console.log(data.result);

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

          oferta_tipo = oferta.oferta_tipo_id;
          valor_inicial_oferta = oferta.valor_lance_inicial;
          lance = null;

          var valor = determinaValorFrete(oferta_tipo, valor_inicial_oferta, lance);
          if (valor != null) var numeroF = Moeda(valor);

          endereco_origem = oferta.cliente_origem.endereco.split(" ");
          endereco_origemMapa = endereco_origem.join("+");
          endereco_destino = oferta.cliente_destino.endereco.split(" ");
          endereco_destinoMapa = endereco_destino.join("+");
          count_cli = oferta.cliente_destino.nome;
          cliente_destino = count_cli.substring(0, 35);

          var clienteDestinoNome = oferta.cliente_destino.nome.substring(0, 20);
          if (oferta.endereco_entrega == null) {
            enredecoEntrega = oferta.cliente_destino.endereco;
            enredecoEntregaCurto = oferta.cliente_destino.endereco.substring(0, 35);
          } else {
            enredecoEntrega = oferta.Oferta.endereco_entrega;
            enredecoEntregaCurto = oferta.Oferta.endereco_entrega.substring(0, 35);
          }

          var OfertaDireta =
            '<div style="background-color: #f3f3f3;margin:0 0 10px 0;" class="card segundoCard">' +
            '<div class="card-content">' +
            '<div style="    padding: 5px; !important;" class="card-content-inner">' +
            '<div class="row">' +
            '<div style="width: 100%" class="col-50">CONTRATO: ' +
            oferta.doc_transporte +
            "</div>" +
            "</div></div></div></div>" +
            '<div style="margin:0" id="card1-' +
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
            '<img id="carreta-bombril1-pop-' +
            index +
            '" style="display:none" class="caminhao-bombril" src="assets/img/carreta_bombril.png" width="140%">' +
            '<img id="carreta-tigre1-pop-' +
            index +
            '" style="display:none" class="caminhao-tigre" src="assets/img/ic-carreta_tigre.png" width="140%">' +
            '<div class="text-uf-inicial">' +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div id="truck1-' +
            index +
            '" class="truck-inicial">' +
            '<div class="ponto-inicial">' +
            '<img id="truck-bombril1-pop-' +
            index +
            '" style="display:none;top: -5px;width: 116%;" class="truck-bombril" src="assets/img/truck-bombril.png">' +
            '<img id="truck-trigre1-pop-' +
            index +
            '" style="display:none; top: -5px;width: 116%;" class="truck-trigre" src="assets/img/ic-truck-tigre.png">' +
            '<div class="text-uf-inicial-truck">' +
            "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            '<div class="col-30 center1"><div style="    text-align: left;position: relative;left:25%;font-size: 13px;margin-top: 25px;" class="fluxo">' +
            '<div id="sateliteimg1-' +
            index +
            '" class="sateliteimg">' +
            '<img class="ic-satelite" style="top: -23px;position: absolute;left: 22 %;display: none;width: 26 %;" src="assets/img/ic-satelite1.png">' +
            '</div><img style="width: 60%;" src="assets/img/ic-seta1.png">' +
            '<div class="peso-info"  style="font-size: 11px">' +
            oferta.peso_carga +
            " " +
            ton +
            "/vol " +
            oferta.volume_carga +
            "</div></div></div>" +
            '<div class="col-30">' +
            '<div style="position: relative;top:-5px;padding-left:23%;" class="ponto-final">' +
            '<img style="position: absolute;left: 73%;top:-3px;width: 25%;display: none;" class="horas" src="assets/img/ico-horas.png">' +
            '<div style="position: absolute;top: 50%;margin: 0px;left: 52%;" class="text-uf-final">' +
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
            '<div style="  font-size:14px;  height: 80px;    padding: 5px 5px 2px 15px; box-shadow: 0 1px 8px rgba(0,0,0,.3) !important; background-color: #F3F3F3;" class="col-50">' +
            "<b>Prev: " +
            imediato +
            "</b><br>" +
            oferta.cliente_origem.nome +
            "</div>" +
            '<div style="  font-size:14px;   height: 80px;   padding: 5px 5px 2px 15px;;box-shadow: 0 1px 8px rgba(0,0,0,.3) !important;  background-color: #F3F3F3;"  class="col-50">' +
            '<span class="agendado-123" id="agendado-true123-' +
            index +
            '">Até </span>' +
            data_fim +
            " - " +
            hora_fim +
            "<br>" +
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
            '	<div style="background-color: #f3f3f3;margin: 0;box-shadow: 0 1px 8px rgba(0,0,0,.3) !important;" class="card segundoCard">' +
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
            "</div>";

          $(".conteudo-oferta").html(OfertaDireta);

          if (
            oferta.veiculo_tipo.nome == "BITRUCK" ||
            oferta.veiculo_tipo.nome == "TRUCK" ||
            oferta.veiculo_tipo.nome == "TOCO" ||
            oferta.veiculo_tipo.nome == "3/4" ||
            oferta.veiculo_tipo.nome == "VLC"
          ) {
            if (oferta.cliente_origem.operacao.nome == "BBLOG") {
              $("#truck-bombril1-pop-" + index).show();
            }

            if (oferta.cliente_origem.operacao.nome == "TLOG") {
              $("#truck-trigre1-pop-" + index).show();
            }
          } else {
            if (oferta.cliente_origem.operacao.nome == "BBLOG") {
              $("#carreta-bombril1-pop-" + index).show();
            }

            if (oferta.cliente_origem.operacao.nome == "TLOG") {
              $("#carreta-tigre1-pop-" + index).show();
            }
          }

          if (oferta.caminhao_rastreado == 1) $("#sateliteimg-pop-" + index).show();
          if (oferta.agendado == 1) {
            $("#horas-pop-" + index).show();
            $("#agendado-true123-pop-" + index).hide();
          }

          myApp.popup('.popup-oferta-detalhes');

        }
      });
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
