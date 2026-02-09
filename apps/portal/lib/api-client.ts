import type {
  Employee,
  EmployeeFormData,
} from "../app/(app)/employees/_lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE_URL) {
  throw new Error(
    "NEXT_PUBLIC_API_URL environment variable is not set. Please set it to the base URL of your API server.",
  );
}

export interface ApiError {
  message: string;
  statusCode?: number;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EmployeesResponse {
  data: Employee[];
  meta: PaginationMeta;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use default error message
      }

      const error = new Error(errorMessage);
      (error as Error & { statusCode?: number }).statusCode = response.status;
      throw error;
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  // Auth endpoints
  async login(data: LoginRequest): Promise<LoginResponse> {
    return this.request<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Employee endpoints
  async getEmployees(params?: {
    search?: string;
    department?: string;
    page?: number;
    limit?: number;
  }): Promise<EmployeesResponse> {
    const queryParams = new URLSearchParams();

    if (params?.search) queryParams.append("search", params.search);
    if (params?.department) queryParams.append("department", params.department);
    if (params?.page) queryParams.append("page", String(params.page));
    if (params?.limit) queryParams.append("limit", String(params.limit));

    const query = queryParams.toString();
    const endpoint = `/employees${query ? `?${query}` : ""}`;

    return this.request<EmployeesResponse>(endpoint);
  }

  async getEmployee(id: string): Promise<Employee> {
    return this.request<Employee>(`/employees/${id}`);
  }

  async createEmployee(data: EmployeeFormData): Promise<Employee> {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      department: data.department,
      phone: data.phone || undefined,
    };

    return this.request<Employee>("/employees", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  async updateEmployee(id: string, data: EmployeeFormData): Promise<Employee> {
    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      department: data.department,
      phone: data.phone || undefined,
    };

    return this.request<Employee>(`/employees/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
  }

  async deleteEmployee(id: string): Promise<void> {
    return this.request<void>(`/employees/${id}`, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
