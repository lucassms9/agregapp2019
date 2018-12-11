myApp.onPageInit("perdedor_Oferta", function(page) {
  var motorista_id = localStorage.getItem("motorista.id");
  var oferta_id = localStorage.getItem("oferta_id");

  var parameters = { oferta_id: oferta_id };
  var successCallback = function(data) {
      myApp.hidePreloader();
    var oferta = data.result.oferta;
    console.log(oferta);

    var card10 =
      '<div class="card info-bid">' +
      '<div class="card-content">' +
      '<div class="card-content-inner" style="padding-left: 15px !important;">Oferta ' +
      oferta.doc_transporte +
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

    $("#card10").append(card10);
  };

  RestService.connect(
    "ofertas/ofertasDetalhes",
    "GET",
    parameters,
    null,
    successCallback
  );

  var parameters = { get_seis_oferta: true };
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
        "<div onclick=OfertaService.abrirDetalhesList(" +
        oferta.id +
        "," +
        oferta.id +
        "," +
        motorista_id +
        ') class="row linhas" id="linha-info-' +
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
