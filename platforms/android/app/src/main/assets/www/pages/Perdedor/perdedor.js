myApp.onPageInit("perdedor", function(page) {
 
  var oferta_id = localStorage.getItem("oferta_id");
  var motorista_id = localStorage.getItem("motorista.id");
  var seubid = [];

  var parameters = { oferta_id: oferta_id };

  var successCallback = function(data) {
    myApp.hidePreloader();
    var oferta = data.result.oferta;
    var lances = oferta.lances;
    var lanceWinner = oferta.lances[0];
    var porcentagem;
    var minhaPosicao;
    var qtdePosicao = lances.length;

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

    $.each(lances, function(index, lance) {
      if (lance.motorista_id == motorista_id) {
        seubid.push(lance);
        minhaPosicao = index + 1;
      }
    });

    var div = seubid[0].valor / lanceWinner.valor;
    div = div - 1;
    porcentagem = (div.toFixed(2) * 100).toFixed(0);

    var cardPerdedor =
      '<div class="card info-bid">' +
      '<div class="card-content">' +
      '<div class="card-content-inner" style="padding-left: 15px !important;">CONTRATO: ' +
      oferta.doc_transporte +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="card">' +
      '<div class="card-content">' +
      '<div class="card-content-inner">' +
      '<div class="row">Origem: ' +
      oferta.cliente_origem.cidade.nome +
      " - " +
      oferta.cliente_origem.estado +
      "</div>" +
      '<div class="row">Destino: ' +
      oferta.entrega.cidade.nome +
      " - " +
      oferta.entrega.estado +
      "</div><br>" +
      '<div class="row">Infelimente outro profissional ganhou esta oferta</div><br>' +
      '<div class="row">' +
      '<div class="col-50">Valor final da Oferta:</div>' +
      '<div class="col-50">R$ ' +
      Moeda(lanceWinner.valor) +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      '<div class="col-50">Sua Oferta</div>' +
      '<div class="col-50">R$ ' +
      Moeda(seubid[0].valor) +
      "</div>" +
      "</div>" +
      "<br>" +
      '<div class="row">' +
      "Você ficou " +
      porcentagem +
      "% acima do valor final na posição " +
      minhaPosicao +
      "/" +
      qtdePosicao +
      "." +
      "</div>" +
      "<br>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="card">' +
      '<div class="card-content">' +
      '<div class="row linhas1">' +
      '<div class="text-titulo" style="   font-size: 16px;display: block;margin-left: auto;margin-right: auto;">' +
      "Verifique Outras Ofertas parecidas:</div> </div>" +
      '<div class="row info-bid linhas">' +
      '<div class="col-66">Origem</div>' +
      '<div class="col-33">Data</div>' +
      "</div>" +
      '<div id="mylista2"></div>' +
      "</div>" +
      "</div>" +
      "</div>";

    $("#card-perdedor").append(cardPerdedor);
  };

  RestService.connect(
    "ofertas/ofertasDetalhes",
    "GET",
    parameters,
    null,
    successCallback
  );

  var parameters = { get_tres_oferta: true };
  var successCallback = function(data) {
    myApp.hidePreloader();
    var ofertas = data.result.ofertas;
    console.log(ofertas);
    $.each(ofertas, function(index, oferta) {
      if (oferta.data_previsao_destino != null) {
        let data_origem = quebraDatas(oferta.data_previsao_destino);
        let hora = data_origem[3];
        let min = data_origem[4];
        let ano = data_origem[2];
        let mes = data_origem[1];
        let dia = data_origem[0];
        mes_fim = datas[parseInt(mes)];
        var data_inicio = dia + "/" + mes_fim;
      }

      var lista2 =
          '<div onclick=OfertaService.abrirDetalhesList(' + oferta.id + ',' + oferta.id+','+motorista_id+') class="row linhas" id="linha-info-' +
        index +
        '">' +
        '<div class="col-66">' +
        oferta.cliente_origem.estado +
        " - " +
        oferta.entrega.estado +
        "</div>" +
        '<div class="col-33">' +
        data_inicio;
      "</div>" + "</div>";

      $("#mylista2").append(lista2);
    });
  };
  RestService.connect(
    "ofertas/ofertasList",
    "GET",
    parameters,
    true,
    successCallback
  );

});
