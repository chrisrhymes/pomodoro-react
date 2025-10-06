import { useEffect, useState } from "react";

const Timer = () => {
  const [minutesRemaining, setMinutesRemaining] = useState<number>(1);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(59);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    if (timerRunning) {
      const intervalId = setInterval(() => {
        if (secondsRemaining > 0) {
          setSecondsRemaining((secondsRemaining) => secondsRemaining - 1);
        } else {
          // No minutes left
          if (minutesRemaining === 0) {
            clearInterval(intervalId);
            setTimerRunning(false);
            alert("Time is up!");
          } else {
            setMinutesRemaining((minutesRemaining) => minutesRemaining - 1);
            setSecondsRemaining(59);
          }
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timerRunning, minutesRemaining, secondsRemaining]);

  const handleTimerStart = () => {
    if (secondsRemaining <= 0 && minutesRemaining <= 0) {
      alert(
        "No time remaining! Please set seconds or minutes to a higher value.",
      );
      return;
    }
    setTimerRunning(true);
  };

  const handleTimerStop = () => {
    setTimerRunning(false);
  };

  return (
    <div className="flex w-full flex-col flex-wrap text-center lg:w-1/2">
      {!timerRunning ? (
        <>
          <h1 className="mb-4 text-2xl font-bold">Set your timer!</h1>
          <form
            className="flex flex-row flex-wrap items-center justify-center"
            onSubmit={handleTimerStart}
          >
            <div className="flex w-1/4 flex-col items-start p-2">
              <label htmlFor="minutes">Minutes</label>
              <input
                id="minutes"
                type="number"
                name="minutes"
                onChange={(e) => setMinutesRemaining(parseInt(e.target.value))}
                defaultValue={minutesRemaining}
                className="w-full border-2 border-slate-800 bg-white px-4 py-2 focus:outline-4 focus:outline-amber-400 active:outline-4 active:outline-amber-400"
                min={0}
                max={59}
              />
            </div>
            <div className="flex w-1/4 flex-col items-start p-2">
              <label htmlFor="seconds">Seconds</label>
              <input
                id="seconds"
                type="number"
                name="seconds"
                onChange={(e) => setSecondsRemaining(parseInt(e.target.value))}
                defaultValue={secondsRemaining}
                className="w-full border-2 border-slate-800 bg-white px-4 py-2 focus:outline-4 focus:outline-amber-400 active:outline-4 active:outline-amber-400"
                max={59}
                min={0}
              />
            </div>
            <div className="w-full items-center p-2">
              <button
                type="submit"
                className="w-1/2 cursor-pointer rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-900 focus:outline-4 focus:outline-amber-400"
              >
                Start
              </button>
            </div>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p className="mb-8 font-mono text-8xl font-bold">
            {minutesRemaining.toString().padStart(2, "0")}:
            {secondsRemaining.toString().padStart(2, "0")}
          </p>
          <div className="w-1/2">
            <button
              type="button"
              onClick={handleTimerStop}
              className="w-full cursor-pointer rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-900 focus:outline-4 focus:outline-amber-400"
            >
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timer;
