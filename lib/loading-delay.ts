export function waitForLoadingWindow(minMs = 2000, maxMs = 4000): Promise<void> {
  const safeMin = Math.max(0, minMs);
  const safeMax = Math.max(safeMin, maxMs);
  const delay = safeMin + Math.floor(Math.random() * (safeMax - safeMin + 1));

  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}
