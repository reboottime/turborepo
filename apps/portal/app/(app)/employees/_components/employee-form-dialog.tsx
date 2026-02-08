"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Button,
  Input,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Spinner,
} from "@repo/ui";
import type { Employee, EmployeeFormData, Department } from "../_lib/types";

interface EmployeeFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EmployeeFormData) => Promise<void>;
  employee?: Employee | null;
}

const DEPARTMENTS: Department[] = [
  "Engineering",
  "Sales",
  "Design",
  "HR",
  "Marketing",
  "Finance",
];

const PHONE_REGEX =
  /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;

const employeeFormSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .max(50, "Maximum 50 characters")
    .default(""),
  lastName: yup
    .string()
    .required("Last name is required")
    .max(50, "Maximum 50 characters")
    .default(""),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email format")
    .default(""),
  department: yup
    .string()
    .required("Department is required")
    .oneOf([...DEPARTMENTS, ""] as const, "Invalid department")
    .default(""),
  phone: yup
    .string()
    .test("phone", "Invalid phone format", (value) => {
      if (!value) return true;
      return PHONE_REGEX.test(value);
    })
    .default(""),
}) satisfies yup.ObjectSchema<EmployeeFormData>;

export function EmployeeFormDialog({
  isOpen,
  onClose,
  onSave,
  employee,
}: EmployeeFormDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EmployeeFormData>({
    resolver: yupResolver(employeeFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      phone: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen) {
      form.reset(
        employee
          ? {
              firstName: employee.firstName,
              lastName: employee.lastName,
              email: employee.email,
              department: employee.department,
              phone: employee.phone || "",
            }
          : {
              firstName: "",
              lastName: "",
              email: "",
              department: "",
              phone: "",
            },
      );
      setIsSubmitting(false);
    }
  }, [isOpen, employee, form]);

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    try {
      await onSave(data);
      onClose();
    } catch {
      // Error is handled in the parent component
      setIsSubmitting(false);
    }
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>
                {employee ? "Edit Employee" : "Add Employee"}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <span className="text-status-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name <span className="text-status-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-status-error">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Department <span className="text-status-error">*</span>
                    </FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger aria-label="Department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEPARTMENTS.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!form.formState.isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Spinner />
                    <span>Saving...</span>
                  </div>
                ) : employee ? (
                  "Save Changes"
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
