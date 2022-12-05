import styles from "./banner.module.css";
const Banner = (props) => {
  return (
    <div>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Connoisseur</span>
      </h1>
      <p className={styles.subTitle}>Discover Your Local Coffee Shop!!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={props.buttonClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
