import {useRouter} from "next/router";
import {GetStaticPaths, GetStaticProps, InferGetServerSidePropsType} from "next";
import {api} from "../../services/api";
import {getServerSideProps} from "../user/announcement/[address_id]";
import React from "react";

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

type AnnouncementProps = {
    announcement: AnnouncementData
}


const Announcement: React.FC<AnnouncementProps> = ({announcement}) =>  {
    const router = useRouter();

    return (
      <div>
          <h1>{router.query}</h1>
      </div>
    );
}


export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get("announcement/list/1");

    const paths = data.map((announce) => {
        return {
            params: {
                slug: announce.id,
            },
        };
    });

    return {
        paths,
        fallback: "blocking",
    };
};


export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params;

    const { data } = await api.get(`/announcement/${slug}`);

    const announcement = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,

        duration: Number(data.file.duration),

        description: data.description,
        url: data.file.url,
    };

    return {
        props: {
            announcement,
        },
        revalidate: 60 * 60 * 24, // 24 horas
    };
};

export default Announcement;