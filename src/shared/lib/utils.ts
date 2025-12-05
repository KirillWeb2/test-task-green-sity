export function getThreatLevelColor(level: string): string {
  const colors: Record<string, string> = {
    Low: "#4CAF50",
    Medium: "#FF9800",
    High: "#F44336",
    Critical: "#9C27B0",
  };
  return colors[level] || "#757575";
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
