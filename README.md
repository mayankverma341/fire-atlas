# Fire Atlas

**Fire Atlas** is a global fire activity explorer built from NASA satellite detections. It combines a historical MODIS and VIIRS record with a separate layer of recent raw detections.

**Live site:** https://mayankverma341.github.io/fire-atlas/

The historical record covers 2003 through 28 October 2026. The recent layer is refreshed through NASA FIRMS when the repository's `NASA_FIRMS_MAP_KEY` Actions secret is available. Recent detections are displayed with their fetch time and are never mixed into the harmonised historical record.

## What the site shows

- **Explore:** Search or draw an area, inspect its fire activity, compare a period with the same dates in earlier years, and download results.
- **The 2012 switch:** See how the raw record changes when VIIRS begins, and compare it with the harmonised record.
- **Validation:** Review continuity, backward tests, uncertainty, known events, and the limits of each check.
- **Method and data:** Read the processing steps, satellite coverage, data sources, and scientific limitations.

Fire Atlas counts active 0.05° cell-days rather than raw detection pixels. For each 2.5° cell and calendar month, it estimates a VIIRS-to-MODIS factor from overlap years and uses that factor for the earlier MODIS record. Satellite outages are filled from another measured source where supported or shown as **no data**. The recent detections layer remains raw FIRMS data.

The global raw record has a 2.64× step at the 2012 sensor transition. The harmonised record has a 0.97× step, close to the 0.96× single-sensor MODIS reference. This is a continuity check, not proof of the true pre-2012 fire level. The conversion assumes the overlap-period VIIRS-to-MODIS relationship also applied before VIIRS existed; that assumption cannot be measured directly. See the [method](docs/audit/HARMONIZATION_EQUATIONS.md), [validation report](docs/audit/VALIDATION_REPORT.md), [validation notes](docs/audit/VALIDATION_NOTES.md), and [limitations](docs/audit/SCIENTIFIC_LIMITATIONS.md).

## Run the website locally

```bash
cd web
npm ci
npm run get-data
npm run dev
```

`get-data` downloads the published `site_data.zip` release asset. The website is a static React and MapLibre application. See [web/README.md](web/README.md) for offline and build instructions.

## Run the pipeline

From the `pipeline/` directory:

```bash
pip install -r requirements.txt
python -m pytest -q
python -m fire_atlas.quickstart
```

The quickstart uses the small Florida sample in `samples/`. The full historical build requires NASA FIRMS archive files and substantially more processing time. Follow the [Colab guide](docs/COLAB_GUIDE.md) and [runbook](docs/RUNBOOK.md) for the complete workflow. Published historical data and validation reports are in the [site-data release](https://github.com/mayankverma341/fire-atlas/releases/tag/site-data). The [validation scripts](validation/) can check the published data independently of a full rebuild.

## Repository layout

| Path | Purpose |
| --- | --- |
| `pipeline/fire_atlas/` | Satellite ingestion, harmonisation, checks, and export |
| `config/settings.yaml` | Scientific settings and decision rules |
| `web/` | Website and interface tests |
| `recent/` | NASA FIRMS recent detections fetch and snapshot checks |
| `context/` | NASA POWER weather context |
| `geo/` | Map geography preparation and licence filtering |
| `validation/` | Checks against the published data |
| `docs/audit/` | Method, validation evidence, limitations, and reproducibility |

## Data and credits

Fire detections come from [NASA FIRMS](https://www.earthdata.nasa.gov/data/tools/firms). The historical record uses MODIS Collection 6.1 and VIIRS 375 m products; the recent layer uses FIRMS near-real-time NOAA-20 and NOAA-21 products. Weather context comes from [NASA POWER](https://power.larc.nasa.gov/). Geography uses Natural Earth and geoBoundaries, with individual licences recorded in [geo/README.md](geo/README.md) and the geography index.

Relevant FIRMS product citations: [MODIS archive](https://doi.org/10.5067/FIRMS/MODIS/MCD14ML), [MODIS near-real-time](https://doi.org/10.5067/FIRMS/MODIS/MCD14DL.NRT.0061), [VIIRS Suomi NPP near-real-time](https://doi.org/10.5067/FIRMS/VIIRS/VNP14IMGT_NRT.002), and [VIIRS NOAA-20 near-real-time](https://doi.org/10.5067/FIRMS/VIIRS/VJ114IMGT_NRT.002).

Fire Atlas is an independent project using NASA data. It is not created, approved, or endorsed by NASA. The source code is available under the [Apache License 2.0](LICENSE).

## Development and AI assistance

I built Fire Atlas and wrote part of its code. ChatGPT and Codex helped me with implementation, debugging, review, and documentation. No AI model runs in the website. See [AI use](docs/AI_USE.md) for more detail.
