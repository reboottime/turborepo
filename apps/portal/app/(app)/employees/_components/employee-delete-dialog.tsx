"use client";

import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Spinner,
} from "@repo/ui";
import type { Employee } from "../_lib/types";

interface EmployeeDeleteDialogProps {
  employee: Employee | null;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

export function EmployeeDeleteDialog({
  employee,
  onConfirm,
  onCancel,
}: EmployeeDeleteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
    } catch {
      // Error is handled in the parent component
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={!!employee}
      onOpenChange={(open) => !open && !isDeleting && onCancel()}
    >
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
          <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="destructive"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <Spinner />
                <span>Deleting...</span>
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
