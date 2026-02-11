"use client";

import { cn } from "@repo/ui";
import type { Employee } from "../_lib/types";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  isSearching?: boolean;
  searchTerm?: string;
}

export function EmployeeTable({
  employees,
  onEdit,
  onDelete,
  isSearching = false,
  searchTerm = "",
}: EmployeeTableProps) {
  if (isSearching) {
    return (
      <div className="border border-border-default rounded-lg p-12 text-center">
        <div className="max-w-md mx-auto">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-text-primary font-medium mb-1">
            No employees match &quot;{searchTerm}&quot;.
          </p>
          <p className="text-sm text-text-secondary">
            Try a different search term.
          </p>
        </div>
      </div>
    );
  }

  if (!isSearching && employees.length === 0) {
    return (
      <div className="border border-border-default rounded-lg p-12 text-center">
        <div className="max-w-md mx-auto">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-text-primary font-medium mb-1">
            No employees found.
          </p>
          <p className="text-sm text-text-secondary">
            Click &quot;+ Add Employee&quot; to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table view */}
      <div className="hidden md:block border border-border-default rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-surface-sunken/50 border-b border-border-default">
              <th className="text-center font-semibold text-sm px-4 py-3 w-[60px]">
                #
              </th>
              <th className="text-left font-semibold text-sm px-4 py-3">
                Name
              </th>
              <th className="text-left font-semibold text-sm px-4 py-3">
                Email
              </th>
              <th className="text-left font-semibold text-sm px-4 py-3 w-[120px]">
                Dept
              </th>
              <th className="text-center font-semibold text-sm px-4 py-3 w-[120px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr
                key={employee.id}
                className={cn(
                  "border-b border-border-default last:border-b-0",
                  "hover:shadow-sm transition-shadow",
                )}
              >
                <td className="text-center text-sm px-4 py-3 text-text-secondary">
                  {index + 1}
                </td>
                <td className="text-sm px-4 py-3">
                  {employee.firstName} {employee.lastName}
                </td>
                <td className="text-sm px-4 py-3 text-text-secondary">
                  {employee.email}
                </td>
                <td className="text-sm px-4 py-3">{employee.department}</td>
                <td className="text-center px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(employee)}
                      className="p-1.5 rounded hover:bg-surface-sunken transition-colors"
                      title="Edit employee"
                      aria-label={`Edit ${employee.firstName} ${employee.lastName}`}
                    >
                      <svg
                        className="w-4 h-4 text-text-secondary hover:text-text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(employee)}
                      className="p-1.5 rounded hover:bg-destructive/10 transition-colors"
                      title="Delete employee"
                      aria-label={`Delete ${employee.firstName} ${employee.lastName}`}
                    >
                      <svg
                        className="w-4 h-4 text-text-secondary hover:text-status-error"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="md:hidden space-y-3">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="border border-border-default rounded-lg p-4 bg-surface-base hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm mb-1 truncate">
                  {employee.firstName} {employee.lastName}
                </h3>
                <p className="text-sm text-text-secondary mb-1 truncate">
                  {employee.email}
                </p>
                <p className="text-sm">{employee.department}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onEdit(employee)}
                  className="p-1.5 rounded hover:bg-surface-sunken transition-colors"
                  title="Edit employee"
                  aria-label={`Edit ${employee.firstName} ${employee.lastName}`}
                >
                  <svg
                    className="w-4 h-4 text-text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(employee)}
                  className="p-1.5 rounded hover:bg-destructive/10 transition-colors"
                  title="Delete employee"
                  aria-label={`Delete ${employee.firstName} ${employee.lastName}`}
                >
                  <svg
                    className="w-4 h-4 text-status-error"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
