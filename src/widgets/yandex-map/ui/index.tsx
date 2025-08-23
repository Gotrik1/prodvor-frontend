
"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    ymaps3: unknown;
  }
}

const YANDEX_API_KEY = "f9e81512-e208-40f8-bea8-a091bd41ed72";

export function YandexMapV3() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null); // To hold the map instance

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let mapInstance: any = null;

    async function initMap() {
      if (!mapRef.current) return;

 await window.ymaps3.ready;
      const { 
        YMap, 
        YMapDefaultSchemeLayer, 
        YMapDefaultFeaturesLayer
      } = window.ymaps3 as unknown; // Cast to unknown here for access to properties
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { YMapDefaultMarker } = await (window.ymaps3 as any).import('@yandex/ymaps3-markers@0.0.1'); // This import requires a specific type that is not readily available
 
      // Destroy the old map instance if it exist s
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      
      mapInstance = new YMap(
        mapRef.current,
        {
          location: {
            center: [37.588144, 55.733842], // [lon, lat]
            zoom: 10,
          },
        },
        [
          // Add layers to the map
          new YMapDefaultSchemeLayer({}),
          new YMapDefaultFeaturesLayer({})
        ]
      );
 
      const { YMapListener } = window.ymaps3 as unknown; // Cast to unknown for access
      
      mapInstanceRef.current = mapInstance;

      // Add a marker on map click
      const mapListener = new YMapListener({
        layer: 'any',
        onClick: (e) => {
          // Create a new marker with the click coordinates
          const marker = new YMapDefaultMarker({
            coordinates: e.coordinates,
            title: 'Новая площадка',
            subtitle: 'Уточните адрес',
            color: '#FF0000'
          });
          mapInstance.addChild(marker);
        }
      });
      mapInstance.addChild(mapListener);
    }

    if (!window.ymaps3) {
      script = document.createElement("script");
      script.src = `https://api-maps.yandex.ru/v3/?apikey=${YANDEX_API_KEY}&lang=ru_RU`;
      script.async = true;
      script.onload = () => {
        initMap();
      };
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Cleanup on component unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
