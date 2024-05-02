import { useEffect, useRef, useState } from "react";
import Container from "./UI/Container.tsx";
import { userTimerContext } from "../store/timerContext.tsx";
import { Timer as Timerprops } from "../store/timerContext.tsx";
export default function Timer({ name, duration }: Timerprops) {
  const interval = useRef<number | null>(null);
  console.log(interval);
  const [remainingTime, setRemainingTime] = useState(+duration * 1000);
  const { isRunning } = userTimerContext();

  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }

  useEffect(() => {
    let timer: number;

    if (isRunning) {
      timer = setInterval(function () {
        if (remainingTime > 0) {
          setRemainingTime((prevTime) => prevTime - 50);
        } else return;
      }, 50);
      console.log(interval.current);
      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  console.log(formattedRemainingTime);

  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>
        <progress max={+duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
