/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
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
import { parseCookies } from "nookies";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {useCreateAnnouncement} from "../../../hooks/useCreateAnnouncement";
import {useState} from "react";

const createAnnouncementForm = yup.object().shape({
  title: yup.string().required("Titulo é obrigatório"),
  rooms: yup.number().min(0).max(10),
  square_meters: yup.number().required("Metros quadrados é obrigatório"),
  price: yup.string().required("Preço é obrigatório"),
});

export default function Address_id(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const [isActive, setIsActive] = useState(false);
  const [rooms, setRooms] = useState(0);

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
      Object.assign(data, {
        rooms: isActive ? 0 : rooms
      })
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
            <div className={styles.isActiveField}>
              <input type="checkbox" onChange={(e) => setIsActive(e.target.checked)}/>
              <label>Você está vendendo um terreno?</label>
            </div>
            <Input
              name="title"
              label="Titulo"
              placeholder="Escreva um pouco sobre a casa"
              type="text"
              {...register("title")}
              error={errors.title}
            />

            <fieldset>
              {!isActive && <Input
                  name="rooms"
                  label="Quantos quartos tem?"
                  min={0}
                  max={10}
                  value={rooms}
                  placeholder="Quantidade de quartos o imóvel tem"
                  type="number"
                  icon={<FaBed size="25" color="#474747" />}
                  {...register("rooms", {
                    setValueAs: (v) => setRooms(v),
                    value: isActive ? 0 : rooms
                  })}
                  error={errors.rooms}
              />}

              <Input
                name="square_meters"
                label="Quantos metros quadrados tem?"
                placeholder="Metragem da casa"
                icon={<FaVectorSquare size="20" color="#474747" />}
                {...register("square_meters")}

                error={errors.square_meters}
              />
            </fieldset>
            <Input
              label="Preço"
              name="price"
              placeholder="Qual o valor da sua casa?"
              type="price"
              {...register("price")}
              error={errors.price}
            />


            <button type="submit" color={"primary"}>Criar anúncio</button>
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
