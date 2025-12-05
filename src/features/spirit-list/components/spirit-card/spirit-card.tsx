"use client";

import { getThreatLevelColor } from "@/shared/lib/utils";
import { useCaptureSpirit } from "@/shared/api";
import {
  spiritStatusLabels,
  spiritThreatLevelLabels,
} from "@/shared/lib/translations";

import { SpiritCardProps } from "./types";
import styles from "./spirit-card.module.scss";

export const SpiritCard = ({ spirit }: SpiritCardProps) => {
  const { mutate: capture, isPending } = useCaptureSpirit();

  const handleCapture = () => {
    capture(spirit.id);
  };

  return (
    <div className={styles.card}>
      <div
        className={styles.threatIndicator}
        style={{ backgroundColor: getThreatLevelColor(spirit.threatLevel) }}
      />

      <div className={styles.content}>
        <h2 className={styles.name}>{spirit.name}</h2>

        <div className={styles.details}>
          <div className={styles.detail}>
            <span className={styles.label}>Уровень угрозы</span>
            <span className={styles.threatLevel}>
              {spiritThreatLevelLabels[spirit.threatLevel]}
            </span>
          </div>

          <div className={styles.detail}>
            <span className={styles.label}>Локация</span>
            <span className={styles.location}>{spirit.location}</span>
          </div>

          <div className={styles.detail}>
            <span className={styles.label}>Статус</span>
            <span
              className={`${styles.status} ${
                spirit.status === "Active" ? styles.active : styles.captured
              }`}
            >
              {spiritStatusLabels[spirit.status]}
            </span>
          </div>
        </div>

        <button
          className={styles.captureBtn}
          onClick={handleCapture}
          disabled={isPending || spirit.status === "Captured"}
        >
          {isPending ? "Поймка..." : "Поймать"}
        </button>
      </div>
    </div>
  );
};
