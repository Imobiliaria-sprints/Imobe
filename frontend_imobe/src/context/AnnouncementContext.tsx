import {createContext, FormEvent, ReactNode, useState} from "react";
import {parseCookies} from "nookies";
import {api} from "../services/api";
import Router from "next/router";
import {toast} from "react-hot-toast";
import {LeafletMouseEvent} from "leaflet";
import {fetchLocalMapBox} from "../services/apiMapBox";

type AnnouncementContextProviderProps = {
    children: ReactNode
}

type AddressData = {
    address: string
    zip_code: string,
    number: string,
    complement?: string,
    latitude: number,
    longitude: number,
}

type AnnouncementData = {
    title: string,
    rooms: string,
    price: string,
    square_meters: string,
    address_id: string
}

type Address = {
    address: string,
    complement: string,
    number: string,
    zip_code: string
    latitude: number,
    longitude: number
}

type Position = {
    latitude: number,
    longitude: number
};


type AnnouncementContextData = {
    position: {latitude: number, longitude: number},
    address: Address[],
    location: {lat: number, lng: number},
    place: { label: string, value: string } | null,
    createAnnouncement: (data: AnnouncementData, files: File[], address_id: string) => Promise<void>,
    handleMapClick: (event: LeafletMouseEvent) => void,
    loadOptions: (inputValue: any, callback: any) => Promise<void>;
    handleChangeSelect: (event: any) => void;
    handleSubmitAddress: (data: AddressData) => Promise<void>;
}



export const AnnouncementContext = createContext({} as AnnouncementContextData);

export function AnnouncementContextProvider({children}: AnnouncementContextProviderProps) {

    const [position, setPosition] = useState<Position | null>();
    const [address, setAddress] = useState<Address[]>();
    const [location, setLocation] = useState({lat: -23.5080806, lng:-46.3702072});
    const [place, setPlace] = useState<{
        label: string,
        value: string
    } | null  >()

    function handleMapClick(event: LeafletMouseEvent) {
        const {lat, lng} = event.latlng;

        setPosition({latitude: lat, longitude: lng});

        console.log(position);
    }

    async function createAnnouncement(data: AnnouncementData, files: File[], address_id: string) {
            const announcement = new FormData();

            announcement.append("title", data.title);
            announcement.append("rooms", data.rooms);
            announcement.append("square_meters", data.square_meters);
            files.map((file) => {
                return announcement.append("images", file);
            });
            announcement.append("price", data.price);


            const { "imobeflex.token": token } = parseCookies();

             const { status } = await api.post(`/announcement/${address_id}`, announcement, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (status === 200) {
                toast.success("Seu imóvel foi divulgado!");
            }

            Router.push("/dashboard");
    }

    async function loadOptions(inputValue: any, callback: any) {
        if (inputValue.length < 5) {
            return;
        }

        let places = [];
        const response = await fetchLocalMapBox(inputValue);
        console.log(response)
        response.features.map((item: any) => {
            places.push({
                label: item.place_name,
                value: item.place_name,
                coords: item.center,
                place: item.place_name,
            })
        });

        callback(places);
    }

    function handleChangeSelect(event: any) {
        console.log(event)
        setPosition({
            longitude: event.coords[0],
            latitude: event.coords[1]
        });

        setLocation({
            lng: event.coords[0],
            lat: event.coords[1]
        });

        setPlace({label: event.place, value: event.place});

    }

    async function handleSubmitAddress(data: AddressData) {
        event.preventDefault();

        const { ["imobeflex.token"]: token } = parseCookies();

        const {data: address_response, status} = await api.post("publish/address", data, {
            headers: { Authorization: `Bearer ${token}`},
        });

        if (status === 200) {
            Router.push(`announcement/${address_response.id}`);

            setAddress([]);
            setLocation({lat: -23.5080806, lng:-46.3702072});
            setPosition({latitude: -23.5080806, longitude: -46.3702072});
            setPlace(null);
        }


    }

    return (
        <AnnouncementContext.Provider value={
            {
                createAnnouncement,
                handleMapClick,
                handleSubmitAddress,
                handleChangeSelect,
                loadOptions,
                position,
                address,
                location,
                place
            }
        }>
            {children}
        </AnnouncementContext.Provider>
    )
}