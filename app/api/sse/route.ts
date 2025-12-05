import { NextResponse } from "next/server";

const clients = new Set<ReadableStreamDefaultController>();
const threatLevels = ["Low", "Medium", "High", "Critical"];

let interval: NodeJS.Timer | null = null;

function startBroadcast() {
  if (interval) return;

  interval = setInterval(() => {
    const message = {
      type: "threat_update",
      data: {
        spiritId: String(Math.ceil(Math.random() * 5)),
        newThreatLevel:
          threatLevels[Math.floor(Math.random() * threatLevels.length)],
        timestamp: Date.now(),
      },
    };

    const payload = `data: ${JSON.stringify(message)}\n\n`;
    const encoded = new TextEncoder().encode(payload);

    for (const client of clients) {
      try {
        client.enqueue(encoded);
      } catch {
        clients.delete(client);
      }
    }
  }, 5000);
}

export function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      clients.add(controller);
      startBroadcast();

      controller.enqueue(encoder.encode("data: connected\n\n"));

      return () => clients.delete(controller);
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
