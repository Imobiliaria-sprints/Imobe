import {Request, Response} from "express";
import {UserRepository} from "@modules/imobeUsers/repositories/factory/UserRepository";
import {AnnouncementRepository} from "../../repositories/factory/AnnouncementRepository";
import {DeleteAnnouncementUseCase} from "./DeleteAnnouncementUseCase";

class DeleteAnnouncementController {
    async handle(request: Request, response:Response): Promise<Response> {
        const {announcement_id} = request.params;

        const {user_id} = request;

        const userRepository = new UserRepository();
        const announcementRepository = new AnnouncementRepository();

        const deleteAnnouncementUseCase = new DeleteAnnouncementUseCase(announcementRepository, userRepository);

        await deleteAnnouncementUseCase.execute({announcement_id, user_id});

        return response.send();
    }
}

export {DeleteAnnouncementController};