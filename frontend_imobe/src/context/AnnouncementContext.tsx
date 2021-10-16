import {createContext, ReactNode, useState} from "react";
import {parseCookies} from "nookies";
import {api} from "../services/api";
import Router from "next/router";
import {toast} from "react-hot-toast";
import {LeafletMouseEvent} from "leaflet";


type AnnouncementContextProviderProps = {
    children: ReactNode
}

type AddressData = {
    city: string,
    state: string,
    street: string,
    zip_code: string,
    number: string,
    complement?: string,
    latitude: number,
    longitude: number,
}

type Announcement = {
    title: string,
    rooms: string,
    price: string,
    square_meters: string,
    address_id: string
}

type AnnouncementContextData = {
    position: {latitude: number, longitude: number}
    createAddress: (data: AddressData) => Promise<void>,
    createAnnouncement: (data: Announcement, files: File[]) => Promise<void>
    handleMapClick: (event: LeafletMouseEvent) => void
}

export const AnnouncementContext = createContext({} as AnnouncementContextData);

export function AnnouncementContextProvider({children}: AnnouncementContextProviderProps) {

    const [position, setPosition] = useState({ latitude: -23.5080806, longitude: -46.3702072 });

    function handleMapClick(event: LeafletMouseEvent) {
        const {lat, lng} = event.latlng;

        setPosition({latitude: lat, longitude: lng});

        console.log(position);
    }

    async function createAddress(data: AddressData) {
        const { ["imobeflex.token"]: token } = parseCookies();

        const {data: address_response} = await api.post("announcement/address", {data}, {
            headers: { Authorization: `Bearer ${token}`},
        });

        Router.push(`user/announcement`, {
            query: address_response.id
        });
    }

    async function createAnnouncement(data: Announcement, files: File[]) {
            const announcement = new FormData();

            announcement.append("title", data.title);
            announcement.append("rooms", data.rooms);
            announcement.append("square_meters", data.square_meters);
            files.map((file) => {
                return announcement.append("images", file);
            });
            announcement.append("price", data.price);
            announcement.append("address_id", data.address_id);

            const { "imobeflex.token": token } = parseCookies();

            const { status, data: redirect } = await api.post("/announcement", announcement, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (status === 200) {
                toast.success("Seu imóvel foi divulgado!");
            }

            Router.push(`/user/${redirect.id}`);
    }

    return (
        <AnnouncementContext.Provider value={{createAddress, createAnnouncement, handleMapClick, position}}>
            {children}
        </AnnouncementContext.Provider>
    )
}