'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in Leaflet + Next.js
const customIcon = L.divIcon({
  className: 'custom-icon',
  html: `<div style="background-color: #CF0738; width: 12px; height: 12px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 10px rgba(207, 7, 56, 0.5);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 2,
    });
  }, [center, zoom, map]);
  return null;
}

interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  markers: Array<{ name: string; coords: [number, number]; count: string }>;
}

export default function LeafletMap({ center, zoom, markers }: LeafletMapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: '100%', width: '100%' }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {markers.map((marker) => (
        <Marker 
          key={marker.name} 
          position={marker.coords} 
          icon={customIcon}
        >
          <Popup>
            <div className="text-center">
              <strong className="text-[#CF0738]">{marker.name}</strong>
              <p className="text-xs text-zinc-500 m-0">{marker.count}</p>
            </div>
          </Popup>
        </Marker>
      ))}
      
      <ChangeView center={center} zoom={zoom} />
    </MapContainer>
  );
}
