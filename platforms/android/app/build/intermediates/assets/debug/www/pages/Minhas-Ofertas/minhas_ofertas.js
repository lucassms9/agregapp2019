myApp.onPageInit("minhas_ofertas", function(page) {
  var motorista_id = localStorage.getItem("motorista.id");

  var ptrContent = $$(".pull-to-refresh-content");
  ptrContent.on("ptr:refresh", function(e) {
    setTimeout(function() {
      myApp.pullToRefreshDone();
    }, 300);
    mainView.router.refreshPage();
  });

  $("#voltar-minha-of").on("click", function(event) {
    history.length = 0;
    mainView.router.loadPage("pages/Dashboard/dashboard.html");
  });

  var parameter = {
    motorista_id: motorista_id
  };
  var successCallback = function(data) {

    myApp.hidePreloader();
    // return console.log(data);
    var viagens_motorista = data.result.viagens_motorista;
   
    if (viagens_motorista.status == 404) {
      $("#message").text(
        "Você não está participando de nenhuma oferta no momento!"
      );
      $("#lista-img4").css({
        display: "block",
        "margin-left": "auto",
        "margin-right": "auto",
        "margin-top": "20px",
        "padding-bottom": "15px"
      });
      return false;
    } 
      $.each(viagens_motorista.retorno, function(index, val) {
		  // console.log(val)
        var mes_inicio;
        var mes_destino;
        var classifica;
        var data_inicio;
        var hora_inicio;
        var imediato;
        var oferta_id = val.dados_oferta.id;
        var oferta_tipo = val.dados_oferta.oferta_tipo_id; 
        if (val.dados_oferta.data_previsao_destino != null) {
          let data_origem = quebraDatas(val.dados_oferta.data_previsao_destino);
          let hora = data_origem[3];
          let min = data_origem[4];
          let ano = data_origem[2];
          let mes = data_origem[1];
          let dia = data_origem[0];
          mes_inicio = parseInt(mes);

          var data_inicio = dia + "/" + mes;
		      var hora_inicio = hora + ":" + min +" h";
        }

        if (val.dados_oferta.oferta_tipo_id == 2) {
          classifica = "--";
        } else {
          classifica = val.classificacao;
        }
        if (val.dados_oferta.oferta_status_id >= 2) {
          status = "Finalizado";
        } else {
          status = "Ativo";
        }
        imediato = val.dados_oferta.imediato;

        if (imediato == 1) {
         imediato ='<div class="row"><b>IMEDIATO</b></div>'+'<div class="row"><br></div>';
        } else {
           imediato ='<div class="row">'+data_inicio+"</div>"+'<div class="row">'+hora_inicio+"</div>";
		}
		  var list_ofertas =
			  '<li onclick="OfertaService.abrirDetalhes(' + oferta_id + ',' + oferta_tipo+')" class="item-content">'+
			  	'<div class="item-inner ">'+
			  		'<div class="col-30">'+imediato +'<div class="row">'+status+
						  '<img id="dollar2-'+index +'" class="dollar" src="assets/img/dollar.png">'+
						  '<img id="cifra2-' +index +'" class="cifra" src="assets/img/cifra.png"></div>'+
			  		'</div>'+
					'<div class="col-30">'+
						'<span class="center1">'+
			            	'<span class="origem">'+val.dados_oferta.cliente_origem.estado+'</span>' +
			  					'<img  src="assets/img/ico-o-d.png" class="indica" width="20px">'+
			  					'<span class="destino" >'+val.dados_oferta.cliente_destino.estado_entrega+'</span>' +
			  				'</span>'+
					'</div>'+  
			  		'<div style="width: 15%;" class="col-30">' +
			  			'<span class="origem">'+val.dados_oferta.cliente_origem.nome +'</span>'+
			  		'</div>' +
			  		'<div class="col-30">' +
			  			'<img id="status-posi2-'+index+'"class="status" style="display:none;" src="assets/img/ic-status-posi.png"  >' +
			  			'<img id="status-nega2-'+index+'" class="status" style="display:none;" src="assets/img/ic-status-nega.png"  >' +
							  '<span class="posicao">'+classifica +'</span>'+
					'</div>'+
			   	'</div>' +
			  '</li>';

		  $("#list_ofertas").append(list_ofertas);

		  if (val.posicao == 1) {
			  $("#status-posi2-" + index).show();
		  } else {
			  $("#status-nega2-" + index).show();
		  }

		  if (val.dados_oferta.oferta_tipo_id == 2) {
			  $("#dollar2-" + index).show();
		  }

		  if (val.dados_oferta.oferta_tipo_id == 1) {
			  $("#cifra2-" + index).show();
		  }
      });
    
  };

  var errorCallback = function(data) {
    myApp.hidePreloader();
  };

  RestService.connect(
    "ofertas/minhasOfertas/",
    "POST",
    parameter,
    true,
    successCallback,
    errorCallback
  );
});
