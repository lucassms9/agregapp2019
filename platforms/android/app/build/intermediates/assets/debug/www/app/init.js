'use strict';



(function() {

/*
|------------------------------------------------------------------------------
| Initialize Framework7
| For more parameters visit https://framework7.io/docs/init-app.html
|------------------------------------------------------------------------------
*/

window.myApp = new Framework7({
	cache: true,
	domCache: true,
	init: false,
	modalTitle: 'AGREGA TRUCK',
	notificationCloseButtonText: 'OK',
	smartSelectSearchbar: true,
	modalButtonOk: 'OK',
	modalButtonCancel: 'NÃO',
	swipeBackPage: false,
	smartSelectBackText:'',
	scrollTopOnNavbarClick: true,
	pushState: true,
	smartSelectBackOnSelect: true,
});



/*
|------------------------------------------------------------------------------
| Initialize Main View
|------------------------------------------------------------------------------
*/


window.mainView = myApp.addView('.view-main');

/*
|------------------------------------------------------------------------------
| Assign Dom7 Global Function to a variable $$ to prevent conflicts with other
| libraries like jQuery or Zepto.
|------------------------------------------------------------------------------
*/

window.$$ = Dom7;

})();


document.addEventListener("deviceready", onDeviceReady, false);


		function onDeviceReady() {

		 
		 document.addEventListener("backbutton", onBackKeyDown, false);
		 document.addEventListener("menubutton", onMenuKeyDown, false);

		 checkConnection();
		}



    function checkConnection() {
        var networkState = navigator.connection.type;
        var states = {};
        // states[Connection.UNKNOWN]  = 'Unknown connection';
        // states[Connection.ETHERNET] = 'Ethernet connection';
        // states[Connection.WIFI]     = 'WiFi connection';
        // states[Connection.CELL_2G]  = 'Cell 2G connection';
        // states[Connection.CELL_3G]  = 'Cell 3G connection';
        // states[Connection.CELL_4G]  = 'Cell 4G connection';
        // states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'Você precisa estar conectado à internet para usar o aplicativo AgregaTruck';

        if(networkState == 'none'){

       		 myApp.alert(states[networkState]);
        	
        }
     
    }



	function onBackKeyDown() {


		
             // myApp.confirm('Deseja Sair do aplicativo ?', function () {


            	 // navigator.app.exitApp(); 

             // });
		

		 // QUANDO PRESSIONAR O VOLTAR FISICO DO ANDROID
			// var cpage = mainView.activePage;
			// var cpagename = cpage.name;

			// if(cpagename == 'dashboard'){



             // myApp.confirm('Deseja Sair do aplicativo ?', function () {


            	 // navigator.app.exitApp(); 

             // });

         // }

		// } if(cpagename == 'apresentacao_descarga_final'){


		// 			mainView.router.back({url: 'entregas_home.html', force: true, ignoreCache: true,reload: true}); 
		//          // mainView.router.loadPage('entregas_home.html')
		             
		//  }



		// page.view.router.back({
		// 	  url: page.view.history[page.view.history.length - 2],
		// 	  force: true,
		// 	  ignoreCache: true
		// 	});





 

 
}

function onMenuKeyDown(){

 // QUANDO PRESSIONAR O BTN MENU FISICO DO ANDROID
 
}




//  function onDeviceReady() {
//         // Register the event listener
//         document.addEventListener("backbutton", onBackKeyDown, false);
//     }


// function onBackKeyDown() {
// var cpage = mainView.activePage;
	
// }


/*
|------------------------------------------------------------------------------
| Function performed on every AJAX request
|------------------------------------------------------------------------------
*/

// $$(document).on('ajaxStart', function (e) {
// 	myApp.showPreloader('Carregando...');
// });

// $$(document).on('ajaxComplete', function (e) {
// 	myApp.hidePreloader();
// });

/*
|------------------------------------------------------------------------------
| Set last saved color and layout theme
|------------------------------------------------------------------------------
*/

// localStorage.clear()
if (localStorage.getItem('motorista.id') !== null ){

	mainView.router.loadPage({ url: 'pages/Dashboard/dashboard.html', animatePages: false,force: true})

	}else{

		mainView.router.loadPage({ url: 'pages/Apresentacao/apresentacao.html', animatePages: false,force: true,ignoreCache:true})

	}



// Carrega ajustes de ambiente
$.getScript( "app/env.js" ).fail(function( jqxhr, settings, exception ) {
	console.log("Erro ao carregar ajustes de ambiente!");
	throw exception;
});

// localStorage.clear()