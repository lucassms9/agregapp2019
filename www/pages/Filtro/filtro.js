myApp.onPageInit('filtro', function (page) {

  var datas = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Abr: '04',
    Mai: '05',
    Jun: '06',
    Jul: '07',
    Ago: '08',
    Set: '09',
    Out: '10',
    Nov: '11',
    Dez: '12'
  }

  var monthNames = ''
  var monthNamesShort = ''
  var dayNames = ''
  var dayNamesShort = ''

  var calendarDefault = myApp.calendar({
    input: '#calendar',
    monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
    toolbarTemplate: '<div style="background-color: #fff;" class="toolbar calendar-custom-toolbar"><div class="toolbar-inner">{{monthPicker}}</div></div>',
    dateFormat: 'dd M yyyy',
    rangePicker: true
  });


  $$('.calendar-custom-toolbar .center').text(monthNames)


  $('.voltarbtn').on('click', function (event) {
    page.view.router.back({
      url: page.view.history[page.view.history.length - 2],
      force: true,
      ignoreCache: true
    });
  });


  var motorista_id = localStorage.getItem('motorista.id');

  var successCallback = function (data) {
    console.log(data);
    var produtos = data.result.produtos;
    var optionsP = '<option value="">SELECIONE UM PRODUTO</option>';
    $.each(produtos, function (index, produto) {
      optionsP += "<option value=" + produto.id + "> " + produto.nome + " </option>";
    });
    $("#produtos").append(optionsP);
  }

  RestService.getConnect(
    'Produtos',
    successCallback
  );


  var successCallback = function (data) {
    console.log(data);
    var carrocerias = data.result.carrocerias;
    var optionsC = '<option value="">SELECIONE UMA CARROCERIA</option>';
    $.each(carrocerias, function (index, carroceria) {
      optionsC += "<option value=" + carroceria.id + "> " + carroceria.nome + " </option>";
    });
    $("#caminhao").append(optionsC);


  }

  RestService.getConnect(
    'carrocerias',
    successCallback
  );

  $.getJSON('assets/estados_cidades.json', function (data) {

    var items = [];
    var options = '<option value="">SELECIONE UM ESTADO</option>';

    $.each(data, function (key, val) {
      options += '<option value="' + val.sigla + '">' + val.nome + '</option>';
    });

    $("#estados_origem").html(options);

    $("#estados_origem").change(function () {

      var options_cidades = '<option value="">SELECIONE UMA CIDADE</option>';
      var str = "";

      $("#estados_origem option:selected").each(function () {
        str += $(this).text();
      });

      $.each(data, function (key, val) {
        if (val.nome == str) {
          $.each(val.cidades, function (key_city, val_city) {
            options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
          });
        }
      });

      $("#cidades_origem").html(options_cidades);

    }).change();


  });

  $.getJSON('assets/estados_cidades.json', function (data) {

    var items = [];
    var options = '<option value="">SELECIONE UM ESTADO</option>';

    $.each(data, function (key, val) {
      options += '<option value="' + val.sigla + '">' + val.nome + '</option>';
    });

    $("#estados_destino").html(options);

    $("#estados_destino").change(function () {

      var options_cidades = '<option value="">SELECIONE UMA CIDADE</option>';
      var str = "";

      $("#estados_destino option:selected").each(function () {
        str += $(this).text();
      });

      $.each(data, function (key, val) {
        if (val.nome == str) {
          $.each(val.cidades, function (key_city, val_city) {
            options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
          });
        }
      });

      $("#cidades_destino").html(options_cidades);

    }).change();

  });




  $('#botao-salvar').on('click', function (event) {

    var doc_transporte = $('#doc-transporte').val();
    var estado_origem = $('#estados_origem').val();
    var cidade_origem = $('#cidades_origem').val();
    var estado_destino = $('#estados_destino').val();
    var cidade_destino = $('#cidades_destino').val();
    var produtos = $('#produtos').val();
    var caminhao = $('#caminhao').val();
    var data = $('#calendar').val();
    var leilao = '';
    var oferta = '';
    var outros = '';
    var rastreabilidade = '';

    if (data != '') {
      var data_carrega = data.split('- ');

      var data_inicio = data_carrega[0];
      var data_inicio_quebra = data_inicio.split(" ");
      var dia_inicio = data_inicio_quebra[0];
      var mes_inicio_antes = data_inicio_quebra[1];
      var ano_inicio = data_inicio_quebra[2];
      var mes_inicio = datas[mes_inicio_antes];
      var data_inicio_final = ano_inicio + '-' + mes_inicio + '-' + dia_inicio;

      var data_fim = data_carrega[1];

      var data_fim_quebra = data_fim.split(" ");
      var dia_fim = data_fim_quebra[0];
      var mes_fim_antes = data_fim_quebra[1];
      var ano_fim = data_fim_quebra[2];
      var mes_fim = datas[mes_fim_antes];
      var data_fim_final = ano_fim + '-' + mes_fim + '-' + dia_fim;

    }

    if (typeof data_inicio_final === 'undefined') {
      data_inicio_final = ''
    }

    if (typeof data_fim_final === 'undefined') {
      data_fim_final = ''
    }

    var box = $('#box')[0];
    var leilaoCombo = $('#leilao')[0];
    var ofertaCombo = $('#oferta')[0];
    var rastreabilidadeCombo = $('#rastreabilidade')[0];

    if (leilaoCombo.checked)
      leilao = 1;
    else
      leilao = 0;

    if (ofertaCombo.checked)
      oferta = 1;
    else
      oferta = 0;

    if (box.checked)
      outros = 1;
    else
      outros = 0;

    if (rastreabilidadeCombo.checked)
      rastreabilidade = 1;
    else
      rastreabilidade = 0;

    var parametersFilters = {
      doc_transporte: doc_transporte,
      estado_origem: estado_origem,
      cidade_origem: cidade_origem,
      estado_destino: estado_destino,
      cidade_destino: cidade_destino,
      produtos: produtos,
      caminhao: caminhao,
      data_inicio_final: data_inicio_final,
      data_fim_final: data_fim_final,
      oferta: oferta,
      leilao: leilao,
      outros: outros,
      rastreabilidade: rastreabilidade
    }
    clearStorage();
    localStorage.setItem('filtro_ofertas', 1);
    parametersFiltersDeserialize = JSON.stringify(parametersFilters);
    localStorage.setItem('parametersFilters', parametersFiltersDeserialize);
    mainView.router.loadPage('pages/Ofertas/ofertas.html');

  });
});