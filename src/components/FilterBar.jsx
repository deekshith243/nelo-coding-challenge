import React from "react";

function FilterBar({
  statusFilter,
  onStatusFilterChange,
  priorityFilter,
  onPriorityFilterChange,
  searchTerm,
  onSearchTermChange,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm text-slate-600 mr-1">Status:</span>
        {["all", "completed", "pending"].map((status) => (
          <button
            key={status}
            className={`px-3 py-1 text-xs rounded-full border ${
              statusFilter === status
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-300"
            }`}
            onClick={() => onStatusFilterChange(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div>
          <label className="block text-xs mb-1 text-slate-600">
            Priority Filter
          </label>
          <select
            className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-100"
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-xs mb-1 text-slate-600">
            Search Tasks
          </label>
          <input
            type="text"
            className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-blue-100"
            placeholder="Search by title or description"
            value={searchTerm}
            onChange={(e) => onSearchTermChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
