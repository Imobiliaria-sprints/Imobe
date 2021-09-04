import styles from "./style.module.scss";

interface PaginationItemProps {
  number: number;
  isCurrent?: boolean;
  onPageChange?: (page: number) => void;
}

export default function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationItemProps) {
  if (isCurrent) {
    return (
      <button disabled className={styles.paginationButton}>
        {number}
      </button>
    );
  }

  return (
    <button className={styles.paginationButton} onClick={() => onPageChange}>
      {number}
    </button>
  );
}
