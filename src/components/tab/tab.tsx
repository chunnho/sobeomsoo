import { motion } from "framer-motion";
import classNames from "classnames";
import styles from "./tab.module.scss";

export interface TabItem {
  id: number;
  title: string;
}

interface TabProps {
  items: TabItem[];
  activeTab: number;
  onTabChange: (tabId: number) => void;
  isVisible: boolean;
  className?: string;
}

export default function Tab({
  items,
  activeTab,
  onTabChange,
  isVisible,
  className,
}: TabProps) {
  return (
    <motion.div
      className={`${styles.tab_wrapper} ${className || ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.5, delay: 0.65 }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={classNames(styles.tab_item, {
            [styles.active]: activeTab === item.id,
          })}
          onClick={() => onTabChange(item.id)}
        >
          <div className={styles.tab_item_title}>{item.title}</div>
        </div>
      ))}
    </motion.div>
  );
}
