import { AnnouncementImage } from "@entity/AnnouncementImage";

export default {
  render(image: AnnouncementImage) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
    };
  },

  renderMany(images: AnnouncementImage[]) {
    return images.map((image) => this.render(image));
  },
};
