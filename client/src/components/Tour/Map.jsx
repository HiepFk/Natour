import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaGllcGZrIiwiYSI6ImNreDc3djRhdTJtdGwycXB6enMxdjJ6azYifQ.beqa-xkjz-nU-tYPIJ-3Bg";

export default function Map({ locations }) {
  const mapContainerRef = useRef();

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/hiepfk/ckx79l47w1q8p15nxt7tdswsu",
      scrollZoom: false,
    });
    const bounds = new mapboxgl.LngLatBounds();

    const el = document.createElement("div");
    el.className = "marker";

    locations.forEach((loc) => {
      // Create marker
      const el = document.createElement("div");
      el.className = "marker";

      // Add marker
      new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
      })
        .setLngLat(loc.coordinates)
        .addTo(map);

      // Add popup
      new mapboxgl.Popup({
        offset: 30,
      })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);

      // Extend map bounds to include current location
      bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, [locations]);

  return (
    <section className="section-map">
      <div className="map" ref={mapContainerRef}></div>
    </section>
  );
}
