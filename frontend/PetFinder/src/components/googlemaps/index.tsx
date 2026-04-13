import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const containerStyle = {
    width: '100%',
    height: '400px',
  };
  type MapProps = {
    latitude: number;
    longitude: number;
  };
const Map: React.FC<MapProps> = ({latitude, longitude}) => {
    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ""}>
        <GoogleMap mapContainerStyle={containerStyle} center={{lat: latitude, lng: longitude}} zoom={12}>
          <Marker position={{lat: latitude, lng: longitude}} />
        </GoogleMap>
      </LoadScript>
    )
}

export default Map
