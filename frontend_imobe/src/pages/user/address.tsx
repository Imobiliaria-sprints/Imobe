import {Sidebar} from "../../components/Sidebar";
import {Input} from "../../components/Input";
import {Map} from "../../components/Map";
import {cep} from "../../utils/InputMask";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormEvent, useState} from "react";
import styles from '../../styles/pages/user/announcement-address.module.scss';
import {useCreateAnnouncement} from "../../hooks/useCreateAnnouncement";
import AsyncSelect from "react-select/async";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";
import {parseCookies} from "nookies";

const createAddressForm = yup.object().shape({
    zip_code: yup.string().required("CEP é obrigatório").matches(/^[0-9]{5}-[0-9]{3}$/, {message: "CEP inválido"}),
    state: yup.string().required("Estado é obrigatório"),
    number: yup.string().required("Número é obrigatório"),
    city: yup.string().required("Cidade é obrigatório"),
    street: yup.string().required("Rua é obrigatório"),
    price: yup.string().required("Preço é obrigatório"),
    complements: yup.string()
});

export default function Address(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const [zipCode, setZipCode] = useState("");
    const [number, setNumber] = useState("");
    const [complement, setComplement] = useState("");


    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createAddressForm),
    });

    const {errors} = formState;

    const {loadOptions, handleChangeSelect, place, handleSubmitAddress, position} = useCreateAnnouncement();

    async function handleCreateAddress(event: FormEvent) {
        event.preventDefault();

        try {
            const { latitude, longitude } = position;

            const data = {
                address: place.value,
                zip_code: zipCode,
                number,
                complement,
                latitude,
                longitude
            }

            await handleSubmitAddress(data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.create_address}>
            <Sidebar />
            <div className={styles.create_address_container}>
                <section className={styles.create_address_form}>
                    <div>
                        <h2>Localização do imóvel</h2>
                        <span>Adicione as informações da localização do imóvel</span>
                    </div>
                    <form onSubmit={handleCreateAddress}>
                        <div className={styles.asyncSelect}>
                            <label>Endereço</label>
                            <AsyncSelect placeholder="Digite seu endereço" cacheOptions loadOptions={loadOptions} onChange={handleChangeSelect} value={place} />
                        </div>
                        <fieldset>
                            <Input name={"zip_code"} label={"CEP"}
                                   error={errors.zip_code}
                                   placeholder="Digite o CEP do imóvel"
                                   {...register("zip_code")}
                                   onChange={(e) => setZipCode(e.target.value)}
                            />
                            <Input name={"number"}
                                   label={"Número"}
                                   placeholder="Digite o número da casa"
                                   error={errors.number}
                                   {...register("number")}
                                   onChange={(e) => setNumber(e.target.value)}
                            />
                        </fieldset>
                        <Input
                            name={'complement'}
                            label={"Complemento"}
                            placeholder="Casa / Apartamento / etc"
                            error={errors.complement}
                            {...register("complement")}
                            onChange={(e) => setComplement(e.target.value)}
                        />
                        <button type="submit">Próximo</button>
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
