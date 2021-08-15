import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { parseCookies } from "nookies";
import { useAuth } from "../hooks/useAuth";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { getApiClient } from "../services/axios";

type DashboardProps = {
  posts: PostProps[];
};

type PostProps = {
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
    <div>
      <aside></aside>
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
      price: post?.price,
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
