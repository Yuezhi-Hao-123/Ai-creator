const DEVICE_ID_KEY = "ai_content_planner_device_id";

/**
 * Returns the anonymous device identifier stored in localStorage.
 * Creates a new UUID if none exists. Must only be called in the browser.
 */
export function getDeviceId(): string {
  if (typeof window === "undefined") {
    throw new Error("getDeviceId() can only be called in the browser.");
  }

  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}
