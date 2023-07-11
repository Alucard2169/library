import { FC } from "react";

interface Data {
    src: string,
    alt: string,
    className: string,
}

interface LazyImageProps {
    data : Data
}

const LazyImage: FC<LazyImageProps> = ({ data }) => {
    const { src, alt, className } = data;


    return ( 
        <img src={src} alt={alt} className={className}/>
     );
}
 
export default LazyImage;