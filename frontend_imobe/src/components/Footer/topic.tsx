import { ReactNode } from "react";
import styles from "./topic.module.scss";

type TopicProps = {
  name: string;
  children: ReactNode;
};

export function Topic({ children, name }: TopicProps) {
  return (
    <div className={styles.topic}>
      <h3>{name}</h3>
      <ul>{children}</ul>
    </div>
  );
}
