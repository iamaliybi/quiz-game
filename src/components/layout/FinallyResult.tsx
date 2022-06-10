import { useEffect } from 'react';
import { getCorrectQuestions, getQuestions, getUsername } from '../../app/features/appSlice';
import { useAppSelector } from '../../app/hooks';
import styles from './FinallyResult.module.scss';

type Props = {
	retryAction: () => void
};

const FinallyResult = ({ retryAction }: Props) => {
	const { questions, correctQuestions, username } = useAppSelector(state => ({
		questions: getQuestions(state),
		correctQuestions: getCorrectQuestions(state),
		username: getUsername(state)
	}));

	useEffect(() => {
		const classList = document.body.classList;
		if (!classList.contains('primary-bg')) classList.add('primary-bg');
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.textGroup}>
				<div className={styles.title}>
					<span>Great!</span>
					<span>{username}</span>
					<span>You've Answered</span>
				</div>

				<div className={styles.answered}>
					<span>{correctQuestions}/{questions?.length}</span>
					<span>Of Questions</span>
				</div>
			</div>

			<div className={styles.retry}>
				<button onClick={retryAction} type='submit'>Retry</button>
			</div>
		</div>
	);
};

export default FinallyResult;