myApp.onPageInit('entregas_home', function(page){


		 $('#voltar-entrega').on('click', function(event){

            history.length = 0

            mainView.router.loadPage('dashboard.html');

          });


         var onSuccess = function(position) {


                     // Latitude = position.coords.latitude;    
                     var Longitude = position.coords.longitude;   
                   
                   // localStorage.setItem("Latitude",Latitude);
                   // localStorage.setItem("Longitude",Longitude);
                    var Latitude = position.coords.latitude;
                       
                    sessionStorage.setItem('Longitude', Longitude);
                    sessionStorage.setItem('Latitude', Latitude);
                           
   
                  
                }

                function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

   		 navigator.geolocation.getCurrentPosition(onSuccess, onError);
		// pegar endereço google maps
		// maps.googleapis.com/maps/api/geocode/json?latlng=-23.2781882,-47.6715334&sensor=true

		var usuario = localStorage.getItem('id_user2');	
				$.ajax({
					url: urlApi+'/ofertas/contratado?usuario='+usuario+'&ocorrencia=',
					type: 'get',
					dataType: 'json',
			
		})
		.done(function(data) {



			console.log(data)

			if(data.msg =="nada encontrado"){

				$('#body1').text('Você não tem entregas disponíveis no momento!');
				$('#lista-img1').show();
				$('#lista-img1').css({
					'display': 'block',
					'margin-left': 'auto',
					'margin-right': 'auto',
					'margin-top': '20px'
			
				});


				return false


			}

			localStorage.setItem('oferta', data[0].Oferta.id);	
			
			localStorage.setItem('entrega_id', data[0].Entrega.id);	


		var endereco_destino = data[0].Cliente_destino.endereco;
		var contrato = data[0].Oferta.cod_contrato;

		var telefone_destino = data[0].Cliente_destino.telefone;

		var cidade_destino = data[0].Cliente_destino.Municipio.Nome;

		var estado_destino = data[0].Cliente_destino.Estado.UF;

	 	var prev_carregamento = data[0].Oferta.data_chegada;

	 	var Cliente_origem = data[0].Cliente_origem.nome;

	 	var Cliente_destino = data[0].Cliente_destino.nome;



	 	var status_descarga = data[0].Entrega.status_descarga;

	 	var data_descarga = data[0].Oferta.data_destino;
	 	var entrega_id = data[0].Entrega.id;
	 	console.log(status_descarga)
	 	console.log(data[0].Entrega.Devolucao.status)
	 

			var dataa = data[0].Oferta.data_destino.split(" ");

                var hora_ante = dataa[1].split(":");


                var hora = hora_ante[0];
                var min = hora_ante[1];

                var data_div = dataa[0].split("-");

                var ano = data_div[0];
                var mes = data_div[1];
                var dia = data_div[2];
      	


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

                	var data_descarga = dia+'/'+mes+'/'+ano+' '+hora+':'+min+' h' ;
                    var cidade_comple = cidade_destino+' - '+estado_destino;
		var body =	'<div class="card cardinfo segundoCard">'+
  						'<div class="card-content card-content-padding">'+
						 'Contrato:' +contrato+'<br>'+
			     		 'Data de Descarga: '+data_descarga+'<br>'+
			      		 'Cliente Destino: '+Cliente_destino+'<br>'+
			   		     'Endereço: '+endereco_destino+'<br>'+
			             'Cidade: '+cidade_comple+'<br>'+
			             'Telefone: ' +telefone_destino+' <br>'+
						 '</div>'+
					'</div>'+
				'<div style="position: relative;margin-left: 21%;" class="botoes">'+
				  		
				  		'<div style=" margin-top: 30px;" class="">'+
			            
			                '<a id="apresentacao" href="">'+
				                '<button  class="quadrado">'+
				                  	'<p class="quadradop">INFORMAR<BR>  APRESENTAÇÃO DE<BR> DESCARGA</p>'+
				          		'</button>'+
			             	'</a>'+
			                  
			                 '<a style="display: none" id="finaliza" href="finalizacao_descarga.html">'+
			                         '<button  class="quadrado">'+
			                                '<p class="quadradop">INFORMAR<BR> FINALIZAÇÃO DE<BR> DESCARGA</p>'+
			                        '</button>'+
			                  '</a>'+
				   
				'</div>'+
			  '<div style="margin-top: 30px;" class=" linha2">'+
			            
			                '<a id="ocorrencia">'+
			                '<button class="quadrado2">'+
			                '<p class="quadrado2p-entrega"> INFORMAR<br> OCORRÊNCIA</p>'+
			            '</button>'+
			        '</a>'+
			        
			      '</div>'+


			       '<div id="devolucao-home" style=" display:none; margin-top: 30px;"  class=" linha2">'+
			            
			                '<a >'+
			                '<button class="quadrado2">'+
			                '<p class="quadrado2p-entrega"> INFORMAR<br> DEVOLUÇÃO</p>'+
			            '</button>'+
			        '</a>'+
			        
			      '</div>'+



			       '<div id="resposta-dev" style="margin-top: 30px; display:none;"  class=" linha2">'+
			            
			                '<a >'+
			                '<button class="quadrado2">'+
			                '<p class="quadrado2p-entrega"> RESULTADO DA<br> DEVOLUÇÃO</p>'+
			            '</button>'+
			        '</a>'+
			        
			      '</div>'+


			'</div>';



			$('#body').append(body);

			
			if(status_descarga == 1){

				$('#apresentacao').hide();
				$('#finaliza').show();

				$('#ocorrencia').hide();
				$('#devolucao-home').show();


			}

			console.log(data[0].Entrega.Devolucao.resposta_bo)
			if(status_descarga == 1){

	
			
				$('#devolucao-home').show();
				$('#resposta-dev').hide();

			}


			if(data[0].Entrega.Devolucao.id != null){

					$('#devolucao-home').hide();
			}


			console.log(data[0].Entrega.Devolucao.resposta_bo)

			if(typeof data[0].Entrega.Devolucao.resposta_bo != "undefined" && data[0].Entrega.Devolucao.resposta_bo != null ){


				$('#resposta-dev').show();
			}


			$('#devolucao-home').on('click', function(event){

				// myApp.showPreloader();
				mainView.router.loadPage('devolucao_home.html');

			});

			$('#ocorrencia').on('click', function(event){

				myApp.showPreloader();
				mainView.router.loadPage('ocorrencia.html')


			});


			$('#resposta-dev').on('click', function(event){

		
				mainView.router.loadPage('resultado_devolucao.html')


			});
			$('#apresentacao').on('click', function(event){


				 var entrega_id  = localStorage.getItem('entrega_id');

				 var usuario_id = usuario;
				 var oferta_id = localStorage.getItem('oferta');


				 var lat_iniciar_descarga  = localStorage.getItem('Latitude1');
    			 var long_iniciar_descarga =localStorage.getItem('Longitude1');
				 
				 $.ajax({
				 	url: urlApi+'/entregas/DescargaAdd?entrega_id='+entrega_id+'&lat_iniciar_descarga='+lat_iniciar_descarga+'&long_iniciar_descarga='+long_iniciar_descarga+'&oferta_id='+oferta_id,
				 	type: 'get',
				 	dataType: 'json',
				
				 })
				 .done(function(data) {
				 	console.log(data)

				 		var lat4 = data.entrega[0].Entrega.lat_iniciar_descarga;
			            var long4 = data.entrega[0].Entrega.long_iniciar_descarga;
				 	
				 })
				 .fail(function() {
				 	console.log("error");
				 })
				 .always(function() {
				 	console.log("complete");
				 });
				 

				mainView.router.loadPage('apresentacao_descarga_final.html')
				mainView.router.refreshPage('entregas_home.html');

			});


					})
					.fail(function() {
						console.log("error");
					})
					.always(function() {
						console.log("complete");
					});






			});




			myApp.onPageBack('finalizacao_descarga', function(page){


			mainView.router.refreshPage('entregas_home.html')
			mainView.router.refreshPage('entregas_home.html')

			// alert('1')

			});


			myApp.onPageInit('finalizacao_descarga', function(page){

			$('.back').on('click', function(event){

				mainView.router.loadPage('entregas_home.html')
			});

});