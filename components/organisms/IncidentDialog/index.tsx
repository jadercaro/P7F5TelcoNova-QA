import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogClose,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Incident } from "@/lib/models";
import { SuccessDialog } from "@/components/molecules/SuccessDialog";
import { useState } from "react";

const technicians = [
	{ value: "Juan", label: "Juan" },
	{ value: "Ana", label: "Ana" },
	{ value: "Carlos", label: "Carlos" },
	{ value: "Lucía", label: "Lucía" },
	{ value: "Miguel", label: "Miguel" },
];

const incidentStates = [
	{ value: "opened", label: "Abierto" },
	{ value: "inProgress", label: "En Progreso" },
	{ value: "closed", label: "Cerrado" },
];

export function IncidentDialog({
	mode,
	open,
	onOpenChange,
	initialData,
}: {
	mode: "create" | "edit";
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialData: Incident | undefined;
}) {
	const [isSuccessOpen, setIsSuccessOpen] = useState(false);

	const handleSave = () => {
		// AQUI IRIA LA LOGICA DE GUARDADO O EDICION AL INTEGRAR CON BACKEND ////////////////////////
		setIsSuccessOpen(true);
	};

	const handleCloseSuccess = () => {
		setIsSuccessOpen(false);
	}

	return (
		<>
		<Dialog open={open} onOpenChange={onOpenChange}>
			{mode === "create" ? (
				<DialogTrigger asChild>
					<Button className="bg-slate-900 cursor-pointer">Crear incidente</Button>
				</DialogTrigger>
			) : null}
			<DialogContent className="bg-white text-black" aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle className="text-center">
						{mode === "create" ? "NUEVO INCIDENTE" : "EDITAR INCIDENTE"}
					</DialogTitle>
				</DialogHeader>
				<div className="grid grid-cols-2 gap-4 p-4 h-full w-full">
					{/* FILA 1 */}
					<div className="grid gap-3">
						<Label htmlFor="incidentId">ID Incidente</Label>
						<Input
							id="incidentId"
							type="number"
							disabled={mode === "edit"}
							defaultValue={initialData?.id ?? ""}
							className="disabled:bg-[#AAAAAA]"
						/>
					</div>
					<div className="grid gap-3">
						<Label htmlFor="incidentState">Estado</Label>
						<Select defaultValue={initialData?.state ?? ""}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Seleccione un estado..." />
							</SelectTrigger>
							<SelectContent>
								{incidentStates.map((state) => (
									<SelectItem key={state.value} value={state.value}>
										{state.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					{/* FILA 2 */}
					<div className="grid gap-3">
						<Label htmlFor="clientName">Nombre Cliente</Label>
						<Input
							id="clientName"
							type="text"
							disabled={mode === "edit"}
							defaultValue={initialData?.clientName ?? ""}
							className="disabled:bg-[#AAAAAA]"
							required
						/>
					</div>
					<div className="grid gap-3">
						<Label htmlFor="assignedTechnician">Técnico Asignado</Label>
						<Select defaultValue={initialData?.assignedTechnician ?? ""}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Selecciona un técnico..." />
							</SelectTrigger>
							<SelectContent>
								{technicians.map((tech) => (
									<SelectItem key={tech.value} value={tech.value}>
										{tech.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					{/* FILA 3 */}
					<div className="grid gap-3">
						<Label htmlFor="creationDate">Fecha Creacion</Label>
						<Input
							id="creationDate"
							type="date"
							disabled={mode === "edit"}
							className="disabled:bg-[#AAAAAA]"
							defaultValue={initialData?.creationDate ? (new Date(initialData.creationDate)).toISOString().split('T')[0] : ""}
							required
						/>
					</div>
					<div className="grid gap-3">
						<Label htmlFor="closingDate">Fecha Cierre</Label>
						<Input
							id="closingDate"
							type="date"
							defaultValue={initialData?.closingDate ? (new Date(initialData.closingDate)).toISOString().split('T')[0] : ""}
							required
						/>
					</div>
					{/* FILA 4 */}
					<div className="col-span-2 grid gap-3">
						<Label htmlFor="description">Descripción</Label>
						<Textarea id="description" defaultValue={initialData?.description ?? ""} />
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="button"
							className="bg-[#D9D9D9] text-black hover:bg-[#D9D9D9]/90 cursor-pointer"
						>
							Cancelar
						</Button>
					</DialogClose>
					<Button className="bg-slate-900 cursor-pointer" onClick={handleSave} type="submit">Guardar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
		<SuccessDialog open={isSuccessOpen} onClose={handleCloseSuccess} />
		</>
	)
}