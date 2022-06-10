import { useState } from 'react';
import { setAnsweredQuestion, setCorrectQuestion } from '../app/features/appSlice';
import { useAppDispatch } from '../app/hooks';

// Steps
import FinallyResult from '../components/layout/FinallyResult';
import Questions from '../components/layout/Questions';
import Welcome from '../components/layout/Welcome';

const Container = () => {
	/**
	 * Step 1: Display Welcome page and get user name
	 * Step 2: Fetch and display questions
	 * Step 3: Display Finally result
	 */
	const [step, setStep] = useState(0);

	const dispatch = useAppDispatch();

	const retryAction = () => {
		setStep(1);
		dispatch(setAnsweredQuestion(0));
		dispatch(setCorrectQuestion(0));
	};

	const getStepContainer = (step:  number) => [
		<Welcome key='welcome-page' goToNextStep={() => setStep(1)} />,
		<Questions key='questions-page' goToLastStep={() => setStep(2)} />,
		<FinallyResult key='finally-result-page' retryAction={retryAction} />
	][step];

	return getStepContainer(step);
};

export default Container;