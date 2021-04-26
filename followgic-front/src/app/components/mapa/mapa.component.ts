import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as MapboxLanguage from '@mapbox/mapbox-gl-language';
import { LocalizacionService } from 'src/app/services/localizacion.service';
import { hostViewClassName } from '@angular/compiler';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  mapa: mapboxgl.Map;
  coordenadas: any = []
  coordinatesGeocoder: any


  @Input()
  localizaciones: any = { geoJson: {} }
  constructor(public localizacionService: LocalizacionService) {
this.localizacionService.localizacionEventos$.subscribe(res => {
  this.localizaciones = res
  this.cargarMapa()
})

this.localizacionService.localizacionUsuarios$.subscribe(res => {
  this.localizaciones = res
  this.cargarMapa()
})
  }

  ngOnInit(){
 




  }

  cargarMapa() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamVzZWxpcm9kIiwiYSI6ImNrbXc5NzJ3ejBiMmozMXBmYjg0cHoyeGMifQ.VvU4iNx2-3NTrFR6PiTvCQ';

    this.mapa = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-3.9597165, 40.4381388], // starting position [longitud,latitud]
      zoom: 4 // starting zoom,

    });
  



    this.mapa.addControl(new MapboxLanguage({
      defaultLanguage: 'es'
    }));

    this.mapa.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        localGeocoder: this.coordinatesGeocoder,
        zoom: 5,
        placeholder: 'Buscar por ciudad',
        mapboxgl: mapboxgl
      })

    );


    
    /* Given a query in the form "lng, lat" or "lat, lng"
  * returns the matching geographic coordinate(s)
  * as search results in carmen geojson format,
  * https://github.com/mapbox/carmen/blob/master/carmen-geojson.md */
    this.coordinatesGeocoder = function (query) {
      // Match anything which looks like
      // decimal degrees coordinate pair.
      var matches = query.match(
        /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
      );
      if (!matches) {
        return null;
      }


      function coordinateFeature(lng, lat) {
        return {
          center: [lng, lat],
          geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          place_name: 'Lat: ' + lat + ' Lng: ' + lng,
          place_type: ['coordinate'],
          properties: {},
          type: 'Feature'
        };
      }

      var coord1 = Number(matches[1]);
      var coord2 = Number(matches[2]);
      var geocodes = [];

      if (coord1 < -90 || coord1 > 90) {
        // must be lng, lat
        geocodes.push(coordinateFeature(coord1, coord2));
      }

      if (coord2 < -90 || coord2 > 90) {
        // must be lat, lng
        geocodes.push(coordinateFeature(coord2, coord1));
      }

      if (geocodes.length === 0) {
        // else could be either lng, lat or lat, lng
        geocodes.push(coordinateFeature(coord1, coord2));
        geocodes.push(coordinateFeature(coord2, coord1));
      }
      console.log(geocodes)

      return geocodes;
    };



    // Add the control to the map.
   
    this.mapa.addControl(new MapboxLanguage({
      defaultLanguage: 'es'
    }));

    this.mapa.addControl(new mapboxgl.NavigationControl());

    //Cluster


    this.mapa.on('load', () => {
      // Add a new source from our GeoJSON data and
      // set the 'cluster' option to true. GL-JS will
      // add the point_count property to your source data.
      this.mapa.addSource('earthquakes', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: this.localizaciones,
        //'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson'
        // this.localizaciones,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      this.mapa.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.this.mapabox.com/this.mapabox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1'
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40
          ]
        }
      });

      this.mapa.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      this.mapa.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff'
        }
      });

      // inspect a cluster on click
      this.mapa.on('click', 'clusters', e => {
        var features = this.mapa.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        var clusterId = features[0].properties.cluster_id;
        this.mapa.getSource('earthquakes').getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;

            this.mapa.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          }
        );
      });

      // When a click event occurs on a feature in
      // the unclustered-point layer, open a popup at
      // the location of the feature, with
      // description HTML from its properties.
      this.mapa.on('click', 'unclustered-point', e => {
        this.coordenadas = []
        this.coordenadas.push(e.features[0].properties.long);
        this.coordenadas.push(e.features[0].properties.lat);
        console.log(this.coordenadas)
        this.localizacionService.localizacionFiltrada$.emit(this.coordenadas)

        // Ensure that if the this.mapa is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - this.coordenadas[0]) > 180) {
          this.coordenadas[0] += e.lngLat.lng > this.coordenadas[0] ? 360 : -360;
        }

      });

      this.mapa.on('mouseenter', 'clusters', () => {
        this.mapa.getCanvas().style.cursor = 'pointer';
      });
      this.mapa.on('mouseleave', 'clusters', () => {
        this.mapa.getCanvas().style.cursor = '';
      });
    });


    
  

  }



}

