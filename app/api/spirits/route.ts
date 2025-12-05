import { NextResponse } from "next/server";
import type { Spirit } from "@/shared/types";
import { SpiritThreatLevel, SpiritStatus } from "@/shared/types";

// Мок-база данных духов
const mockSpirits: Spirit[] = [
  {
    id: "1",
    name: "Кицунэ",
    threatLevel: SpiritThreatLevel.High, // Статус enum
    location: "Район Сибуя",
    status: SpiritStatus.Active, // Статус enum
    lastUpdate: Date.now(),
  },
  {
    id: "2",
    name: "Тануки",
    threatLevel: SpiritThreatLevel.Medium,
    location: "Район Синдзюку",
    status: SpiritStatus.Active,
    lastUpdate: Date.now(),
  },
  {
    id: "3",
    name: "Юки-онна",
    threatLevel: SpiritThreatLevel.Critical,
    location: "Район Минато",
    status: SpiritStatus.Active,
    lastUpdate: Date.now(),
  },
  {
    id: "4",
    name: "Тэнгу",
    threatLevel: SpiritThreatLevel.High,
    location: "Район Тиёда",
    status: SpiritStatus.Active,
    lastUpdate: Date.now(),
  },
  {
    id: "5",
    name: "Юрэй",
    threatLevel: SpiritThreatLevel.Low,
    location: "Район Тайто",
    status: SpiritStatus.Active,
    lastUpdate: Date.now(),
  },
];

export async function GET() {
  try {
    return NextResponse.json(mockSpirits, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Не удалось получить список духов" },
      { status: 500 }
    );
  }
}
