"use client";

import {
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui";
import type { Department } from "../_lib/types";

interface EmployeeToolbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  departmentFilter: Department | "all";
  onDepartmentChange: (value: Department | "all") => void;
}

const DEPARTMENTS: Array<{ value: Department | "all"; label: string }> = [
  { value: "all", label: "All Departments" },
  { value: "Engineering", label: "Engineering" },
  { value: "Sales", label: "Sales" },
  { value: "Design", label: "Design" },
  { value: "HR", label: "HR" },
  { value: "Marketing", label: "Marketing" },
  { value: "Finance", label: "Finance" },
];

export function EmployeeToolbar({
  searchTerm,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
}: EmployeeToolbarProps) {
  return (
    <div className="flex gap-4 items-center flex-wrap">
      <div className="flex-1 min-w-[300px]">
        <Input
          type="search"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-surface-base"
        />
      </div>
      <div className="min-w-[200px]">
        <Select
          value={departmentFilter}
          onValueChange={(value) =>
            onDepartmentChange(value as Department | "all")
          }
        >
          <SelectTrigger aria-label="Filter by department">
            <SelectValue placeholder="Select department" />
          </SelectTrigger>
          <SelectContent>
            {DEPARTMENTS.map((dept) => (
              <SelectItem key={dept.value} value={dept.value}>
                {dept.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
