import { userTimerContext } from "../store/timerContext.tsx";
import Button from "./UI/Button.tsx";

export default function Header() {
  const timerContext = userTimerContext();

  return (
    <header>
      <h1>ReactTimer</h1>

      <Button
        onClick={
          timerContext.isRunning
            ? timerContext.stopTimer
            : timerContext.startTimer
        }
      >
        {timerContext.isRunning ? "stop" : "start"}
      </Button>
    </header>
  );
}
