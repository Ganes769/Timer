import { userTimerContext } from "../store/timerContext";
import Timer from "./Timer";

export default function Timers() {
  const { timers } = userTimerContext();
  return (
    <ul>
      {timers.map((item) => (
        <Timer name={item.name} duration={item.duration} />
      ))}
    </ul>
  );
}
