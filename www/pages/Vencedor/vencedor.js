myApp.onPageInit("vencedor", function (page) {
  var oferta_id = localStorage.getItem("oferta_id");
  var parameters = { oferta_id: oferta_id };
  var dataPrevInicio;
  var today = new Date();
  var agendado = '';
  var successCallback = function (data) {
    var oferta = data.result.oferta;
    console.log(oferta);

    if (oferta.data_previsao_origem != null) {
      let data_origem = quebraDatas(oferta.data_previsao_origem);
      let hora = data_origem[3];
      let min = data_origem[4];
      let ano = data_origem[2];
      let mes = data_origem[1];
      let dia = data_origem[0];
      mes_inicio = datas[parseInt(mes)];

      console.log(mes_inicio);
      var data_inicio = dia + "/" + mes_inicio;
      dataPrevInicio = ano + '-' + mes + '-' + dia;
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
    var valor = oferta.lances[0].valor;
    if (valor != null || typeof valor != "undefined")
      var numeroF = Moeda(valor);

    var imediato = oferta.imediato;

    if (imediato == 1) {
      var imediato1 = "o mais rápido possível";
      var imediato2 = "Comparecer o mais rápido possível";
    } else {
      var imediato1 = "na data " + data_inicio + " - " + hora_inicio;
      var imediato2 = data_inicio + " - " + hora_inicio;
    }
    var agendado = '';
    if (oferta.agendado == 1)  agendado = "- (Agendado)";

    var ton;
    if (oferta.unidade_medida.nome == "Tonelada") ton = "Ton";
    else ton = "Kg";

    var enredecoEntrega;

    if (oferta.entrega.endereco !== null) {
      enredecoEntrega = oferta.entrega.endereco_entrega;
    } else {
      enredecoEntrega = oferta.cliente_destino.endereco;
    }

    var card_win =
      '<img src="assets/img/ic-win.png" style="display: block;' +
      "margin-left: auto;" +
      'margin-right: auto;">' +
      '<div class="title-contrato" style="text-align: center;' +
      'font-size: 18px;padding: 15px;"><b>CONTRATO ' +
      oferta.doc_transporte +
      "</b></div>" +
      '<div class="card text-win">' +
      '<div class="card-content">' +
      '<div class="card-content-inner" style="padding: 5px !important;text-align: center;' +
      'font-size: 24px;color: #1B1B1B;">' +
      "Parabéns!<br>" +
      "Você Ganhou esta oferta!" +
      '<!-- <div class="row">' +
      '<div class="contente-text">' +
      "Parabéns!" +
      "</div>" +
      "</div>" +
      '<div class="row">' +
      "Você Ganhou esta oferta!" +
      "</div> -->" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="card">' +
      '<div class="card-content">' +
      '<div class="card-content-inner">' +
      '<div class="row">' +
      '<div class="conteudo"><b>Compareça ' +
      imediato1 +
      " para carregamento na unidade " +
      oferta.cliente_origem.nome +
      " no endereço " +
      oferta.cliente_origem.endereco +
      "</b></div></div><br>" +
      '<div class="row">Tipo Veiculo: ' +
      oferta.veiculo_tipo.nome +
      "</div>" +
      '<div class="row">Peso ' +
      oferta.peso_carga +
      " " +
      oferta.unidade_medida.nome +
      " / " +
      oferta.volume_carga +
      "</div>" +
      '<div class="row">Mercadoria: ' +
      oferta.produto.nome +
      "</div>" +
      '<div class="row">Contratador: Agrega</div><BR>' +
      '<div class="row"><b>Origem:</b></div>' +
      '<div class="row">Data de Carga: ' +
      imediato2 +
      "</div>" +
      '<div class="row">' +
      oferta.cliente_origem.nome +
      "</div>" +
      '<div class="row">' +
      oferta.cliente_origem.endereco +
      "</div>" +
      '<div class="row">' +
      oferta.cliente_origem.cidade.nome +
      " - " +
      oferta.cliente_origem.estado +
      "</div>" +
      '<div class="row"><b>Destino</b></div>' +
      '<div class="row">Data de Descarga: ' +
      data_fim +
      " - " +
      hora_fim +
      " " +
      agendado +
      "</div>" +
      '<div class="row">' +
      oferta.entrega.nome +
      "</div>" +
      '<div class="row">' +
      enredecoEntrega +
      "</div>" +
      '<div class="row">' +
      oferta.entrega.cidade.nome +
      " - " +
      oferta.entrega.estado +
      "</div>" +
      '<div class="row"><b>Valor da Negociação Final: R$ ' +
      numeroF +
      "</b></div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<div class="card text-win">' +
      '<div class="card-content">' +
      '<div class="card-content-inner" style=" padding: 5px !important;' +
      'text-align: center;' +
      'font-size: 24px;' +
      'color: #1B1B1B;">' +


      '<p style="margin: 0;" >Informar Previsão de Chegada</p>' +
      '<div style="margin: 6px 0 6px 0;"  class="row" >' +
      '<div class="col-50">' +
      '<input type="text" style="padding: 7px 0 7px 7px;font-weight: bold;text-align: center;width: 140px;" placeholder="Precisao de Chegada" readonly id="picker-date-previsao">' +
      '</div>' +
      '<div class="col-50">' +
      '<input type="text" style="padding: 7px 0px 7px 7px;font-weight: bold;text-align: center;width: 94px;" placeholder="Precisao de Chegada" readonly id="picker-hora-previsao">' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div></div></div>' +
      '<div id="picker-date-container"></div>' +
      '<div style="position: relative;margin-left: 21%;margin-top:15px;" class="botoes">' +
      '<a data-popup=".popup-about" class="open-popup"><button class="quadrado"><p class="quadradop">ENTRE EM CONTATO<br> COM O EMBARCADOR</p></button></a>' +
      '<a id="botao-viagem" href="#"><button  style="margin-top:10px;margin-bottom:10px;" class="quadrado"><p class="quadradop">SEGUIR PARA<br> MINHA VIAGENS</p></button></a>' +
      "</div>";

    $("#card_win").append(card_win);

    var pickerInline = myApp.picker({
      input: '#picker-date-previsao',
      toolbarTemplate:
        '<div class="toolbar custom-modal-toolbar">' +
        '<div class="toolbar-inner custom-modal-toolbar-inner">' +
        '<div class="left">' +
        '<a href="#" class="link toolbar-randomize-link"></a>' +
        '</div>' +
        '<div class="right">' +
        '<a href="#" style="color:#fff" class="link close-picker">Fechar</a>' +
        '</div>' +
        '</div>' +
        '</div>',
      value: [today.getDate(), today.getMonth(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],

      onChange: function (picker, values, displayValues) {
        var daysInMonth = new Date(picker.value[2], picker.value[0] * 1 + 1, 0).getDate();
        if (values[1] > daysInMonth) {
          picker.cols[1].setValue(daysInMonth);
        }
      },

      formatValue: function (p, values, displayValues) {
        return displayValues[0] + ' - ' + values[1] + ' - ' + values[2];
      },

      cols: [
        
        // Days
        {
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        },
        // Months
        {
          values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          displayValues: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          textAlign: 'left'
        },
        // Years
        {
          values: (function () {
            var arr = [];
            for (var i = 1950; i <= 2030; i++) { arr.push(i); }
            return arr;
          })(),
        },
      ]
    });


    var pickerInline = myApp.picker({
      input: '#picker-hora-previsao',
      toolbarTemplate:
        '<div class="toolbar custom-modal-toolbar">' +
        '<div class="toolbar-inner custom-modal-toolbar-inner">' +
        '<div class="left">' +
        '<a href="#" class="link toolbar-randomize-link"></a>' +
        '</div>' +
        '<div class="right">' +
        '<a href="#" style="color:#fff;font-weight: bold;" class="link close-picker">Fechar</a>' +
        '</div>' +
        '</div>' +
        '</div>',
      value: [today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],

      onChange: function (picker, values, displayValues) {
        var daysInMonth = new Date(picker.value[2], picker.value[0] * 1 + 1, 0).getDate();
        if (values[1] > daysInMonth) {
          picker.cols[1].setValue(daysInMonth);
        }
      },

      formatValue: function (p, values, displayValues) {
        return displayValues[0] + ' : ' + values[1];
      },

      cols: [
        // Hours
        {
          values: (function () {
            var arr = [];
            for (var i = 0; i <= 23; i++) { arr.push(i); }
            return arr;
          })(),
        },
        // Divider
        {
          divider: true,
          content: ':'
        },
        // Minutes
        {
          values: (function () {
            var arr = [];
            for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
            return arr;
          })(),
        }
      ]
    });

    $("#botao-win").on("click", function (event) {
      if (oferta.telefone_operador != null || typeof oferta.telefone_operador != 'undefined') {
        var tel = "tel:" + oferta.telefone_operador;
        window.open(tel);
      } else {
        return myApp.alert("Não foi possível abrir.");
      }

    });

    $("#button-whats").on("click", function (event) {
      var tel = "";
      var whats = oferta.cliente_origem.contato_whatsapp;
      try {
        window.plugins.socialsharing.shareViaWhatsAppToPhone(
          whats,
          "Olá, Gostaria de tirar algumas dúvidas!",
          null /* img */,
          null /* url */,
          function () {
            console.log("share ok");
          }
        );
      } catch (err) {
        return myApp.alert("Não foi possível abrir.");
      }
    });

    $("#botao-viagem").on("click", function (event) {
      var data = $('#picker-date-previsao').val().split('-');
      var hora1 = $('#picker-hora-previsao').val().split(':');
      
      let dia = data[0].trim();
      let mes = data[1].trim();
      let ano = data[2].trim();
      let hora = hora1[0].trim();
      let min = hora1[1].trim();
      
      let dataFinal = ano + '-' + mes + '-' + dia;
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear();
      var data_show = dd + '-' + datas[parseInt(mm)] + '-' + yyyy;

      var dataPrevFinal = new Date(dataFinal);
      var dataValida = new Date(yyyy+'-'+mm+'-'+dd);
     

      if (dataPrevFinal < dataValida) {
        return myApp.alert('Colocar data Igual ou Superior a data ' + data_show);
      }
      var data_completa = ano + '-' + mes + '-' + dia + ' ' + hora + ':' + min + ':00';

      var parameters = {
        oferta_id: oferta_id,
        data_previsao_motorista_origem: data_completa,
        previsao_chegada: 1
      }
      var successCallback = function (data) {
        myApp.hidePreloader();
      }

      RestService.connect(
        "ofertas/edit/",
        "POST",
        parameters,
        true,
        successCallback
      );
      mainView.router.loadPage("pages/Minha-Agenda/minha_agenda.html");
    });
  };

  RestService.connect(
    "ofertas/getDadosOfertaVencedor/",
    "GET",
    parameters,
    true,
    successCallback
  );
});
