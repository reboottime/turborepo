import { createRef } from "react";
import { jest } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogOverlay,
} from "./index";

function renderDialog({
  defaultOpen = false,
  contentProps = {},
  children,
}: {
  defaultOpen?: boolean;
  contentProps?: React.ComponentPropsWithoutRef<typeof DialogContent>;
  children?: React.ReactNode;
} = {}) {
  return render(
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent {...contentProps}>
        <DialogHeader>
          <DialogTitle>Test Title</DialogTitle>
          <DialogDescription>Test description</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  // -- Rendering --

  it("renders trigger button", () => {
    renderDialog();
    expect(screen.getByRole("button", { name: "Open" })).toBeInTheDocument();
  });

  it("does not render content when closed", () => {
    renderDialog();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("renders content when defaultOpen", () => {
    renderDialog({ defaultOpen: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("renders title and description", () => {
    renderDialog({ defaultOpen: true });
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  // -- Interaction --

  it("opens on trigger click", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("closes on close button click", async () => {
    const user = userEvent.setup();
    renderDialog({ defaultOpen: true });

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("closes on Escape key", async () => {
    const user = userEvent.setup();
    renderDialog({ defaultOpen: true });

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  // -- className merging --

  it("merges custom className on DialogContent", () => {
    renderDialog({
      defaultOpen: true,
      contentProps: { className: "custom-content" },
    });
    const dialog = screen.getByRole("dialog");
    expect(dialog.className).toContain("custom-content");
    expect(dialog.className).toContain("bg-background");
  });

  // -- Ref forwarding --

  it("forwards ref on DialogContent", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Dialog defaultOpen>
        <DialogContent ref={ref}>
          <DialogTitle>Ref Test</DialogTitle>
          <DialogDescription>Ref desc</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it("forwards ref on DialogOverlay", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Dialog defaultOpen>
        <DialogOverlay ref={ref} />
        <DialogContent>
          <DialogTitle>Overlay Ref</DialogTitle>
          <DialogDescription>Overlay desc</DialogDescription>
        </DialogContent>
      </Dialog>
    );
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  // -- Compound components --

  it("renders DialogHeader with children", () => {
    renderDialog({ defaultOpen: true });
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("renders DialogFooter with close button", () => {
    renderDialog({ defaultOpen: true });
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  // -- Accessibility --

  it("has accessible dialog role", () => {
    renderDialog({ defaultOpen: true });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("associates title with dialog via aria", () => {
    renderDialog({ defaultOpen: true });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-labelledby");
  });

  it("associates description with dialog via aria", () => {
    renderDialog({ defaultOpen: true });
    const dialog = screen.getByRole("dialog");
    expect(dialog).toHaveAttribute("aria-describedby");
  });

  // -- onOpenChange callback --

  it("calls onOpenChange when opened", async () => {
    const user = userEvent.setup();
    const onOpenChange = jest.fn();
    render(
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogTitle>Callback Test</DialogTitle>
          <DialogDescription>Callback desc</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    await user.click(screen.getByRole("button", { name: "Open" }));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
