import { Announcement } from "@entity/Announcement";
import { ICreateAnnouncementUseCase } from "./ICreateAnnouncementUseCase";
import { IAnnouncementRepository } from "@repos/IAnnouncementRepository";
import { IUserRepository } from "@repos/IUserRepository";
import { AnnouncementImage } from "@entity/AnnouncementImage";

class CreateAnnouncementUseCase implements ICreateAnnouncementUseCase {
  constructor(
    private announcementRepository: IAnnouncementRepository,
    private userRepository: IUserRepository
  ) {}

  /**
   *
   * @param {string} title
   * @param {string} price
   * @param {number} rooms
   * @param {number} square_meters
   * @param {string} user_id
   * @returns {Promise<Announcement>} Return promise
   */
  async execute(
    title: string,
    slug_title: string,
    price: string,
    rooms: number,
    square_meters: number,
    images: AnnouncementImage[] | { path: string }[],
    user_id: string
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
    });

    return announcement;
  }
}

export { CreateAnnouncementUseCase };
