import "@testing-library/jest-dom";
import "@testing-library/jest-dom/jest-globals";
import { jest } from "@jest/globals";

// Mock window.matchMedia for Radix UI
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
})) as unknown as typeof ResizeObserver;

// Mock pointer capture methods
HTMLElement.prototype.setPointerCapture = jest.fn() as unknown as (
  pointerId: number,
) => void;
HTMLElement.prototype.releasePointerCapture = jest.fn() as unknown as (
  pointerId: number,
) => void;
HTMLElement.prototype.hasPointerCapture = jest.fn() as unknown as (
  pointerId: number,
) => boolean;
