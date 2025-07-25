import styles from "./works.module.scss";
import { motion } from "framer-motion";
import areaImage from "@/assets/area.webp";
import damnImage from "@/assets/damn.webp";
import fenceImage from "@/assets/fence.webp";
import flower1Image from "@/assets/flower1.webp";
import flower2Image from "@/assets/flower2.webp";
import forestImage from "@/assets/forest.webp";
import grandImage from "@/assets/grand.webp";
import riverImage from "@/assets/river.webp";
import roomImage from "@/assets/room.webp";
import singImage from "@/assets/sing.webp";
import soniaImage from "@/assets/sonia.webp";
import spongeImage from "@/assets/sponge.webp";
import starsImage from "@/assets/stars.webp";
import stationImage from "@/assets/station.webp";
import streetImage from "@/assets/street.webp";
import treeImage from "@/assets/tree.webp";
import watermelonImage from "@/assets/watermelon.webp";
import windowImage from "@/assets/window.webp";
import MobileImage from "@/components/mobileImage/mobileImage";

const IMAGE_DATA = [
  { id: 1, src: areaImage, alt: "Area View" },
  { id: 2, src: damnImage, alt: "Damn" },
  { id: 3, src: fenceImage, alt: "Fence" },
  { id: 4, src: flower1Image, alt: "Flower 1" },
  { id: 5, src: flower2Image, alt: "Flower 2" },
  { id: 6, src: forestImage, alt: "Forest" },
  { id: 7, src: grandImage, alt: "Grand" },
  { id: 8, src: riverImage, alt: "River" },
  { id: 9, src: roomImage, alt: "Room" },
  { id: 10, src: singImage, alt: "Sing" },
  { id: 11, src: soniaImage, alt: "Sonia" },
  { id: 12, src: spongeImage, alt: "Sponge" },
  { id: 13, src: starsImage, alt: "Stars" },
  { id: 14, src: stationImage, alt: "Station" },
  { id: 15, src: streetImage, alt: "Street" },
  { id: 16, src: treeImage, alt: "Tree" },
  { id: 17, src: watermelonImage, alt: "Watermelon" },
  { id: 18, src: windowImage, alt: "Window" },
];
//descripton이 추가되어야하고 같이 렌더되어야함.

interface ImageItemProps {
  activeFullpageIndex: number;
}

export default function Works({ activeFullpageIndex }: ImageItemProps) {
  console.log(activeFullpageIndex);
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.title}
        initial={{ opacity: 0, y: 10 }}
        animate={
          activeFullpageIndex === 1
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 10 }
        }
        transition={{ duration: 0.5, delay: 0.65 }}
      >
        Works
      </motion.div>

      <motion.div
        className={styles.image_list}
        initial={{ opacity: 0 }}
        animate={activeFullpageIndex === 1 ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.65 }}
      >
        {IMAGE_DATA.map((image) => (
          <div key={image.id} className={styles.image_item}>
            <MobileImage src={image.src} alt={image.alt} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
