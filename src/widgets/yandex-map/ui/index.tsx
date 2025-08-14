"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    ymaps3: any;
  }
}

const YANDEX_API_KEY = "f9e81512-e208-40f8-bea8-a091bd41ed72";

export function YandexMapV3() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let script: HTMLScriptElement | null = null;

    async function initMap() {
      await window.ymaps3.ready;
      const { YMap, YMapDefaultSchemeLayer } = window.ymaps3;

      const map = new YMap(
        mapRef.current,
        {
          location: {
            center: [37.588144, 55.733842], // [lon, lat]
            zoom: 10,
          },
        }
      );

      map.addChild(new YMapDefaultSchemeLayer());
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
      if (script && document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}
