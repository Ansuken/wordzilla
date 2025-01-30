import styles from './Header.module.css';

export const Header = () => {
	return (
		<div className={styles.header}>
			<h1 className={styles.gradientBg}>Wordzilla</h1>
			<h4>Piensa rápido, adivina bien, o Wordzilla devorará tu vocabulario.</h4>
		</div>
	)
}
