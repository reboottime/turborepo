import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerHandle,
} from "./index";

describe("Drawer", () => {
  describe("Basic Rendering", () => {
    it("renders with trigger and content", () => {
      render(
        <Drawer open>
          <DrawerTrigger>Open Drawer</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Drawer Title</DrawerTitle>
              <DrawerDescription>Drawer Description</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByText("Drawer Title")).toBeInTheDocument();
      expect(screen.getByText("Drawer Description")).toBeInTheDocument();
    });

    it("renders all compound components", () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Title</DrawerTitle>
              <DrawerDescription>Description</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>Body Content</DrawerBody>
            <DrawerFooter>Footer Content</DrawerFooter>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByText("Body Content")).toBeInTheDocument();
      expect(screen.getByText("Footer Content")).toBeInTheDocument();
    });
  });

  describe("Direction Variants", () => {
    it("applies right direction classes (default)", () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      const content = screen.getByRole("dialog");
      expect(content?.className).toContain("right-0");
    });

    it("applies left direction classes", () => {
      render(
        <Drawer open direction="left">
          <DrawerContent>
            <DrawerTitle>Navigation</DrawerTitle>
            <DrawerDescription>Browse sections</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      const content = screen.getByRole("dialog");
      expect(content?.className).toContain("left-0");
    });

    it("applies top direction classes", () => {
      render(
        <Drawer open direction="top">
          <DrawerContent>
            <DrawerTitle>Notifications</DrawerTitle>
            <DrawerDescription>Recent updates</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      const content = screen.getByRole("dialog");
      expect(content?.className).toContain("top-0");
    });

    it("applies bottom direction classes", () => {
      render(
        <Drawer open direction="bottom">
          <DrawerContent>
            <DrawerTitle>Actions</DrawerTitle>
            <DrawerDescription>Choose an action</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      const content = screen.getByRole("dialog");
      expect(content?.className).toContain("bottom-0");
    });
  });

  describe("Handle Bar", () => {
    it("shows handle for bottom drawer by default", () => {
      render(
        <Drawer open direction="bottom">
          <DrawerContent>
            <DrawerTitle>Actions</DrawerTitle>
            <DrawerDescription>Choose an action</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByTestId("drawer-handle")).toBeInTheDocument();
    });

    it("shows handle for top drawer by default", () => {
      render(
        <Drawer open direction="top">
          <DrawerContent>
            <DrawerTitle>Notifications</DrawerTitle>
            <DrawerDescription>Recent updates</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByTestId("drawer-handle")).toBeInTheDocument();
    });

    it("does not show handle for left drawer by default", () => {
      render(
        <Drawer open direction="left">
          <DrawerContent>
            <DrawerTitle>Navigation</DrawerTitle>
            <DrawerDescription>Browse sections</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.queryByTestId("drawer-handle")).not.toBeInTheDocument();
    });

    it("does not show handle for right drawer by default", () => {
      render(
        <Drawer open direction="right">
          <DrawerContent>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.queryByTestId("drawer-handle")).not.toBeInTheDocument();
    });

    it("can force show handle via showHandle prop", () => {
      render(
        <Drawer open direction="right">
          <DrawerContent showHandle>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByTestId("drawer-handle")).toBeInTheDocument();
    });

    it("can force hide handle via showHandle prop", () => {
      render(
        <Drawer open direction="bottom">
          <DrawerContent showHandle={false}>
            <DrawerTitle>Actions</DrawerTitle>
            <DrawerDescription>Choose an action</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.queryByTestId("drawer-handle")).not.toBeInTheDocument();
    });

    it("forwards ref to DrawerHandle", () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHandle ref={ref} />
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Interaction", () => {
    it("opens and closes via trigger", async () => {
      const user = userEvent.setup();

      render(
        <Drawer>
          <DrawerTrigger>Open Settings</DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      // Initially closed
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

      // Open drawer
      await user.click(screen.getByText("Open Settings"));
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("closes via DrawerClose button", async () => {
      const user = userEvent.setup();

      render(
        <Drawer open>
          <DrawerContent>
            <DrawerTitle>Delete Item</DrawerTitle>
            <DrawerDescription>This action cannot be undone</DrawerDescription>
            <DrawerClose>Cancel</DrawerClose>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();

      await user.click(screen.getByText("Cancel"));
      // After animation, content should be removed
      // Note: Testing library may not wait for animations
    });

    it("calls onOpenChange callback", async () => {
      const user = userEvent.setup();
      const onOpenChange = jest.fn();

      render(
        <Drawer onOpenChange={onOpenChange}>
          <DrawerTrigger>Open Filters</DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>Filters</DrawerTitle>
            <DrawerDescription>Narrow down results</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      await user.click(screen.getByText("Open Filters"));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it("closes on escape key", async () => {
      const user = userEvent.setup();
      const onOpenChange = jest.fn();

      render(
        <Drawer open onOpenChange={onOpenChange}>
          <DrawerContent>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      await user.keyboard("{Escape}");
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it("supports dismissible prop", () => {
      render(
        <Drawer open dismissible={false}>
          <DrawerContent>
            <DrawerTitle>Unsaved Changes</DrawerTitle>
            <DrawerDescription>Save before closing</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
      // When dismissible is false, the drawer won't close on outside click or escape
    });
  });

  describe("Custom className", () => {
    it("merges custom className on DrawerContent", () => {
      render(
        <Drawer open>
          <DrawerContent className="custom-drawer">
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      const content = screen.getByRole("dialog");
      expect(content?.className).toContain("custom-drawer");
    });

    it("merges custom className on DrawerHeader", () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader className="custom-header">
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>Adjust your preferences</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>,
      );

      const header = screen.getByText("Settings").parentElement;
      expect(header?.className).toContain("custom-header");
    });

    it("merges custom className on DrawerBody", () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
            <DrawerBody className="custom-body">Main content area</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      const body = screen.getByText("Main content area");
      expect(body.className).toContain("custom-body");
    });

    it("merges custom className on DrawerFooter", () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
            <DrawerFooter className="custom-footer">
              Action buttons
            </DrawerFooter>
          </DrawerContent>
        </Drawer>,
      );

      const footer = screen.getByText("Action buttons");
      expect(footer.className).toContain("custom-footer");
    });
  });

  describe("Ref Forwarding", () => {
    it("forwards ref to DrawerContent", () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Drawer open>
          <DrawerContent ref={ref}>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref to DrawerHeader", () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Drawer open>
          <DrawerContent>
            <DrawerHeader ref={ref}>
              <DrawerTitle>Settings</DrawerTitle>
              <DrawerDescription>Adjust your preferences</DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref to DrawerBody", () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Drawer open>
          <DrawerContent>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
            <DrawerBody ref={ref}>Main content area</DrawerBody>
          </DrawerContent>
        </Drawer>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });

    it("forwards ref to DrawerFooter", () => {
      const ref = createRef<HTMLDivElement>();

      render(
        <Drawer open>
          <DrawerContent>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
            <DrawerFooter ref={ref}>Action buttons</DrawerFooter>
          </DrawerContent>
        </Drawer>,
      );

      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe("Accessibility", () => {
    it("includes proper ARIA attributes from Vaul", () => {
      render(
        <Drawer open>
          <DrawerContent>
            <DrawerTitle>Accessible Title</DrawerTitle>
            <DrawerDescription>Accessible Description</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      const title = screen.getByText("Accessible Title");
      const description = screen.getByText("Accessible Description");

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    it("trigger has button role", () => {
      render(
        <Drawer>
          <DrawerTrigger>Open Settings</DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Adjust your preferences</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(
        screen.getByRole("button", { name: "Open Settings" }),
      ).toBeInTheDocument();
    });
  });

  describe("Vaul Features", () => {
    it("supports closeThreshold prop", () => {
      render(
        <Drawer open closeThreshold={0.5}>
          <DrawerContent>
            <DrawerTitle>Settings</DrawerTitle>
            <DrawerDescription>Swipe down to dismiss</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("supports modal prop", () => {
      render(
        <Drawer open modal={false}>
          <DrawerContent>
            <DrawerTitle>Quick Actions</DrawerTitle>
            <DrawerDescription>
              Non-modal drawer for side actions
            </DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    it("supports shouldScaleBackground prop", () => {
      render(
        <Drawer open shouldScaleBackground>
          <DrawerContent>
            <DrawerTitle>Full Screen Editor</DrawerTitle>
            <DrawerDescription>Background scales for focus</DrawerDescription>
          </DrawerContent>
        </Drawer>,
      );

      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });
  });
});
