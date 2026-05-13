import "./index.css";
import { useState } from "react";
import Menu from "./components/Menu";
import Map from "./components/Map";
import "leaflet/dist/leaflet.css";
import {
  UtensilsCrossed,
  Coffee,
  Landmark,
  Search,
  MapPin,
  X,
} from "lucide-react";

const FILTERS = [
  { key: "all", label: "Tất cả", icon: null },
  { key: "Quán ăn", label: "Quán ăn", icon: UtensilsCrossed },
  { key: "Quán cafe", label: "Cà phê", icon: Coffee },
  { key: "Di tích", label: "Di tích", icon: Landmark },
];

const FILTER_ACTIVE_STYLE = {
  all: {
    borderColor: "#C9A84C",
    background: "rgba(201,168,76,0.15)",
    color: "#C9A84C",
  },
  "Quán ăn": {
    borderColor: "#A32D2D",
    background: "#FCEBEB",
    color: "#A32D2D",
  },
  "Quán cafe": {
    borderColor: "#0F6E56",
    background: "#E1F5EE",
    color: "#0F6E56",
  },
  "Di tích": {
    borderColor: "#1D4ED8",
    background: "#EFF6FF",
    color: "#1D4ED8",
  },
};

const ALL_LOCATIONS_COUNT = 12;

function App() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  return (
    // Toàn bộ layout: flex ngang, full màn hình
    <div className="flex w-screen h-screen overflow-hidden">
      {/* Sidebar */}
      <Menu />

      {/* Phần còn lại: map + overlay — overflow-hidden để clip overlay không tràn sang sidebar */}
      <div className="relative flex-1 min-w-0 h-full overflow-hidden">
        {/* Map (full trong vùng này) */}
        <Map activeFilter={activeFilter} search={search} />

        {/* Overlay search + filter — nằm TRÊN map, trong flex-1, không bị sidebar đè */}
        <div className="absolute top-3 left-30 right-3 z-[9999] flex flex-col gap-2.5 pointer-events-none">
          {/* Search bar */}
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2.5 shadow-lg pointer-events-auto max-w-sm">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm địa điểm..."
              className="flex-1 border-none outline-none text-[13.5px] text-gray-800 bg-transparent"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="p-0 bg-transparent border-none cursor-pointer flex items-center"
              >
                <X size={13} className="text-gray-400" />
              </button>
            )}
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 flex-wrap pointer-events-auto">
            {FILTERS.map((f) => {
              const isActive = activeFilter === f.key;
              const FIcon = f.icon;
              return (
                <button
                  key={f.key}
                  onClick={() => setActiveFilter(f.key)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12.5px] border-[1.5px] cursor-pointer shadow-md transition-all duration-150
                    ${
                      isActive
                        ? "font-semibold"
                        : "bg-white text-gray-600 border-white font-normal hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  style={isActive ? FILTER_ACTIVE_STYLE[f.key] : {}}
                >
                  {FIcon && <FIcon size={13} />}
                  {f.label}
                </button>
              );
            })}

            {/* Count badge */}
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11.5px] font-medium text-[#C9A84C] shadow-md backdrop-blur-sm"
              style={{ background: "rgba(44,24,16,0.85)" }}
            >
              <MapPin size={11} />
              {ALL_LOCATIONS_COUNT} địa điểm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
