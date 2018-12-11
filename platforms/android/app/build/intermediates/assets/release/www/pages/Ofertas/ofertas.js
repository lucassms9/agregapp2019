myApp.onPageInit("ofertas", function (page) {

  var motorista_id = localStorage.getItem("motorista.id");

  $("#voltar-ofertas").on("click", function (event) {
    clearStorage();
    history.length = 0;
    mainView.router.loadPage("pages/Dashboard/dashboard.html");
  });

  var loading = false;
  var lastIndex = $$("#lsita-cards .card").length;
  var maxItems = 20;
  var itemsPerLoad = 5;
  var parametersFilters = JSON.parse(localStorage.getItem('parametersFilters'));
  var filtro_mapa = JSON.parse(localStorage.getItem("parameters_ofertas"));
  if (filtro_mapa != null) {

    var uf_origem = filtro_mapa.uf_origem;
    var uf_destino = filtro_mapa.uf_destino;
  }
  var imediato;
  var ton;
  var oferta_tipo;
  var valor_inicial_oferta;
  var lance;
  var filtro_oferta = localStorage.getItem('filtro_ofertas');

  console.log(filtro_oferta)
  if (filtro_oferta == 1) {
    $('#limpar-filtro').show();
  } else {
    $('#limpar-filtro').hide();
  }

  function getOfertas(favoritas, direta, leilao, page) {
    
    //INICIO TRATAMENTO DE FILTROS
    var parameters = {
      uf_origem: "",
      uf_destino: "",
      direta: direta,
      leilao: leilao,
      favoritas: favoritas,
      preferenciaMotorista_id: motorista_id,
      status_oferta: 1,
      parametersFilters: parametersFilters
    };

    if (typeof page != 'undefined'){
      parameters.page = page
    }else{
      $("#lista-cards").html("");
    }
    
    if (parametersFilters !== null){
      console.log(parametersFilters)
    }

    if (uf_origem != null && typeof uf_origem != "undefined") {
      parameters.uf_origem = uf_origem;
    }
    if (uf_destino != null && typeof uf_destino != "undefined") {
      parameters.uf_destino = uf_destino;
    }

    //FIM TRATAMENTO DE FILTROS
    var successCallback = function (data) {
      if (data.result.status == 404) {
        $("#msg-404").text("Não temos ofertas disponíveis no momento!");
        $("#lista-img").show();
        $("#lista-img").css({
          display: "block",
          "margin-left": "auto",
          "margin-right": "auto",
          "margin-top": "20px"
        });
        return false;
      } else {

        $("#msg-404").text('');
        $("#lista-img").hide();
      }

      // SETA QUANTIDADE DE OFERTAS PARA USAR NA PAGINAÇÃO

      let pageAnterior = parseInt($('#maisOfertas').attr('page-ofertas'));
      let pageAtual = pageAnterior + 1;

      $('#maisOfertas').attr('page-ofertas', pageAtual);


      if (data.result.ofertas.length < maxItems){
        $('#maisOfertas').attr('disabled', true);
      }

      if (typeof data.result.statusFrete != 'undefined' && data.result.statusFrete == 500 ){
        myApp.alert(data.result.msg)
      }
      $.each(data.result.ofertas, function (index, oferta) {
        console.log(oferta);

        if (oferta.data_previsao_destino != null) {
          let data_origem = quebraDatas(oferta.data_previsao_destino);
          let hora = data_origem[3];
          let min = data_origem[4];
          let ano = data_origem[2];
          let mes = data_origem[1];
          let dia = data_origem[0];
          mes_inicio = datas[parseInt(mes)];

          console.log(mes_inicio);
          var data_inicio = dia + "/" + mes_inicio;
          var hora_inicio = hora + ":" + min + " h";
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
        lance = oferta.lances[0];

        var valor = determinaValorFrete(oferta_tipo, valor_inicial_oferta, lance);
        if (valor != null) var numeroF = Moeda(valor);

        var card =
          '<div onclick="OfertaService.abrirDetalhesList(' +
          oferta.id + ',' + oferta.oferta_tipo_id + ',' + motorista_id + ')" style="padding-top: 5px;"  class="card">' +
          '<div style="    background: #F3F3F3;font-weight: bold;font-size: 17px;" class="row">' +
          '<div class="col-20"></div>' +
          '<div style="text-align:center;background: #F3F3F3;padding-top: 1.5px;" class="col-60">' +
          "<span>CT: " +
          oferta.doc_transporte +
          "</span></div>" +
          '<div class="col-20"></div></div>' +

          '<div class="card-content">' +
          '<div class="card-content-inner">' +
          '<div class="row linha-inicial">' +
          '<div class="col-30">' +
          '<div id="caminhao-' +
          oferta.id +
          '" class="caminhao-inicial">' +
          '<div class="ponto-inicial">' +
          '<img id="carreta-bombril-' +
          oferta.id +
          '" class="caminhao-bombril" src="assets/img/carreta_bombril.png" width="140%">' +
          '<img id="carreta-tigre-' +
          oferta.id +
          '" class="caminhao-tigre" src="assets/img/ic-carreta_tigre.png" width="140%">' +
          '<div class="text-uf-inicial">' +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div id="truck-' +
          oferta.id +
          '" class="truck-inicial">' +
          '<div class="ponto-inicial">' +
          '<img id="truck-bombril-' +
          oferta.id +
          '" class="truck-bombril" src="assets/img/truck-bombril.png">' +
          '<img id="truck-trigre-' +
          oferta.id +
          '" class="truck-trigre" src="assets/img/ic-truck-tigre.png">' +
          '<div class="text-uf-inicial-truck">' +
          "</div>" +
          "</div>" +
          "</div>" +
          "</div>" +
          '<div class="col-30 center1"><div class="fluxo">' +
          '<div id="sateliteimg-' +
          oferta.id +
          '" class="sateliteimg">' +
          '<img class="ic-satelite" src="assets/img/ic-satelite1.png">' +
          '</div><img style="width:60%" src="assets/img/ic-seta1.png">' +
          '<div class="peso-info" style="font-size: 11px">' +
          oferta.peso_carga +
          " " +
          ton +
          "/vol " +
          oferta.volume_carga +
          " m³</div></div></div>" +
          '<div class="col-30">' +
          '<div class="ponto-final">' +
          '<img id="horas-' +
          oferta.id +
          '" class="horas" src="assets/img/ico-horas.png">' +
          '<div class="text-uf-final">' +
          oferta.entrega.estado +
          "</div>" +
          '<img style="width: 100%;" src="assets/img/ic-casa1.png">' +
          "</div></div></div>" +
          '<div class="row linha2-inicial"><div style="width:52%" class="col-50"><b>' +
          oferta.cliente_origem.cidade.nome +
          "/" +
          oferta.cliente_origem.estado +
          "</b><br>" +
          "<b>" +
          imediato +
          "</b>" +
          "<br>R$ " +
          numeroF +
          '<img id="dollar1-' +
          oferta.id +
          '" class="dollar" src="assets/img/dollar.png"><img id="cifra1-' +
          oferta.id +
          '" class="cifra" src="assets/img/cifra.png">' +
          '<span style="position: relative;left: 8px; top: 0.4px;" id="tipo_oferta1-' +
          oferta.id +
          '"></span>' +
          '<img id="status-posi1-' +
          oferta.id +
          '"  class="status" style="display:none;" src="assets/img/ic-status-posi.png" >' +
          '<img id="status-nega1-' +
          oferta.id +
          '" class="status" style="display:none;" src="assets/img/ic-status-nega.png"></div>' +
          '<div class="col-50 text-destino"><b>' +
          oferta.entrega.cidade.nome +
          " - " +
          oferta.entrega.estado +
          '</b><br><span class="agendado-123" id="agendado-true123-' +
          oferta.id +
          '">Até </span>' +
          data_fim +
          " - " +
          hora_fim +
          " h<br>" +
          "</div></div>" +
          "</div>" +
          "</div><div>";

        $("#lista-cards").append(card);

        if (
          oferta.veiculo_tipo.nome == "BITRUCK" ||
          oferta.veiculo_tipo.nome == "TRUCK" ||
          oferta.veiculo_tipo.nome == "TOCO" ||
          oferta.veiculo_tipo.nome == "3/4" ||
          oferta.veiculo_tipo.nome == "VLC"
        ) {
          if (oferta.cliente_origem.operacao.nome == "BBLOG") {
            $("#truck-bombril-" + oferta.id).show();
          }

          if (oferta.cliente_origem.operacao.nome == "TLOG") {
            $("#truck-trigre-" + oferta.id).show();
          }
        } else {
          if (oferta.cliente_origem.operacao.nome == "BBLOG") {
            $("#carreta-bombril-" + oferta.id).show();
          }

          if (oferta.cliente_origem.operacao.nome == "TLOG") {
            $("#carreta-tigre-" + oferta.id).show();
          }
        }

        if (oferta.caminhao_rastreado == 1) $("#sateliteimg-" + oferta.id).show();
        if (oferta.agendado == 1) {
          $("#horas-" + oferta.id).show();
          $("#agendado-true123-" + oferta.id).hide();
        }
        if (oferta.oferta_tipo_id == 2) {
          $("#dollar1-" + oferta.id).show();
          var card123 = "Direta";
          $("#tipo_oferta1-" + oferta.id).append(card123);
          $("#tipo_oferta1-" + oferta.id).css("color", "#70A83B");
        }
        if (oferta.oferta_tipo_id == 1) {
          $("#cifra1-" + oferta.id).show();
          var card123 = "Leilão";
          $("#tipo_oferta1-" + oferta.id).append(card123);
          $("#tipo_oferta1-" + oferta.id).css("color", "#6CA5D8");
        }

        if (oferta.tipo_lance == 1) {
          $.each(oferta.lances, function (index2, val) {
            if (val != null) {
              if (val.motorista_id == motorista_id) {
                if (index2 == 0) {
                  $("#status-posi1-" + oferta.id).show();
                } else {
                  $("#status-nega1-" + oferta.id).show();
                }
              }
            }
          });
        }
      });
    };

    RestService.connect(
      "ofertas/ofertasList",
      "GET",
      parameters,
      true,
      successCallback
    );

  }

  // function getOfertas(favoritas, direta, leilao) {

  $('#limpar-filtro').click(function (e) {
    clearStorage();
    mainView.refreshPage();
    e.preventDefault();
  });

  $('#filtro-direta').click(function (e) {
    $('#limpar-filtro').show();
    localStorage.setItem('filtro_ofertas', 1);
    return getOfertas(0, 1, 0)
  });

  $('#filtro-leilao').click(function (e) {
    $('#limpar-filtro').show();
    localStorage.setItem('filtro_ofertas', 1);
    return getOfertas(0, 0, 1)
  });

  $('#filtro-favoritos').click(function (e) {
    $('#limpar-filtro').show();
    localStorage.setItem('filtro_ofertas', 1);
    return getOfertas(1, 0, 0)
  });

  $('#botao-filtro').click(function (e) {
    mainView.router.loadPage('pages/Filtro/filtro.html');
  });

  $('#maisOfertas').click(function (e) {
    let pageAtual = parseInt($(this).attr('page-ofertas'));
    let pageList = pageAtual + 1;
    return getOfertas(0, 0, 0, pageList);
  });

  getOfertas()

});
