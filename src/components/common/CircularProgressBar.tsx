import styles from './CircularProgressBar.module.scss';

type Props = {
	value: number;
	percent: number;
};

const CircularProgressBar = ({ value, percent }: Props) => {
	return (
		<div className={styles.container}>
			<svg className={styles.svg}>
				<circle className={styles.bg} cx="57" cy="57" r="52" />
				<circle style={{ strokeDashoffset: 0 }} className={styles.meter} cx="57" cy="57" r="52" />
			</svg>
			<span className={styles.value}>{value}</span>
		</div>
	);
};

export default CircularProgressBar;