import Container from "./UI/Container.tsx";
import { Timer as Timerprops } from "../store/timerContext.tsx";
export default function Timer({ name, duration }: Timerprops) {
  return (
    <Container as="article">
      <p>{name}</p>
      <p>{duration}</p>
    </Container>
  );
}
