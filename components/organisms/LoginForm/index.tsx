import { cn, parseCookies } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  type User = {
    username: string;
    id: number;
    email: string;
    role: string;
    password?: string;
  };

  const logIn = (user: User) => {
    document.cookie = `username=${user.username}; path=/; SameSite=Lax`;
    document.cookie = `id=${user.id}; path=/; SameSite=Lax`;
    document.cookie = `email=${user.email}; path=/; SameSite=Lax`;
  };

  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies(document.cookie);

    if (cookies.username && cookies.id && cookies.email) {
      router.replace("/incidents/dashboard");
    }
  },);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // LOGICA DE PRUEBA SOLO PARA MOSTRAR EL MENSAJE DE ERROR EN DESARROLLO !!
    e.preventDefault();

    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const response = await fetch("/mockUsers.json");
    const data = await response.json();

    const user = data.users.find(
      (user: User) => user.email === email && user.password === password
    );

    if (!user) {
      setErrorMessage("Email o contraseña invalidos. Intente de nuevo.");
      setShowError(true);
    } else if (user.role !== "ADMIN" && user.role !== "ADMIN_HISTORIAL") {
      setErrorMessage(
        "No tienes los permisos suficientes para acceder a esta sección."
      );
      setShowError(true);
    } else {
      logIn(user);
      router.push("/incidents/dashboard");
    }
    // ESTE CODIGO DEBE SER REEMPLAZADO POR LA VALIDACION DE AUTENTICACION REAL !!
  };

  return (
    <>
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <img
                    src="/logo.png"
                    alt="Telconova SupportSuite"
                    className=""
                  />
                  <p className="text-muted-foreground text-left">
                    Inicia sesión para acceder al módulo histórico
                  </p>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Contraseña</Label>
                  </div>
                  <Input id="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                  Iniciar sesión
                </Button>
              </div>
            </form>
            <div className="bg-muted relative hidden md:block">
              <img
                src="/login-image.png"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="sm:max-w-[400px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#0a0a0a]">Error</DialogTitle>
            <DialogDescription className="text-center">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button">Continuar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}