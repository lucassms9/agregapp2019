myApp.onPageInit("ofertas_destino_map", function(page) {
  var motorista_id = localStorage.getItem("motorista_id");
  var clickMap = 0;
  var object = Array();
  var uf_filtro = localStorage.getItem("uf_filtro");

  $("#voltar-ofertas-destino").on("click", function(event) {
    history.length = 0;
    mainView.router.loadPage("pages/Dashboard/dashboard.html");
  });

  var parameters = {
    uf_filtro: uf_filtro
  };
  var successCallback = function(data) {
    myApp.hidePreloader();
    construirMapa(data.result.Resultado);
  };

  RestService.connect(
    "ofertas/mapaDestino/",
    "GET",
    parameters,
    true,
    successCallback
  );

  function construirMapa(data) {
    object = data;
    /* ==========================================================================
 						Custom Maker
 	========================================================================== */

    function CustomMarker(latlng, map, args) {
      this.latlng = latlng;
      this.args = args;
      this.setMap(map);
      this.map = map;
    }

    CustomMarker.prototype = new google.maps.OverlayView();

    CustomMarker.prototype.draw = function() {
      var self = this;

      console.log(this);

      if (!this.div) {
        var div = document.createElement("div");

        div.className = "marker1";
        div.style.position = "absolute";
        div.style.cursor = "pointer";

        var span = document.createElement("span");
        span.id = "qtdeOfertas";
        span.innerHTML = this.args.qtde;

        div.appendChild(span);

        var panes = this.getPanes();
        panes.overlayImage.appendChild(div);

        this.div = div;
      }

      var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

      if (point) {
        this.div.style.left = point.x - 20 + "px";
        this.div.style.top = point.y - 20 + "px";
      }

      google.maps.event.addDomListener(this.div, "click", function(event) {
        abrirOfertasList(self.args.uf_orin, self.args.uf);
      });
    };

    CustomMarker.prototype.getPosition = function() {
      var lat = 22.9654715;

      var lng = -44.3155935;

      var latlng = { lat, lng };
      return latlng;
    };

    CustomMarker.prototype.getDraggable = function() {
      return false;
    };

    CustomMarker.prototype.setVisible = function(visible) {
      if (this.div) {
        if (visible) {
          this.div.style.display = "table";
          this.visible = true;
        } else {
          this.div.style.display = "none";
          this.visible = false;
        }
      }
    };

    CustomMarker.prototype.getVisible = function() {
      return this.visible;
    };

    /* ==========================================================================
 Google Maps
 ========================================================================== */

    var map = {
      map: "",

      markers: [],

      lat: -22.9654715,

      lng: -44.3155935,

      createMap: function() {
        this.map = new google.maps.Map(document.getElementById("map1"), {
          center: { lat: this.lat, lng: this.lng },
          zoom: 4,
          maxZoom: 18,
          minZoom: 4,

          scrollwheel: false,
          disableDefaultUI: true,
          zoomControl: true
        });

        this.createMarkers(object);
      },

      createMarkers: function(response) {
        var self = this;

        var infoWindow = new google.maps.InfoWindow({
          content: "Loading"
        });

        var bounds = new google.maps.LatLngBounds();
        var count = 0;
        $.each(data, function(index) {
          count = count + 1;
        });
        for (var n = 0; n < count; n++) {
          var el = data[n];
          console.log(el);
          var lat = parseFloat(el.lat);
          var lat = parseFloat(el.lat);
          var lng = parseFloat(el.long);
          var latLng = new google.maps.LatLng(lat, lng);
          var marker = new CustomMarker(latLng, this.map, {
            title: 50,
            qtde: el.total_ofertas,
            uf: el.uf,
            uf_orin: el.uf_origem
          });
          this.markers.push(marker);
          bounds.extend(marker.getPosition());
          google.maps.event.addListener(marker, "click", function() {});
        }
        // New markerClustererPlus
        this.mc = new MarkerClusterer(this.map, this.markers);
      }
    };

    google.maps.event.addDomListener(window, "load", map.createMap());
  }

  function abrirOfertasList(uf_orin, uf_dest) {
    var parameters = { uf_origem: uf_orin, uf_destino: uf_dest };
    console.log(uf_orin, uf_dest);
    if (clickMap == 0) {
      localStorage.setItem("parameters_ofertas", JSON.stringify(parameters));
      localStorage.setItem("filtro_ofertas", 1);
      localStorage.removeItem('uf_filtro');
      mainView.router.loadPage("pages/Ofertas/ofertas.html");
      clickMap = 1;

      setTimeout(function() {
        clickMap = 0;
      }, 5000);
    } else {
      return false;
    }
  }
});
