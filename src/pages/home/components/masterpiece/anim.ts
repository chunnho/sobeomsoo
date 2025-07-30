import { Variants } from "framer-motion";

// Title 애니메이션 설정
export const titleAnimation: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export const titleTransition = {
  duration: 0.5,
  delay: 0.5,
};

// Content Item 애니메이션 설정
export const contentItemAnimation: Variants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
};

export const getContentItemTransition = (index: number) => ({
  duration: 0.5,
  delay: 0.5 + index * 0.18,
});

// Image Wrapper 애니메이션 설정
export const imageWrapperAnimation: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export const imageWrapperTransition = {
  duration: 1,
  delay: 1.5,
};
