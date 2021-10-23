/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";
import { useAuth } from "../hooks/useAuth";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import styles from "../styles/pages/dashboard.module.scss";
import { Sidebar } from "../components/Sidebar";
import { FaCalendarAlt } from "react-icons/fa";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import router from "next/router";

type AnnouncementData = {
  id: string;
  title: string;
  images: string;
  created_at: Date;
};

type AnnouncementImage = {
  id: string;
  url: string;
};

export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { user } = useAuth();
  const { ["imobeflex.token"]: token } = parseCookies();

  const [announcements, setAnnouncements] = useState<AnnouncementData[]>([]);

  const { data } = useFetch("publish/user", token);

  useEffect(() => {
    const announcement = data
      ?.map((announcement) => {
        return {
          id: announcement.id,
          title: announcement.title,
          images: announcement.images[0].url,
          created_at: format(parseISO(announcement.created_at), "dd MMM yy", {
            locale: ptBR,
          }),
        };
      })
      .slice(0, 2);

    setAnnouncements(announcement);
  }, [data]);

  const currentDate = format(new Date(), "d MMM yyyy", {
    locale: ptBR,
  });

  console.log(data);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.dashboardContainer}>
        <header>
          <div>
            <h1>Olá, {user?.name}</h1>
          </div>

          <div>
            <span>
              <FaCalendarAlt size="14" color="#474747" /> {currentDate}
            </span>
            <img src={user?.avatar} alt={user?.name} />
          </div>
        </header>

        <section className={styles.post_list_container}>
          {announcements?.length !== 0 ? (
            <h3>Últimas publicações</h3>
          ) : (
            <h3>
              Não há nenhum imóvel cadastrado na sua conta,{" "}
              <a onClick={() => router.push("/user/address")}>
                clique aqui
              </a>{" "}
              para criar anúnciar seu imóvel
            </h3>
          )}
          <div className={styles.post_list}>
            {announcements?.map((announcement) => {
              return (
                <div key={announcement.id}>
                  <img src={announcement.images} alt={announcement.title} />
                  <div>
                    <span>{announcement.title}</span>
                    <p>{announcement.created_at}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { ["imobeflex.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
