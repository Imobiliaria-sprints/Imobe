import { User } from "@entity/User";

export default {
  render(user: User | Record<string, any>) {
    return {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      avatar: `http://localhost:3333/uploads/${user.avatar}`,
      created_at: user.created_at,
    };
  },

  renderMany(users: User[] | Record<string, any>) {
    return users.map((user) => this.render(user));
  },
};
