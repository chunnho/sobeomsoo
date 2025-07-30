import styles from "./exhibition.module.scss";
import { motion } from "framer-motion";

interface ImageItemProps {
  activeFullpageIndex: number;
}

export default function Exhibition({ activeFullpageIndex }: ImageItemProps) {
  return (
    <div className={styles.wrapper}>
      <motion.div
        className={styles.title}
        initial={{ opacity: 0, y: 10 }}
        animate={
          activeFullpageIndex === 2
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 10 }
        }
        transition={{ duration: 0.5, delay: 0.65 }}
      >
        EXHIBITION
      </motion.div>
    </div>
  );
}

//이미지 최적화
//폰트 적용
//뷰에 들어왔을때 처리 안됨