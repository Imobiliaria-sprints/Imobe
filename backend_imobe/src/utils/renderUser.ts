import { User } from "@entity/User";
import imageView from "./imageView";
export default {
  render(user: User | Record<string, any>) {
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      image: imageView.render(user),
      created_at: user.created_at,
    };
  },

  renderMany(users: User[] | Record<string, any>) {
    return users.map((user) => this.render(user));
  },
};
