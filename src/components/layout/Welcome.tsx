import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions } from '../../app/features/appAPI';
import { getQuestions, getUsername, setUsername } from '../../app/features/appSlice';
import { RootState } from '../../app/store';
import styles from './Welcome.module.scss';


type Props = {
	goToNextStep: () => void
};

const Welcome = ({ goToNextStep }: Props) => {
	/* Also you can use 'useFetch' hook */
	// const { request: fetchQuestions, data, hasError, status } = useFetch(apiRoutes.questions.get);

	const state = useSelector((state: RootState) => ({
		questions: getQuestions(state),
		username: getUsername(state)
	}));

	const [name, setName] = useState<string>(state.username || '');

	const dispatch = useDispatch();

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		/* Fetch questions */
		// dispatch(fetchQuestions());
		// dispatch(setUsername(name));
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h2>Hi!</h2>
			</div>

			<form onSubmit={handleSubmitForm} className={styles.form}>
				<div className={styles.input}>
					<label>
						<span>What's your name?</span>
						<input
							type='text'
							value={name}
							placeholder='Your Name'
							onChange={e => setName(e.target.value)}
						/>
					</label>
				</div>

				<div className={styles.start}>
					<button type='submit'>Start Game</button>
				</div>
			</form>
		</div>
	);
};

export default Welcome;