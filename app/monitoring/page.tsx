"use client";

import { SpiritList } from "@/features/spirit-list";
import { useSSEUpdates } from "@/shared/api";

import styles from "./monitoring-page.module.scss";

export default function MonitoringPage() {
  useSSEUpdates();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1>Панель Мониторинга Ёкаев</h1>
        <p>Обнаружение духовных аномалий в реальном времени — Токио</p>
      </header>

      <SpiritList />
    </main>
  );
}
