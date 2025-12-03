import { useMemo, useState } from "react";

// --- Mock Data --------------------------------------------------------------
const INITIAL_SPACES = [
  {
    id: 1,
    name: "O'Leary Library",
    building: "South Campus",
    capacity: 30,
    openNow: true,
    outlets: true,
    noise: "quiet",
    emoji: "📚",
  },
  {
    id: 2,
    name: "McGauvran Center",
    building: "South Campus",
    capacity: 10,
    openNow: false,
    outlets: true,
    noise: "medium",
    emoji: "🏫",
  },
  {
    id: 3,
    name: "Bourgeois Hall",
    building: "East Campus",
    capacity: 50,
    openNow: false,
    outlets: true,
    noise: "lively",
    emoji: "💻",
  },
  {
    id: 4,
    name: "University Crossings",
    building: "East Campus",
    capacity: 40,
    openNow: true,
    outlets: false,
    noise: "medium",
    emoji: "☕",
  },
  {
    id: 5,
    name: "Lydon Library",
    building: "North Campus",
    capacity: 20,
    openNow: true,
    outlets: true,
    noise: "quiet",
    emoji: "📚",
  },
  {
    id: 6,
    name: "Olney Science Center",
    building: "North Campus",
    capacity: 10,
    openNow: true,
    outlets: true,
    noise: "medium",
    emoji: "🔬",
  },
];

// --- Utility ---------------------------------------------------------------
function matchesQuery(space, q) {
  if (!q) return true;
  const hay = `${space.name} ${space.building} ${space.noise}`.toLowerCase();
  return hay.includes(q.toLowerCase());
}

function sortSpaces(spaces, sortBy) {
  const copy = [...spaces];
  switch (sortBy) {
    case "capacity-desc":
      copy.sort((a, b) => b.capacity - a.capacity);
      break;
    case "capacity-asc":
      copy.sort((a, b) => a.capacity - b.capacity);
      break;
    case "name-asc":
      copy.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break; // keep insertion order
  }
  return copy;
}

// --- Components ------------------------------------------------------------
function Header() {
  return (
    <header style={styles.header}>
      <h1 style={{ margin: 0 }}>StudyHere</h1>
      <p style={{ margin: 0, opacity: 0.85 }}>
        Find a great place to focus. Filter by capacity, availability, and more.
      </p>
    </header>
  );
}

function Filters({
  searchTerm,
  minCapacity,
  onlyOpen,
  sortBy,
  onSearch,
  onCapacity,
  onOnlyOpen,
  onSort,
}) {
  return (
    <div style={styles.filters}>
      <input
        aria-label="Search"
        placeholder="Search name, building, noise..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        style={styles.input}
      />

      <label style={styles.label}>
        Min capacity
        <input
          type="number"
          min={0}
          value={minCapacity}
          onChange={(e) => onCapacity(Number(e.target.value) || 0)}
          style={{ ...styles.input, width: 120 }}
        />
      </label>

      <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input
          type="checkbox"
          checked={onlyOpen}
          onChange={(e) => onOnlyOpen(e.target.checked)}
        />
        Open now
      </label>

      <label style={styles.label}>
        Sort by
        <select
          value={sortBy}
          onChange={(e) => onSort(e.target.value)}
          style={{ ...styles.input, width: 180 }}
        >
          <option value="default">Default (added order)</option>
          <option value="name-asc">Name (A → Z)</option>
          <option value="capacity-desc">Capacity (high → low)</option>
          <option value="capacity-asc">Capacity (low → high)</option>
        </select>
      </label>
    </div>
  );
}

function StudySpaceList({ spaces, reserved, onToggleReserved }) {
  if (spaces.length === 0) {
    return (
      <div style={{ padding: 24, opacity: 0.8 }}>
        No spaces match your filters.
      </div>
    );
  }

  return (
    <div style={styles.grid}>
      {spaces.map((s) => (
        <StudySpaceCard
          key={s.id}
          space={s}
          isReserved={reserved.has(s.id)}
          onToggleReserved={() => onToggleReserved(s.id)}
        />
      ))}
    </div>
  );
}

function Chip({ children, tone = "neutral" }) {
  const base = { ...styles.chip };
  const tones = {
    neutral: { background: "#eef2ff", color: "#3730a3" },
    success: { background: "#e6ffed", color: "#065f46" },
    warn: { background: "#fff7ed", color: "#9a3412" },
  };
  return (
    <span style={{ ...base, ...(tones[tone] || tones.neutral) }}>{children}</span>
  );
}

function StudySpaceCard({ space, isReserved, onToggleReserved }) {
  return (
    <article style={styles.card}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={styles.emoji}>{space.emoji}</div>
          <div>
            <h3 style={{ margin: "0 0 4px" }}>{space.name}</h3>
            <div style={{ opacity: 0.8 }}>{space.building}</div>
          </div>
        </div>
        <button
          onClick={onToggleReserved}
          aria-label={isReserved ? "Cancel reservation" : "Reserve this space"}
          style={{
            ...styles.button,
            ...(isReserved ? styles.buttonReserved : {}),
          }}
        >
          {isReserved ? "Reserved" : "Reserve"}
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 12 }}>
        <Chip tone={space.openNow ? "success" : "warn"}>
          {space.openNow ? "Open now" : "Closed"}
        </Chip>
        <Chip>Capacity: {space.capacity}</Chip>
        <Chip>
          {space.outlets ? "Outlets available" : "Few/no outlets"}
        </Chip>
        <Chip>
          {space.noise === "quiet"
            ? "Quiet"
            : space.noise === "lively"
            ? "Lively"
            : "Medium"}
        </Chip>
      </div>
    </article>
  );
}

// --- App -------------------------------------------------------------------
export default function StudyHereApp() {
  const [spaces] = useState(INITIAL_SPACES);
  const [searchTerm, setSearchTerm] = useState("");
  const [minCapacity, setMinCapacity] = useState(0);
  const [onlyOpen, setOnlyOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");

  // Reserve state: which spaces are reserved (Set of ids)
  const [reserved, setReserved] = useState(() => new Set());

  const filtered = useMemo(() => {
    const f = spaces.filter(
      (s) =>
        matchesQuery(s, searchTerm) &&
        s.capacity >= minCapacity &&
        (!onlyOpen || s.openNow)
    );
    return sortSpaces(f, sortBy);
  }, [spaces, searchTerm, minCapacity, onlyOpen, sortBy]);

  const toggleReserved = (id) => {
    setReserved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div style={styles.app}>
      <Header />

      <Filters
        searchTerm={searchTerm}
        minCapacity={minCapacity}
        onlyOpen={onlyOpen}
        sortBy={sortBy}
        onSearch={setSearchTerm}
        onCapacity={setMinCapacity}
        onOnlyOpen={setOnlyOpen}
        onSort={setSortBy}
      />

      <section>
        <h2 style={{ margin: "16px 0" }}>
          {filtered.length} space{filtered.length === 1 ? "" : "s"} found
        </h2>
        <StudySpaceList
          spaces={filtered}
          reserved={reserved}
          onToggleReserved={toggleReserved}
        />
      </section>
    </div>
  );
}

// --- Styles ----------------------------------------------------------------
const styles = {
  app: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 24,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    color: "#0f172a",
  },
  header: {
    padding: 16,
    borderRadius: 12,
    background: "linear-gradient(135deg, #eef2ff, #e0e7ff)",
    marginBottom: 16,
    border: "1px solid #c7d2fe",
  },
  filters: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap",
    padding: 12,
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    marginBottom: 16,
  },
  input: {
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    outline: "none",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontSize: 14,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 16,
  },
  card: {
    padding: 16,
    borderRadius: 16,
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
    background: "white",
  },
  emoji: {
    fontSize: 28,
  },
  chip: {
    fontSize: 12,
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.05)",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  button: {
    border: "1px solid #d1d5db",
    background: "#ffffff",
    padding: "6px 12px",
    borderRadius: 12,
    cursor: "pointer",
  },
  buttonReserved: {
    background: "#16a34a",
    color: "white",
    borderColor: "#16a34a",
  },
};
