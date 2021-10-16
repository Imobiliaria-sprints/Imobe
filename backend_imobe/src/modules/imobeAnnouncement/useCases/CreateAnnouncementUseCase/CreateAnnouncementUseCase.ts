import { Announcement } from "@entity/Announcement";
import { ICreateAnnouncementUseCase } from "./ICreateAnnouncementUseCase";
import { IAnnouncementRepository } from "../../repositories/IAnnouncementRepository";
import { IUserRepository } from "@modules/imobeUsers/repositories/IUserRepository";
import { AnnouncementImage } from "@entity/AnnouncementImage";

class CreateAnnouncementUseCase implements ICreateAnnouncementUseCase {
  constructor(
    private announcementRepository: IAnnouncementRepository,
    private userRepository: IUserRepository
  ) {}

  /**
   * @param title
   * @param slug_title
   * @param price
   * @param rooms
   * @param square_meters
   * @param images
   * @param user_id
   * @param address_id
   */
  async execute(
    title: string,
    slug_title: string,
    price: string,
    rooms: number,
    square_meters: number,
    images: AnnouncementImage[] | { path: string }[],
    user_id: string,
    address_id: string
  ): Promise<Announcement> {
    const user = await this.userRepository.findOneUserById(user_id);

    if (!user) {
      throw new Error("User not found");
    }

    const announcement = await this.announcementRepository.createAnnouncement({
      title,
      slug_title,
      price,
      rooms,
      square_meters,
      images,
      user_id,
      address_id
    });

    return announcement;
  }
}

export { CreateAnnouncementUseCase };
