import dynamic from "next/dynamic";

export const Map = dynamic(() => import("./MapComponent"),
    {
        ssr: false
    });
