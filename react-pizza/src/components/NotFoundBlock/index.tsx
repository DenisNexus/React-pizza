import styles from "./NotFoundBlock.module.scss"

export default function NotFoundBlock() {
  return (
    <div className={styles.root}>
    <h1>
      <span>😕</span>
      <br/>
      Нічого не знайдено
    </h1>
    <p className={styles.description}>
        На жаль, цієї сторінки немає
    </p>
  </div>
  )
}
