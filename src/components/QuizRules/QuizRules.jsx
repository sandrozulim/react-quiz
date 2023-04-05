import Button from "../Button/Button";
import Select from "../Select/Select";
import Input from "../Input/Input";
import classes from "./QuizRules.module.scss";

const categoryOptions = [
  { label: "Any Category", value: "0" },
  { label: "General Knowledge", value: "9" },
  { label: "Entertainment: Books", value: "10" },
  { label: "Entertainment: Film", value: "11" },
  { label: "Entertainment: Music", value: "12" },
  { label: "Entertainment: Television", value: "14" },
  { label: "Entertainment: Video Games", value: "15" },
  { label: "Science & Nature", value: "17" },
  { label: "Science: Computers", value: "18" },
  { label: "Mythology", value: "20" },
  { label: "Sports", value: "21" },
  { label: "Geography", value: "22" },
  { label: "History", value: "23" },
  { label: "Politics", value: "24" },
  { label: "Art", value: "25" },
  { label: "Celebrities", value: "26" },
  { label: "Animals", value: "27" },
  { label: "Vehicles", value: "28" },
];

const difficultyOptions = [
  { label: "Any Difficulty", value: "0" },
  { label: "Easy", value: "easy" },
  { label: "Medium", value: "medium" },
  { label: "Hard", value: "hard" },
];

function QuizRules({ quizRules, setQuizRules, setIsRdyToPlay }) {
  return (
    <>
      <Input
        type="number"
        label="Number of questions"
        id="number-of-questions"
        min="5"
        max="50"
        value={quizRules.questions}
        onChange={(e) =>
          setQuizRules({ ...quizRules, questions: e.target.value })
        }
      />

      <Select
        label="Select category"
        id="select-category"
        options={categoryOptions}
        value={quizRules.category}
        onChange={(e) =>
          setQuizRules({ ...quizRules, category: e.target.value })
        }
      />

      <Select
        label="Select difficulty"
        id="select-difficulty"
        options={difficultyOptions}
        value={quizRules.difficulty}
        onChange={(e) =>
          setQuizRules({ ...quizRules, difficulty: e.target.value })
        }
      />

      <Button
        onClick={() => setIsRdyToPlay(true)}
        className={classes["btn-play"]}
      >
        Start Quiz!
      </Button>
    </>
  );
}

export default QuizRules;
