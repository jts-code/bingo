import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/mode-toggle";

export const meta: MetaFunction = () => {
  return [
    { title: "Bingo" },
    { name: "description", content: "Let's play bingo!" },
  ];
};

type Result = { column: string; value: number };

export default function Index() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [result, setResult] = useState<Result>({ column: "", value: NaN });
  const [results, setResults] = useState<Result[]>([]);

  function initialize() {
    setResult({ column: "", value: NaN });
    setResults([]);

    const nums: number[] = [];
    let i = 0;

    while (i < 75) {
      nums.push(i + 1);
      i++;
    }

    return nums;
  }

  function addResult(pick: number) {
    let letter = "";

    switch (true) {
      case pick < 16:
        letter = "B";
        break;
      case pick < 31:
        letter = "I";
        break;
      case pick < 46:
        letter = "N";
        break;
      case pick < 61:
        letter = "G";
        break;
      case pick < 76:
        letter = "O";
        break;
    }

    const result = { column: letter, value: pick };
    setResult(result);
    setResults([...results, result]);
  }

  function pickANumber() {
    const numBank = !numbers.length ? initialize() : numbers;
    const pick: number = numBank.splice(Math.random() * numBank.length, 1)[0];

    addResult(pick);
    setNumbers(numBank);
  }

  return (
    <div className="flex flex-col container justify-between h-screen p-2">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl">Bingo</h1>
        <ModeToggle />
      </div>
      <div className="container flex justify-center h-full items-center">
        <div className="flex rounded-full border-8 w-80 h-80 items-center justify-center font-mono text-9xl">
          {result.column && (
            <h1>
              <span>{result.column}</span>
              <span>{result.value}</span>
            </h1>
          )}
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <Button onClick={pickANumber}>Pick a number</Button>
        <Button onClick={initialize}>Reset</Button>
      </div>

      {false &&
        results.map((result) => (
          <h3 key={result.value}>{result.column + result.value}</h3>
        ))}
    </div>
  );
}
