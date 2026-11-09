import { Badge } from "@/components/ui/badge";

// Página temporal del scaffolding (FE-01). En FE-02 `/` redirige a `/prioritarias`.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-6 p-8">
      <h1 className="text-3xl font-semibold tracking-tight">Mensajería</h1>
      <p className="text-muted-foreground">
        Tus mensajes importantes de todas tus cuentas de correo, priorizados en un solo lugar.
      </p>
      <div className="flex flex-wrap gap-2" aria-label="Bandas de prioridad">
        <Badge className="bg-priority-urgent text-white">Urgente</Badge>
        <Badge className="bg-priority-high text-white">Alta</Badge>
        <Badge variant="outline" className="border-priority-medium text-priority-medium">
          Media
        </Badge>
        <Badge variant="secondary" className="text-priority-low">
          Baja
        </Badge>
      </div>
    </main>
  );
}
