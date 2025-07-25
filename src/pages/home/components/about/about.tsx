import styles from './about.module.scss';

export default function About() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>So, Beomsoo</h1>

      <section className={styles.info}>
        <p className={styles.name}>소범수 So, Beomsoo</p>
        <p className={styles.birthday}>1997</p>

        <div className={styles.category_list}>
          <div className={styles.category}>
            <p className={styles.category_title}>학력</p>
            <p>고려대학교 디자인조형학부 조형미술 전공 졸업</p>
            <p>고려대학교 디자인조형학과 조형문화예술전공 석사과정 재학</p>
          </div>

          <div className={styles.category}>
            <p className={styles.category_title}>단체전</p>
            <p>2023 MEME-GENE, 고려대학교 박물관, 서울 ,한국</p>
            <p>2023 에버레버 아트프로젝트, 성북예술창작터, 서울, 한국</p>
            <p>
              2020 아시아프&히든 아티스트 페스티벌, 홍익대학교 현대미술관, 서울,
              한국
            </p>
          </div>

          <div className={styles.category}>
            <p className={styles.category_title}>수상</p>
            <p>2020, ASIAAFPRIZE 수상</p>
          </div>

          <div className={styles.category}>
            <p className={styles.category_title}>Instagram</p>
            <p>@sobeomsoo</p>
          </div>

          <div className={styles.category}>
            <p className={styles.category_title}>연락처</p>
            <p>+82-10-8919-6700</p>
          </div>

          <div className={styles.category}>
            <p className={styles.category_title}>E-mail</p>
            <p>sobumsoo23@naver.com</p>
          </div>
        </div>
      </section>
    </div>
  );
}
