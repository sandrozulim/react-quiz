import { useState } from "react";
import QuizRules from "./components/QuizRules/QuizRules";
import Quiz from "./components/Quiz/Quiz";
import classes from "./App.module.scss";

function App() {
  const [isRdyToPlay, setIsRdyToPlay] = useState(false);
  const [quizRules, setQuizRules] = useState({
    questions: "5",
    category: "0",
    difficulty: "0",
  });

  return (
    <section className={classes["main-content"]}>
      {!isRdyToPlay && (
        <QuizRules
          quizRules={quizRules}
          setQuizRules={setQuizRules}
          setIsRdyToPlay={setIsRdyToPlay}
        />
      )}

      {isRdyToPlay && (
        <Quiz quizRules={quizRules} setIsRdyToPlay={setIsRdyToPlay} />
      )}
    </section>
  );
}

export default App;
