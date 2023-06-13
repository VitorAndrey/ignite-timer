import { createContext, useContext, useState } from "react";

const CyclesContext = createContext({} as any);

function ContDown() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext);

  return (
    <>
      <h1>ContDown: {activeCycle}</h1>
      <button
        type="button"
        onClick={() => {
          setActiveCycle((prev: any) => prev + 1);
        }}
      >
        Alterar ciclo
      </button>
      ;
    </>
  );
}

function NewCycleForm() {
  const { activeCycle, setActiveCycle } = useContext(CyclesContext);

  return (
    <>
      <h1>NewCycleForm: {activeCycle}</h1>
      <button
        type="button"
        onClick={() => {
          setActiveCycle((prev: any) => prev - 1);
        }}
      >
        Alterar ciclo
      </button>
    </>
  );
}

export default function Home() {
  const [activeCycle, setActiveCycle] = useState(0);

  return (
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <ContDown />
      <NewCycleForm />
    </CyclesContext.Provider>
  );
}
