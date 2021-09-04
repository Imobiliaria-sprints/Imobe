import { Announcement } from "@entity/Announcement";

import ImageView from "./imageView";

export default {
  render(announcement: Announcement) {
    return {
      id: announcement.id,
      title: announcement.title,
      slug_title: announcement.slug_title,
      rooms: announcement.rooms,
      square_meters: announcement.square_meters,
      price: announcement.price,
      created_at: announcement.created_at,
      images: ImageView.renderMany(announcement.images),
      user: {
        name: announcement.userId.name,
        avatar: `http://localhost:3333/uploads/${announcement.userId.avatar}`,
        phone: announcement.userId.phone,
        email: announcement.userId.email,
      },
    };
  },

  renderMany(announcements: Announcement[] | Record<string, null>) {
    return announcements.map((announcement) => this.render(announcement));
  },
};
