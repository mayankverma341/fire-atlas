"""Verify Fire Atlas source fingerprints and optionally the published data archive."""
import argparse
import hashlib
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
MANIFEST = Path(__file__).with_name("baseline_manifest.json")

def sha256(path: Path, normalize_newlines: bool = False) -> str:
    if normalize_newlines:
        return hashlib.sha256(path.read_bytes().replace(b"\r\n", b"\n")).hexdigest()
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for block in iter(lambda: f.read(1 << 20), b""):
            h.update(block)
    return h.hexdigest()

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--zip", help="path to site_data.zip")
    args = ap.parse_args()
    m = json.loads(MANIFEST.read_text(encoding="utf-8"))
    bad = []
    for rel, want in m["source_sha256"].items():
        p = ROOT / rel
        got = sha256(p, normalize_newlines=True) if p.is_file() else "missing"
        if got != want:
            bad.append(f"{rel}: expected {want[:12]} now {got[:12]}")
    if args.zip:
        want = m["published_data"]["sha256_computed_locally"]
        got = sha256(Path(args.zip))
        if got != want:
            bad.append(f"site_data.zip: expected {want[:12]} now {got[:12]}")
    if bad:
        print(f"CHANGED: {len(bad)} files differ from the Fire Atlas baseline:")
        for line in bad:
            print("  " + line)
        return 1
    print(f"UNCHANGED: all {len(m['source_sha256']) + bool(args.zip)} files match the Fire Atlas baseline.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
