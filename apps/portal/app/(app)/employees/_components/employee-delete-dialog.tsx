"use client";

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui";
import type { Employee } from "../_lib/types";

interface EmployeeDeleteDialogProps {
  employee: Employee | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function EmployeeDeleteDialog({
  employee,
  onConfirm,
  onCancel,
}: EmployeeDeleteDialogProps) {
  return (
    <Dialog open={!!employee} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent size="md">
        <DialogHeader>
          <DialogTitle>Delete Employee</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold">
              {employee?.firstName} {employee?.lastName}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
