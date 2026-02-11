import { jest, describe, it, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { Employee } from "../_lib/types";
import { EmployeeTable } from "./employee-table";

const mockEmployees: Employee[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    department: "Engineering",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    department: "Design",
  },
];

// arrange, act, assert
describe("EmployeeTable", () => {
  // -- Empty state --
  it("renders empty state when isEmpty is true", () => {
    // Arrange
    render(
      <EmployeeTable employees={[]} onEdit={jest.fn()} onDelete={jest.fn()} />,
    );

    // Assert
    expect(screen.getByText("No employees found.")).toBeInTheDocument();
    expect(
      screen.getByText('Click "+ Add Employee" to get started.'),
    ).toBeInTheDocument();
  });

  // -- Search empty state --
  it("renders search empty state when searching with no results", () => {
    // Arrange
    render(
      <EmployeeTable
        employees={[]}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
        isSearching
        searchTerm="xyz"
      />,
    );

    // Assert
    expect(screen.getByText('No employees match "xyz".')).toBeInTheDocument();
    expect(
      screen.getByText("Try a different search term."),
    ).toBeInTheDocument();
  });

  // -- Rendering employees --
  it("renders employee data in table", () => {
    // Arrange
    render(
      <EmployeeTable
        employees={mockEmployees}
        onEdit={jest.fn()}
        onDelete={jest.fn()}
      />,
    );

    // Assert - component renders both desktop table and mobile cards,
    // so each employee appears twice
    expect(screen.getAllByText("John Doe")).toHaveLength(2);
    expect(screen.getAllByText("john.doe@example.com")).toHaveLength(2);
    expect(screen.getAllByText("Engineering")).toHaveLength(2);

    expect(screen.getAllByText("Jane Smith")).toHaveLength(2);
    expect(screen.getAllByText("jane.smith@example.com")).toHaveLength(2);
    expect(screen.getAllByText("Design")).toHaveLength(2);
  });

  // -- Edit interaction --
  it("calls onEdit with employee when edit button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    const handleEdit = jest.fn();
    render(
      <EmployeeTable
        employees={mockEmployees}
        onEdit={handleEdit}
        onDelete={jest.fn()}
      />,
    );

    // Act - there are 2 edit buttons per employee (desktop + mobile),
    // click the first one (desktop)
    const editButtons = screen.getAllByRole("button", {
      name: "Edit John Doe",
    });
    await user.click(editButtons[0]!);

    // Assert
    expect(handleEdit).toHaveBeenCalledTimes(1);
    expect(handleEdit).toHaveBeenCalledWith(mockEmployees[0]);
  });

  // -- Delete interaction --
  it("calls onDelete with employee when delete button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    const handleDelete = jest.fn();
    render(
      <EmployeeTable
        employees={mockEmployees}
        onEdit={jest.fn()}
        onDelete={handleDelete}
      />,
    );

    // Act - there are 2 delete buttons per employee (desktop + mobile),
    // click the first one (desktop)
    const deleteButtons = screen.getAllByRole("button", {
      name: "Delete Jane Smith",
    });
    await user.click(deleteButtons[0]!);

    // Assert
    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(mockEmployees[1]);
  });
});
