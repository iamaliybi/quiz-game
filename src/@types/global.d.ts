declare interface APIQuestion {
	category: string;
	type: string;
	difficulty: string;
	question: string;
	correct_answer: string;
	incorrect_answers: string[];
}

declare interface QuestionType {
	question: string;
	correct_answer: string;
	answers: string[];
}

declare interface ApiResponse<T> {
	response_code: number;
	results: T,
}