import {MapContainer,  TileLayer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useCreateAnnouncement} from "../../hooks/useCreateAnnouncement";




const MapComponent = () => {

    const {handleMapClick, position} = useCreateAnnouncement();

    return (
        <MapContainer center={[position.latitude, position.longitude]} zoom={13}  style={{height: 400, width: "100%", marginTop: 25}} onChange={handleMapClick} >
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        </MapContainer>
    );
}

export default MapComponent;

