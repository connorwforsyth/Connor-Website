import styles from "./spinner.module.css";

const bars = new Array(12).fill(0);

export function Spinner({ color, size = 20 }) {
  return (
    <div
      className={styles.wrapper}
      style={
        {
          "--spinner-color": color,
          "--spinner-size": `${size}px`,
        } as React.CSSProperties
      }
    >
      <div className={styles.spinner}>
        {bars.map((_, i) => (
          <div className={styles.bar} key={`spinner-bar-${i}`} />
        ))}
      </div>
    </div>
  );
}
