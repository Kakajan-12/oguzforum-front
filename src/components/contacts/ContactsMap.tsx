"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Branded pin asset (OGUZ marker). 33×43, tip at the bottom centre.
const pinIcon = L.icon({
  iconUrl: "/map-point.png",
  iconSize: [33, 43],
  iconAnchor: [16, 43],
  popupAnchor: [0, -43],
});

interface Props {
  lat: number;
  lng: number;
}

export default function ContactsMap({ lat, lng }: Props) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={17}
      scrollWheelZoom={false}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Marker position={[lat, lng]} icon={pinIcon} />
    </MapContainer>
  );
}
