import { useEffect, useState } from "react";
import Button from "./Button";

function App() {
  const lsScore = localStorage.getItem("score") || 0;
  const [color, setColor] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [chances, setChances] = useState<number>(5);
  const [result, setResult] = useState<Result | undefined>(undefined);

  enum Result {
    Correct,
    Wrong,
  }

  const start = () => {
    const actualColor = getRandomColor();
    setColor(actualColor);
    setAnswers(
      [actualColor, getRandomColor(), getRandomColor()].sort(
        () => 0.5 - Math.random()
      )
    );
  };

  const restart = () => {
    setScore(0);
    if (chances === 0) setChances(5);
    start();
    setResult(undefined);
  };

  const scoreCount = () => {
    setScore(score + 1);
    const finalScore = score + 1;
    if (lsScore < score) {
      localStorage.setItem("score", finalScore.toString());
    }
  };

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function handleAnswer(answer: string) {
    if (answer === color) {
      setResult(Result.Correct);
      start();
      scoreCount();
    } else {
      setResult(Result.Wrong);
      setChances((current) => current - 1);
    }
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col h-full bg-gray-800">
      <div className="font-bold text-xl text-white m-2">
        Highest Score: {lsScore}
      </div>
      <div className="font-bold text-xl text-white m-2">Score: {score}</div>
      <div className="font-bold text-xl text-white m-2 mb-10">Chances: {chances}</div>
      <div
        style={{ backgroundColor: color }}
        className="w-96 h-60 rounded-2xl"
      ></div>
      {chances !== 0 && (
        <div className="flex justify-center m-5">
          {answers.map((item) => (
            <Button key={item} item={item} onClick={() => handleAnswer(item)} />
          ))}
        </div>
      )}

      {chances === 0 && (
        <div className="font-bold text-lg text-white m-5">
          Game Over! <Button item="Wanna Restart?" onClick={restart} />
        </div>
      )}
      <div>
        {result == Result.Correct && (
          <div className="font-bold text-xl text-green-400">Correct!</div>
        )}
        {result == Result.Wrong && (
          <div className="font-bold text-xl text-red-400">Wrong!</div>
        )}
      </div>
    </div>
  );
}

export default App;
