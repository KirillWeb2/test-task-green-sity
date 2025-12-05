import { SpiritStatus, SpiritThreatLevel } from "../types";

export const spiritThreatLevelLabels: Record<SpiritThreatLevel, string> = {
  [SpiritThreatLevel.Low]: "Низкий",
  [SpiritThreatLevel.Medium]: "Средний",
  [SpiritThreatLevel.High]: "Высокий",
  [SpiritThreatLevel.Critical]: "Критический",
};

export const spiritStatusLabels: Record<SpiritStatus, string> = {
  [SpiritStatus.Active]: "Активен",
  [SpiritStatus.Captured]: "Пойман",
};
