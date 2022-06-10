import { useState } from 'react';

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

	const getStepContainer = (step:  number) => [
		<Welcome key='welcome-page' goToNextStep={() => setStep(1)} />,
		<Questions key='questions-page' goToLastStep={() => setStep(2)} />,
		<FinallyResult key='finally-result-page' goToFirstStep={() => setStep(0)} />
	][step];

	return getStepContainer(step);
};

export default Container;