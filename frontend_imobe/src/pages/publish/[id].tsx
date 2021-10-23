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

type AnnouncementData = {
    id: string;
    title: string;
    slug_title: string;
    rooms: number;
    square_meters: number;
    price: number;
    created_at: string;
    images: AnnouncementImage[];
    user: User;
    address: Address
};

type AnnouncementImage = {
    id: string;
    url: string;
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

    useEffect(() => {
        fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${announcement.address.latitude}&lon=${announcement.address.longitude}`
        )
        .then(response => response.json())
        .then(data => setAddressDetail(data.address));
    }, []);

    console.log(addressDetail);

    const fakeImages = [
        {
            id: v4(),
            url: "https://www.decorfacil.com/wp-content/uploads/2017/03/20171011fachada-casa-simples-pequena-99-960x600.jpg"
        },
        {
            id: v4(),
            url: "https://www.decorfacil.com/wp-content/uploads/2015/04/imagem-176.jpg"
        }
    ]

    return (
      <div className={styles.announcement_container}>
          <Header />
          <section className={styles.proprietary_user} >

              <button onClick={() => history.back()}>
                  <MdArrowBack size={33}/>
              </button>

              <div>
                  <span>{announcement?.user.name}</span>

                  <div>
                    <img src={`https://github.com/Lucas-Duarte-dev.png`} alt={announcement.user.name}/>
                  </div>
              </div>
          </section>
          <div className={styles.publish_images}>
              <section onClick={() => prevImage()}>
                  <MdKeyboardArrowLeft size={35}/>
              </section>
              <img src={slideImages(fakeImages).url} />
              <section onClick={() => prevImage()}>
                  <MdKeyboardArrowRight size={35}/>
              </section>
          </div>
          <section className={styles.container_publish_info}>
              <div className={styles.content_publish_info} >
                  <div className={styles.publish_title}>
                      <section>
                        <h1>{announcement.title}</h1>
                         <div>
                             <span> <FaBed  size="20" /> {announcement.rooms}</span>
                             <span>{announcement.square_meters}</span>
                         </div>
                      </section>
                      <span> <MdPermContactCalendar size={24}/> {announcement.created_at}</span>
                  </div>

                  <div className={styles.socials}>
                      <h3>Entre em contato para saber mais</h3>
                      <section>
                          <a href="" target="_blank">
                              <FaWhatsapp size={25} />
                              {announcement.user.phone}
                          </a>
                          <a href="" target="_blank">
                              <FaRegEnvelope size={25}/>
                              {announcement.user.email}
                          </a>
                      </section>
                  </div>
                  <Divisor />
              </div>
              <div className={styles.content_publish_price}>
                  <p>Clique aqui para entender mais sobre o funcionamento da visita aos imóveis da Imobe Flex</p>
                  <h2>R$ {announcement.price}</h2>
                  <button>Quero visitar o imóvel</button>
              </div>
          </section>
          <div>
              <div className={styles.content_address_info}>
                <h1>Localização</h1>
                <section className={styles.address_info}>
                    <h3>{announcement.address.address}</h3>
                    <div>
                        <span>{addressDetail?.region}</span>
                        <span>{addressDetail?.road}</span>
                    </div>
                </section>
              </div>
              <Map current_location={{lat: announcement.address.latitude, lng: announcement.address.longitude}} isDraggingAndZoom={false}/>
          </div>
          <Footer />
      </div>
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
        created_at: format(parseISO(data.created_at), "d MMM yyyy", {
            locale: ptBR,
        }),
        images: data.images.map((image) => {
            return {
                id: image.id,
                url: image.url,
            };
        }),
        user: {
            name: data.user.name,
            phone: data.user.phone,
            avatar: data.user.avatar,
            email: data.user.email,
        },
        address: {
            address: data.address.address,
            zip_code: data.address.zip_code,
            complement: data.address.complement,
            number: data.address.number,
            latitude: data.address.latitude,
            longitude: data.address.longitude
        }
    };


    return {
        props: {
            announcement,
        },
        revalidate: 60 * 60 * 5, // 5 horas
    };
};

export default Announcement;