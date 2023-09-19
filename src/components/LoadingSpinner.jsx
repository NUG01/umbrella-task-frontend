import styles from "../styles/LoadingSpinner.module.css";

export default function LoadingSpinner() {
  return (
    <div className="w-[100%] h-[80px] flex items-center justify-center mt-[50px]">
      <span className={styles.loader}></span>;
    </div>
  );
}
