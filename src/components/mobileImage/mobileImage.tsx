import { useState, useRef, useEffect } from "react";
import styles from "./mobileImage.module.scss";

interface MobileImageProps {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean; // 우선순위 이미지 (즉시 로드)
}

export default function MobileImage({ src, alt, className, priority = false }: MobileImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // priority가 true면 즉시 true
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer로 뷰포트 진입 감지 (priority가 false일 때만)
  useEffect(() => {
    if (priority || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect(); // 한 번만 실행
        }
      },
      {
        rootMargin: "50px", // 50px 전에 미리 로드
        threshold: 0.1,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    console.error(`Failed to load image: ${src}`);
  };

  return (
    <div ref={containerRef} className={`${styles.wrapper} ${className || ""}`}>
      {/* 스켈레톤 로딩 (priority가 false일 때만) */}
      {!isInView && !priority && (
        <div className={styles.skeleton} />
      )}
      
      {/* 실제 이미지 */}
      {isInView && (
        <img
          ref={imgRef}
          src={src}
          alt={alt || ""}
          loading={priority ? "eager" : "lazy"}
          className={`${styles.image} ${isLoaded ? styles.loaded : styles.loading}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
      
      {/* 에러 상태 */}
      {hasError && (
        <div className={styles.error}>
          <span>이미지를 불러올 수 없습니다</span>
        </div>
      )}
    </div>
  );
}
