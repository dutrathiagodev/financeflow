import { err, ok, type Result } from "@/domain/result";

export type Profile = { name: string };

export const DEFAULT_PROFILE: Profile = { name: "Investidor" };
export const MAX_NAME_LENGTH = 30;

export function parseProfile(raw: unknown): Profile {
  if (typeof raw !== "object" || raw === null) return DEFAULT_PROFILE;
  const name = (raw as { name?: unknown }).name;
  return typeof name === "string" && name.trim() ? { name: name.trim().slice(0, MAX_NAME_LENGTH) } : DEFAULT_PROFILE;
}

export function validateName(input: string): Result<string, "empty-name"> {
  const name = input.trim().slice(0, MAX_NAME_LENGTH);
  return name ? ok(name) : err("empty-name");
}

export function parseBoolean(raw: unknown): boolean {
  return raw === true;
}
