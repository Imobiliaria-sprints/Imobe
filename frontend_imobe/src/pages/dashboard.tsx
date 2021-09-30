/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";
import { useAuth } from "../hooks/useAuth";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import styles from "../styles/pages/dashboard.module.scss";
import { getApiClient } from "../services/axios";
import { FormatCurrency } from "../utils/FormatCurrency";
import { Sidebar } from "../components/Sidebar";

export default function Dashboard({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user } = useAuth();

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.dashboardContainer}>
        <header>
          <h1>Olá, {user?.name}</h1>
          <div>
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
