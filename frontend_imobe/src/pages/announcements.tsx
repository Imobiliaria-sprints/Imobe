/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { useState } from "react";
import { Header } from "../components/Header";
import { Pagination } from "../components/Pagination";
import { useAnnouncement } from "../hooks/useAnnouncement";
import styles from "../styles/pages/announcements.module.scss";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSlide } from "../hooks/useSlide";

export default function Announcements(props) {
  const [page, setPage] = useState(1);

  const { lastImage, nextImage, slideImages } = useSlide();

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
              <div className={styles.searchResults}>
                <h1>{data?.totalCount} imóveis para você escolher</h1>
              </div>
              {data.announcements.map((announcement, index) => {
                return (
                  <div key={announcement?.id} className={styles.announcement}>
                    <header>
                      <div>
                        <img
                          src={announcement?.user.avatar}
                          alt={announcement?.user.name}
                        />
                        <span>{announcement?.user.name}</span>
                      </div>
                      <span>{announcement?.created_at}</span>
                    </header>
                    <figure className={styles.slide_image}>
                      <div onClick={lastImage}>
                        <MdKeyboardArrowLeft color="#fff" />
                      </div>
                      <img
                        src={slideImages(announcement?.images).url}
                        alt={announcement?.title}
                      />
                      <div onClick={nextImage}>
                        <MdKeyboardArrowRight color="#fff" />
                      </div>
                    </figure>
                    <span>{announcement?.title}</span>
                    <ul>
                      <li>{announcement?.rooms}</li>
                      <li>{announcement?.square_meters}</li>
                    </ul>
                    <h2>{announcement?.price}</h2>
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
