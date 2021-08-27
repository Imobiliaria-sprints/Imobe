import { Ads } from "@entity/Ads";

import ImageView from "./imageView";

export default {
  render(ads: Ads) {
    return {
      id: ads.id,
      title: ads.title,
      rooms: ads.rooms,
      square_meters: ads.square_meters,
      price: ads.price,
      user: {
        name: ads.userId.name,
        avatar: ImageView.render(ads.userId),
        phone: ads.userId.phone,
        email: ads.userId.email,
      },
    };
  },

  renderMany(ads: Record<string, any> | Ads[]) {
    return ads.map((ad) => this.render(ad));
  },
};
