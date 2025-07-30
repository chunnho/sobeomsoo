import { Variants } from "framer-motion";

// Title 애니메이션 설정
export const titleAnimation: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export const titleTransition = {
  duration: 0.5,
  delay: 0.65,
};

// Tab Wrapper 애니메이션 설정
export const tabWrapperAnimation: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export const tabWrapperTransition = {
  duration: 0.5,
  delay: 0.65,
};

// Image List 애니메이션 설정
export const imageListAnimation: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const imageListTransition = {
  duration: 1.5,
  delay: 0.65,
};

// 조건부 애니메이션을 위한 헬퍼 함수
export const getConditionalAnimation = (isActive: boolean) => ({
  initial: { opacity: 0, y: 10 },
  animate: isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
  transition: { duration: 0.5, delay: 0.65 },
});

export const getConditionalImageListAnimation = (isActive: boolean) => ({
  initial: { opacity: 0 },
  animate: isActive ? { opacity: 1 } : { opacity: 0 },
  transition: { duration: 1.5, delay: 0.65 },
});

// 개별 이미지 아이템 애니메이션 설정
export const imageItemAnimation: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const imageItemTransition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuart
};
