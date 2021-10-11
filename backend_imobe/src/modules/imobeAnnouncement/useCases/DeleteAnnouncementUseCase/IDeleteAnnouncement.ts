export interface IDeleteAnnouncementDTO {
    announcement_id: string,
    user_id: string
}

export interface IDeleteAnnouncement {
    execute({ announcement_id, user_id }: IDeleteAnnouncementDTO): Promise<void>
}