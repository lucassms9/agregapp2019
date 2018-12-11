/*
|------------------------------------------------------------------------------
| Walkthrough
|------------------------------------------------------------------------------
*/

	
myApp.onPageInit('walkthrough', function(page) {


					

  var mySwiper = myApp.swiper('.page[data-page=walkthrough] .swiper-container', {
    pagination:'.swiper-pagination'
  });

  var body ='<div id="slide-1" class="swiper-slide walkthrough-slide">'+

                        '<div class="logo">'+


                            '<img src="assets/img/logo.png" alt="Welcome to Agrega" width="30%" />'+

                        '</div>'+
                        
                        
                       ' <div class="slide-media">'+
                            '<img src="assets/img/caminhao.png" alt="Welcome to Agrega" />'+
                      '  </div>'+

                       ' <div class="slide-title">Seja Bem-vindo ao<br> <b>AGREGA TRUCK</b></div>'+
                       ' <div class="slide-text">Uma solução para <b>caminhoneiros</b> e <b>embarcadores</b> que vai facilitar o<br> seu dia-a-dia</div>'+

                    '</div>'+
                                       
                    '<div id="slide-2" class="swiper-slide walkthrough-slide">'+

                        '<div class="logo">'+


                            '<img src="assets/img/logo.png" alt="Welcome to Agrega" width="30%" />'+

                        '</div>'+
                    
                            '<div class="slide-media">'+
                                '<img src="assets/img/menino2.png" style="width: 46%; margin-right: 9%;" alt="Modern & Responsive" />'+
                            '</div>'+

                                '<div class="slide-title">Receba e gerencie ofertas de cargas</div>'+


                        '<div class="slide-text"> É super rápido e fácil!<br>AGREGA TRUCK é a Logística<br> na Estrada Digital!</div>'+
                    '</div>'+
              
                    '<div id="slide-3" class="swiper-slide walkthrough-slide">'+
                        '<div class="logo">'+


                            '<img src="assets/img/logo.png" alt="Welcome to Nectar" width="30%" />'+

                        '</div>'+

                        
                        '<div class="slide-media img">'+
                            '<img src="assets/img/menino.png" style=" width: 31% " />'+
                        '</div>'+
                        '<div class="slide-title aling">Vamos Começar!</div>'+

                    
                    '<a href="login.html" class="button button-index">INICIAR</a>'+
                

                   '</div>';


                

                    $('slide11').append(body)

	// myApp.swiper('.page[data-page=walkthrough] .walkthrough-container', {
	// 	pagination: '.page[data-page=walkthrough] .walkthrough-pagination',
	// 	paginationClickable: true
	// });


});