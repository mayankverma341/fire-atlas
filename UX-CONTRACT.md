# Fire Atlas UX contract

The current browser application is an English-language, read-only explorer. Shared controls and data behavior remain owned by their existing components and `src/lib` helpers. `DESIGN.md` records the visual system.

## Canonical UI Map

| Capability | Canonical owner | Source of truth | Allowed variants | Verification |
| --- | --- | --- | --- | --- |
| Select/Listbox | Native `<select>` in existing components | Browser semantics and `web/src/components` | Mode, region, map month | `web/tests/geo.test.mjs`, browser interaction |
| Date | Native date input in Compare and Downloads | Browser semantics and `web/src/lib/analysis.js` | From, to | `web/tests/claims.test.mjs`, browser interaction |
| Form | AreaPicker | `web/src/components/AreaPicker.jsx` | Box, point | `web/tests/geo.test.mjs`, browser interaction |
| Scrollbar | Global application stylesheet | `web/src/styles/layout.css` | Navigation strip on narrow screens | Browser visual check |

The brand button returns to Explore and checks for newer published data. Views retain their hash links. The map, charts, downloads, method, and validation use the same published files and scientific terms. Offline and stale-data notices remain explicit. No data is modified by the website.
