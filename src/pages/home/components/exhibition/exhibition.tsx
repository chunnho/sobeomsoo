import Tab, { TabItem } from "@/components/tab/tab";
import {
  getConditionalAnimation,
  getConditionalImageListAnimation,
  imageItemAnimation,
  imageItemTransition,
} from "./anim";
import styles from "./exhibition.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import midWorld1Image from "@/assets/mid_world_1.webp";
import midWorld2Image from "@/assets/mid_world_2.webp";
import midWorld3Image from "@/assets/mid_world_3.webp";
import winter1Image from "@/assets/winter_1.webp";
import winter2Image from "@/assets/winter_2.webp";
import winter3Image from "@/assets/winter_3.webp";
import meme1Image from "@/assets/meme_1.webp";
import meme2Image from "@/assets/meme_2.webp";
import meme3Image from "@/assets/meme_3.webp";
import MobileImage from "@/components/mobileImage/mobileImage";

interface ImageItemProps {
  activeFullpageIndex: number;
  setActiveFullpageIndex: (index: number) => void;
}

const TAB_ITEMS: TabItem[] = [
  {
    id: 0,
    title: "Mid World",
  },
  {
    id: 1,
    title: "겨울 회화",
  },
  {
    id: 2,
    title: "MEME-GENE",
  },
];

const IMAGE_DATA = [
  {
    id: 1,
    year: 2024,
    src: midWorld1Image,
    alt: "Mid World",
    desc: "<Mid World>, 2024, 전경사진",
    type: "Mid World",
  },
  {
    id: 2,
    year: 2024,
    src: midWorld2Image,
    alt: "Mid World",
    desc: "<Mid World>, 2024, 전경사진",
    type: "Mid World",
  },
  {
    id: 3,
    year: 2024,
    src: midWorld3Image,
    alt: "Mid World",
    desc: "<Mid World>, 2024, 전경사진",
    type: "Mid World",
  },
  {
    id: 4,
    year: 2024,
    src: winter1Image,
    alt: "겨울 회화",
    desc: "<겨울 회화>, 2024, 전경사진",
    type: "겨울 회화",
  },
  {
    id: 5,
    year: 2024,
    src: winter2Image,
    alt: "겨울 회화",
    desc: "<겨울 회화>, 2024, 전경사진",
    type: "겨울 회화",
  },
  {
    id: 6,
    year: 2024,
    src: winter3Image,
    alt: "겨울 회화",
    desc: "<겨울 회화>, 2024, 전경사진",
    type: "겨울 회화",
  },
  {
    id: 7,
    year: 2024,
    src: meme1Image,
    alt: "MEME-GENE",
    desc: "<MEME-GENE>, 2024, 전경사진",
    type: "MEME-GENE",
  },
  {
    id: 8,
    year: 2024,
    src: meme2Image,
    alt: "MEME-GENE",
    desc: "<MEME-GENE>, 2024, 전경사진",
    type: "MEME-GENE",
  },
  {
    id: 9,
    year: 2024,
    src: meme3Image,
    alt: "MEME-GENE",
    desc: "<MEME-GENE>, 2024, 전경사진",
    type: "MEME-GENE",
  },
];

export default function Exhibition({
  activeFullpageIndex,
  setActiveFullpageIndex,
}: ImageItemProps) {
  const [activeTab, setActiveTab] = useState(0);
  const currentImageData = IMAGE_DATA.filter((item) => {
    return item.type === TAB_ITEMS[activeTab].title;
  });

  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.title}
        {...getConditionalAnimation(activeFullpageIndex === 2)}
      >
        EXHIBITION
      </motion.div>

      <Tab
        items={TAB_ITEMS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isVisible={activeFullpageIndex === 2}
      />

      <motion.button
        className={styles.scroll_to_bottom}
        onClick={() => {
          setActiveFullpageIndex(3);
        }}
      >
        Move to CV
      </motion.button>

      <motion.div
        className={styles.image_list}
        {...getConditionalImageListAnimation(activeFullpageIndex === 2)}
      >
        {currentImageData.map((image) => (
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
