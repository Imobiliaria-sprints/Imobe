export interface ISearchAnnouncement {
  execute(title: string): Promise<Record<string, null>>;
}
