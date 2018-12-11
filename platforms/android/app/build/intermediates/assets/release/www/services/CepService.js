function limpa_formulário_cep(elementId) {
  //Limpa valores do formulário de cep.
    document.getElementById(elementId.endereco).value = "";
    document.getElementById(elementId.bairro).value = "";
    document.getElementById(elementId.cidade).value = "";
    document.getElementById(elementId.uf).value = "";
}

function chamadaApiCep(valor, elementId){

    $.getJSON("https://viacep.com.br/ws/" + valor + "/json/", function(
      data,
      textStatus,
      jqXHR
    ) {
      if (!("erro" in data)) {
        //Atualiza os campos com os valores.
        document.getElementById(elementId.endereco).value = data.logradouro;
        document.getElementById(elementId.bairro).value = data.bairro;
        document.getElementById(elementId.cidade).value = data.localidade;
        document.getElementById(elementId.uf).value = data.uf;
      } //end if.
      else {
        //CEP não Encontrado.
        limpa_formulário_cep(elementId);
        return myApp.alert("CEP não encontrado.");
      }
    });
}

function pesquisacep(valor, elementsId) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById(elementsId.endereco).value = "...";
            document.getElementById(elementsId.bairro).value = "...";
            document.getElementById(elementsId.cidade).value = "...";
            document.getElementById(elementsId.uf).value = "...";       

            chamadaApiCep(valor, elementsId);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep(elementsId);
           return myApp.alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep(elementsId);
    }
};