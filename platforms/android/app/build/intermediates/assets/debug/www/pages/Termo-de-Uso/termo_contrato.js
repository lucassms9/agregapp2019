myApp.onPageInit("termo_contrato", function(page) {


  $('#aceito').on('click',function(event){

   window.sessionStorage.setItem("aceito", 1);
   
   mainView.router.loadPage('cadastro2.html')

 });



  var dayName = new Array(
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado"
    );
  var monName = new Array(
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Agosto",
    "Outubro",
    "Novembro",
    "Dezembro"
    );
  var now = new Date();

  var Diatext = dayName[now.getDay()];
  var Dianumber = now.getDate();
  var mes = monName[now.getMonth()];
  var ano = now.getFullYear();

  var completa = Dianumber + " de " + mes + " de " + ano;

  $("#dataInfo").text(completa);
  console.log(completa);

});
