import "@testing-library/jest-dom";
import { jest } from "@jest/globals";

// Mock window.matchMedia for Vaul
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock window.getComputedStyle with transform support for Vaul
const originalGetComputedStyle = window.getComputedStyle;
window.getComputedStyle = function (element: Element) {
  const styles = originalGetComputedStyle(element);
  return {
    ...styles,
    transform: "none",
    getPropertyValue: (prop: string) => {
      if (prop === "transform") return "none";
      return styles.getPropertyValue(prop);
    },
  } as CSSStyleDeclaration;
};

// Mock pointer capture methods for Vaul drag gestures
HTMLElement.prototype.setPointerCapture = jest.fn() as unknown as (
  pointerId: number,
) => void;
HTMLElement.prototype.releasePointerCapture = jest.fn() as unknown as (
  pointerId: number,
) => void;
HTMLElement.prototype.hasPointerCapture = jest.fn() as unknown as (
  pointerId: number,
) => boolean;
