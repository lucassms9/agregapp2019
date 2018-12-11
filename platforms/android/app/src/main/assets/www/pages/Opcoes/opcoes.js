myApp.onPageInit('opcoes', function (page) {

	$('#voltar-opcoes').on('click', function (event) {
		history.length = 0
		mainView.router.loadPage('pages/Dashboard/dashboard.html');
	});

	var motorista_id = localStorage.getItem('motorista.id');

	function carregaCidades(estado, finalidade) {
		if (finalidade == 1) finalidade = 'origem';
		else finalidade = 'destino'
		$.getJSON('assets/estados_cidades.json', function (data) {

			var options_cidades = '<option value="">SELECIONE UMA CIDADE</option>';
			var str = "";

			$("#estados_" + finalidade + " option:selected").each(function () {
				str += $(this).text();
			});

			$.each(data, function (key, val) {
				if (val.nome == estado) {
					$.each(val.cidades, function (key_city, val_city) {
						options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
					});
				}
			});
			console.log('1')
			$("#cidades_" + finalidade + "").html(options_cidades);
		});


	}
	var parameters = {
		motorista_id: motorista_id
	};

	var successCallback = function (data) {
		myApp.hidePreloader();
		var motorista_preferencia;
		
		if (typeof data.result.motorista[0] != 'undefined')
			motorista_preferencia = data.result.motorista[0].motorista_preferencia;
	
		if (motorista_preferencia != null) {

			if (motorista_preferencia.todos_veiculos == 1){
				$("#box").attr('checked', true);
			}else{
				$("#box").attr('checked', false);
			}
			//DADOS ESTADO ORI/DEST
			var estado_origem = motorista_preferencia.estado_origem;
			if (estado_origem != '') {
				$('#estados_origem option[value="' + estado_origem + '"]').attr({ selected: "selected" });
				var label_estado_origem = $('#estados_origem option[value="' + estado_origem + '"]').text();
				$('#escolhaestado-origem').text(label_estado_origem);
				carregaCidades(label_estado_origem, 1);
			}
			var estado_destino = motorista_preferencia.estado_destino;
			if (estado_destino != '') {
				console.log(estado_destino)
				$('#estados_destino option[value="' + estado_destino + '"]').attr({ selected: "selected" });
				var label_estado_destino = $('#estados_destino option[value="' + estado_destino + '"]').text();
				$('#escolhaestado-destino').text(label_estado_destino);
				carregaCidades(label_estado_destino, 2);
			}

			//DADOS CIDADE ORI/DEST 
			var tratarCidades = function () {
				if (motorista_preferencia.cidade_origem != null) {
					var cidade_origem = motorista_preferencia.cidade_origem.nome;
					$('#cidades_origem option[value="' + cidade_origem + '"]').attr({ selected: "selected" });
					var label_cidade_origem = $('#cidades_origem option[value="' + cidade_origem + '"]').text();
					$('#escolhacidade-origem').text(label_cidade_origem);
				}
				if (motorista_preferencia.cidade_destino != null) {
					var cidade_destino = motorista_preferencia.cidade_destino.nome;
					$('#cidades_destino option[value="' + cidade_destino + '"]').attr({ selected: "selected" });
					var label_cidade_origem = $('#cidades_destino option[value="' + cidade_destino + '"]').text();
					$('#escolhacidade-destino').text(label_cidade_origem);

				}
			}
			setTimeout(tratarCidades, 50);
		}
	}

	RestService.connect(
		'motoristas/view/',
		"GET",
		parameters,
		true,
		successCallback,
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

		var estado_origem = $('#estados_origem').val();
		var cidade_origem = $('#cidades_origem').val();
		var estado_destino = $('#estados_destino').val();
		var cidade_destino = $('#cidades_destino').val();
		var todos_veiculos;

		var box = $('#box')[0];
		if (box.checked)
			todos_veiculos = 1;
		else
			todos_veiculos = 0;

		var parameters = {
			motorista_id: motorista_id,
			cidade_origem: cidade_origem,
			estado_origem: estado_origem,
			cidade_destino: cidade_destino,
			estado_destino: estado_destino,
			todos_veiculos: todos_veiculos
		};

		var successCallback = function (data) {
			myApp.hidePreloader();
			if (data.result.status == 204) {
				return myApp.alert(data.result.message);
			}
		}

		RestService.connect(
			"motoristas/prefereciaAdd",
			"POST",
			parameters,
			true,
			successCallback,
		);
	});

	$('#botao-limpar').on('click', function (event) {

		var successCallback = function (data) {
			myApp.hidePreloader();
			console.log(data);
			if (data.result.status == 201) {
				myApp.alert(data.result.message, function () {
					mainView.refreshPage()
				});
			}
		}
		RestService.getConnect(
			'motoristas/prefereciaRemove/' + motorista_id,
			successCallback
		);
	});

});