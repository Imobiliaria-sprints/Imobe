import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";
import { useAuth } from "../hooks/useAuth";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import styles from "../styles/pages/dashboard.module.scss";
import { getApiClient } from "../services/axios";
import { FormatCurrency } from "../utils/FormatCurrency";
import { Sidebar } from "../components/Sidebar";

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

  return (
    <div className={styles.dashboard}>
      <Sidebar />
      <div>
        <div>
          <h1>Olá {user?.name}</h1>
        </div>

        <section>
          <h1>Suas divulgações</h1>

          {posts.map((post: PostData) => {
            return (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <span>No valor de {post.price}</span>
                <div>
                  <span>Quartos: {post.rooms}</span>
                  <span>Metros: {post.square_meters}</span>
                </div>
                <span>Anúncio criado em {post.created_at}</span>
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
