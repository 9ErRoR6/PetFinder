import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";
type LocationPickerProps = {
    setLat: (lat: number) => void;
    setLng: (lng: number) => void;
  };
  const containerStyle = {
    width: '780px',
    height: '480px',
  };
export default function LocationPicker({ setLat, setLng }: LocationPickerProps) {
    const [markerPosition, setMarkerPosition] = useState({ lat: 50.4501, lng: 30.5234 });
    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        const newLat = event.latLng?.lat();
        const newLng = event.latLng?.lng();
        if (newLat && newLng) {
          setMarkerPosition({ lat: newLat, lng: newLng });
          setLat(newLat);
          setLng(newLng);
        }
      };

    return (
        <LoadScript googleMapsApiKey="AIzaSyBPNtrfigWve9AOK3qj9ltKI-emSdlYcwo">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={markerPosition}
          zoom={12}
          onClick={handleMapClick}
        >
          <Marker position={markerPosition} draggable={true} onDragEnd={handleMapClick} />
        </GoogleMap>

        <div style={{ marginTop: 10 }}>
          <label>
            Широта:
            <input type="number" value={markerPosition.lat} readOnly />
          </label>
          <label style={{ marginLeft: 20 }}>
            Довгота:
            <input type="number" value={markerPosition.lng} readOnly />
          </label>
        </div>
      </LoadScript>
    )
}