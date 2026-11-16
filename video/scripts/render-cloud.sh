#!/usr/bin/env bash
# Renderiza os videos da pauta na nuvem (Chrome do sistema). Uso: scripts/render-cloud.sh ID [ID ...]
# Saida: out/ID.mp4 (1080x1920). Nao usa sync-config (config.json ja esta versionado).
set -euo pipefail
cd "$(dirname "$0")/.."
[ -d node_modules ] || npm ci --no-audit --no-fund
mkdir -p out
for id in "$@"; do
  npx remotion render src/index.ts "$id" "out/$id.mp4" --crf=24 \
    --browser-executable="${CHROME_BIN:-/usr/bin/google-chrome}" --gl=swiftshader
done
