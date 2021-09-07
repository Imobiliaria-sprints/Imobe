import { useQuery } from "react-query";
import { api } from "../services/api";
import { FormatCurrency } from "../utils/FormatCurrency";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

type Announcement = {
  id: string;
  title: string;
  slug_title: string;
  rooms: number;
  square_meters: number;
  price: number;
  created_at: string;
  images: AnnouncementImage[];
  user: User;
};

type AnnouncementImage = {
  id: string;
  url: string;
};

type User = {
  name: string;
  avatar: string | null;
  phone: string;
  email: string;
};

type GetResponse = {
  totalCount: number;
  announcements: Announcement[];
};

export async function getAnnouncement(page: number): Promise<GetResponse> {
  const { data, headers } = await api.get(`announcement/${page}`);

  const totalCount = Number(headers["x-total-count"]);

  const announcements = data.map((announcement: Announcement) => {
    return {
      id: announcement.id,
      title: announcement.title,
      slug_title: announcement.slug_title,
      rooms: announcement.rooms,
      square_meters: `${announcement.square_meters}m²`,
      price: FormatCurrency(announcement.price),
      created_at: format(parseISO(announcement.created_at), "d MMM yyyy", {
        locale: ptBR,
      }),
      images: announcement.images.map((image) => {
        return {
          id: image.id,
          url: image.url,
        };
      }),

      user: {
        name: announcement.user.name,
        phone: announcement.user.phone,
        avatar: announcement.user.avatar,
        email: announcement.user.email,
      },
    };
  });

  return { announcements, totalCount };
}

export function useAnnouncement(page: number) {
  return useQuery(["announcement", page], () => getAnnouncement(page), {
    staleTime: 1000 * 60 * 10,
  });
}
