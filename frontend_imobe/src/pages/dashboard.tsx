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
import {useRouter} from "next/router";
import {MdArrowForward, MdKeyboardArrowRight} from "react-icons/md";

type AnnouncementData = {
  id: string;
  title: string;
  images: string;
  created_at: Date;
  addressId: AnnouncementAddress;
};

type AnnouncementImage = {
  id: string;
  path: string;
};

type AnnouncementAddress = {
  address: string
  number: string,
  complement?: string,
}


export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { user } = useAuth();
  const { ["imobeflex.token"]: token } = parseCookies();

  const [announcements, setAnnouncements] = useState<AnnouncementData | null>(null);
  const [load, setLoad] = useState(false);

  const router = useRouter();

  const { data } = useFetch("announcement/user", token);

  useEffect(() => {
    const announcement = data
      ?.map((announcement) => {
        return {
          id: announcement.id,
          title: announcement.title,
          images: announcement.images[0].path,
          created_at: format(parseISO(announcement.created_at), "dd MMM yy", {
            locale: ptBR,
          }),
          addressId: {
            address: announcement.addressId.address,
            number: announcement.addressId.number,
            complement: announcement.addressId.complement
          }
        };
      }).pop();

    setAnnouncements(announcement);
  }, [data]);

  const currentDate = format(new Date(), "d MMM yyyy", {
    locale: ptBR,
  });


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
            <img src={user?.avatar} alt={user?.name} style={{opacity: load ? 1 : 0}} onLoad={() => {setLoad(true)}}/>
          </div>
        </header>

        <section className={styles.post_list_container}>
          {!!announcements  ? (
            <h3>Última publicação</h3>
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
            <div>
              <div className={styles.publish} >
                <img src={announcements?.images} alt={announcements?.title} />
                <div className={styles.publish_info}>
                  <div>
                    <span>{announcements?.title}</span>
                    <p>{announcements?.addressId?.address}</p>
                    <small>{announcements?.created_at}</small>
                  </div>

                  <button onClick={() => router.push(`publish/${announcements?.id}`)}>
                    <MdArrowForward size={25} color="#f3f3f3" />
                  </button>
                  </div>
              </div>
              <div className={styles.content_options}>
                <button onClick={() => router.push("/")} title="Home Page">
                  <img src="/img/imobe.png" alt="Home Page"/>
                </button>
                <section>
                  <h2>Ver todos os imóveis da imobiliária </h2>
                  <button onClick={() => router.push("/announcements")}>
                    <MdArrowForward size={25} color="#f3f3f3" />
                  </button>
                </section>
              </div>
            </div>
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
