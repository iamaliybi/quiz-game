declare interface QuestionType {
	category: string;
	type: string;
	difficulty: string;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}

declare interface ServiceResponse<T> {
	response_code: number;
	results: T,
}