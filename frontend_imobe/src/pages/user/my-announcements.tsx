/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {Sidebar} from "../../components/Sidebar";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import {useFetch} from "../../hooks/useFetch";
import styles from '../../styles/pages/user/my-announcements.module.scss';
import {FaBed} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {IoMdTrash} from "react-icons/io";
import {api} from "../../services/api";
import {toast, Toaster} from "react-hot-toast";
import Modal from "react-modal";
import {modalCustomStyles} from "../../utils/ModalStyleConf";
import {response} from "express";

type Announcement = {
    id: string;
    title: string;
    slug_title: string;
    rooms: number;
    square_meters: number;
    price: number;
    created_at: string;
    images: AnnouncementImage[];
    addressId: Address
}


type AnnouncementImage = {
    id: string;
    path: string;
};

type Address = {
    address: string
    zip_code: string,
    number: string,
    complement?: string,
    latitude: number,
    longitude: number,
}

export default function  MyAnnouncement() {

    const router = useRouter();

    const [announcements, setAnnouncements] = useState<Announcement[] | null>();
    const [isActive, setIsActive] = useState(false);

    const { ["imobeflex.token"]: token } = parseCookies();

    useEffect(() => {
        api.get<Announcement[]>('announcement/user', {
            headers: { Authorization: `Bearer ${token}` },
        }).then(response => setAnnouncements(response.data));
    }, [])

    const {data} = useFetch<Announcement[]>('announcement/user', token);

    function handleModalOpen(): void {
        return setIsActive(!isActive);
    }

    async function handleDeleteAnnouncement(id: string) {
        const {status} = await api.delete(`announcement/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if(status !== 200) {
            return toast.error("Não foi possível remover o anúncio.");
        }

        setAnnouncements(announcements.filter(announce => announce.id !== id));

        toast.success("Seu imóvel foi removido!");

        handleModalOpen();
    }

    return (
        <div className={styles.my_announcement_container}>
            <Sidebar />
            <Toaster />
            <div className={styles.content_announcement_list}>
                <h1>Meus anúncios</h1>
                <section className={styles.content_list}>
                    {announcements?.map(announce => {
                      return (
                          <div key={announce.id}>
                              <section>
                                <span>{announce.title} {Number(announce.rooms) === 0 && <span>Terreno</span>}</span>
                                  <span>{announce.addressId.address}</span>
                              </section>
                              <img src={announce.images[0].path} alt={announce.title}/>

                              <div>
                                  <ul>
                                      {Number(announce.rooms) !== 0 && <li> <FaBed  size="20" />  {announce.rooms}</li>}
                                      <li>{announce.square_meters} m²</li>
                                  </ul>
                                  <div className={styles.actions}>
                                    <button onClick={handleModalOpen}><IoMdTrash size="20" color="#ed394f"/></button>
                                    <button type="button" onClick={() => router.push(`/publish/${announce?.id}`)}>Ver publicação</button>
                                  </div>
                              </div>
                              <Modal
                                  isOpen={isActive}
                                  style={modalCustomStyles}
                                  onRequestClose={handleModalOpen}
                                  contentLabel="Exit to app Modal"
                              >
                                  <div className={styles.exitToApp}>
                                      <h2>Você tem certeza que deseja excluir esse anúncio?</h2>
                                      <button type="button" onClick={handleModalOpen}>
                                          Não
                                      </button>
                                      <button type="button" onClick={() =>handleDeleteAnnouncement(announce.id)}>
                                          Sim
                                      </button>
                                  </div>
                              </Modal>
                          </div>
                      );
                    })}
                </section>
            </div>

        </div>
    )
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
