import { getNivelesPublic, type CategoriaAPI } from "./api";
import { CANTIDAD_JUEGO_RAPIDO } from "../data/juegosAssets";

export type GameSessionState = {
  categoriaId: string;
  nivelId: string;
  cantidad: number;
};

export async function buildJuegoRapidoState(
  categorias: CategoriaAPI[],
): Promise<GameSessionState | null> {
  if (categorias.length === 0) return null;

  const cat = categorias[Math.floor(Math.random() * categorias.length)];
  const niveles = await getNivelesPublic(cat.id);
  if (niveles.length === 0) return null;

  const nivel = niveles[Math.floor(Math.random() * niveles.length)];
  return {
    categoriaId: cat.id,
    nivelId: nivel.id || nivel._id,
    cantidad: CANTIDAD_JUEGO_RAPIDO,
  };
}
