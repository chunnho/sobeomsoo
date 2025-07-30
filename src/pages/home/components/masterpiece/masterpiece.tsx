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
import { useState } from "react";

// Animation configurations
import {
  titleAnimation,
  titleTransition,
  contentItemAnimation,
  getContentItemTransition,
  imageWrapperAnimation,
  imageWrapperTransition,
} from "./anim";

interface MasterpieceProps {
  activeFullpageIndex: number;
  setActiveFullpageIndex: (index: number) => void;
}

interface ContentItem {
  id: number;
  label: string;
}

const IMAGE_DATA = [
  {
    id: 0,
    year: 2024,
    src: streetImage,
    alt: "Street Scene",
    desc: "<25th Street>, 2024. Oil on canvas, 117x91cm.",
  },
  {
    id: 1,
    year: 2023,
    src: grandImage,
    alt: "Area View",
    desc: "<Grand Cross>, 2023. Gouache on canvas, 117x91cm.",
  },
  {
    id: 2,
    year: 2024,
    src: soniaImage,
    alt: "Sonia",
    desc: "<Sonia>, 2024. Oil on canvas, 73x60cm.",
  },
  {
    id: 3,
    year: 2023,
    src: riverImage,
    alt: "River",
    desc: "<River>, 2023. Oil on canvas, 91x91cm.",
  },
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
  const [swiperActiveIdx, setSwiperActiveIdx] = useState(0);
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
        variants={titleAnimation}
        initial="initial"
        animate="animate"
        transition={titleTransition}
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
            variants={contentItemAnimation}
            initial="initial"
            animate="animate"
            transition={getContentItemTransition(index)}
          >
            {item.label}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className={styles.image_wrapper}
        variants={imageWrapperAnimation}
        initial="initial"
        animate="animate"
        transition={imageWrapperTransition}
      >
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          className={styles.swiper}
          onSlideChange={(swiper) => {
            setSwiperActiveIdx(swiper.activeIndex);
          }}
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
                priority={true}
              />
              <div className={styles.desc}>
                {IMAGE_DATA[swiperActiveIdx].desc}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
}
