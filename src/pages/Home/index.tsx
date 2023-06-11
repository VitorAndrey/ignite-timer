import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { HandPalm, Play } from "@phosphor-icons/react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { differenceInSeconds } from "date-fns";

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartButton,
  StopButton,
  TaskInput,
} from "./styles";

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"),
  minutesAmount: zod
    .number()
    .min(5, "O Ciclo deve ter no minimo 5 minutos")
    .max(60, "O Ciclo deve ter no máximo 60 minutos"),
});

type NewCicleDataTypes = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startedDate: Date;
  InterruptedDate?: Date;
}

export default function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setactiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0);

  const { register, handleSubmit, watch, reset } = useForm<NewCicleDataTypes>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const activeCycle = cycles.find((cycle) => cycle.id == activeCycleId);

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date(), activeCycle.startedDate));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  function handleCreateNewCicle(data: NewCicleDataTypes) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startedDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setactiveCycleId(newCycle.id);

    setAmountSecondsPassed(0);

    reset();
  }

  function handleIterruptCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id == activeCycle?.id) {
          return { ...cycle, InterruptedDate: new Date() };
        } else {
          return cycle;
        }
      })
    );
    setactiveCycleId(null);
  }

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Timer - ${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  const task = watch("task");

  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput
            type="text"
            id="task"
            placeholder="Dê um nome para o seu projeto"
            autoComplete="off"
            disabled={!!activeCycle}
            list="task-suggestions"
            {...register("task")}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Projeto 4" />
          </datalist>

          <label htmlFor="minutesAmount">durante </label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            autoComplete="off"
            disabled={!!activeCycle}
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />
          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopButton type="button" onClick={handleIterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopButton>
        ) : (
          <StartButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartButton>
        )}
      </form>
    </HomeContainer>
  );
}
