import styles from './mobileImage.module.scss';

interface MobileImageProps {
  src: string;
  alt?: string;
  className?: string;
}

export default function MobileImage({ src, alt, className }: MobileImageProps) {
  return (
    <div className={`${styles.wrapper} ${className}`}>
      <img src={src} alt={alt} loading="lazy" className={styles.image} />
    </div>
  );
}
