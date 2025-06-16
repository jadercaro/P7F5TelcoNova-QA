import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IncidentRow } from "@/components/molecules/IncidentRow";
import { Incident } from "@/lib/models";

export function IncidentTable({
	incidents,
	onRowClick,
}: {
	incidents: Incident[];
	onRowClick: (incident: Incident) => void;
}) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>ID</TableHead>
					<TableHead>ESTADO</TableHead>
					<TableHead>NOMBRE CLIENTE</TableHead>
					<TableHead>TÉCNICO ASIGNADO</TableHead>
					<TableHead>FECHA CREACIÓN</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody className="text-black">
				{incidents.map((incident) => (
					<IncidentRow
						key={incident.id}
						incident={incident}
						onClick={() => onRowClick(incident)}
					/>
				))}
			</TableBody>
		</Table>
	);
}