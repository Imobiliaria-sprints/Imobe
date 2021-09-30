/* eslint-disable @next/next/no-img-element */
import { memo } from "react";
import styles from "./style.module.scss";

type AnnouncementItemProps = {
  announcement: {
    id: string;
    title: string;
    images: AnnouncementImage;
  };
};

type AnnouncementImage = {
  id: string;
  url: string;
};

export function AnnouncementItemComponent({
  announcement,
}: AnnouncementItemProps) {
  return (
    <div className={styles.announcement_item}>
      <img src={announcement.images.url} alt={announcement.title} />
      <span>{announcement.title}</span>
    </div>
  );
}

export const AnnouncementItem = memo(
  AnnouncementItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.announcement, nextProps.announcement);
  }
);
