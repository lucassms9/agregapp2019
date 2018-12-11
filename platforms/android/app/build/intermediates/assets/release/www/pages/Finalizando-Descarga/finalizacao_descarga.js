myApp.onPageInit('finalizacao_descarga', function (page) {
	

	$('.btvoltar-viagens').on('click', function (event) {
		history.length = 0
		mainView.router.loadPage("pages/Minha-Agenda/minha_agenda.html")

	});

	var motorista_id = localStorage.getItem('motorista.id');
	var oferta_id = localStorage.getItem('oferta_id');

	var data_atraso;
	var data_descarga;
	var hora_descarga;
	var latitude;
	var longitude;
	var imageTitle = {};

	var parameters = { oferta_id: oferta_id };
	var successCallback = function (data) {
		myApp.hidePreloader();
		var oferta = data.result.oferta;
		console.log(oferta)
		if (oferta.data_previsao_destino != null) {
			let data_destino = quebraDatas(oferta.data_previsao_destino);
			let hora = data_destino[3];
			let min = data_destino[4];
			let ano = data_destino[2];
			let mes = data_destino[1];
			let dia = data_destino[0];
			mes_fim = datas[parseInt(mes)];

			var data_fim = dia + "/" + mes_fim;
			var hora_fim = hora + " h";
		}

		$.each(oferta.oferta_statuses_log, function (index, status) {
			if (status.status_para == 6) {

				if (status.data != null) {
					let data_descargaAnt = quebraDatas(status.data);
					let hora = data_descargaAnt[3];
					let min = data_descargaAnt[4];
					let ano = data_descargaAnt[2];
					let mes = data_descargaAnt[1];
					let dia = data_descargaAnt[0];
					mes_descarga = datas[parseInt(mes)];

					data_descarga = dia + "/" + mes_descarga;
					hora_descarga = hora + " h";
				}
				latitude = status.latitude;
				longitude = status.longitude;
			}
		});

		$('#contrato3').append(oferta.doc_transporte);
		$('#data_descarga3').append(data_fim);
		$('#cliente_destino3').append(oferta.cliente_destino.nome);
		$('#endereco_destino3').append(oferta.cliente_destino.endereco_entrega);
		$('#cidade_destino3').append(oferta.cliente_destino.cidade.nome);
		$('#telefone_destino3').append(oferta.telefone_atendimento_destino);

		var latlng = latitude + "," + longitude;
		var successCallback = function (data) {
			var street_address, postal_code, administrative_area_level_1, administrative_area_level_2;

			for (i = 0; i < data.results[0].address_components.length; ++i) {
				var component = data.results[0].address_components[i];
				if (!administrative_area_level_2 && component.types.indexOf("administrative_area_level_2") > -1)
					administrative_area_level_2 = component.long_name;
				else if (!administrative_area_level_1 && component.types.indexOf("administrative_area_level_1") > -1)
					administrative_area_level_1 = component.short_name;
				else if (!postal_code && component.types.indexOf("postal_code") > -1)
					postal_code = component.long_name;
				else if (!street_address && component.types.indexOf("street_address") > -1)
					street_address = component.long_name;
			}
			endereco = data
			for (var i = 0; i >= endereco.results.length; i++) {
				console.log("end: " + endereco.results[i].formatted_address)
			};
			endereco_components = data.results[0]
			ende = endereco_components.formatted_address.split(',')
			var cidade = administrative_area_level_2
			var estado = administrative_area_level_1
			var endereco = ende[0]
			var cidade_estado = cidade + '-' + estado

			$('#cidade_estado-dev-tol').text(cidade_estado)
			$('#endereco9-dev-tol').text(endereco)
		}
		RestService.getGoogleLocation(
			'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&sensor=true&key=' + KEYGMAPS,
			successCallback
		);
	};

	RestService.connect(
		"ofertas/ofertasDetalhes",
		"GET",
		parameters,
		true,
		successCallback
	);


	$('#minhacamera').on('click', function (even) {

		var tipo_documento = $("#tipo_documento option:selected").val();

		if (tipo_documento == 'Escolha') {
			return myApp.alert('Escolha um tipo de documento');
		}



		var capturedPhoto = 1


		function onSuccess(imageURI) {

			var capturedPhoto1 = sessionStorage.getItem('number2')

			var capturedPhoto2 = parseInt(capturedPhoto1)
			if (Number.isNaN(capturedPhoto2)) {
				capturedPhoto2 = 0;
			}

			capturedPhoto = capturedPhoto2 + 1

			if (capturedPhoto == 1) {
				var part1 = document.getElementById('minhaImagem1');
				part1.style.display = "block";
				part1.src = "data:image/jpeg;base64," + imageURI;
				var tipo_documento = $("#tipo_documento option:selected").val();
				var titulo1 = document.getElementById('titulo1');
				$('#titulo1').text(tipo_documento)
				titulo1.style.display = "block";
				var debug_titulo1 = $('#titulo1').text()
				url_img1 = imageURI;
				imageTitle.image1 = url_img1;
				imageTitle.titulo1 = debug_titulo1;
			}

			if (capturedPhoto == 2) {
				var part2 = document.getElementById('minhaImagem2');
				part2.style.display = "block";
				part2.src = "data:image/jpeg;base64," + imageURI;
				var tipo_documento = $("#tipo_documento option:selected").val();
				var titulo2 = document.getElementById('titulo2');
				$('#titulo2').text(tipo_documento)
				titulo2.style.display = "block";
				var debug_titulo2 = $('#titulo2').text()
				url_img2 = imageURI;
				imageTitle.url_img2 = url_img2;
				imageTitle.titulo2 = debug_titulo2;
			}

			if (capturedPhoto == 3) {
				var part3 = document.getElementById('minhaImagem3');
				part3.style.display = "block";
				part3.src = "data:image/jpeg;base64," + imageURI;
				var tipo_documento = $("#tipo_documento option:selected").val();
				var titulo3 = document.getElementById('titulo3');
				$('#titulo3').text(tipo_documento)
				titulo3.style.display = "block";
				var debug_titulo3 = $('#titulo3').text()
				url_img3 = imageURI;
				imageTitle.url_img3 = url_img3;
				imageTitle.titulo3 = debug_titulo3;
			}

			if (capturedPhoto == 4) {
				var part4 = document.getElementById('minhaImagem4');
				part4.style.display = "block";
				part4.src = "data:image/jpeg;base64," + imageURI;

				var tipo_documento = $("#tipo_documento option:selected").val();

				var titulo4 = document.getElementById('titulo4');

				$('#titulo4').text(tipo_documento)

				titulo4.style.display = "block";
				var debug_titulo4 = $('#titulo4').text()
				url_img4 = imageURI;
				imageTitle.url_img4 = url_img4;
				imageTitle.titulo4 = debug_titulo4;
			}

			if (capturedPhoto > 4) {
				capturedPhoto = 0
			}
			sessionStorage.setItem('number2', capturedPhoto)
		}

		CameraService.getFoto(onSuccess);
		event.preventDefault();

	});



	$('#fim-descarga').on('click', function (event) {

		myApp.showPreloader();

		var onSuccess = function (position) {
			let latitude = position.coords.latitude;
			let longitude = position.coords.longitude;

			var parameters = {
				users_id: motorista_id,
				oferta_id: oferta_id,
				latitude: latitude,
				longitude: longitude,
				imageTitle: imageTitle
			};

			var successCallback = function (data) {
				if (data.result.status == 204) {
					sessionStorage.clear();
					mainView.router.loadPage('pages/Finalziando-Descarga-Final/finalizacao_descarga_final.html')
				}
			};

			RestService.connect(
				"ofertas/finalizacaoDescarga",
				"POST",
				parameters,
				true,
				successCallback
			);
		}

		GpsService.getLocation(onSuccess);

	});
});