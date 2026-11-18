/** Shared wedding + guest personalisation logic (used by the invitation and /admin). */

export const BRIDE_NAME = "Udani";
export const GROOM_NAME = "Thenuka";

export const PREFIXES = ["Mr.", "Mrs.", "Miss", "Mr. & Mrs.", "Family", "Dear"] as const;
export type Prefix = (typeof PREFIXES)[number];

/** Name as shown to the guest. "Dear" adds nothing here; the greeting supplies it. */
export function buildDisplayName(prefix: Prefix, rawName: string): string {
  const name = rawName.trim().replace(/\s+/g, " ");
  if (!name) return "";
  switch (prefix) {
    case "Family":
      return `${name} and Family`;
    case "Dear":
      return name.replace(/^dear\s+/i, "");
    default:
      return `${prefix} ${name}`;
  }
}

/** Always exactly one "Dear", never "Dear Dear …". */
export function buildGreeting(displayName: string): string {
  const withoutDear = displayName.replace(/^dear\s+/i, "");
  return `Dear ${withoutDear} ❤️`;
}

/** Spaces become "_" so links stay readable; everything else is URL-encoded. */
export function encodeGuestSlug(displayName: string): string {
  return displayName
    .split(" ")
    .map((part) => encodeURIComponent(part))
    .join("_");
}

export function decodeGuestSlug(slug: string): string {
  try {
    return decodeURIComponent(slug.replace(/_/g, " ")).trim();
  } catch {
    return slug.replace(/_/g, " ").trim();
  }
}

export function buildInviteLink(baseUrl: string, displayName: string): string {
  return `${baseUrl.trim().replace(/\/+$/, "")}/${encodeGuestSlug(displayName)}`;
}

export function buildInviteMessage(displayName: string, link: string): string {
  return `${buildGreeting(displayName)}

With joyful hearts, we warmly invite you to celebrate one of the most special days of our lives as we begin our journey together.

Please view our wedding invitation and all the event details through the link below 🌐:

${link}

Your presence would truly mean the world to us, and we would be honored to celebrate this beautiful moment together.

With love,
❤️ ${GROOM_NAME} & ${BRIDE_NAME}`;
}

/** Guest name from the current URL: /{slug}, or the older ?to= links. */
export function readGuestFromLocation(): string | null {
  const to = new URLSearchParams(window.location.search).get("to");
  if (to) return decodeGuestSlug(to) || null;

  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  if (!path || path.includes("/") || path.toLowerCase() === "admin" || path.toLowerCase() === "index.html") {
    return null;
  }
  return decodeGuestSlug(path) || null;
}
