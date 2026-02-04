export type Department =
  | "Engineering"
  | "Sales"
  | "Design"
  | "HR"
  | "Marketing"
  | "Finance";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  phone?: string;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  department: Department | "";
  phone: string;
}
