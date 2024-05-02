import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

export interface Timer {
  name: string;
  duration: string;
}
type TimerState = {
  isRunning: boolean;
  timers: Timer[];
};
type TimerContextValue = TimerState & {
  addTimer: (timerData: Timer) => void;
  stopTimer: () => void;
  startTimer: () => void;
};
const TimerConetxt = createContext<TimerContextValue | null>(null);
type TimerContextProviderProps = {
  children: ReactNode;
};
type StartTimer = {
  type: "START_TIMER";
};
type AddTimer = {
  type: "ADD_TIMER";
  payload: Timer;
};
type StopTimer = {
  type: "STOP_TIMER";
};
type Action = ({ payload?: Timer } & StartTimer) | AddTimer | StopTimer;
const initsate: TimerState = {
  timers: [],
  isRunning: false,
};

function timerReducer(state: TimerState, action: Action): TimerState {
  switch (action.type) {
    case "START_TIMER":
      return {
        ...state,
        isRunning: true,
      };
    case "ADD_TIMER":
      return {
        ...state,
        timers: [
          ...state.timers,
          {
            name: action.payload.name,
            duration: action.payload.duration,
          },
        ],
      };
    case "STOP_TIMER":
      return {
        ...state,
        isRunning: false,
      };
  }

  return state;
}
export function userTimerContext() {
  const timerContext = useContext(TimerConetxt);
  if (timerContext === null) {
    throw new Error("TimersContext is null - that should not be the case!");
  }

  return timerContext;
}
export function TimerContextProvider({ children }: TimerContextProviderProps) {
  const [timerState, dispatch] = useReducer(timerReducer, initsate);
  const value: TimerContextValue = {
    timers: timerState.timers,
    isRunning: timerState.isRunning,
    addTimer(timerData) {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    startTimer() {
      dispatch({ type: "START_TIMER" });
    },
    stopTimer() {
      dispatch({ type: "STOP_TIMER" });
    },
  };
  return (
    <TimerConetxt.Provider value={value}>{children}</TimerConetxt.Provider>
  );
}
