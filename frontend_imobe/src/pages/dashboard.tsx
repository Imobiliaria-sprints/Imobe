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

type PostData = {
  id: string;
  title: string;
  rooms: number;
  price: number;
  square_meters: string;
  created_at: string;
};

export default function Dashboard({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user } = useAuth();

  console.log(user);

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

          {posts.map((post: PostData) => {
            return (
              <div key={post.id}>
                <Image
                  src="https://images.unsplash.com/photo-1594540992254-0e2239661647?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                  alt="Image"
                  width="700"
                  objectFit="cover"
                  height="200"
                  layout="responsive"
                />
                <section className={styles.post}>
                  <h3>{post.title}</h3>
                  <span>No valor de {post.price}</span>
                  <div>
                    <span>Quartos: {post.rooms}</span>
                    <span>Metros: {post.square_meters}</span>
                  </div>
                  <p>Anúncio criado em {post.created_at}</p>
                </section>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);

  const { ["imobeflex.token"]: token } = parseCookies(ctx);

  const { data } = await apiClient.get("/dashboard");

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
