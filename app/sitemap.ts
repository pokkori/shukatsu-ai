import { MetadataRoute } from "next";

const KEYWORD_SLUGS = [
  "jikopr-kakikata-es",
  "gakuchika-episode-nai",
  "es-shibou-riyu-kakikata",
  "mensetsu-gyaku-shitsumon-rei",
  "shukatsu-jikoshoukai-30byo",
  "es-tokugi-shumi-kakikata",
  "shukatsu-tsuyomi-yowami",
  "mensetsu-stress-taisei",
  "shukatsu-leadership-jikopr",
  "obousha-nai-gakuchika",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: "https://shukatsu-ai.vercel.app", lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: "https://shukatsu-ai.vercel.app/tool", lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: "https://shukatsu-ai.vercel.app/legal", lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: "https://shukatsu-ai.vercel.app/terms", lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: "https://shukatsu-ai.vercel.app/privacy", lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];
  const keywordPages: MetadataRoute.Sitemap = KEYWORD_SLUGS.map((slug) => ({
    url: `https://shukatsu-ai.vercel.app/keywords/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [...staticPages, ...keywordPages];
}
