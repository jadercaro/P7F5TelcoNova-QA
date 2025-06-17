import { cn } from "@/lib/utils";
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
import { jwtDecode } from "jwt-decode";
// 🟢 Tipo del payload del token JWT (ajústalo si tu token tiene más campos)
type JwtPayload = {
  sub: string; // nombre de usuario o email
  iat: number;
  exp: number;
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie
      .split(";")
      .map((c) => c.trim().split("="))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as Record<string, string>);

    // 🟢 Verifica solo username (ya que ahora lo extraemos del token)
    if (cookies.username) {
      router.replace("/incidents/dashboard");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const username = form.username.value;
    const password = form.password.value;

    try {
      const response = await fetch("https://supportsuite-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Email o contraseña inválidos");
      }

      const data = await response.json();

      // 🟢 Decodifica el token
      const decoded = jwtDecode<JwtPayload>(data.token);

      // 🟢 Guarda el token y extrae info del token para las cookies
      localStorage.setItem("token", data.token);
      document.cookie = `username=${decoded.sub}; path=/`;

      console.log("Token recibido:", data.token);
      console.log("Usuario decodificado:", decoded.sub);
      console.log("Redirigiendo al dashboard...");

      router.push("/incidents/dashboard/");

    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocurrió un error inesperado.");
      }
      setShowError(true);
    }
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
                  <Label htmlFor="username">Nombre de usuario</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="usuario"
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
