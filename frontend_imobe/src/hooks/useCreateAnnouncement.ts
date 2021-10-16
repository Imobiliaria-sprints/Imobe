import { useContext } from "react";
import {AnnouncementContext} from "../context/AnnouncementContext";

export const useCreateAnnouncement = () => {
    return useContext(AnnouncementContext);
};
