import { Profiler, Suspense, lazy } from "react";
import Loading from "./features/Loading";

const Steps = lazy(() => import("./features/steps"));

function onRenderCallback(
  id: string,
  phase: "mount" | "update" | "nested-update",
  actualDuration: number,
) {
  if (import.meta.env.DEV) {
    console.log(
      `[Profiler] ${id} — ${phase} in ${actualDuration.toFixed(2)}ms`,
    );
  }
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Suspense fallback={<Loading />}>
        <Steps />
      </Suspense>
    </Profiler>
  );
}

export default App;
