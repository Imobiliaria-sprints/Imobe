import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Dropzone } from "../../../components/Dropzone";
import { Input } from "../../../components/Input";
import { Sidebar } from "../../../components/Sidebar";
import * as yup from "yup";
import styles from "../../../styles/pages/user/create-announcement.module.scss";
import { FaBed, FaVectorSquare } from "react-icons/fa";
import { useDrop } from "../../../hooks/useDrop";
import { currency, square_meters, without_text } from "../../../utils/InputMask";
import { api } from "../../../services/api";
import { parseCookies } from "nookies";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {Button} from "@material-ui/core";
import {useCreateAnnouncement} from "../../../hooks/useCreateAnnouncement";

const createAnnouncementForm = yup.object().shape({
  title: yup.string().required("Titulo é obrigatório"),
  rooms: yup.number().required("Quantidade de quartos é obrigatório"),
  square_meters: yup.number().required("Metros quadrados é obrigatório"),
  price: yup.string().required("Preço é obrigatório"),
});

export default function Address_id(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createAnnouncementForm),
  });

  const router = useRouter();

  const { files } = useDrop();

  const { errors } = formState;

  const {address_id} = router.query;

  const {createAnnouncement} = useCreateAnnouncement();
  async function handleCreateAnnouncement(data) {
    try {
      await createAnnouncement(data, files, address_id.toString());
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    }
  }

  return (
    <div className={styles.create_announcement}>
      <Toaster />
      <Sidebar />

      <div className={styles.create_announcement_container}>
        <section className={styles.create_announcement_form}>
          <div>
            <h1>Anúncie seu imóvel aqui</h1>
            <span>
              Adicione as informação abaixo para que seu imóvel seja anúnciado
              na imobe
            </span>
          </div>
          <form onSubmit={handleSubmit(handleCreateAnnouncement)}>
            <Dropzone />
            <Input
              name="title"
              label="Titulo"
              type="text"
              {...register("title")}
              error={errors.title}
            />

            <fieldset>
              <Input
                name="rooms"
                label="Quantos quartos tem?"
                type="number"
                min="1"
                icon={<FaBed size="25" color="#474747" />}
                {...register("rooms")}
                error={errors.rooms}
              />
              <Input
                name="square_meters"
                label="Quantos metros quadrados tem?"
                icon={<FaVectorSquare size="20" color="#474747" />}
                {...register("square_meters")}

                error={errors.square_meters}
              />
            </fieldset>
            <Input
              label="Preço"
              name="price"
              type="price"
              {...register("price")}
              error={errors.price}

            />

            <Button type="submit" color={"primary"}>Criar anúncio</Button>
          </form>
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
