/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {useRouter} from "next/router";
import {GetStaticPaths, GetStaticProps, InferGetServerSidePropsType} from "next";
import {api} from "../../services/api";
import React, {useEffect, useState} from "react";
import {FormatCurrency} from "../../utils/FormatCurrency";
import {format, parseISO} from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import styles from '../../styles/pages/announcement/announcement.module.scss';
import {MdArrowBack, MdKeyboardArrowLeft, MdKeyboardArrowRight, MdPermContactCalendar} from "react-icons/md";
import {Header} from "../../components/Header";
import {v4} from "uuid";
import {Map} from "../../components/Map";
import {FaBed, FaEnvelope, FaMailchimp, FaRegEnvelope, FaWhatsapp} from "react-icons/fa";
import {Divisor} from "../../components/Divisor";
import {Footer} from "../../components/Footer";
import Modal from "react-modal";
import {modalCustomStyles} from "../../utils/ModalStyleConf";

type AnnouncementData = {
    id: string;
    title: string;
    slug_title: string;
    rooms: number;
    square_meters: number;
    price: number;
    created_at: string;
    images: AnnouncementImage[];
    userId: User;
    addressId: Address
};

type AnnouncementImage = {
    id: string;
    path: string;
};

type User = {
    name: string;
    avatar: string | null;
    phone: string;
    email: string;
};

type Address = {
    address: string
    zip_code: string,
    number: string,
    complement?: string,
    latitude: number,
    longitude: number,
}

type AddressRequest = {
    city: string
    city_district: string
    country: string
    county: string
    municipality: string
    quarter: string
    region: string
    road: string
    state: string
    suburb: string
}

type AnnouncementProps = {
    announcement: AnnouncementData
}


const Announcement: React.FC<AnnouncementProps> = ({announcement}) =>  {

    const [currentImage, setCurrentImage] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [addressDetail, setAddressDetail] = useState<AddressRequest | undefined>();

    function nextImage(): void {
        return setCurrentImage(currentImage + 1);
    }

    function prevImage(): void {
        return setCurrentImage(currentImage - 1);
    }

    function slideImages(images: AnnouncementImage[]): AnnouncementImage {
        const totalImages = images.length;

        if (currentImage > totalImages - 1) {
            setCurrentImage(0);
            return images[currentImage - 1];
        }

        if (currentImage < 0) {
            setCurrentImage(totalImages - 1);
            return images[totalImages - 1];
        }

        const image = images[currentImage];

        return image;
    }

    function handleModalOpen(): void {
        return setIsActive(!isActive);
    }

    useEffect(() => {
        fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${announcement.addressId.latitude}&lon=${announcement.addressId.longitude}`
        )
        .then(response => response.json())
        .then(data => setAddressDetail(data.address));
    }, []);

    return (
        <>
          <div className={styles.announcement_container}>
              <Header />
              <section className={styles.proprietary_user} >

                  <button onClick={() => history.back()}>
                      <MdArrowBack size={33}/>
                  </button>

                  <div>
                      <span>{announcement?.userId.name}</span>

                      <div>
                        <img src={announcement?.userId.avatar} alt={announcement?.userId.name}/>
                      </div>
                  </div>
              </section>
              <div className={styles.publish_images}>
                  <section onClick={() => prevImage()}>
                      <MdKeyboardArrowLeft size={35}/>
                  </section>
                  <img src={slideImages(announcement?.images)?.path} />
                  <section onClick={() => nextImage()}>
                      <MdKeyboardArrowRight size={35}/>
                  </section>
              </div>
              <section className={styles.container_publish_info}>
                  <div className={styles.content_publish_info} >
                      <div className={styles.publish_title}>
                          <section>
                            <h1>{announcement.title}</h1>
                             <div>
                                 {announcement.rooms !== 0 ? <span> <FaBed  size="20" /> {announcement.rooms}</span> : <span>Terreno</span>}
                                 <span>{announcement.square_meters}</span>
                             </div>
                          </section>
                          <span> <MdPermContactCalendar size={24}/> {announcement.created_at}</span>
                      </div>
                      <div className={styles?.content_address_info}>
                          <h1>Localização</h1>
                          <section className={styles?.address_info}>
                              <h3>{announcement.addressId.address} - N° {announcement.addressId.number}</h3>
                              <div>
                                  <span>{addressDetail?.region}</span>
                                  <span>{addressDetail?.road}</span>
                              </div>
                              <div className={styles.address_info_detail}>
                                <h4>Informações detalhadas</h4>
                                <p>
                                    <strong>País:</strong> {addressDetail?.country}, {""}
                                    <strong>Cidade:</strong> {addressDetail?.city}, {""}
                                    <strong>Estado:</strong> {addressDetail?.state}, {""}
                                    <strong>Bairro:</strong> {addressDetail?.suburb}, {""}
                                    <strong>Região:</strong> {addressDetail?.region}, {""}
                                    <strong>Rua: </strong> {addressDetail?.road}
                                </p>

                              </div>

                          </section>
                      </div>

                      <Divisor />
                  </div>
                  <div className={styles.content_publish_price}>
                      <p>Clique aqui para entender mais sobre o funcionamento da visita aos imóveis da Imobe Flex</p>
                      <h2>R$ {announcement.price}</h2>
                      <button onClick={() => handleModalOpen()}>Quero visitar o imóvel</button>
                  </div>
              </section>
              <div>

                  <Map current_location={{lat: announcement.addressId.latitude, lng: announcement.addressId.longitude}} isDraggingAndZoom={false}/>
              </div>
          </div>
            <Modal
                isOpen={isActive}
                style={modalCustomStyles}
                onRequestClose={handleModalOpen}
                contentLabel="Exit to app Modal"
            >
                <div className={styles.socials}>
                    <h3>Entre em contato com o dono do imóvel</h3>
                    <section className={styles.socials_links}>
                        <a href={`https://api.whatsapp.com/send?phone=55${announcement.userId.phone}&text=Gostaria%20de%20saber%20mais%20sobre%20o%20seu%20an%C3%BAncio%20na%20Imobe%20Flex%3A%20${announcement.title}`} target="_blank" rel="noreferrer">
                            <FaWhatsapp size={25} color="#0ea490" />
                            {announcement.userId.phone}
                        </a>
                        <a href="" target="_blank">
                            <FaRegEnvelope size={25} color="#0ea490" />
                            {announcement.userId.email}
                        </a>
                    </section>
                </div>
            </Modal>
          <Footer />
        </>
    );
}


export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get("announcement/list/1");

    const paths = data.map((announce) => {
        return {
            params: {
                id: announce.id,
            },
        };
    });

    return {
         paths,
        fallback: "blocking",
    };
};


export const getStaticProps: GetStaticProps = async (ctx) => {
    const { id } = ctx.params;

    const { data } = await api.get<AnnouncementData>(`announcement/${id}`);

    const announcement = {
        id: data.id,
        title: data.title,
        slug_title: data.slug_title,
        rooms: data.rooms,
        square_meters: `${data.square_meters}m²`,
        price: FormatCurrency(data.price),
        created_at: format(parseISO(data?.created_at), "d MMM yyyy", {
            locale: ptBR,
        }),
        images: data.images,
        userId: {
            name: data.userId.name,
            phone: data.userId.phone,
            avatar: data.userId.avatar,
            email: data.userId.email,
        },
        addressId: {
            address: data.addressId.address,
            zip_code: data.addressId.zip_code,
            complement: data.addressId.complement,
            number: data.addressId.number,
            latitude: data.addressId.latitude,
            longitude: data.addressId.longitude
        }
    };


    return {
        props: {
            announcement: announcement || null,
        },
        revalidate: 60 * 60 * 5, // 5 horas
    };
};

export default Announcement;