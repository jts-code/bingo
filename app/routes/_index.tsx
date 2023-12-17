import { useState } from "react";
import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "~/components/mode-toggle";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";

export const meta: MetaFunction = () => {
  return [
    { title: "Bingo" },
    { name: "description", content: "Let's play bingo!" },
  ];
};

type Result = { column: string; value: number };
type Results = {
  B: number[];
  I: number[];
  N: number[];
  G: number[];
  O: number[];
};

export default function Index() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [result, setResult] = useState<Result>({ column: "", value: NaN });
  const [results, setResults] = useState<Results>({
    B: [],
    I: [],
    N: [],
    G: [],
    O: [],
  });

  function initialize() {
    setResult({ column: "", value: NaN });
    setResults({
      B: [],
      I: [],
      N: [],
      G: [],
      O: [],
    });

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
    const newResults = results;

    switch (true) {
      case pick < 16:
        letter = "B";
        newResults["B"] = newResults["B"].concat(pick);
        setResults(newResults);
        break;
      case pick < 31:
        letter = "I";
        newResults["I"] = newResults["I"].concat(pick);
        break;
      case pick < 46:
        letter = "N";
        newResults["N"] = newResults["N"].concat(pick);
        setResults(newResults);
        break;
      case pick < 61:
        letter = "G";
        newResults["G"] = newResults["G"].concat(pick);
        setResults(newResults);
        break;
      case pick < 76:
        letter = "O";
        newResults["O"] = newResults["O"].concat(pick);
        setResults(newResults);
        break;
    }

    const result = { column: letter, value: pick };
    setResult(result);
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
        <div className="flex flex-row space-x-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="show-results" className="text-lg">
              Show Results
            </Label>
            <Switch id="show-results" onCheckedChange={setShowResults} />
          </div>
          <ModeToggle />
        </div>
      </div>
      <div className="container flex flex-row h-full items-center justify-evenly">
        <div className="flex rounded-full border-8 w-80 h-80 items-center justify-center font-mono text-9xl">
          {result.column && (
            <h1>
              <span className="text-primary">{result.column}</span>
              <span>{result.value}</span>
            </h1>
          )}
        </div>
        {showResults && (
          <div className="flex font-mono text-base space-x-6 text-center">
            <div className="w-6">
              <h2 className="text-center border-b-primary border-b">B</h2>
              <ul>
                {results["B"].length > 0 &&
                  results["B"].map((r) => <ul key="r">{r}</ul>)}
              </ul>
            </div>
            <div className="w-6">
              <h2 className="text-center border-b-primary border-b">I</h2>
              <ul>
                {results["I"].length > 0 &&
                  results["I"].map((r) => <ul key="r">{r}</ul>)}
              </ul>
            </div>
            <div className="w-6">
              <h2 className="text-center border-b-primary border-b">N</h2>
              <ul>
                {results["N"].length > 0 &&
                  results["N"].map((r) => <ul key="r">{r}</ul>)}
              </ul>
            </div>
            <div className="w-6">
              <h2 className="text-center border-b-primary border-b">G</h2>
              <ul>
                {results["G"].length > 0 &&
                  results["G"].map((r) => <ul key="r">{r}</ul>)}
              </ul>
            </div>
            <div className="w-6">
              <h2 className="text-center border-b-primary border-b">O</h2>
              <ul>
                {results["O"].length > 0 &&
                  results["O"].map((r) => <ul key="r">{r}</ul>)}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-row justify-between">
        <Button onClick={pickANumber}>Pick a number</Button>
        <Button onClick={initialize}>Reset</Button>
      </div>
    </div>
  );
}
