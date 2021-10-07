import {toast, Toaster} from "react-hot-toast";
import {Sidebar} from "../../components/Sidebar";
import {Input} from "../../components/Input";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {parseCookies} from "nookies";
import {Map} from "../../components/Map";
import {cep} from "../../utils/InputMask";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import {api} from "../../services/api";
import {Divisor} from "../../components/Divisor";
import styles from '../../styles/pages/user/announcement-address.module.scss';

const createAddressForm = yup.object().shape({
    cep: yup.string().required("CEP é obrigatório").matches(/^[0-9]{5}-[0-9]{3}$/, {message: "CEP inválido"}),
    state: yup.string().required("Estado é obrigatório"),
    number: yup.string().required("Número é obrigatório"),
    city: yup.string().required("Cidade é obrigatório"),
    price: yup.string().required("Preço é obrigatório"),
    complements: yup.string()
});

export default  function Announcement_id(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const [addressInfo, setAddressInfo] = useState({});

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createAddressForm),
    });
    const {errors} = formState;

    const cpfRemovedSpecialChar = (value: string) => {
        return value.replace("-", "");
    }

    async function handleCreateAddress(data) {
            console.log(data)
            const {data: address} = await api.post("announcement/address/asdasd", data);

    }


    return (
        <div className={styles.create_address}>
            <Toaster />
            <Sidebar />

            <div className={styles.create_address_container}>
                <section className={styles.create_address_form}>
                    <h2>Localização do imóvel</h2>

                    <form onSubmit={handleSubmit(handleCreateAddress)}>
                        <Input name={"cep"} label={"CEP"} {...register("cep")} mask={cep} error={errors.cep} />
                        <fieldset>
                            <Input name={"state"} label={"Estado"} {...register("state")} error={errors.state}/>
                            <Input name={"number"} label={"Número"} {...register("number")} error={errors.number}/>
                        </fieldset>
                        <Input name={"city"} label={"Cidade"} {...register("city")} error={errors.city}/>
                        <Input name={'complement'} label={"Complemento"} {...register("complement")} error={errors.complement}/>
                        <Divisor />
                        <Map  />

                        <button type={"submit"}>Enviar</button>
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
