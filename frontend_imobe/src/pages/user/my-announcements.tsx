import {Sidebar} from "../../components/Sidebar";
import {GetServerSideProps} from "next";
import {parseCookies} from "nookies";
import {useFetch} from "../../hooks/useFetch";
import styles from '../../styles/pages/user/my-announcements.module.scss';
import {FaBed} from "react-icons/fa";
import React from "react";
import {useRouter} from "next/router";

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


    const { ["imobeflex.token"]: token } = parseCookies();

    const {data} = useFetch<Announcement[]>('announcement/user', token);

    return (
        <div className={styles.my_announcement_container}>
            <Sidebar />
            <div className={styles.content_announcement_list}>
                <h1>Meus anúncios</h1>
                <section className={styles.content_list}>
                    {data?.map(announce => {
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
                                      <li>{announce.square_meters}</li>
                                  </ul>
                                  <button type="button" onClick={() => router.push(`/publish/${announce?.id}`)}>Ver publicação</button>
                              </div>
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
