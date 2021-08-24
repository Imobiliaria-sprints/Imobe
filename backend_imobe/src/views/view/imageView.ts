import { User } from "../../entities/User";

export default {
  render(image: User) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.avatar}`,
    };
  },

  renderMany(images: User[]) {
    return images.map((image) => this.render(image));
  },
};
