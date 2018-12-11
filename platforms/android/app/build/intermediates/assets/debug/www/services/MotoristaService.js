var MotoristaService = new function () {
  this.is_cpf = function (cpf) {
    cpf = pontuacaoCpf(cpf);
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11) return false;
    for (i = 0; i < cpf.length - 1; i++)
      if (cpf.charAt(i) != cpf.charAt(i + 1)) {
        digitos_iguais = 0;
        break;
      }
    if (!digitos_iguais) {
      numeros = cpf.substring(0, 9);
      digitos = cpf.substring(9);
      soma = 0;
      for (i = 10; i > 1; i--) soma += numeros.charAt(10 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return false;
      numeros = cpf.substring(0, 10);
      soma = 0;
      for (i = 11; i > 1; i--) soma += numeros.charAt(11 - i) * i;
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return false;
      return true;
    } else return false;
  },
    this.is_cnpj = function (cnpj) {
      cpf = pontuacaoCnpj(cnpj);
      var b = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      if ((cnpj = cnpj.replace(/[^\d]/g, "")).length != 14) return false;
      if (/0{14}/.test(cnpj)) return false;
      for (var i = 0, n = 0; i < 12; n += cnpj[i] * b[++i]);
      if (cnpj[12] != ((n %= 11) < 2 ? 0 : 11 - n)) return false;
      for (var i = 0, n = 0; i <= 12; n += cnpj[i] * b[i++]);
      if (cnpj[13] != ((n %= 11) < 2 ? 0 : 11 - n)) return false;

      return true;
    },
    this.is_email = function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(email)) {
        return false;
      }
      return true;
    },
    this.is_renavam = function (renavam) {
      var d = renavam.split("");
      soma = 0,
        valor = 0,
        digito = 0,
        x = 0;

      for (var i = 5; i >= 2; i--) {
        soma += d[x] * i;
        x++;
      }

      valor = soma % 11;

      if (valor == 11 || valor == 0 || valor >= 10) {
        digito = 0;
      } else {
        digito = valor;
      }

      if (digito == d[4]) {
        return true;
      } else {
        return false;
      }
    },
    this.verificaBanimento = function (motorista_id) {
     
      if (motorista_id !== null) {

        var parameters = { motorista_id: motorista_id };

        var successCallback = function (data) {
          console.log(data)
          if (data.result.status == 201) {
            myApp.alert(data.result.message, function () {
              localStorage.clear();
              mainView.router.loadPage(
                "pages/Login/login.html"
              );
            });
          }

        };
        RestService.connect(
          "motoristas/verificaBanimento",
          "GET",
          parameters,
          true,
          successCallback,
          true,
          null,
          true
        );

      }
    }
};


var lastMin = localStorage.getItem('lastTimestamp');
var motorista_id = localStorage.getItem('motorista.id');
if (lastMin == null) {
  if (motorista_id != null){
    let d = new Date();
    let timeStamp = d.getTime();
    localStorage.setItem('lastTimestamp', timeStamp)
    MotoristaService.verificaBanimento(motorista_id);
  }
} else {
  let d = new Date();
  let minAtual = d.getMinutes();
  let timeStamp = d.getTime();
  let lastMin = new Date(localStorage.getItem('lastTimestamp'));
  let minAntigo = lastMin.getMinutes() + 2
  if (minAtual >= minAntigo) {
    MotoristaService.verificaBanimento(motorista_id);
    localStorage.setItem('lastTimestamp', d)
  }
}

