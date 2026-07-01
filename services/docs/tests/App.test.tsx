// tests/App.test.tsx
import React from "react"
import { render, screen } from "@testing-library/react"
import { jest } from "@jest/globals"
import App from "../src/App"

// 1. Mock Framer Motion to prevent JSDOM layout crashes
jest.unstable_mockModule("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
      <div {...props}>{children}</div>
    ),
  },
}))

// 2. Mock navigation constants
jest.unstable_mockModule("../src/constants/sidebarNav", () => ({
  SIDEBAR_NAV_ITEMS: [
    { id: "architecture", label: "Architecture Overview", icon: "🏗️" },
  ],
}))

// 3. Mock Kanban pipeline data fallback structure
jest.unstable_mockModule("../src/constants/kanbanData.json", () => ({
  default: {
    controlPlane: { queued: [], executing: [], stable: [] },
    edgeLayer: { queued: [], executing: [], stable: [] },
  },
}))

describe("Static Docs Component Shell", () => {
  it("should render the workspace header title correctly", () => {
    render(<App />)

    const bannerText = screen.getByText(/Engineering Workspace/i)
    expect(bannerText).toBeInTheDocument()
  })
})
