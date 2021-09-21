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
import { useState } from "react";

export default function Dashboard({ posts }) {
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

        <section className={styles.postList}>
          <div className={styles.list}></div>
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);

  const { ["imobeflex.token"]: token } = parseCookies(ctx);

  const { data } = await apiClient.get("/dashboard", {
    headers: {
      Authorization: `Barear ${token}`,
    },
  });

  const posts = data.map((post) => {
    return {
      id: post?.id,
      title: post?.title,
      rooms: post?.rooms,
      price: FormatCurrency(Number(post?.price)),
      square_meters: `${post?.square_meters}m²`,
      created_at: format(parseISO(post?.created_at), "d MMM yyyy", {
        locale: ptBR,
      }),
    };
  });

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return { props: { posts } };
};
