import { useContext } from "react";
import { HistoryContainer, HistoryList, Status, TaskTd } from "./styles";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { CyclesContext } from "../../contexts/CyclesContext";

export default function History() {
  const { cycles } = useContext(CyclesContext);

  const reversedCycles = [...cycles].reverse();

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {reversedCycles.map((cycle) => (
              <tr key={cycle.id}>
                <TaskTd>{cycle.task}</TaskTd>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(new Date(cycle.startedDate), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && <Status statuscolor="green">Concluído</Status>}
                  {cycle.interruptedDate && <Status statuscolor="red">Interrompido</Status>}
                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <Status statuscolor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
