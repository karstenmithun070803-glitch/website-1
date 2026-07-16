#!/usr/bin/env node
/**
 * Batch encode Karst source videos into web-ready variants.
 * Automates deliverable-4-site-spec.md §7.4 encoding requirements.
 *
 * Usage:  npm run encode-videos
 *
 * Reads:   public/assets/video/raw/<name>.mov | .mp4
 * Writes:  public/assets/video/<name>-1080.mp4  (H.264, CRF 22, GOP 30, faststart)
 *          public/assets/video/<name>-720.mp4   (H.264, CRF 24, 720p, GOP 30, faststart)
 *          public/assets/video/<name>.webm      (VP9, CRF 32, GOP 30) — optional
 *
 * Requires `ffmpeg` on PATH. Skips files that are already up-to-date.
 */

import { execFileSync, spawnSync } from "node:child_process";
import { readdirSync, statSync, existsSync, mkdirSync } from "node:fs";
import { join, basename, extname } from "node:path";

const ROOT = process.cwd();
const RAW = join(ROOT, "public/assets/video/raw");
const OUT = join(ROOT, "public/assets/video");

// Verify ffmpeg exists.
try {
  execFileSync("ffmpeg", ["-version"], { stdio: "ignore" });
} catch {
  console.error("✗ ffmpeg not found on PATH. Install it and retry.");
  process.exit(1);
}

if (!existsSync(RAW)) {
  mkdirSync(RAW, { recursive: true });
  console.log(`Created ${RAW}. Drop source videos here and re-run.`);
  process.exit(0);
}

const sources = readdirSync(RAW).filter((f) => /\.(mov|mp4|MOV|MP4)$/.test(f));
if (sources.length === 0) {
  console.log(`No source videos in ${RAW}. Drop files there and re-run.`);
  process.exit(0);
}

function isFresh(src, out) {
  if (!existsSync(out)) return false;
  return statSync(out).mtimeMs > statSync(src).mtimeMs;
}

function run(args) {
  const result = spawnSync("ffmpeg", args, { stdio: "inherit" });
  if (result.status !== 0) throw new Error(`ffmpeg failed: ${args.join(" ")}`);
}

for (const file of sources) {
  const name = basename(file, extname(file));
  const src = join(RAW, file);
  const out1080 = join(OUT, `${name}-1080.mp4`);
  const out720 = join(OUT, `${name}-720.mp4`);
  const outWebm = join(OUT, `${name}.webm`);

  const specs = [
    {
      out: out1080,
      args: ["-i", src, "-c:v", "libx264", "-crf", "22", "-preset", "slow", "-g", "30",
             "-movflags", "+faststart", "-c:a", "aac", "-b:a", "128k", "-y", out1080],
    },
    {
      out: out720,
      args: ["-i", src, "-vf", "scale=1280:-2", "-c:v", "libx264", "-crf", "24",
             "-preset", "slow", "-g", "30", "-movflags", "+faststart",
             "-c:a", "aac", "-b:a", "128k", "-y", out720],
    },
    {
      out: outWebm,
      args: ["-i", src, "-c:v", "libvpx-vp9", "-crf", "32", "-b:v", "0",
             "-g", "30", "-y", outWebm],
    },
  ];

  for (const spec of specs) {
    if (isFresh(src, spec.out)) {
      console.log(`✓ up to date  ${basename(spec.out)}`);
      continue;
    }
    console.log(`→ encoding    ${basename(spec.out)}`);
    run(spec.args);
  }
}

console.log("\nDone.");
