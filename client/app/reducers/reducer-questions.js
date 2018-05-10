
export default function(){
	return [
		{question: "What is your age?", userInput: 0, tag: "aminos"},
      	{question: "What is your current body weight (in pounds)?", userInput: 1, tag: "aminos"},
      	{question: "What is your height?", userInput: 2, tag: "bicep", answerType: "height"},
      	{question: "What is your target weight (in pounds)?", userInput: 3, tag:"smoothie"},
        {question: "Are you a man or woman?", answers: ["man", "woman"], userInput: 4, tag: "aminos", answerType: "radio"}, 
        {question: "How active are you?", answers: ["sedentary (little or no exercise)", "moderate (exercise 3-5 days per week)", "heavy (exercise 6-7 times per week)"], userInput: 5, tag: "clock", answerType: "radio"}
     ];
}