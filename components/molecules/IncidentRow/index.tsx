import { TableRow, TableCell } from "@/components/ui/table";
import { Incident } from "@/lib/models";

export function IncidentRow({
  incident,
  onClick,
}: {
  incident: Incident;
  onClick: () => void;
}) {
  const { id, state, clientName, assignedTechnician, creationDate } = incident;

  const stateLabels: Record<Incident["state"], string> = {
    opened: "ABIERTO",
    inProgress: "EN PROGRESO",
    closed: "CERRADO",
  };

  return (
    <TableRow onClick={onClick} className="cursor-pointer hover:bg-gray-100">
      <TableCell>{id}</TableCell>
      <TableCell>{stateLabels[state]}</TableCell>
      <TableCell>{clientName}</TableCell>
      <TableCell>{assignedTechnician}</TableCell>
      <TableCell>{new Date(creationDate).toLocaleDateString()}</TableCell>
    </TableRow>
  );
}
