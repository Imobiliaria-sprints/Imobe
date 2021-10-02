import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Dropzone } from "../../components/Dropzone";
import { Input } from "../../components/Input";
import { Sidebar } from "../../components/Sidebar";
import * as yup from "yup";
import styles from "../../styles/pages/user/create-announcement.module.scss";
import { FaBed, FaVectorSquare } from "react-icons/fa";
import { useDrop } from "../../hooks/useDrop";
import { currency } from "../../utils/InputMask";

const createAnnouncementForm = yup.object().shape({
  title: yup.string().required("Titulo é obrigatório"),
  rooms: yup.number().required("Quantidade de quertos é obrigatório"),
  square_meters: yup.number().required("Metros quadrados é obrigatório"),
  price: yup.string().required("Preço é obrigatório"),
});

export default function CreateAnnouncement(props) {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createAnnouncementForm),
  });

  const { files } = useDrop();

  const { errors } = formState;

  return (
    <div className={styles.create_announcement}>
      <Sidebar />

      <div className={styles.create_announcement_form}>
        <h1>Adicione seu imóvel</h1>
        <form>
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
              type="number"
              min="1"
              max="20"
              icon={<FaBed size="25" color="#39e488" />}
              {...register("rooms")}
              error={errors.rooms}
            />
            <Input
              name="square_meters"
              icon={<FaVectorSquare size="25" color="#39e488" />}
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
            mask={currency}
          />

          <button type="submit">Criar anúncio</button>
        </form>
      </div>
    </div>
  );
}
