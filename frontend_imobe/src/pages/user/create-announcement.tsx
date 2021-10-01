import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Dropzone } from "../../components/Dropzone";
import { Input } from "../../components/Input";
import { Sidebar } from "../../components/Sidebar";
import { useDropzone } from "../../hooks/useDropzone";
import * as yup from "yup";
import styles from "../../styles/pages/user/create-announcement.module.scss";

const createAnnouncementForm = yup.object().shape({
  title: yup.string().required("Titulo é obrigatório"),
  rooms: yup.number().required("Quantidade de quertos é obrigatório"),
  square_meters: yup.number().required("Metros quadrados é obrigatório"),
  price: yup.string().required("Preço é obrigatório"),
});

export default function CreateAnnouncement(props) {
  const { files } = useDropzone();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createAnnouncementForm),
  });

  const { errors } = formState;

  return (
    <div className={styles.create_announcement}>
      <Sidebar />

      <div className={styles.create_announcement_form}>
        <h1>Adicione seu imóvel</h1>
        <form>
          <input name="title" type="text" {...register("title")} />

          <fieldset>
            <input
              name="rooms"
              type="number"
              min="1"
              max="20"
              {...register("rooms")}
            />
            <input
              name="square_meters"
              type="number"
              min="1"
              max="20"
              {...register("square_meters")}
            />
          </fieldset>
          <input name="price" type="text" {...register("price")} />
          <Dropzone />
        </form>
      </div>
    </div>
  );
}
