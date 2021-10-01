import React from "react";
import { AnnouncementItem } from "./AnnouncementItem";
import Image from "next/image";
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
      {results.length !== 0 ? (
        <>
          {results.map((announcement) => {
            return (
              <AnnouncementItem
                key={announcement.id}
                announcement={announcement}
              />
            );
          })}{" "}
        </>
      ) : (
        <Image width="20" height="20" src="/icons/loading.svg" alt="loading" />
      )}
    </div>
  );
}
