import React, { useMemo, useState } from "react";
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";

import { Location } from "../../models/TourModel";
interface Locations {
  locations: Location[] | undefined;
}

export default function MapBox({ locations }: Locations) {
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);

  const pins = useMemo(
    () =>
      locations?.map((item, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={item?.coordinates?.[0]}
          latitude={item?.coordinates?.[1]}
          anchor="bottom"
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            setPopupInfo(item);
          }}
        >
          <div className="marker"></div>
        </Marker>
      )),
    [locations]
  );

  const popup = useMemo(
    () =>
      locations?.map((item, index) => {
        return (
          <div className="mapboxgl-popup">
            <div className="mapboxgl-popup-content">
              <Popup
                anchor="top"
                longitude={Number(item?.coordinates?.[0])}
                latitude={Number(item?.coordinates?.[1])}
                key={`popup-${index}`}
              >
                Day {item?.day} -{item?.description}
              </Popup>
            </div>
          </div>
        );
      }),
    [locations]
  );
  return (
    <section className="section-map">
      <div className="map">
        <Map
          initialViewState={{
            // latitude: locations?.[0]?.coordinates?.[1],
            // longitude: locations?.[0]?.coordinates?.[0],
            zoom: -10,
            bearing: 0,
            pitch: 0,
          }}
          mapboxAccessToken="pk.eyJ1IjoiaGllcGZrIiwiYSI6ImNreDc3djRhdTJtdGwycXB6enMxdjJ6azYifQ.beqa-xkjz-nU-tYPIJ-3Bg"
          mapStyle="mapbox://styles/hiepfk/ckx79l47w1q8p15nxt7tdswsu"
          // scrollZoom
        >
          <NavigationControl position="top-right" />

          {pins}
          {popup}

          {popupInfo && (
            <div className="mapboxgl-popup">
              <div className="mapboxgl-popup-content">
                <Popup
                  anchor="top"
                  longitude={Number(popupInfo.coordinates?.[0])}
                  latitude={Number(popupInfo.coordinates?.[1])}
                  onClose={() => setPopupInfo(null)}
                >
                  Day {popupInfo?.day} -{popupInfo?.description}
                </Popup>
              </div>
            </div>
          )}
        </Map>
      </div>
    </section>
  );
}
