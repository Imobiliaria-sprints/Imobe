import {MapContainer, TileLayer, GeoJSON, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {useCreateAnnouncement} from "../../hooks/useCreateAnnouncement";
import Leaflet from 'leaflet';

type CurrentLocation = {
    lat: number,
    lng: number
}

type MapComponentProps = {
    current_location?: CurrentLocation | undefined,
    isDraggingAndZoom?: boolean
}

const mapPinIcon = Leaflet.icon({
    iconUrl: "https://www.pngkey.com/png/full/25-254024_location-map-pin-turquoise-blue7-turquoise-location-pin.png",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
});

const MapComponent = ({current_location, isDraggingAndZoom = true}: MapComponentProps) => {

    const {position, location} = useCreateAnnouncement();

    return (
        <MapContainer
            center={!!current_location ? current_location : location}
            zoom={10}
            scrollWheelZoom={isDraggingAndZoom}
            dragging={isDraggingAndZoom}
            style={{height: 400, width: "100%", marginTop: 25, borderRadius: 10}}
        >
        <TileLayer
            url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />
            {(position ||current_location) && (
                <Marker icon={mapPinIcon} position={!!current_location ? [current_location.lat, current_location.lng] : [position.latitude, position.longitude]}/>
            )}
        </MapContainer>
    );
}

export default MapComponent;

