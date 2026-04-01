import pkg from "@fal-ai/client";
const { fal } = pkg;
import fs from "fs";
import path from "path";

fal.config({ credentials: "1753c18f-c14a-4791-8bea-e9faa8727243:aa93e250d534b0d5a2311b15197561ca" });

const BASE = "/Users/ozel/Çoklu Web site/masif-atolye/images/masa-saati";

const ROOMS = [
  "minimalist home office desk with white walls, natural light",
  "cozy wooden study room with bookshelves and warm lamp light",
  "elegant executive office with dark wood furniture",
  "modern living room side table, Scandinavian decor",
  "rustic farmhouse kitchen counter, stone walls",
  "luxurious bedroom nightstand, silk bedding",
  "bright airy sunroom with indoor plants",
  "industrial loft desk, exposed brick wall",
  "traditional Turkish study room with kilim carpet",
  "zen meditation room, bamboo and stone",
  "contemporary open-plan office, glass walls, city view",
  "warm family living room fireplace mantel",
  "boho chic bedroom with macrame wall art",
  "pharmacy or medical clinic reception desk",
  "boutique hotel bedside table, marble decor",
  "art studio wooden workbench, creative clutter",
  "coffee shop wooden counter, warm ambient light",
  "vintage library reading nook, leather armchair",
  "coastal beach house sideboard, white and blue tones",
  "modern kitchen marble island, pendant lights",
  "child's playroom wooden shelf, colorful toys",
  "yoga studio bamboo shelf, candles and stones",
  "wine cellar stone shelf, dim warm light",
  "rooftop terrace outdoor table, golden hour light",
  "Scandinavian nursery white shelf, soft pastels",
  "mountain cabin wooden table, pine forest view",
  "museum display pedestal, gallery lighting",
  "luxury spa reception white marble counter",
  "modern restaurant bar wooden surface",
  "home gym locker room shelf, clean athletic aesthetic",
  "dark moody home cinema shelf, velvet curtains",
  "garden conservatory iron shelf, tropical plants",
  "minimalist bathroom shelf, white towels and plants",
  "cozy reading corner armchair tray table, knit blanket",
  "florist shop wooden counter, flowers around",
  "jewelry boutique glass display counter",
  "elegant dining room credenza, candlelight",
  "tech startup open office standing desk",
  "photographer's studio props table, backdrops",
  "tailor atelier wooden counter, fabric rolls",
  "pottery studio clay-dusted wooden shelf",
  "bookstore wooden counter, paperbacks around",
  "architect's drafting table, blueprints and tools",
  "children's school classroom teacher's desk",
  "vintage radio repair workshop wooden bench",
  "music studio mixing desk corner, dim light",
  "fashion boutique wooden display surface",
  "whiskey distillery oak barrel shelf",
  "herbal apothecary wooden shelf, glass jars",
  "penthouse apartment minimalist floating shelf",
  "outdoor garden party table, fairy lights",
  "private yacht cabin mahogany shelf",
  "traditional Japanese tokonoma alcove",
  "French patisserie marble counter, pastries",
  "mountain lodge fireplace mantel, antlers",
  "urban rooftop bar concrete surface, night view",
  "Provençal farmhouse lavender linen table",
  "dark academia library oak desk, brass lamp",
  "modern gallery white cube shelf",
  "greenhouse shelf among orchids and ferns",
  "dental clinic reception oak counter",
  "law firm mahogany desk, legal books",
  "chef's kitchen prep counter, herbs and spices",
  "fashion designer flat lay marble desk",
  "safari lodge teak shelf, woven baskets",
  "ski chalet wooden mantel, snowflake decor",
  "tropical resort bamboo shelf, ocean view",
  "private library rolling ladder oak shelf",
  "candle shop wooden counter, wax and wick",
  "ceramics gallery white pedestal, clay textures",
  "recording studio acoustic foam shelf corner",
  "flooring showroom parquet display",
  "wellness retreat stone shelf, essential oils",
  "antique shop crowded wooden shelf, old books",
  "modern reception desk, hotel lobby marble",
  "gift shop wicker basket display counter",
  "upscale barber shop wooden shelf, grooming tools",
];

async function processModel(num) {
  const imgPath = path.join(BASE, `Model ${num}`, `${num}.jpg`);
  const outPath = path.join(BASE, `Model ${num}`, `${num}-mekan.jpg`);

  if (!fs.existsSync(imgPath)) {
    console.log(`⚠️  Model ${num}: jpg not found, skipping`);
    return;
  }
  if (fs.existsSync(outPath)) {
    console.log(`⏭️  Model ${num}: already done`);
    return;
  }

  const room = ROOMS[(num - 1) % ROOMS.length];
  const prompt = `Professional product photography: a handcrafted wooden desk clock with arched shape placed on ${room}. The clock is the centerpiece, its natural beech wood grain visible. Photorealistic, warm natural lighting, 4K detail, no text, no watermark.`;

  try {
    const imgBuffer = fs.readFileSync(imgPath);
    const blob = new Blob([imgBuffer], { type: "image/jpeg" });
    const url = await fal.storage.upload(blob);

    const result = await fal.subscribe("fal-ai/nano-banana-2/edit", {
      input: { prompt, image_urls: [url], aspect_ratio: "1:1", resolution: "1K" },
    });

    const imgUrl = result.data?.images?.[0]?.url;
    if (!imgUrl) throw new Error("No image URL in response");

    const resp = await fetch(imgUrl);
    const buf = Buffer.from(await resp.arrayBuffer());
    // Save as PNG first, then convert
    const tmpPath = path.join(BASE, `Model ${num}`, `${num}-mekan-tmp.png`);
    fs.writeFileSync(tmpPath, buf);

    // Convert to JPEG using sips via child_process
    const { execSync } = await import("child_process");
    execSync(`sips -s format jpeg -s formatOptions 82 --resampleWidth 800 "${tmpPath}" --out "${outPath}"`);
    fs.unlinkSync(tmpPath);

    console.log(`✓ Model ${num}`);
  } catch (err) {
    console.error(`✗ Model ${num}: ${err.message}`);
  }

  await new Promise(r => setTimeout(r, 1500));
}

async function main() {
  const start = parseInt(process.argv[2] || "1");
  const end = parseInt(process.argv[3] || "79");
  console.log(`Processing models ${start}–${end}`);
  for (let i = start; i <= end; i++) {
    await processModel(i);
  }
  console.log("Done!");
}

main();
