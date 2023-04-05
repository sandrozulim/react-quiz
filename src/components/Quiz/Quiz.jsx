import { useState, useEffect } from "react";
import Button from "../Button/Button";
import axios from "axios";
import { BASE_API_URL } from "../../constants/constants";
import { shuffleArr } from "../../utilities/utilities";
import { RingLoader } from "react-spinners";
import { decode } from "html-entities";
import classes from "./Quiz.module.scss";

function Quiz({ quizRules, setIsRdyToPlay }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const url = `${BASE_API_URL}?amount=${quizRules.questions}&category=${quizRules.category}&difficulty=${quizRules.difficulty}`;

    const getData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(url);
        setQuestions(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [quizRules]);

  let answers = [];
  if (questions.length > 0) {
    const { incorrect_answers, correct_answer } = questions[currentQuestion];
    const answerArr = [...incorrect_answers, correct_answer];

    shuffleArr(answerArr);

    answers = answerArr.map((answer) => (
      <Button
        onClick={() => answerHandler(answer)}
        key={answer}
        className={classes["answer-btn"]}
      >
        {decode(answer)}
      </Button>
    ));
  }

  const answerHandler = (userAnswer) => {
    const isCorrect = userAnswer === questions[currentQuestion].correct_answer;
    const isLastQuestion = questions.length === currentQuestion + 1;

    setIsCorrect(isCorrect);
    setShowResult(true);

    if (isCorrect) setTotalScore((prev) => prev + 1);

    if (isLastQuestion) {
      setIsFinished(true);
      return;
    }

    setTimeout(() => {
      setShowResult(false);
      setIsCorrect(false);
      setCurrentQuestion((prevState) => prevState + 1);
    }, 2000);
  };

  return (
    <>
      {isLoading && (
        <RingLoader className={classes["loader"]} size="4rem" color="#d78c2a" />
      )}

      {error && <h2 className={classes["error"]}>{error}</h2>}

      {questions.length > 0 && (
        <>
          <div className={classes["score"]}>
            <span>Score: {totalScore}</span>
            <span>
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>

          <h3 className={classes["question-category"]}>
            {questions[currentQuestion].category}
          </h3>

          <p className={classes["question"]}>
            {decode(questions[currentQuestion].question)}
          </p>

          {!showResult && <div className={classes["answers"]}>{answers}</div>}

          {showResult && (
            <p className={classes["answer-result"]}>
              {isCorrect ? "Correct answer" : "Incorrect answer"}
            </p>
          )}

          {isFinished && (
            <Button
              className={classes["play-again-btn"]}
              onClick={() => setIsRdyToPlay(false)}
            >
              Play again!
            </Button>
          )}
        </>
      )}
    </>
  );
}

export default Quiz;
