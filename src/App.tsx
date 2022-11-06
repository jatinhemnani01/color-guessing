import { useEffect, useState } from "react";
import Button from "./Button";

function App() {
  const [color, setColor] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
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
    } else {
      setResult(Result.Wrong);
    }
  }

  useEffect(() => {
    start();
  }, []);

  return (
    <div className="flex justify-center items-center flex-col h-full bg-gray-800">
      <div
        style={{ backgroundColor: color }}
        className="w-96 h-60 rounded-2xl"
      ></div>
      <div className="flex justify-center m-5">
        {answers.map((item) => (
          <Button key={item} item={item} onClick={() => handleAnswer(item)} />
        ))}
      </div>
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
