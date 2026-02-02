import { cn } from "./cn";

describe("cn", () => {
  it("merges multiple class names", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("handles conditional classes via clsx", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("handles undefined and null inputs", () => {
    expect(cn("base", undefined, null, "end")).toBe("base end");
  });

  it("resolves tailwind conflicts (last wins)", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("resolves tailwind color conflicts", () => {
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });

  it("keeps non-conflicting tailwind classes", () => {
    expect(cn("px-4 py-2", "bg-red-500")).toBe("px-4 py-2 bg-red-500");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
  });

  it("handles array inputs via clsx", () => {
    expect(cn(["foo", "bar"], "baz")).toBe("foo bar baz");
  });
});
