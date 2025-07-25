import { useState } from "react";
import styles from "./mobileImage.module.scss";

interface MobileImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function MobileImage({ src, alt, className }: MobileImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`${styles.image} ${isLoaded ? styles.loaded : styles.loading}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
