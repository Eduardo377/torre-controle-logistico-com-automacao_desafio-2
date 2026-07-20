import {
  Filter,
  Search,
  Calendar,
  AlertTriangle,
  Thermometer,
  ArrowUpDown,
} from "lucide-react";
import type { Zone } from "@/lib/yard";

export type FilterState = {
  searchId: string;
  peso: string;
  status: "Todos" | "Alocado" | "Realocado" | "Ocupado" | "Vazio" | "Livre";
  zone: Zone | "Todas";
  isIMO: "Todos" | "Sim" | "Nao";
  dataChegada: string;
  dataSaida: string;
  sortBy:
    | "nenhum"
    | "chegada_asc"
    | "chegada_desc"
    | "saida_asc"
    | "saida_desc";
};

type YardFiltersProps = {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
};

const zoneAccent: Record<Zone | "Todas", string> = {
  Hot: "text-red-400",
  Warm: "text-orange-400",
  Cold: "text-sky-400",
  Frozen: "text-cyan-400",
  Todas: "text-muted-foreground",
};

export function YardFilters({ filters, onChange }: YardFiltersProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card/40 p-4">
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <Filter className="size-5 text-primary" aria-hidden="true" />
          <h3 className="font-semibold text-foreground">Busca Refinada</h3>
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onChange({ sortBy: e.target.value as FilterState["sortBy"] })
            }
            className="h-8 rounded border border-input bg-background px-2 text-xs text-foreground focus:border-primary focus:outline-none"
          >
            <option value="nenhum">Ordenação Padrão</option>
            <option value="chegada_asc">Chegada (Crescente)</option>
            <option value="chegada_desc">Chegada (Decrescente)</option>
            <option value="saida_asc">Saída (Crescente)</option>
            <option value="saida_desc">Saída (Decrescente)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Buscar ID..."
            value={filters.searchId}
            onChange={(e) => onChange({ searchId: e.target.value })}
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Peso (ton's)..."
            value={filters.peso}
            onChange={(e) => onChange({ peso: e.target.value })}
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="relative">
          <AlertTriangle
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <select
            value={filters.isIMO}
            onChange={(e) =>
              onChange({ isIMO: e.target.value as FilterState["isIMO"] })
            }
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="Todos">Cargas: Todas</option>
            <option value="Sim">Apenas IMO (Perigosa)</option>
            <option value="Nao">Apenas Normal</option>
          </select>
        </div>

        <select
          value={filters.status}
          onChange={(e) =>
            onChange({ status: e.target.value as FilterState["status"] })
          }
          className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="Todos">Status: Todos</option>
          <option value="Alocado">Alocado</option>
          <option value="Realocado">Realocado</option>
          <option value="Ocupado">Ocupado</option>
          <option value="Vazio">Vazio</option>
          <option value="Livre">Livre</option>
        </select>

        <div className="relative">
          <Thermometer
            className={`pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 ${zoneAccent[filters.zone]}`}
            aria-hidden="true"
          />
          <select
            value={filters.zone}
            onChange={(e) =>
              onChange({ zone: e.target.value as FilterState["zone"] })
            }
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="Todas">Zonas: Todas</option>
            <option value="Hot">Hot</option>
            <option value="Warm">Warm</option>
            <option value="Cold">Cold</option>
            <option value="Frozen">Frozen</option>
          </select>
        </div>

        <div className="relative">
          <Calendar
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="datetime-local"
            value={filters.dataChegada}
            onChange={(e) => onChange({ dataChegada: e.target.value })}
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground [color-scheme:dark] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="relative">
          <Calendar
            className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="datetime-local"
            value={filters.dataSaida}
            onChange={(e) => onChange({ dataSaida: e.target.value })}
            className="h-10 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground [color-scheme:dark] focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>
    </div>
  );
}
