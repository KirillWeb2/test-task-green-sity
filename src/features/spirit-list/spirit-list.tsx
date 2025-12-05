"use client";

import styles from "./spirit-list.module.scss";
import { SpiritCard } from "./components";
import { useGetSpirits } from "@/shared/api/spirit";

export const SpiritList = () => {
  const { data: spirits = [], isLoading, error } = useGetSpirits();

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          Ошибка при загрузке спиритов. Попробуйте обновить страницу.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {spirits.map((spirit: any) => (
          <SpiritCard key={spirit.id} spirit={spirit} />
        ))}
      </div>
    </div>
  );
};
