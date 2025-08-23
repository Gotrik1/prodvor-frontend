
"use client";

import React, { useEffect, useRef } from "react";

type YandexMap = {
    destroy: () => void;
    addChild: (child: unknown) => void;
};

type YandexMapModule = {
    YMap: new (element: HTMLElement, options: object, layers: unknown[]) => YandexMap;
    YMapDefaultSchemeLayer: new (options: object) => unknown;
    YMapDefaultFeaturesLayer: new (options: object) => unknown;
    YMapListener: new (options: object) => unknown;
    ready: Promise<void>;
    import: (moduleName: string) => Promise<{ YMapDefaultMarker: new (options: object) => unknown }>;
};

declare global {
  interface Window {
    ymaps3?: YandexMapModule;
  }
}

const YANDEX_API_KEY = process.env.NEXT_PUBLIC_YANDEX_API_KEY || "f9e81512-e208-40f8-bea8-a091bd41ed72";


export function YandexMapV3() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<YandexMap | null>(null); // To hold the map instance

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let mapInstance: YandexMap | null = null;

    async function initMap() {
      if (!mapRef.current || !window.ymaps3) return;

      await window.ymaps3.ready;
      const { 
        YMap, 
        YMapDefaultSchemeLayer, 
        YMapDefaultFeaturesLayer
      } = window.ymaps3;
      
      const { YMapDefaultMarker } = await window.ymaps3.import('@yandex/ymaps3-markers@0.0.1');
 
      // Destroy the old map instance if it exists
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
 
      const { YMapListener } = window.ymaps3;
      
      mapInstanceRef.current = mapInstance;

      // Add a marker on map click
      const mapListener = new YMapListener({
        layer: 'any',
        onClick: (e: { coordinates: [number, number] }) => {
          // Create a new marker with the click coordinates
          const marker = new YMapDefaultMarker({
            coordinates: e.coordinates,
            title: 'Новая площадка',
            subtitle: 'Уточните адрес',
            color: '#FF0000'
          });
          mapInstance?.addChild(marker);
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
