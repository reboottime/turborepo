"use client";

import { useState, useMemo, useEffect } from "react";
import { Button } from "@repo/ui";
import { EmployeeTable } from "./_components/employee-table";
import { EmployeeToolbar } from "./_components/employee-toolbar";
import { EmployeeFormDialog } from "./_components/employee-form-dialog";
import { EmployeeDeleteDialog } from "./_components/employee-delete-dialog";
import { Pagination } from "./_components/pagination";
import { Toast } from "./_components/toast";
import { MOCK_EMPLOYEES } from "./_lib/mock-data";
import type { Employee, EmployeeFormData, Department } from "./_lib/types";

const ITEMS_PER_PAGE = 5;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<Department | "all">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(
    null,
  );
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Filter employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        searchTerm === "" ||
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDepartment =
        departmentFilter === "all" || employee.department === departmentFilter;

      return matchesSearch && matchesDepartment;
    });
  }, [employees, searchTerm, departmentFilter]);

  // Paginate employees
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, departmentFilter]);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
  };

  const handleAddEmployee = (data: EmployeeFormData) => {
    const newEmployee: Employee = {
      id: String(Date.now()),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      department: data.department as Department,
      phone: data.phone || undefined,
    };

    setEmployees((prev) => [...prev, newEmployee]);
    setIsAddModalOpen(false);
    showToast("Employee added successfully");
  };

  const handleEditEmployee = (data: EmployeeFormData) => {
    if (!editingEmployee) return;

    setEmployees((prev) =>
      prev.map((emp) =>
        emp.id === editingEmployee.id
          ? {
              ...emp,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              department: data.department as Department,
              phone: data.phone || undefined,
            }
          : emp,
      ),
    );

    setEditingEmployee(null);
    showToast("Employee updated successfully");
  };

  const handleDeleteEmployee = () => {
    if (!deletingEmployee) return;

    setEmployees((prev) =>
      prev.filter((emp) => emp.id !== deletingEmployee.id),
    );
    setDeletingEmployee(null);
    showToast("Employee deleted successfully");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Employees</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Employee
        </Button>
      </div>

      {/* Toolbar */}
      <div className="mb-6">
        <EmployeeToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          departmentFilter={departmentFilter}
          onDepartmentChange={setDepartmentFilter}
        />
      </div>

      {/* Table */}
      <div className="mb-0">
        <EmployeeTable
          employees={paginatedEmployees}
          onEdit={setEditingEmployee}
          onDelete={setDeletingEmployee}
          isEmpty={employees.length === 0}
          isSearching={searchTerm !== "" || departmentFilter !== "all"}
          searchTerm={searchTerm}
        />
      </div>

      {/* Pagination */}
      {filteredEmployees.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredEmployees.length}
          itemsPerPage={ITEMS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      )}

      {/* Modals */}
      <EmployeeFormDialog
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddEmployee}
      />

      <EmployeeFormDialog
        isOpen={!!editingEmployee}
        onClose={() => setEditingEmployee(null)}
        onSave={handleEditEmployee}
        employee={editingEmployee}
      />

      <EmployeeDeleteDialog
        employee={deletingEmployee}
        onConfirm={handleDeleteEmployee}
        onCancel={() => setDeletingEmployee(null)}
      />

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}
