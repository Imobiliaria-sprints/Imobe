import { Announcement } from "@entity/Announcement";

import ImageView from "./imageView";

export default {
  render(announcement: Record<string, any>) {
    return {
      id: announcement.id,
      title: announcement.title,
      slug_title: announcement.slug_title,
      rooms: announcement.rooms,
      square_meters: announcement.square_meters,
      price: announcement.price,
      images: ImageView.renderMany(announcement.images),
      created_at: announcement.created_at,
      user: {
        name: announcement.userId.name,
        avatar: `http://localhost:3333/uploads/${announcement.userId.avatar}`,
        phone: announcement.userId.phone,
        email: announcement.userId.email,
      },
      address: {
        id: announcement.addressId.id,
        city: announcement.addressId.city,
        state: announcement.addressId.state,
        street: announcement.addressId.street,
        number: announcement.addressId.number,
        zip_code: announcement.addressId.zip_code,
        block: announcement.addressId.block,
        complement: announcement.addressId.complement,
        latitude: announcement.addressId.latitude,
        longitude: announcement.addressId.longitude,
      }
    };
  },

  renderMany(announcements: Announcement[] | Record<string, null>) {
    return announcements.map((announcement) => this.render(announcement));
  },
};
