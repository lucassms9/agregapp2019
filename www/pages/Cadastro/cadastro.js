myApp.onPageInit("cadastro", function (page) {

  var fotoBase64 = '';

  $("#cep").blur(function () {
    var cep = document.getElementById("cep").value;
    var endereco = "endereco";
    var bairro = "bairro";
    var cidade = "cidade";
    var uf = "uf";

    var elementsId = {
      endereco: endereco,
      bairro: bairro,
      cidade: cidade,
      uf: uf
    };
    pesquisacep(cep, elementsId);
  });

  $("#cpf_cad").blur(function () {
    let cpf = this.value;

    let result = MotoristaService.is_cpf(cpf);

    console.log(result);

    if (!result) myApp.alert("Por favor, informe um CPF válido!");
  });

  $("#cpf_cad").mask("000.000.000-00", { reverse: true });
  $("#cnpj_cad").mask("00.000.000/0000-00", { reverse: true });
  $("#celular").mask("(00) 00000-0000");
  $("#cep").mask("00000-000");
  $("#data_nasc").mask("00/00/0000");

  $("#email").blur(function () {
    let email = this.value;
    let result = MotoristaService.is_email(email);
    if (!result) myApp.alert("Por favor, informe um E-MAIL válido!");
  });

  $("#GetFoto").click(function (event) {

    function onSuccess(imageURI) {
      var image = document.getElementById('minhaImagem');
      image.style.display = "block";
      image.src = "data:image/jpeg;base64," + imageURI;
      fotoBase64 = imageURI
    }

    CameraService.getFoto(onSuccess);
    event.preventDefault();
  });

  $("#buttonSubmit").on("click", function (event) {
    console.log(fotoBase64)
    var $nome = $("#nome").val();
    var $apelido = $("#apelido").val();
    var $cpf = pontuacaoCpf($("#cpf_cad").val());
    var $data_nasc = $("#data_nasc").val();
    var $celular = removeCharTel($("#celular").val());
    var $email = $("#email").val();
    var $cep = $("#cep").val();
    var $bairro = $("#bairro").val();
    var $endereco = $("#endereco").val();
    var $cidade = $("#cidade").val();
    var $estado = $("#uf").val();
    var $parentescoMae = $("#parentescoMae").val();
    var $senha = $("#senha_cad").val();
    var $confirma_senha = $("#confirma_senha").val();
    var termosDeUso = $("#termos")[0];
    var termo_aceito = 0;

    var dadosFrom = {
      nome_completo: $nome,
      apelido: $apelido,
      cpf: $cpf,
      data_nascimento: $data_nasc,
      celular: $celular,
      email: $email,
      termo_de_uso: termo_aceito,
      cep: $cep,
      bairro: $bairro,
      endereco: $endereco,
      cidade: $cidade,
      estado: $estado,
      fotoBase64: fotoBase64,
      senha: $senha,
      confirma_senha: $confirma_senha,
      completo:0

    };
    // FAZ TODAS AS VALIDAÇÕES

    if (dadosFrom.nome_completo == "") {
      myApp.alert("Preencher o campo Nome");
      return false;
    }
    if (dadosFrom.cpf == "") {
      myApp.alert("Preencher o campo CPF");
      return false;
    } else {
      var valida = MotoristaService.is_cpf(dadosFrom.cpf);
      if (valida === false) {
        return myApp.alert("Por favor, informe um CPF válido!");
      }
    }
    if (dadosFrom.data_nascimento == "") {
      return myApp.alert("Preencher o campo Data de Nascimento");
    } else {
      var dados = dadosFrom.data_nascimento.split("/");
      let dia = dados[0];
      let mes = dados[1];
      let ano = dados[2];
      var dataValida = true;

      if (dia < 1 || dia > 31) {
        dataValida = false;
      }
      if (mes < 1 || mes > 12) {
        dataValida = false;
      }
      if (ano < 1900 || ano > 2018) {
        dataValida = false;
      }
      if (dataValida === false) {
        return myApp.alert("Insira uma Data Válida");
      }

      dadosFrom.data_nascimento = ano + "-" + mes + "-" + dia;
    }

    if (dadosFrom.celular == "") {
      return myApp.alert("Preencher o campo Celular");
    }

    if (dadosFrom.email == "") {
      return myApp.alert("Preencher o campo Email");
    } else {
      if (
        dadosFrom.email.indexOf("@") == -1 ||
        dadosFrom.email.indexOf(".") == -1
      ) {
        return myApp.alert("Por favor, informe um E-MAIL válido!");
      }
    }

    if (dadosFrom.cep == "") {
      return myApp.alert("Preencher o campo CEP");
    } else {
      let cepClean = dadosFrom.cep.replace(/\D/g, "");
      let validacep = /^[0-9]{8}$/;

      if (!validacep.test(cepClean)) {
        return myApp.alert("Formato de CEP inválido.");
      }

      dadosFrom.cep = cepClean;
    }

    if (dadosFrom.bairro == "") {
      return myApp.alert("Preencher o campo Bairro");
    }
    if (dadosFrom.endereco == "") {
      return myApp.alert("Preencher o campo Endereço");
    }

    if (dadosFrom.parentesco_mae == "") {
      return myApp.alert("Preencher o campo Parentesco com a Mãe");
    }

    if (dadosFrom.senha == "") {
      return myApp.alert("Preencher o campo Senha");
    } else {
      if (dadosFrom.senha.length < 4) {
        return myApp.alert("Senha Precisa ter no minimo 4 Números ");
      }
    }

    if (dadosFrom.confirma_senha == "") {
      return myApp.alert("Preencher o campo Confirma Senha");
    }

    if (dadosFrom.senha != dadosFrom.confirma_senha) {
      return myApp.alert("Senhas Divergêntes");
    }

    if (termosDeUso.checked) {
      dadosFrom.termo_de_uso = 1;
    } else {
      return myApp.alert("Aceitar os Termos");
    }

    var errorCallback = function (xhr, textStatus, errorThrown) {
      myApp.alert(
        "Não foi possível realizar seu cadastro, tente novamente mais tarde.",
        "Erro"
      );
    };

    var successCallback = function (data) {
      console.log(data);
      // myApp.hidePreloader();

      if (data.result.status === 500) {
        if (data.result.message != "") {
          myApp.alert(data.result.message);
        }
      }

      if (data.result.status === 201) {
        
        myApp.modal({
          title: 'Seja Bem-Vindo',
          text: 'Para ter acesso completo ao aplicativo, você precisa completar seu cadastro, deseja completar seu cadastro agora ?',
          buttons: [
            {
              text: 'Não',
              onClick: function () {
                localStorage.setItem("dados_cadastro", JSON.stringify(dadosFrom));
                mainView.router.loadPage("pages/Finalizando-Cadastro/finalizando_cadastro.html");

              }
            },
            {
              text: 'Sim',
              onClick: function () {
                localStorage.setItem("dados_cadastro", JSON.stringify(dadosFrom));
                mainView.router.loadPage("pages/Cadastro/cadastro2.html");
              }
            }
          ]
        });
      }
    };

    RestService.connect(
      "motoristas/",
      "POST",
      dadosFrom,
      null,
      successCallback,
      errorCallback
    );
    event.preventDefault();
    /* Act on the event */
  });
});
