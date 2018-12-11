myApp.onPageInit("agenda_detalhe", function (page) {
  myApp.hidePreloader();

  var motorista_id = localStorage.getItem("motorista.id");
  var oferta_id = localStorage.getItem("oferta_id");
  var enredecoEntrega;
  var enredecoEntregaCurto;
  var endereco_origem;
  var endereco_origemMapa;
  var endereco_destino;
  var endereco_destinoMapa;
  var count_cli;
  var cliente_destino = '';
  var data_inicio = '';
  var data_fim = '';
  var data_contrata;
  var previsaoDestino = '';
  var dataRealDestino = '';
  var dataLiberadoViagem = '';
  var previsaoOrigem = '';
  var dataRealOrigem = '';
  var bodyDevolucao = '';
  var data_resp_bo = '';
  var devolucao_data = '';
  var showRespBO = false;
  var compraDatasOrigem = [];
  var compraDatasDestino = [];

  $("#back_agenda_detalhe").on("click", function (event) {
    mainView.router.loadPage("pages/Minha-Agenda/minha_agenda.html");
  });

  var parameters = {
    oferta_id: oferta_id
  };

  var successCallback = function (data) {
    myApp.hidePreloader();
    var oferta = data.result.oferta;
    var index = oferta.id;

    if (oferta.entrega != null) {


      if (oferta.entrega.devolucoes != '') {
        var devolucao = oferta.entrega.devolucoes[0]
        console.log(devolucao)

        //DATA DA DEVOLUÇÃO
        if (devolucao.data_devolucao != null) {

          let data_devolucao = quebraDatas(devolucao.data_devolucao);

          let hora = data_devolucao[3];
          let min = data_devolucao[4];
          let ano = data_devolucao[2];
          let mes = data_devolucao[1];
          let dia = data_devolucao[0];
          var mes_devolucao = datas[parseInt(mes)];

          devolucao_data = dia + "/" + mes_devolucao + " - " + hora + " h";
        }


        if (devolucao.resposta_bo != null) {
          showRespBO = true;
          //DATA DA RESPOSTA BO
          if (devolucao.resposta_data != null) {
            let resposta_data = quebraDatas(devolucao.resposta_data);

            let hora = resposta_data[3];
            let min = resposta_data[4];
            let ano = resposta_data[2];
            let mes = resposta_data[1];
            let dia = resposta_data[0];
            var mes_resposta = datas[parseInt(mes)];

            data_resp_bo = dia + "/" + mes_resposta + " - " + hora + " h";
          }

        }

        bodyDevolucao = '<div  id="devolucao-ok-' + index + '" class=" devolucao-histo-ok item-media"><i style=" color: #0069cc;"  class="fa fa-exchange"></i></div>' +
          '<div class="item-inner">' +

          '<span id="informa-dev">' +
          '<div class="item-title">' + devolucao.devolucao_tipo.nome + '</div>' +
          '<div class="prev">' + devolucao_data + '</div>' +
          '</span>' +

          '<span id="resposta-bo">' +
          '<div class="item-title">' + devolucao.resposta_bo + '</div>' +
          '<div class="prev">' + data_resp_bo + '</div>' +
          '</span>' +

          '</div>';
      }
    }
    //TRATAMENTO DE STATUS
    if (oferta.oferta_statuses_log != null) {

      $.each(oferta.oferta_statuses_log, function (index, status) {
        //CONTRATADO
        if (status.status_para == 2) {
          let data_contratacao = quebraDatas(status.data);
          console.log(data_contratacao)
          let hora = data_contratacao[3];
          let min = data_contratacao[4];
          let ano = data_contratacao[2];
          let mes = data_contratacao[1];
          let dia = data_contratacao[0];
          var mes_contrata = datas[parseInt(mes)];

          data_contrata = dia + "/" + mes_contrata + " - " + hora + " h";
        }

        //CHEGADA ORIGEM
        if (status.status_para == 3) {
          let data_origem = quebraDatas(status.data);
          console.log(data_origem)
          let hora = data_origem[3];
          let min = data_origem[4];
          let ano = data_origem[2];
          let mes = data_origem[1];
          let dia = data_origem[0];
          var mes_origem = datas[parseInt(mes)];

          dataRealOrigem = 'Real: ' + dia + "/" + mes_origem + " - " + hora + " h";
          compraDatasOrigem[1] = ano + '/' + mes + '/' + dia;
        }
        //LIBERADO VIAGEM
        if (status.status_para == 4) {
          let data_viagem = quebraDatas(status.data);
          console.log(data_viagem)
          let hora = data_viagem[3];
          let min = data_viagem[4];
          let ano = data_viagem[2];
          let mes = data_viagem[1];
          let dia = data_viagem[0];
          var mes_viagem = datas[parseInt(mes)];

          dataLiberadoViagem = dia + "/" + mes_viagem + " - " + hora + " h";
        }

        // CHEGADA DESTINO
        if (status.status_para == 6) {
          let data_destino = quebraDatas(status.data);
          console.log(data_destino)
          let hora = data_destino[3];
          let min = data_destino[4];
          let ano = data_destino[2];
          let mes = data_destino[1];
          let dia = data_destino[0];
          var mes_destino = datas[parseInt(mes)];

          dataRealDestino = 'Real: ' + dia + "/" + mes_destino + " - " + hora + " h";
          compraDatasDestino[1] = ano + '/' + mes + '/' + dia;
        }
      });

    }

    if (oferta.data_previsao_destino != null) {
      let data_origem = quebraDatas(oferta.data_previsao_destino);
      let hora = data_origem[3];
      let min = data_origem[4];
      let ano = data_origem[2];
      let mes = data_origem[1];
      let dia = data_origem[0];
      mes_inicio = datas[parseInt(mes)];

      var data_inicio = dia + "/" + mes_inicio;
      var hora_inicio = hora + " h";

      previsaoOrigem = dia + "/" + mes_inicio + " - " + hora + " h";

      compraDatasOrigem[0] = ano + '/' + mes + '/' + dia;
    }

    if (oferta.data_previsao_origem != null) {
      let data_origem = quebraDatas(oferta.data_previsao_origem);
      let hora = data_origem[3];
      let min = data_origem[4];
      let ano = data_origem[2];
      let mes = data_origem[1];
      let dia = data_origem[0];
      mes_fim = datas[parseInt(mes)];

      var data_fim = dia + "/" + mes_fim;
      var hora_fim = hora + " h";

      previsaoDestino = dia + "/" + mes_fim + " - " + hora + " h";
      compraDatasDestino[0] = ano + '/' + mes + '/' + dia;
    }

    imediato = oferta.imediato;

    if (imediato == 1) {

      imediato = "IMEDIATO";
      previsaoOrigem = "IMEDIATO";
    } else {
      imediato = data_inicio + " - " + hora_fim;
    }

    if (oferta.unidade_medida.id == 1) ton = "Ton";
    else ton = "Kg";

    oferta_tipo = oferta.oferta_tipo_id;
    valor_inicial_oferta = oferta.valor_lance_inicial;
    lance = null;

    var valor = determinaValorFrete(oferta_tipo, valor_inicial_oferta, lance);
    if (valor != null) var numeroF = Moeda(valor);
    if (oferta.cliente_origem.endereco !== null) {

      endereco_origem = oferta.cliente_origem.endereco.split(" ");
      endereco_origemMapa = endereco_origem.join("+");
      endereco_destino = oferta.cliente_destino.endereco.split(" ");
      endereco_destinoMapa = endereco_destino.join("+");
    }
    count_cli = oferta.cliente_destino.nome;
    cliente_destino = count_cli.substring(0, 35);

    if (oferta.endereco_entrega == null) {
      enredecoEntrega = oferta.cliente_destino.endereco;
      enredecoEntregaCurto = oferta.cliente_destino.endereco.substring(0, 35);
    } else {
      enredecoEntrega = oferta.Oferta.endereco_entrega;
      enredecoEntregaCurto = oferta.Oferta.endereco_entrega.substring(0, 35);
    }

    var status = oferta.oferta_status.nome;

    var agendaDetalhes =
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
      '<img id="carreta-bombril2-' +
      index +
      '" class="caminhao-bombril" src="assets/img/carreta_bombril.png" width="140%">' +
      '<img id="carreta-tigre2-' +
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
      '<img id="truck-bombril2-' +
      index +
      '" class="truck-bombril" src="assets/img/truck-bombril.png">' +
      '<img id="truck-trigre2-' +
      index +
      '" class="truck-trigre" src="assets/img/ic-truck-tigre.png">' +
      '<div class="text-uf-inicial-truck">' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="col-30 center1"><div class="fluxo">' +
      '<div id="sateliteimg-' +
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
      '<img id="horas-viagem-' +
      index +
      '" class="horas" src="assets/img/ico-horas.png">' +
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
      "</b><br>" + status +
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
      '<span class="agendado-123" id="agendado-true-' +
      index +
      '">Até </span>' +
      data_fim +
      " - " +
      hora_fim +
      " h<br>" +
      oferta.cliente_destino.nome +
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
      ' <div class="card segundoCard">' +
      '<div class="card-content">' +
      '<div class="card-content-inner">' +
      '<div class="row">' +
      '<div class="col-40">Mercadoria</div>' +
      '<div class="col-60"><b>' + oferta.produto.nome + '</b></div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-40">Tipo de Veiculo</div>' +
      '<div class="col-60"><b>' + oferta.veiculo_tipo.nome + ' - ' + oferta.carroceria.nome + '</b></div>' +
      '</div>' +
      '<div style="display:none;" id="info-adicio11" class="row">' +
      '<div class="col-40">Informações Adicionais</div>' +
      '<div style="text-align: justify;" class="col-60"><b>' + oferta.observacao + '</b></div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-40">Valor Negociado</div>' +
      '<div class="col-60"><b>R$ ' + numeroF + '</b></div>' +
      '</div>' +
      '<div class="row">' +
      '<div class="col-40">Endereço de entrega</div>' +
      '<div class="col-60"><b>' + enredecoEntrega + '</b></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<div style="margin-top: 10px;margin-bottom: 10px;box-shadow: 0 1px 8px rgba(0,0,0,.3) !important;" class="list-block accordion-list">' +
      '<ul style="background-color: #F3F3F3;">' +
      '<li class="accordion-item"><a href="#" class="item-content item-link">' +
      '<div class="item-inner">' +
      '<div class="item-title">Histórico da Viagem</div>' +
      '</div></a>' +
      '<div class="accordion-item-content">' +
      '<div class="list-block">' +
      '<ul>' +
      '<li id="contratacao" class="item-content">' +
      '<div id="contratacao-clock-' + index + '" class=" contratacao-clock item-media"><i class="fa fa-clock-o"></i></div>' +
      '<div id="contratacao-ok-' + index + '" class=" contratacao-ok item-media"><i class="fa fa-check-circle-o"></i></div>' +
      '<div class="item-inner">' +
      '<div class="item-title">Contratação</div>' +
      '<div class="data">' + data_contrata + '</div>' +
      '<div class="nome">' + oferta.lances[0].motorista.nome_completo + '</div>' +
      '</div>' +
      '</li>' +
      '<li id="chegada_origem"  class="item-content">' +
      '<div id="chegada-origem-clock-' + index + '" class="chegada-origem-clock item-media"><i class="fa fa-clock-o"></i></div>' +
      '<div id="chegada-origem-ok-' + index + '" class=" chegada-origem-ok item-media"><i class="fa fa-check-circle-o"></i></div>' +
      '<div class="item-inner">' +
      '<div class="item-title">Chegada Origem</div>' +
      '<div class="prev">Prev: ' + previsaoOrigem + '</div>' +
      '<div class="real">' + dataRealOrigem + '</div>' +
      '</div>' +
      '</li>' +
      '<li id="liberado_viagem"  class="item-content">' +
      '<div id="liberado-viagem-clock-' + index + '" class=" liberado-viagem-clock item-media"><i class="fa fa-clock-o"></i></div>' +
      '<div id="liberado-viagem-ok-' + index + '" class=" liberado-viagem-ok item-media"><i class="fa fa-check-circle-o"></i></div>' +
      '<div class="item-inner">' +
      '<div class="item-title">Liberado Viagem</div>' +
      '<div class="libera">' + dataLiberadoViagem + '</div>' +
      '</div>' +
      '</li>' +
      '<span id="ocorrencia-list"></span>' +
      '<li  id="chegada-destino"  class="item-content">' +
      '<div  id="chegada-destino-clock-' + index + '"  class=" chegada-destino-clock item-media"><i class="fa fa-clock-o"></i></div>' +
      '<div  id="chegada-destino-ok-' + index + '"   class=" chegada-destino-ok item-media"><i class="fa fa-check-circle-o"></i></div>' +
      '<div class="item-inner">' +
      '<div class="item-title">Chegada Destino</div>' +
      '<div class="prev">Prev: ' + previsaoDestino + '</div>' +
      '<div class="real">' + dataRealDestino + '</div>' +
      '</div>' +
      '</li>' +
      '<li id="devolucao-histo"  class="item-content">' +
      bodyDevolucao +
      '</li>' +
      '</ul>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '</ul>' +
      '</div>' +

      '<div style="position: relative;margin-left: 21%;" class="botoes">' +
      '<div style=""  id="chegada-' + index + '" class=" linha2">' +
      '<a><button  style=" margin-top:10px;"  class="quadrado2"><p class="quadrado2p-entrega"> INFORMAR<br> CHEGADA NA ORIGEM</p></button></a></div>' +
      '<a id="chegada-' + index + '" href=""><button id="chegada-show-km" style="display:none;" class="quadrado"><p class="quadradop">INFORMAR<br> CHEGADA NA<br> ORIGEM</p></button></a>' +
      '<a id="descarga-' + index + '"  style="display:none" href=""><button id="descarga-show-km" class="quadrado"><p class="quadradop">INFORMAR<br>  APRESENTAÇÃO DE<br> DESCARGA</p></button></a>' +
      '<a style="display: none"  id="finalizacao-' + index + '" href="finalizacao_descarga.html">' +
      '<button  class="quadrado">' +
      '<p class="quadradop">INFORMAR<BR> FINALIZAÇÃO DE<BR> DESCARGA</p>' +
      '</button>' +
      '</a>' +
      ' <a style="display:none;" id="ocorrencia-carga-' + index + '"><button style=" margin-top:10px;" class="quadrado2">' +
      ' <p class="quadrado2p-entrega"> INFORMAR<br> OCORRÊNCIA</p>' +
      '</button></a>' +

      '<div style="display:none;"  id="devolucao-home-' + index + '" class=" linha2">' +
      '<a><button  style=" margin-top:10px;"  class="quadrado2"><p class="quadrado2p-entrega"> INFORMAR<br> DEVOLUÇÃO</p></button></a></div>' +

      '<div style="display:none;" id="resposta-dev-' + index + '" class=" linha2"><a><button style=" margin-top:10px;" class="quadrado2">' +
      '<p class="quadrado2p-entrega"> RESULTADO DA<br> DEVOLUÇÃO</p></div>' +
      '<a data-popup=".popup-about" class="open-popup"><button style=" margin-top:10px;" class="quadrado"><p class="quadradop">ENTRE EM  <br> CONTATO COM <br>O EMBARCADOR</p></button></a>' +
      '</div>' +
      '<br>';

    $("#agendaDetalhes").append(agendaDetalhes);

    if (showRespBO == true) $('#resposta-bo').show();

    if (
      oferta.veiculo_tipo.nome == "BITRUCK" ||
      oferta.veiculo_tipo.nome == "TRUCK" ||
      oferta.veiculo_tipo.nome == "TOCO" ||
      oferta.veiculo_tipo.nome == "3/4" ||
      oferta.veiculo_tipo.nome == "VLC"
    ) {
      if (oferta.cliente_origem.operacao.nome == "BBLOG") {
        $('#truck-bombril2-' + index).show();
      }

      if (oferta.cliente_origem.operacao.nome == "TLOG") {
        $("#truck-trigre2-" + index).show();
      }
    } else {
      if (oferta.cliente_origem.operacao.nome == "BBLOG") {
        $("#carreta-bombril2-" + index).show();
      }

      if (oferta.cliente_origem.operacao.nome == "TLOG") {
        $("#carreta-tigre2-" + index).show();
      }
    }

    if (oferta.caminhao_rastreado == 1) $("#sateliteimg-" + index).show();

    if (oferta.agendado == 1) {
      $("#horas-viagem-" + index).show();
      $("#agendado-true-" + index).hide();
    }

    if (oferta.observacao == null || oferta.observacao == '') {

      $('#info-adicio11').hide();
    } else {

      $('#info-adicio11').show();

    }

    if (oferta.entrega != null) {

      // INICIO TRATAMENTO DE OCORRENCIAS
      var ocorrecias = oferta.entrega.ocorrencias

      if (ocorrecias.length > 0) {

        $.each(ocorrecias, function (index, ocorrencia) {
          if (ocorrencia.ocorrencia_categorias_id != 3) {

            if (ocorrencia.created != null) {
              let data_origem = quebraDatas(ocorrencia.created);
              let hora = data_origem[3];
              let min = data_origem[4];
              let ano = data_origem[2];
              let mes = data_origem[1];
              let dia = data_origem[0];
              mes_fim = datas[parseInt(mes)];

              var data_ocorre = dia + "/" + mes_fim;
              var hora_ocorre = hora + " h";
            }

            var ocorrencia_data = '<li id="ocorrencia-' + index + '"   class="ocorrencia item-content">' +
              '<div class="item-media"><i style="color: #ff0000;" class="fa fa-exclamation-triangle"></i></div>' +
              '<div class="item-inner">' +
              '<div class="item-title">Ocorrência ' + ocorrencia.ocorrencia_categoria.nome + '</div>' +
              '<div class="prev">' + data_ocorre + ' às ' + hora_ocorre + ' </div>' +
              '<div class="prev">Previsão Liberação: ' + ocorrencia.tempo_atraso + ' </div>' +
              '</div>' +
              '</div>' +
              '</li>';
            $('#ocorrencia-list').append(ocorrencia_data);
          }
        });
      }
      // FIM TRATAMENTO DE OCORRENCIAS
    }

    //INCIO ABRIR WHATS
    $('#button-whats').on('click', function (event) {
      var whats = oferta.cliente_origem.contato_whatsapp;
      try {
        window.plugins.socialsharing.shareViaWhatsAppToPhone('+55' + whats, 'Olá, Gostaria de tirar algumas dúvidas!', null /* img */ , null /* url */ , function () {
          console.log('share ok')
        })
      } catch (err) {
        console.log(err)
        return myApp.alert('Não foi possível abrir.');
      }
    });
    //FIM ABRIR WHATS

    // INICIO ABRIR TELEFONE
    $('#tel-cliente').text(oferta.telefone_operador);
    $('#botao-win').on('click', function (event) {
      var tel = 'tel:' + oferta.telefone_operador;
      window.open(tel);
    });
    // FIM ABRIR TELEFONE

    if (imediato == 'IMEDIATO') {
      $('.chegada-origem-ok').css({
        color: '#14AE4E',
      });
    }

    // INICIO COMPARANDO DATA DE ORIGEM
    if (typeof compraDatasOrigem[0] != 'undefined' && typeof compraDatasOrigem[1] != 'undefined') {

      var dataOrigemPrev = compraDatasOrigem[0];
      var dataOrigemReal = compraDatasOrigem[1];

      dataOrigemPrev = new Date(dataOrigemPrev.split('/').reverse().join('/'));
      dataOrigemReal = new Date(dataOrigemReal.split('/').reverse().join('/'));
      if (dataOrigemPrev < dataOrigemReal) {
        $('.chegada-origem-ok').css({
          color: '#ff0000',
        });
      } else {
        $('.chegada-origem-ok').css({
          color: '#14AE4E',
        });
      }
    }
    // FIM COMPARANDO DATA DE ORIGEM

    // INICIO COMPARANDO DATA DE DESTINO
    if (typeof compraDatasDestino[0] != 'undefined' && typeof compraDatasDestino[1] != 'undefined') {

      var dataDestinoPrev = compraDatasDestino[0];
      var dataDestinoReal = compraDatasDestino[1];

      dataDestinoPrev = new Date(dataDestinoPrev.split('/').reverse().join('/'));
      dataDestinoReal = new Date(dataDestinoReal.split('/').reverse().join('/'));
      if (dataOrigemPrev < dataOrigemReal) {
        $('.chegada-destino-ok').css({
          color: '#ff0000',
        });
      } else {
        $('.chegada-destino-ok').css({
          color: '#14AE4E',
        });
      }
    }
    // FIM COMPARANDO DATA DE DESTINO

    // INICIO HIDE OU SHOW NOS ICONS POR STATUS
    var oferta_status = oferta.oferta_status_id;

    //CONTRATADO
    $('#contratacao-clock-' + index).hide();
    $('#contratacao-ok-' + index).show();


    //CHEGADA ORIGEM
    if (oferta_status == 3) {
      $('#chegada-origem-clock-' + index).hide();
      $('#chegada-origem-ok-' + index).show();
      $('#chegada-' + index).hide();
    }
    //LIBERADO VIAGEM
    if (oferta_status == 4 || oferta_status == 5) {
      $('#liberado-viagem-clock-' + index).hide();
      $('#liberado-viagem-ok-' + index).show();

      $('#chegada-origem-clock-' + index).hide();
      $('#chegada-origem-ok-' + index).show();
      $('#chegada-' + index).hide();
      $('#descarga-' + index).show();
      $('#ocorrencia-carga-' + index).show();

    }

    // CHEGADA DESTINO
    if (oferta_status == 6) {
      $('#chegada-' + index).hide();
      $('#chegada-destino-clock-' + index).hide();
      $('#chegada-destino-ok-' + index).show();

      $('#liberado-viagem-clock-' + index).hide();
      $('#liberado-viagem-ok-' + index).show();

      $('#chegada-origem-clock-' + index).hide();
      $('#chegada-origem-ok-' + index).show();

      $('#descarga-' + index).hide();
      $('#finalizacao-' + index).show();
      $('#devolucao-home-' + index).show();

      if (oferta.entrega.devolucoes != '') {
        $('#finalizacao-' + index).hide();
        $('#devolucao-home-' + index).hide();

        if (oferta.entrega.devolucoes[0].resposta_bo != null) {
          $('#resposta-dev-' + index).show();
          $('#finalizacao-' + index).show();
        }
      }

    }

    if (oferta_status == 7) {

      $('#chegada-destino-clock-' + index).hide();
      $('#chegada-destino-ok-' + index).show();
      $('#liberado-viagem-clock-' + index).hide();
      $('#liberado-viagem-ok-' + index).show();
      $('#chegada-origem-clock-' + index).hide();
      $('#chegada-origem-ok-' + index).show();
      $('#chegada-' + index).hide();

    }

    $('#ocorrencia-carga-' + index).on('click', function (event) {
      myApp.showPreloader();
      mainView.router.loadPage('pages/Ocorrencia/ocorrencia.html')
    });

    $('#devolucao-home-' + index).on('click', function (event) {
      mainView.router.loadPage('pages/Devolucao-Home/devolucao_home.html');
    });

    $('#finalizacao-' + index).on('click', function (event) {
      mainView.router.loadPage('pages/Finalizando-Descarga/finalizacao_descarga.html')
      localStorage.setItem("oferta_id", oferta.id);
    });

    $('#resposta-dev-' + index).on('click', function (event) {
      mainView.router.loadPage('pages/Resultado-Devolucao/resultado_devolucao.html')
    });

    $('#descarga-' + index).on('click', function (event) {

      //PEGANDO LATITUDE ATUAL
      var onSuccess = function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        var parameters = {
          oferta_id: oferta_id,
          tipo: 'destino',
          latitude: latitude,
          users_id: motorista_id,
          longitude: longitude
        };
        var successCallback = function (data) {
          console.log(data)
          if (data.result.status == 204) {
            mainView.router.loadPage('pages/Apresentacao-Descarga-Final-Viagens/apresentacao_descarga_final_viagens.html')
          }
        };

        RestService.connect(
          "ofertas/informarChegada",
          "POST",
          parameters,
          true,
          successCallback
        );

      }
      GpsService.getLocation(onSuccess);



    });


    $('#chegada-' + index).on('click', function (event) {

      //PEGANDO LATITUDE ATUAL
      var onSuccess = function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        var parameters = {
          oferta_id: oferta_id,
          tipo: 'origem',
          latitude: latitude,
          users_id: motorista_id,
          longitude: longitude
        };
        var successCallback = function (data) {
          myApp.hidePreloader();
          console.log(data)
          if (data.result.status == 204) {
            mainView.router.loadPage('pages/Chegada-Origem/chegada_origem.html');
          }
        };

        RestService.connect(
          "ofertas/informarChegada",
          "POST",
          parameters,
          true,
          successCallback
        );

      }
      GpsService.getLocation(onSuccess);

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