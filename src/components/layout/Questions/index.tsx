import { useEffect, useState } from 'react';
import { addAnsweredQuestion, getAnsweredQuestions, getQuestions, addCorrectQuestion } from '../../../app/features/appSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Question from './Questions';

type Props = {
	goToLastStep: () => void
};

const Questions = ({ goToLastStep }: Props) => {
	const { questions, answeredQuestions } = useAppSelector(state => ({
		questions: getQuestions(state),
		answeredQuestions: getAnsweredQuestions(state)
	}));

	const dispatch = useAppDispatch();

	const getActiveQuestion = () => {
		const totalQuestions = questions as QuestionType[];
		return totalQuestions[totalQuestions.length - (totalQuestions.length - answeredQuestions)];
	};

	const goToNextQuestion = () => {
		const totalQuestions = questions as QuestionType[];

		/* Go to last step if questions are over */
		if (answeredQuestions === totalQuestions.length - 1) {
			goToLastStep();
			return;
		}

		/* Go to next questions */
		dispatch(addAnsweredQuestion());
	};

	const onAnswerSelected = (answer: string, isCorrect: boolean) => {
		if (isCorrect) dispatch(addCorrectQuestion());

		goToNextQuestion();
	};

	useEffect(() => {
		const classList = document.body.classList;
		if (classList.contains('primary-bg')) classList.remove('primary-bg');
	}, []);

	return (
		<Question
			question={getActiveQuestion()}
			currentQuestion={answeredQuestions + 1}
			totalQuestion={questions?.length || 0}
			onAnswerSelected={onAnswerSelected}
			onTimeUp={goToLastStep}
		/>
	);
};

export default Questions;