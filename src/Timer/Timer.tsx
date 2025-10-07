import { useEffect, useState } from "react";

const Timer = () => {
  const [minutesRemaining, setMinutesRemaining] = useState<number>(25);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);
  const [timerNear, setTimerNear] = useState<boolean>(false);

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
            setTimerFinished(true);
          } else {
            setMinutesRemaining((minutesRemaining) => minutesRemaining - 1);
            setSecondsRemaining(59);
          }
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timerRunning, minutesRemaining, secondsRemaining]);

  useEffect(() => {
    if (minutesRemaining === 0 && secondsRemaining <= 5) {
      setTimerNear(true);
    }
  }, [minutesRemaining, secondsRemaining]);

  const handleTimerStart = () => {
    if (secondsRemaining <= 0 && minutesRemaining <= 0) {
      alert(
        "No time remaining! Please set seconds or minutes to a higher value.",
      );
      return;
    }
    setTimerRunning(true);
    setTimerFinished(false);
    setTimerNear(false);
  };

  const handleTimerStop = () => {
    setTimerRunning(false);
    setTimerNear(false);
  };

  const closePopUp = () => {
    setTimerFinished(false);
    setMinutesRemaining(25);
    setSecondsRemaining(0);
    setTimerNear(false);
  };

  return (
    <div className="relative flex w-full flex-col flex-wrap text-center lg:w-1/2">
      {timerFinished && (
        <span className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded bg-sky-50 px-16 pt-16 pb-8 shadow-2xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-24 animate-bounce"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p className="my-6">Time is up!</p>
          <button
            type="submit"
            className="w-full cursor-pointer rounded bg-slate-800 px-4 py-2 text-white hover:bg-slate-900 focus:outline-4 focus:outline-amber-400"
            onClick={closePopUp}
          >
            Close
          </button>
        </span>
      )}
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
                value={minutesRemaining}
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
                value={secondsRemaining}
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
          <p
            className={`mb-8 font-mono text-8xl font-bold ${timerNear && "animate-ping text-red-800"}`}
          >
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
