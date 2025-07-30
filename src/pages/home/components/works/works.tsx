import styles from "./works.module.scss";
import { motion } from "framer-motion";
import areaImage from "@/assets/area.webp";

// Animation configurations
import {
  getConditionalAnimation,
  getConditionalImageListAnimation,
  imageItemAnimation,
  imageItemTransition,
} from "./anim";
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
import Tab, { TabItem } from "@/components/tab/tab";
import { useState } from "react";

const IMAGE_DATA = [
  {
    id: 1,
    year: 2023,
    src: areaImage,
    alt: "Area View",
    desc: "<AREA VIDEOSORVEGLIATA>, 2023. Gouache on canvas, 130x162cm.",
  },
  {
    id: 2,
    year: 2025,
    src: damnImage,
    alt: "Damn",
    desc: "<Damn these guys r so stylish> 2025. Oil on canvas, 117x73cm.",
  },
  {
    id: 3,
    year: 2024,
    src: fenceImage,
    alt: "Fence",
    desc: "<Fence>, 2024. Oil on canvas, 73x117cm.",
  },
  {
    id: 4,
    year: 2025,
    src: flower1Image,
    alt: "Flower 1",
    desc: "<花樣年華(화양연화)> 2025. Oil on canvas, 75x153cm.",
  },
  {
    id: 5,
    year: 2025,
    src: flower2Image,
    alt: "Flower 2",
    desc: "<花樣年華(화양연화)> 2025. Oil on canvas, 33x24cm.",
  },
  {
    id: 6,
    year: 2023,
    src: forestImage,
    alt: "Forest",
    desc: "<Forest>, 2023. Oil on canvas, 61x91cm.",
  },
  {
    id: 7,
    year: 2023,
    src: grandImage,
    alt: "Grand",
    desc: "<Grand Cross>, 2023. Gouache on canvas, 117x91cm.",
  },
  {
    id: 8,
    year: 2023,
    src: riverImage,
    alt: "River",
    desc: "<River>, 2023. Oil on canvas, 91x91cm.",
  },
  {
    id: 9,
    year: 2023,
    src: roomImage,
    alt: "Room",
    desc: "<Room>, 2023. Oil on canvas, 117x91cm.",
  },
  {
    id: 10,
    year: 2024,
    src: singImage,
    alt: "Sing",
    desc: "<가재가 노래하는 곳>, 2024. Oil on canvas, 71x159cm.",
  },
  {
    id: 11,
    year: 2024,
    src: soniaImage,
    alt: "Sonia",
    desc: "<Sonia>, 2024. Oil on canvas, 73x60cm.",
  },
  {
    id: 12,
    year: 2023,
    src: spongeImage,
    alt: "Sponge",
    desc: "<뚱이와 스폰지밥 (용맹한 발걸음)>, 2023. Oil on canvas, 24x33cm.",
  },
  {
    id: 13,
    year: 2024,
    src: starsImage,
    alt: "Stars",
    desc: "<Stars>, 2024. Oil on canvas, 41x32cm.",
  },
  {
    id: 14,
    year: 2023,
    src: stationImage,
    alt: "Station",
    desc: "<Station>, 2023. Gouache on canvas, 97x194cm.",
  },
  {
    id: 15,
    year: 2024,
    src: streetImage,
    alt: "Street",
    desc: "<25th Street>, 2024. Oil on canvas, 117x91cm.",
  },
  {
    id: 16,
    year: 2024,
    src: treeImage,
    alt: "Tree",
    desc: "<근데 저게 버드나무인지는 모르겠어.>, 2024. Oil on canvas, 65x53cm.",
  },
  {
    id: 17,
    year: 2023,
    src: watermelonImage,
    alt: "Watermelon",
    desc: "<Smells Like Watermelon>, 2023. Oil on canvas, 65x53cm.",
  },
  {
    id: 18,
    year: 2024,
    src: windowImage,
    alt: "Window",
    desc: "<Window>, 2024. Oil on canvas, 73x117cm.",
  },
];

const TAB_ITEMS: TabItem[] = [
  {
    id: 0,
    title: "ALL",
  },
  {
    id: 1,
    title: "2023",
  },
  {
    id: 2,
    title: "2024",
  },
  {
    id: 3,
    title: "2025",
  },
];

interface ImageItemProps {
  activeFullpageIndex: number;
  setActiveFullpageIndex: (index: number) => void;
}

export default function Works({
  activeFullpageIndex,
  setActiveFullpageIndex,
}: ImageItemProps) {
  const [activeTab, setActiveTab] = useState(0);
  const currentImageList = IMAGE_DATA.filter((image) => {
    if (activeTab === 0) return true;
    return image.year === Number(TAB_ITEMS[activeTab].title);
  });
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.title}
        {...getConditionalAnimation(activeFullpageIndex === 1)}
      >
        WORKS
      </motion.div>

      <Tab
        items={TAB_ITEMS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isVisible={activeFullpageIndex === 1}
      />

      <motion.button
        className={styles.scroll_to_bottom}
        onClick={() => {
          setActiveFullpageIndex(2);
        }}
      >
        Move to Exhibition
      </motion.button>

      <motion.div
        className={styles.image_list}
        {...getConditionalImageListAnimation(activeFullpageIndex === 1)}
      >
        {currentImageList.map((image) => (
          <motion.div
            key={image.id}
            className={styles.image_item}
            variants={imageItemAnimation}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-20px" }}
            //@ts-ignore
            transition={imageItemTransition}
          >
            <MobileImage src={image.src} alt={image.alt} />
            <div className={styles.desc}>{image.desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
