import React from "react";
import { AnnouncementItem } from "./AnnouncementItem";
import styles from "./style.module.scss";

type AnnouncementItemListProps = {
  results: Announcement[];
};

type Announcement = {
  id: string;
  title: string;
  images: AnnouncementImage;
};

type AnnouncementImage = {
  id: string;
  url: string;
};

export function AnnouncementItemList({ results }: AnnouncementItemListProps) {
  return (
    <div className={styles.announcement_list}>
      {results.map((announcement) => {
        return (
          <AnnouncementItem key={announcement.id} announcement={announcement} />
        );
      })}
    </div>
  );
}
