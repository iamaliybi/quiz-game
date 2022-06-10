import styles from './Questions.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { decodeStr } from '../../../utils/helper';
import CircularProgressBar from '../../common/CircularProgressBar';

type Props = {
	question: QuestionType;
	currentQuestion: number;
	totalQuestion: number;
	onAnswerSelected: (answer: string, isCorrect: boolean) => void;
	onTimeUp: () => void;
};

const Question = ({ question, currentQuestion, totalQuestion, onAnswerSelected, onTimeUp }: Props) => {
	const timer = useRef<NodeJS.Timer | undefined>(undefined);

	const [times, setTimes] = useState<number>(10);

	const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(undefined);

	const clearTimer = () => {
		clearInterval(timer.current);
		timer.current = undefined;
	};

	const checkAnswer = (answer: string) => {
		clearTimer();
		setSelectedAnswer(answer);

		setTimeout(() => {
			onAnswerSelected(answer, correctAnswer === answer);
		}, 1000);
	};

	const correctAnswer = useMemo(() => decodeStr(question.correct_answer), [question]);

	useEffect(() => {
		setTimes(10);
		setSelectedAnswer(undefined);

		if (timer.current) clearInterval(timer.current);

		timer.current = setInterval(() => setTimes(t => t - 1), 1000);
	}, [question]);

	useEffect(() => clearTimer, []);

	useEffect(() => {
		if (times !== 0) return;

		clearTimer();
		onTimeUp();
	}, [times]);

	return (
		<div className={styles.container}>
			<div className={styles.timeUp}>
				<CircularProgressBar
					percent={100 - (times * 10)}
					value={times}
				/>
			</div>

			<div className={styles.question}>
				<div className={styles.questionBox}>
					<div className={styles.questionBoxInner}>
						<div className={styles.number}>
							<h3>Question {`${currentQuestion}/${totalQuestion}`}</h3>
						</div>
						<div className={styles.title}>
							<span>{question.question}</span>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.answers}>
				{question.answers.map(answer => (
					<button
						key={answer}
						type='button'
						onClick={() => checkAnswer(answer)}
						disabled={selectedAnswer !== undefined && answer !== selectedAnswer}
						className={selectedAnswer !== answer ? undefined : (correctAnswer === answer ? styles['is-valid'] : styles['is-invalid'])}
					>
						{answer}
					</button>
				))}
			</div>
		</div>
	);
};

export default Question;