/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";
import { useAnnouncement } from "../hooks/useAnnouncement";
import styles from "../styles/pages/announcements.module.scss";

export default function Announcements() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useAnnouncement(page);
  console.log(data);
  return (
    <div>
      <Header />

      <div className={styles.postContainer}>
        <main className={styles.containAnnouncement}>
          {isLoading ? (
            <section className={styles.loading}>
              <img src="/icons/loading.svg" alt="Loading" />
            </section>
          ) : error ? (
            <section className={styles.error}>
              <span>Falha a obter os dados</span>
            </section>
          ) : (
            <div className={styles.announcementList}>
              {data.announcements.map((announcement) => {
                return (
                  <div key={announcement.id} className={styles.announcement}>
                    <header>
                      <div>
                        <img
                          src={announcement.user.avatar}
                          alt={announcement.user.name}
                        />
                        <span>{announcement.user.name}</span>
                      </div>
                      <span>{announcement.created_at}</span>
                    </header>
                    <figure>
                      <img
                        src={announcement.images[0].url}
                        alt={announcement.title}
                      />
                    </figure>
                    <span>{announcement.title}</span>
                    <ul>
                      <li>{announcement.rooms}</li>
                      <li>{announcement.square_meters}</li>
                    </ul>
                    <h2>{announcement.price}</h2>
                  </div>
                );
              })}
              <div className={styles.pagination}>
                <Pagination
                  totalCountRegisters={data?.totalCount}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
