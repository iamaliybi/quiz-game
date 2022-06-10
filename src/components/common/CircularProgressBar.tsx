import { useEffect, useRef } from 'react';
import styles from './CircularProgressBar.module.scss';

type Props = {
	value: number;
	percent: number;
};

const CircularProgressBar = ({ value, percent }: Props) => {
	const circleRef = useRef<SVGCircleElement | null>(null);

	useEffect(() => {
		const circle = circleRef.current;
		if (!circle) return;

		const radius = circle.r.baseVal.value;
		const circumference = radius * 2 * Math.PI;

		circle.style.strokeDasharray = `${circumference} ${circumference}`;
		circle.style.strokeDashoffset = `${circumference}`;
	}, []);
	
	useEffect(() => {
		const circle = circleRef.current;
		if (!circle) return;

		const radius = circle.r.baseVal.value;
		const circumference = radius * 2 * Math.PI;

		const offset = circumference - percent / 100 * circumference;
		circle.style.strokeDashoffset = String(offset);
	}, [percent]);

	return (
		<div className={styles.container}>
			<svg
				className={styles.progress}
				width="120"
				height="120"
				style={{
					transform: 'rotate(-90deg)'
				}}
			>
				<circle
					stroke="var(--dls-green-100)"
					strokeWidth="6"
					fill="transparent"
					r="52"
					cx="60"
					cy="60"
				/>
				<circle
					ref={circleRef}
					stroke="var(--dls-white)"
					strokeWidth="4"
					fill="transparent"
					r="52"
					cx="60"
					cy="60"
				/>
			</svg>
			<span className={styles.value}>{value}</span>
		</div>
	);
};

export default CircularProgressBar;