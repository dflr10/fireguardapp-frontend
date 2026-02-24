import { useState } from "react";

export default function EmergencyFilters({ data, onChange }: any) {
  const [type, setType] = useState("");
  const [order, setOrder] = useState("desc");

  function applyFilters(t = type, o = order) {
    let result = [...data];

    if (t) {
      result = result.filter(e => e.type === t);
    }

    result.sort((a, b) =>
      o === "desc"
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    onChange(result);
  }

  return (
    <div className="flex gap-4 flex-wrap">
      <select
        className="bg-slate-800 rounded px-3 py-2"
        value={type}
        onChange={e => {
          setType(e.target.value);
          applyFilters(e.target.value, order);
        }}
      >
        <option value="">Todos los tipos</option>
        {/* map EmergencyType */}
      </select>

      <select
        className="bg-slate-800 rounded px-3 py-2"
        value={order}
        onChange={e => {
          setOrder(e.target.value);
          applyFilters(type, e.target.value);
        }}
      >
        <option value="desc">Más recientes</option>
        <option value="asc">Más antiguos</option>
      </select>
    </div>
  );
}