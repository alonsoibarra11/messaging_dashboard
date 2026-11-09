import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("muestra el título y las cuatro bandas de prioridad", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { level: 1, name: "Mensajería" })).toBeInTheDocument();
    for (const band of ["Urgente", "Alta", "Media", "Baja"]) {
      expect(screen.getByText(band)).toBeInTheDocument();
    }
  });
});
