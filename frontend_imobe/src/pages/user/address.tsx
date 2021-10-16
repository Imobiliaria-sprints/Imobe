import {Sidebar} from "../../components/Sidebar";
import {Input} from "../../components/Input";
import {Map} from "../../components/Map";
import {cep} from "../../utils/InputMask";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useState} from "react";
import styles from '../../styles/pages/user/announcement-address.module.scss';
import {useCreateAnnouncement} from "../../hooks/useCreateAnnouncement";

const createAddressForm = yup.object().shape({
    zip_code: yup.string().required("CEP é obrigatório").matches(/^[0-9]{5}-[0-9]{3}$/, {message: "CEP inválido"}),
    state: yup.string().required("Estado é obrigatório"),
    number: yup.string().required("Número é obrigatório"),
    city: yup.string().required("Cidade é obrigatório"),
    street: yup.string().required("Rua é obrigatório"),
    price: yup.string().required("Preço é obrigatório"),
    complements: yup.string()
});

export default function Address() {
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createAddressForm),
    });

    const {errors} = formState;

    const [position, setPosition] = useState({ latitude: -23.5080806, longitude: -46.3702072 });

    const {createAddress} = useCreateAnnouncement();

    async function handleCreateAddress(data) {
        try {
            const { latitude, longitude} = position;

            const address = Object.assign(data, {
                latitude,
                longitude
            })

            await createAddress(address);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className={styles.create_address}>
            <Sidebar />
            <div className={styles.create_address_container}>
                <section className={styles.create_address_form}>
                    <h2>Localização do imóvel</h2>

                    <form onSubmit={handleSubmit(handleCreateAddress)} >
                        <Input name={"zip_code"} label={"CEP"}  mask={cep} error={errors.zip_code}  {...register("zip_code")}/>
                        <fieldset>
                            <Input name={"state"} label={"Estado"} error={errors.state} {...register("state")} />
                            <Input name={"number"} label={"Número"} error={errors.number} {...register("number")} />
                        </fieldset>
                        <Input name={"city"} label={"Cidade"}  error={errors.city} {...register("city")}/>
                        <Input name={"street"} label={"Rua"}  error={errors.street} {...register("street")} />
                        <Input name={'complement'} label={"Complemento"} error={errors.complement} {...register("complement")} />
                        <Map  />

                        <button type="submit">Próximo</button>
                    </form>

                </section>
            </div>
        </div>
    );
}

