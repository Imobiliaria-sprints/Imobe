import {MapContainer, TileLayer, GeoJSON, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useCreateAnnouncement} from "../../hooks/useCreateAnnouncement";
import Leaflet from 'leaflet';

const mapPinIcon = Leaflet.icon({
    iconUrl: "https://www.pngkey.com/png/full/25-254024_location-map-pin-turquoise-blue7-turquoise-location-pin.png",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
})

const MapComponent = () => {

    const {position, location} = useCreateAnnouncement();

    return (
        <MapContainer center={location} zoom={12}  style={{height: 400, width: "100%", marginTop: 25}}  >
        <TileLayer
            url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />
            {position && (
                <Marker icon={mapPinIcon} position={[position.latitude, position.longitude]}/>
            )}
        </MapContainer>
    );
}

export default MapComponent;

