import { describe, expect, it } from "vitest";
import { urlDoSite } from "./site-url";

describe("urlDoSite", () => {
  it("prioriza NEXT_PUBLIC_SITE_URL", () => {
    const env = { NEXT_PUBLIC_SITE_URL: "https://financeflow.app", VERCEL_PROJECT_PRODUCTION_URL: "x.vercel.app" };
    expect(urlDoSite(env).origin).toBe("https://financeflow.app");
  });

  it("usa o dominio de producao da Vercel quando nao ha URL explicita", () => {
    expect(urlDoSite({ VERCEL_PROJECT_PRODUCTION_URL: "financeflow.vercel.app" }).origin).toBe(
      "https://financeflow.vercel.app",
    );
  });

  it("cai para localhost em desenvolvimento", () => {
    expect(urlDoSite({}).origin).toBe("http://localhost:3000");
  });
});
