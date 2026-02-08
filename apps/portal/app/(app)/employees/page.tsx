"use client";

import { useState, useEffect } from "react";
import { Button } from "@repo/ui";
import { EmployeeTable } from "./_components/employee-table";
import { EmployeeToolbar } from "./_components/employee-toolbar";
import { EmployeeFormDialog } from "./_components/employee-form-dialog";
import { EmployeeDeleteDialog } from "./_components/employee-delete-dialog";
import { Pagination } from "./_components/pagination";
import { Toast } from "./_components/toast";
import { apiClient } from "../../../lib/api-client";
import type { Employee, EmployeeFormData, Department } from "./_lib/types";
import type { ApiError } from "../../../lib/api-client";

const ITEMS_PER_PAGE = 10;

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<Department | "all">(
    "all",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<Employee | null>(
    null,
  );
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Fetch employees from API
  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      try {
        const params: {
          page: number;
          limit: number;
          search?: string;
          department?: string;
        } = {
          page: currentPage,
          limit: ITEMS_PER_PAGE,
        };

        if (searchTerm) {
          params.search = searchTerm;
        }

        if (departmentFilter !== "all") {
          params.department = departmentFilter;
        }

        const response = await apiClient.getEmployees(params);
        setEmployees(response.data);
        setTotalPages(response.meta.totalPages);
        setTotalItems(response.meta.total);
      } catch (error) {
        const apiError = error as ApiError;
        showToast(apiError.message || "Failed to load employees", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [currentPage, searchTerm, departmentFilter]);

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

  const handleAddEmployee = async (data: EmployeeFormData) => {
    try {
      await apiClient.createEmployee(data);
      setIsAddModalOpen(false);
      showToast("Employee added successfully");
      // Refetch to get updated list
      const response = await apiClient.getEmployees({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: searchTerm || undefined,
        department: departmentFilter !== "all" ? departmentFilter : undefined,
      });
      setEmployees(response.data);
      setTotalPages(response.meta.totalPages);
      setTotalItems(response.meta.total);
    } catch (error) {
      const apiError = error as ApiError;
      showToast(apiError.message || "Failed to add employee", "error");
    }
  };

  const handleEditEmployee = async (data: EmployeeFormData) => {
    if (!editingEmployee) return;

    try {
      await apiClient.updateEmployee(editingEmployee.id, data);
      setEditingEmployee(null);
      showToast("Employee updated successfully");
      // Refetch to get updated list
      const response = await apiClient.getEmployees({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: searchTerm || undefined,
        department: departmentFilter !== "all" ? departmentFilter : undefined,
      });
      setEmployees(response.data);
      setTotalPages(response.meta.totalPages);
      setTotalItems(response.meta.total);
    } catch (error) {
      const apiError = error as ApiError;
      showToast(apiError.message || "Failed to update employee", "error");
    }
  };

  const handleDeleteEmployee = async () => {
    if (!deletingEmployee) return;

    try {
      await apiClient.deleteEmployee(deletingEmployee.id);
      setDeletingEmployee(null);
      showToast("Employee deleted successfully");
      // Refetch to get updated list
      const response = await apiClient.getEmployees({
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        search: searchTerm || undefined,
        department: departmentFilter !== "all" ? departmentFilter : undefined,
      });
      setEmployees(response.data);
      setTotalPages(response.meta.totalPages);
      setTotalItems(response.meta.total);
    } catch (error) {
      const apiError = error as ApiError;
      showToast(apiError.message || "Failed to delete employee", "error");
    }
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
        <Button onClick={() => setIsAddModalOpen(true)} className="flex">
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
          <span className="whitespace-nowrap ">Add Employee</span>
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
      <div className="mb-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-text-secondary">Loading...</div>
          </div>
        ) : (
          <EmployeeTable
            employees={employees}
            onEdit={setEditingEmployee}
            onDelete={setDeletingEmployee}
            isEmpty={employees.length === 0 && totalItems === 0}
            isSearching={searchTerm !== "" || departmentFilter !== "all"}
            searchTerm={searchTerm}
          />
        )}
      </div>

      {/* Pagination */}
      {!isLoading && totalItems > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
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
