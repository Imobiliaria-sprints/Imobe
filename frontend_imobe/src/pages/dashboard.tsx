/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";
import { useAuth } from "../hooks/useAuth";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import styles from "../styles/pages/dashboard.module.scss";
import { Sidebar } from "../components/Sidebar";
import { FaCalendarAlt } from "react-icons/fa";

export default function Dashboard(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { user } = useAuth();

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
            <img src={user?.avatar} alt={user?.name} />
          </div>
        </header>

        <section className={styles.postList}></section>
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
