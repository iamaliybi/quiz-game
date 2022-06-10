import { useEffect, useState } from 'react';
import { fetchQuestions } from '../../app/features/appAPI';
import { getQuestions, getUsername, setUsername } from '../../app/features/appSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './Welcome.module.scss';


type Props = {
	goToNextStep: () => void
};

const Welcome = ({ goToNextStep }: Props) => {
	/* Also you can use 'useFetch' hook */
	// const { request: fetchQuestions, data, hasError, status } = useFetch(apiRoutes.questions.get);

	const state = useAppSelector(state => ({
		questions: getQuestions(state),
		username: getUsername(state)
	}));

	const [name, setName] = useState<{
		hasError: boolean;
		value: string
	}>({
		hasError: false,
		value: state.username || ''
	});

	const setNameError = (has: boolean) => {
		setName({
			...name,
			hasError: has
		});
	};

	const dispatch = useAppDispatch();

	const validationSchema = () => {
		if (!name.value) return false;

		return true;
	};

	const onChangeInput = (value: string) => {
		const newName = {
			hasError: name.hasError,
			value
		};
		if (newName.hasError && validationSchema()) {
			newName.hasError = false;
		}

		setName(newName);
	};

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		/* Check validation */
		if (!validationSchema()) {
			setNameError(true);
			return;
		}

		/* Fetch questions */
		dispatch(fetchQuestions())
			.then((err) => {
				if (err.meta.requestStatus === 'rejected') {
					alert('Something went wrong!');
					return;
				}

				dispatch(setUsername(name.value));
				goToNextStep();
			});
	};

	useEffect(() => {
		const classList = document.body.classList;
		if (classList.contains('primary-bg')) classList.add('primary-bg');
	}, []);

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
							name='name'
							value={name.value}
							placeholder='Your Name'
							onChange={e => onChangeInput(e.target.value)}
							className={name.hasError ? styles.invalid : undefined}
						/>
					</label>
				</div>

				<div className={styles.start}>
					<button disabled={name.hasError || state.questions === null} className={state.questions === null ? styles.loading : undefined} type='submit'>Start Game</button>
				</div>
			</form>
		</div>
	);
};

export default Welcome;