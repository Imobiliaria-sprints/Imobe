import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../services/api";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Hello {user?.name}</h1>
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
