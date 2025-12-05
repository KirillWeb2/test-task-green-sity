import { sleep } from "@/shared/lib/utils";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const shouldFail = Math.random() < 0.3;

    if (shouldFail) {
      return NextResponse.json(
        {
          success: false,
          spiritId: body.spiritId,
          message: "Не удалось поймать духа! Дух сбежал!",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        spiritId: body.spiritId,
        message: "Дух успешно пойман!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Ошибка при поимке духа:", error);

    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
