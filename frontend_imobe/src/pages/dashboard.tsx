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
import Image from "next/image";
import { Pagination } from "../components/Pagination";
import { useState } from "react";

type PostData = {
  id: string;
  title: string;
  rooms: number;
  price: number;
  square_meters: string;
  created_at: string;
};

export default function Dashboard({ posts }) {
  const { user } = useAuth();

  const [page, setPage] = useState(1);

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div className={styles.dashboardContainer}>
        <header>
          <h1>Olá, {user?.name}</h1>
          <div>
            <img src={user?.image.url} alt={user?.name} />
          </div>
        </header>

        <section className={styles.postList}>
          <h1>Suas divulgações</h1>
          <div className={styles.list}>
            <section>
              <span>Titulo</span>
              <span>Preço</span>
              <span>Quartos</span>
              <span>Metros</span>
              <span>Criado</span>
            </section>
            {posts.map((post: PostData) => {
              return (
                <div key={post.id} className={styles.post}>
                  <section>
                    <span>{post.title}</span>
                    <span>{post.price}</span>

                    <span> {post.rooms}</span>
                    <span> {post.square_meters}</span>

                    <span> {post.created_at}</span>
                  </section>
                </div>
              );
            })}
          </div>
        </section>
        <Pagination
          totalCountRegisters={100}
          registersPerPage={10}
          currentPage={1}
          onPageChange={setPage}
        />
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
