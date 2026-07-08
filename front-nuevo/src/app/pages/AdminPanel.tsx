import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AdminLayout } from "../components/AdminLayout";
import { AdminPageHeader } from "../components/AdminPageHeader";
import { FileText, Folder, Layers, BarChart3, ArrowRight } from "lucide-react";
import { checkAuth, getAdminFlashcards } from "../lib/api";

const ACCIONES = [
  {
    titulo: "Gestionar palabras",
    descripcion: "Agrega o edita palabras con su imagen y seña en video o GIF.",
    path: "/admin/flashcards",
    icon: FileText,
    color: "bg-[var(--green-primary)]",
  },
  {
    titulo: "Categorías",
    descripcion: "Organiza el vocabulario por temas (animales, familia, colores…).",
    path: "/admin/categorias",
    icon: Folder,
    color: "bg-[var(--yellow-accent)]",
  },
  {
    titulo: "Niveles",
    descripcion: "Define la dificultad dentro de cada categoría (básico, intermedio…).",
    path: "/admin/niveles",
    icon: Layers,
    color: "bg-[var(--green-primary)]",
  },
  {
    titulo: "Estadísticas",
    descripcion: "Revisa cuánto usan la app los estudiantes.",
    path: "/admin/analytics",
    icon: BarChart3,
    color: "bg-[var(--yellow-accent)]",
  },
];

export default function AdminPanel() {
  const navigate = useNavigate();
  const [totalPalabras, setTotalPalabras] = useState<number | null>(null);

  useEffect(() => {
    checkAuth().catch(() => navigate("/admin-login"));

    getAdminFlashcards({ page: 1, limit: 1 })
      .then((res) => setTotalPalabras(res.total ?? 0))
      .catch(() => setTotalPalabras(null));
  }, [navigate]);

  return (
    <AdminLayout mobileTitle="Administración">
      <div className="max-w-3xl mx-auto">
        <AdminPageHeader
          title="Panel del profesor"
          description="Desde aquí puedes organizar el vocabulario que verán tus estudiantes en los juegos."
        />

        <div className="bg-white rounded-[20px] sm:rounded-[28px] border-2 border-[var(--beige-border)] p-5 sm:p-6 mb-6 shadow-lg">
          <h2 className="text-lg font-bold text-[var(--text-dark)] m-0 mb-3">¿Por dónde empiezo?</h2>
          <ol className="space-y-2 text-[var(--text-dark)] m-0 pl-5">
            <li>Crea las <strong>categorías</strong> (temas del vocabulario).</li>
            <li>Agrega los <strong>niveles</strong> dentro de cada categoría.</li>
            <li>Sube las <strong>palabras</strong> con imagen y seña en video o GIF.</li>
          </ol>
          {totalPalabras !== null && (
            <p className="mt-4 mb-0 text-sm text-[var(--text-muted)]">
              Tienes <strong className="text-[var(--text-dark)]">{totalPalabras}</strong>{" "}
              {totalPalabras === 1 ? "palabra" : "palabras"} en el sistema.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ACCIONES.map(({ titulo, descripcion, path, icon: Icon, color }) => (
            <Link
              key={path}
              to={path}
              className="group bg-white rounded-[20px] border-2 border-[var(--beige-border)] p-5 shadow-lg hover:border-[var(--green-primary)] transition-colors no-underline"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-[var(--text-dark)] m-0 flex items-center gap-2">
                    {titulo}
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--green-primary)]" aria-hidden="true" />
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] m-0 mt-1">{descripcion}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
