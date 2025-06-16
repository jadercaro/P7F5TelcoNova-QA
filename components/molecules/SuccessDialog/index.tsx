import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function SuccessDialog({
    open,
    onClose
}: {
    open: boolean;
    onClose: () => void;
}) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black">
                <DialogHeader>
                    <DialogTitle>Operación Exitosa</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                    <p className="text-center">Los cambios se han guardado correctamente.</p>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            className="bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
                            onClick={onClose}
                        >
                            Cerrar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
