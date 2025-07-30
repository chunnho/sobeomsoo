import MobileImage from "@/components/mobileImage/mobileImage";
import styles from "./masterpiece.module.scss";
import streetImage from "@/assets/street.webp";
import grandImage from "@/assets/grand.webp";
import soniaImage from "@/assets/sonia.webp";
import riverImage from "@/assets/river.webp";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface MasterpieceProps {
  activeFullpageIndex: number;
  setActiveFullpageIndex: (index: number) => void;
}

interface ContentItem {
  id: number;
  label: string;
}

// 여러 이미지 데이터 추가
const IMAGE_DATA = [
  { id: 1, src: streetImage, alt: "Street Scene" },
  { id: 2, src: grandImage, alt: "Area View" },
  { id: 3, src: soniaImage, alt: "Forest" },
  { id: 4, src: riverImage, alt: "River" },
];

const CONTENT_ITEMS: ContentItem[] = [
  { id: 0, label: "Hilights" },
  { id: 1, label: "Works" },
  { id: 2, label: "Exhibition" },
  { id: 3, label: "CV" },
];

export default function Masterpiece({
  activeFullpageIndex,
  setActiveFullpageIndex,
}: MasterpieceProps) {
  const handleItemClick = (index: number) => {
    setActiveFullpageIndex(index);
  };

  const getItemClassName = (index: number) => {
    return activeFullpageIndex === index ? styles.active : "";
  };

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.title}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        So, Beomsoo
      </motion.div>
      <motion.div className={styles.content_list}>
        {CONTENT_ITEMS.map((item, index) => (
          <motion.button
            key={item.id}
            className={`${styles.content_item} ${getItemClassName(item.id)}`}
            onClick={() => handleItemClick(item.id)}
            type="button"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + index * 0.18 }}
          >
            {item.label}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className={styles.image_wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          className={styles.swiper}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {IMAGE_DATA.map((image) => (
            <SwiperSlide key={image.id} className={styles.swiper_slide}>
              <MobileImage
                src={image.src}
                alt={image.alt}
                className={styles.image}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
}
