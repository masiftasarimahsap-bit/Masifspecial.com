import pkg from "@fal-ai/client";
const { fal } = pkg;
import fs from "fs";
import path from "path";

fal.config({ credentials: "1753c18f-c14a-4791-8bea-e9faa8727243:aa93e250d534b0d5a2311b15197561ca" });

const BASE = "/Users/ozel/Çoklu Web site/masif-atolye/images/masa-saati";

// Models to renew with their rooms
const RENEW = [
  { num: 74, slug: "daglarca", room: "antique shop crowded wooden shelf old books, warm amber light" },
  { num: 75, slug: "taze",     room: "modern hotel lobby marble reception desk, soft lighting" },
  { num: 76, slug: "pinar",    room: "gift shop wicker basket display counter, natural daylight" },
  { num: 77, slug: "sumbul",   room: "upscale barber shop wooden shelf, grooming tools, warm light" },
];

async function renew(model) {
  const { num, slug, room } = model;
  const imgPath = path.join(BASE, `Model ${num}`, `${num}.jpg`);
  const outPath = path.join(BASE, `Model ${num}`, `${num}-mekan.jpg`);
  const kapakPath = path.join(BASE, `kapak-${slug}.jpg`);

  if (!fs.existsSync(imgPath)) {
    console.log(`⚠️  Model ${num}: jpg not found`);
    return;
  }

  // Prompt focused on preserving the clock, only changing background
  const prompt = `Professional product photo: this exact handcrafted wooden desk clock with arched shape, placed on ${room}. IMPORTANT: preserve the clock's exact wood grain texture, color, clock face, and hands completely unchanged. Only add the surrounding environment. The clock must look identical to the input image. Photorealistic, 4K, no text, no watermark.`;

  try {
    const imgBuffer = fs.readFileSync(imgPath);
    const blob = new Blob([imgBuffer], { type: "image/jpeg" });
    const url = await fal.storage.upload(blob);

    const result = await fal.subscribe("fal-ai/nano-banana-2/edit", {
      input: { prompt, image_urls: [url], aspect_ratio: "1:1", resolution: "1K" },
    });

    const imgUrl = result.data?.images?.[0]?.url;
    if (!imgUrl) throw new Error("No image URL");

    const resp = await fetch(imgUrl);
    const buf = Buffer.from(await resp.arrayBuffer());
    const tmpPath = path.join(BASE, `Model ${num}`, `${num}-mekan-tmp.png`);
    fs.writeFileSync(tmpPath, buf);

    const { execSync } = await import("child_process");
    execSync(`sips -s format jpeg -s formatOptions 82 --resampleWidth 800 "${tmpPath}" --out "${outPath}"`);
    fs.unlinkSync(tmpPath);

    // Update kapak too
    fs.copyFileSync(outPath, kapakPath);

    console.log(`✓ Model ${num} (${slug})`);
  } catch (err) {
    console.error(`✗ Model ${num}: ${err.message}`);
  }

  await new Promise(r => setTimeout(r, 1500));
}

async function main() {
  for (const m of RENEW) {
    await renew(m);
  }
  console.log("Done!");
}

main();
