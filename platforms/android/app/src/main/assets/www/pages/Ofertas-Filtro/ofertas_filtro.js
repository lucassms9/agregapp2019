myApp.onPageInit('ofertas_filtro', function(page) {
	
	var usuario = localStorage.getItem('id_user2');	

$('#voltar-ofertas-filro').on('click', function(event){


            mainView.router.loadPage('ofertas_maps.html');



     });

	
	$('#filtro-direta1').on('click', function(event){
		myApp.showPreloader();

	  $.ajax({
					url: urlApi+'/ofertas/filtro_direta?usuario='+usuario,
					type: 'get',
					dataType: 'json',
				})

				.done(function(data) {

					
					if(data.msg == "nenhuma oferta"){

						myApp.alert('Não foram encontrados fretes!');
					
					}else{

						
				
					// return false
					 window.sessionStorage.setItem("list", JSON.stringify(data));


					// localStorage.setItem('list',data);
					
					mainView.router.refreshPage();
					}
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {

					myApp.hidePreloader();
					console.log("complete");
				});
           

         });

$('#filtro-leilao1').on('click', function(event){

	myApp.showPreloader();


            $.ajax({
					url: urlApi+'/ofertas/filtro_leilao?usuario='+usuario,
					type: 'get',
					dataType: 'json',
				})

				.done(function(data) {

					
					if(data.msg == "nenhuma oferta"){

						myApp.alert('Não foram encontrados fretes!');
					
					}else{

						
				
					// return false
					 window.sessionStorage.setItem("list", JSON.stringify(data));


					// localStorage.setItem('list',data);
						mainView.router.refreshPage();


					}
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					myApp.hidePreloader();
					console.log("complete");
				});




         });



	


		$('#filtro-favoritos1').on('click', function () {
							
  		myApp.showPreloader();		

			$.ajax({
					url: urlApi+'/usuarios/FavoritosBusca?usuario='+usuario,
					type: 'get',
					dataType: 'json',
				})

				.done(function(data) {
					if(data.msg == "sem cadastro"){

						myApp.alert('Você precisa cadastrar uma rota favorita!');

						return false;
					
					}else if(data.msg == "nenhuma oferta"){

						myApp.alert('Não foram encontrados fretes para sua rota favorita!');

						return false;
					
					}else{

						// return false
					 window.sessionStorage.setItem("list", JSON.stringify(data));


					// localStorage.setItem('list',data);
						mainView.router.refreshPage();
						
					}
					
					
				
					
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					  	myApp.hidePreloader();
					console.log("complete");
				});
			
		});


	$$('#limpar-filtro1').on('click', function () {

			myApp.showPreloader();
						
  				mainView.router.loadPage('ofertas.html');


			});	

	$$('#botao-of-filtro1').on('click', function () {
						
  				mainView.router.loadPage('filtro.html');


			});
	
	var data = JSON.parse(sessionStorage.getItem("list"));
		

			console.log(data)
		
		$.each(data, function(index) {
			myApp.hidePreloader();
			// console.log(data)
			

			if(data[index].Oferta.status_show_app == '1'){

			
			
		
			if(data[index].Oferta.status_lance !== '0'){



			if(data[index].Oferta.tipo_lance == 1){
				
				data[index].Oferta.tipo_lance = "Leilão"
			}else{

					data[index].Oferta.tipo_lance = "Oferta"
			}

				


		  if(data[index].Oferta.data_origem != null){


			var dataa = data[index].Oferta.data_origem.split(" ");

                
                var hora_ante = dataa[1].split(":");


                var hora = hora_ante[0];
                var min = hora_ante[1];

                var data_div = dataa[0].split("-");

                var ano = data_div[0];
                var mes = data_div[1];
                var dia = data_div[2];

		  }

		   if(data[index].Oferta.data_destino != null){
                	//endereco destino
                var data_destino = data[index].Oferta.data_destino.split(" ");

             	 
                var hora_ante1 = data_destino[1].split(":");


                var hora1 = hora_ante1[0];
                var min1 = hora_ante1[1];

                var data_div1 = data_destino[0].split("-");

                var ano1 = data_div1[0];
                var mes1 = data_div1[1];
                var dia1 = data_div1[2];
            }
                if(mes == '01'){mes = 'Jan';}
              		if(mes == '02'){mes = 'Fev';}
                		if(mes == '03'){ mes = 'Mar';}
                			if(mes == '04'){ mes = 'Abr';}
                				if(mes == '05'){ mes = 'Mai';}
                					if(mes == '06'){ mes = 'Jun';}
                						if(mes == '07'){ mes = 'Jul';}
                					if(mes == '08'){ mes = 'Ago';}
                				if(mes == '09'){ mes = 'Set';}
                			if(mes == '10'){ mes = 'Out';}
                		if(mes == '11'){ mes = 'Nov';}
                	if(mes == '12'){ mes = 'Dez';}
	


                	if(mes1 == '01'){mes1 = 'Jan';}
              		if(mes1 == '02'){mes1 = 'Fev';}
                		if(mes1 == '03'){ mes1 = 'Mar';}
                			if(mes1 == '04'){ mes1 = 'Abr';}
                				if(mes1 == '05'){ mes1 = 'Mai';}
                					if(mes1 == '06'){ mes1 = 'Jun';}
                						if(mes1 == '07'){ mes1 = 'Jul';}
                					if(mes1 == '08'){ mes1 = 'Ago';}
                				if(mes1 == '09'){ mes1 = 'Set';}
                			if(mes1 == '10'){ mes1 = 'Out';}
                		if(mes1 == '11'){ mes1 = 'Nov';}
                	if(mes1 == '12'){ mes1 = 'Dez';}
                	
                	
                	// console.log(data_div)
                	
                	var imediato =  data[index].Oferta.imediato;

          		if(imediato == 1){

          			var imediato1 = "IMEDIATO";

          		}else{


          			var imediato1 = dia+'/'+mes+' - '+hora+' h';

          		}
				
				console.log(imediato1)


			if(data[index].Oferta.status_lance != "Finalizado"){


			if(data[index].Oferta.und_medida == 'Tonelada'){
				var ton = 'Ton';
			}else{

				var ton = data[index].Oferta.und_medida;
			}

			if(data[index].Oferta.valor_lance_inicial != null){
				
			var valor = data[index].Oferta.valor_lance_inicial;
	        var numero = valor.split('.');

	        numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
	        var numeroF = numero.join(',');
			}

			var card = '<div style="padding-top: 5px;" id="card-of-'+index+'" class="card">'+
			'<div style="    background: #F3F3F3;font-weight: bold;font-size: 17px;" class="row">'+
				'<div class="col-20"></div>'+
				'<div style="text-align:center;background: #F3F3F3; padding-top: 1.5px;" class="col-60"><span ">CT: '+data[index].Oferta.doc_transporte+'</span></div>'+
				'<div class="col-20"></div>'+

			'</div>'+

			'<div class="card-content">'+
			'<div class="card-content-inner">'+

			

			'<div class="row linha-inicial">'+

			'<div class="col-30">'+
			'<div id="caminhao-'+index+'" class="caminhao-inicial">'+
			'<div class="ponto-inicial">'+

			'<img id="carreta-bombril4-'+index+'" class="caminhao-bombril" src="assets/custom/img/carreta_bombril.png" width="140%">'+
			'<img id="carreta-tigre4-'+index+'" class="caminhao-tigre" src="assets/custom/img/ic-carreta_tigre.png" width="140%">'+

			'<div class="text-uf-inicial">'+
			
				'</div>'+
			  '</div>'+
			'</div>'+

			'<div id="truck-'+index+'" class="truck-inicial">'+
			'<div class="ponto-inicial">'+

			'<img id="truck-bombril4-'+index+'" class="truck-bombril" src="assets/custom/img/truck-bombril.png">'+
			'<img id="truck-trigre4-'+index+'" class="truck-trigre" src="assets/custom/img/ic-truck-tigre.png">'+

			'<div class="text-uf-inicial-truck">'+
			
			'</div>'+
			'</div>'+
			'</div>'+
			'</div>'

			+'<div class="col-30 center1"><div class="fluxo">'+
			'<div id="sateliteimg-of-'+index+'" class="sateliteimg">'+
			'<img class="ic-satelite" src="assets/custom/img/ic-satelite1.png">'+
			'</div><img style="width:60%" src="assets/custom/img/ic-seta1.png">'+
			'<div class="peso-info" style="font-size: 11px">'
			+data[index].Oferta.peso_carga+' '+ton+'/'+data[index].Oferta.volume_carga+' m³</div></div></div>'+
			'<div class="col-30">'+
			'<div class="ponto-final">'+
			'<img class="horas" src="assets/custom/img/ico-horas.png">'+
			'<div class="text-uf-final">'
			+data[index].Cliente_destino.Estado.UF+'</div>'+
			'<img style="width:100%" src="assets/custom/img/ic-casa1.png">'+
			'</div></div></div>'+
			'<div class="row linha2-inicial"><div style="width:52%" class="col-50"><b>'
			+data[index].Cliente_origem.Cidade.Nome+'</b><br>'+

			'<b>'+imediato1+'</b>'+

			'<br>R$ '+numeroF+'<img id="dollar-'+index+'" class="dollar" src="assets/custom/img/dollar.png"><img id="cifra-'+index+'" class="cifra" src="assets/custom/img/cifra.png">'+
				'<span style="position: relative;left: 8px;top: 0.4px;" id="tipo_oferta2-'+index+'"></span>'+
			'<img id="status-posi2-'+index+'"  class="status" style="display:none;" src="assets/custom/img/ic-status-posi.png" >'+
			'<img id="status-nega2-'+index+'" class="status" style="display:none;" src="assets/custom/img/ic-status-nega.png">'+

			'</div>'+
			'<div class="col-50 text-destino"><b>'
			+data[index].Cliente_destino.Municipio.Nome+' - '+data[index].Cliente_destino.Estado.UF+'</b><br>Até '
			+dia1+'/'+mes1+' - '+hora1+'h<br>'+
			'</div></div></div></div><div>';
			



			$( "#lista-cards-filtro" ).append(card);



			
		if (data[index].TipoVeiculo.nome == 'BITRUCK' || data[index].TipoVeiculo.nome == 'TRUCK' || data[index].Oferta.veiculo_tipo_id == 'TOCO' || data[index].Oferta.veiculo_tipo_id == '3/4' || data[index].Oferta.veiculo_tipo_id == 'VLC'){
				if(data[index].Cliente_origem.Operacao.nome == "BBLOG"){
					$('#truck-bombril4-'+index).show();
					}

				if(data[index].Cliente_origem.Operacao.nome == "TLOG"){

					$('#truck-trigre4-'+index).show();
	
				}
				
			}else{

				if(data[index].Cliente_origem.Operacao.nome == "BBLOG"){

						$('#carreta-bombril4-'+index).show();
	
				}

				if(data[index].Cliente_origem.Operacao.nome == "TLOG"){

				$('#carreta-tigre4-'+index).show();

					
				}

			}







			if(data[index].Oferta.caminhao_rastreado == 1 || data[index].Oferta.caminhao_rastreado == 'Sim')
			{
				$('#sateliteimg-of-'+index).show();	 
			}
		

			if (data[index].Oferta.agendado == 1 || data[index].Oferta.agendado == "Sim" ) {

				$('.horas').show();

			}

				if(data[index].Oferta.tipo_lance == 'Oferta')
			{
				$('#dollar-'+index).show();	 
					var card123 = 'Direta'
				$( "#tipo_oferta2-"+index ).append(card123); 
					$( '#tipo_oferta2-'+index ).css( "color", "#70A83B" );
			}


			if(data[index].Oferta.tipo_lance == 'Leilão')
			{
				$('#cifra-'+index).show();	
				var card123 = 'Leilão'
				$( "#tipo_oferta2-"+index ).append(card123); 
				$( '#tipo_oferta2-'+index ).css( "color", "#6CA5D8" );
			}

		

			if(data[index].Oferta.tipo_lance == 'Leilão'){
           	


                $.each(data[index].Lance, function(index2) {

                if(data[index].Lance[index2] != null){

                	if(data[index].Lance[index2].usuario_id == usuario){
                		if(index2 == 0){
                			
						$('#status-posi2-'+index).show();	 
                		}else{

						$('#status-nega2-'+index).show();	 
                			
                		}
                	
                		
                	}

                }	

              


                });
               
           	}


			$$('#card-of-'+index).on('click', function(event) {

				var usuario_id_debug = usuario;

	// var id_lance = 
	var registro = index;

	var id_lance = data[index].Oferta.id;
	var usuario_id = usuario_id_debug;

	localStorage.setItem('id_Oferta', data[index].Oferta.id );

	if(data[index].Oferta.tipo_lance == 'Leilão'){


		localStorage.setItem('id_lance', id_lance);

		$.ajax({
			url: urlApi+'/lances/verificalance?lance='+id_lance+'&usuario='+usuario_id,
			type: 'get',
			dataType: 'JSON',
			
		})
		.done(function(data) {

			console.log(data)
			if(data.retorno == 'sem lance'){


				mainView.router.loadPage('oferta_detalhes.html');

			}else{



				mainView.router.loadPage('lances.html');


			}

	})

			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});


		}else{


		localStorage.setItem('id_lance', id_lance);
		// localStorage.setItem('registro', registro);
		mainView.router.loadPage('tipo_oferta.html');

		
		}


	});

				// if verifica se esta finalizado
			}
		}
	}
	});

});

