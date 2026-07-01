import { test, expect } from "@playwright/test"

test.describe("Landing Page E2E Suite", () => {
  // Hook to navigate to the landing page before every individual test
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("Blueprint: Should load the page successfully and verify structural headers", async ({
    page,
  }) => {
    // Assert the document title or current URL to confirm base routing works
    await expect(page).toHaveURL("http://localhost/")

    // Test for the main headline element presence inside your layout
    const mainHeading = page.getByRole("heading", {
      name: "Multiverse Intelligence Registry",
    })
    await expect(mainHeading).toBeVisible()
  })

  test("UI Elements: Should display core text blocks and transmission warning banner", async ({
    page,
  }) => {
    // Verify the static alert banner layout text
    const bannerTitle = page.locator('p:has-text("Core Theory Transmission")')
    await expect(bannerTitle).toBeVisible()

    const bannerBody = page.locator(
      'p:has-text("Doomsday should conclude with Doom\'s absolute defeat")',
    )
    await expect(bannerBody).toBeVisible()
  })

  test("Navigation & Cards: Validate sidebar releases targets and interactive database vault link", async ({
    page,
  }) => {
    // Check release target layouts for Phase 6 cards
    const spidermanCardHeader = page.getByRole("heading", {
      name: "Spider-Man: Brand New Day",
    })
    await expect(spidermanCardHeader).toBeVisible()

    const secretWarsCardHeader = page.getByRole("heading", {
      name: "Avengers: Secret Wars",
    })
    await expect(secretWarsCardHeader).toBeVisible()

    // Verify the Database Vault Link is properly configured to route to /theories
    const vaultLink = page.getByRole("link", {
      name: "🔎 Enter Database Vault",
    })
    await expect(vaultLink).toBeVisible()
    await expect(vaultLink).toHaveAttribute("href", "/theories")
  })
})
