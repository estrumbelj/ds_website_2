# datascience.fri.uni-lj.si

The DataScience@UL-FRI website — a [Hugo](https://gohugo.io) static site with
custom layouts (no external theme).

## Run it

```sh
brew install hugo     # or see gohugo.io/installation
hugo server           # http://localhost:1313
hugo --gc --minify    # production build into public/
```

Netlify builds with the Hugo version pinned in `netlify.toml`.

## Where things live

| Path | What |
| --- | --- |
| `content/_index.md` | Home page hero copy |
| `content/masters.md`, `events.md`, `competition.md`, `partnership.md` | The four main pages; hero copy is front matter, the rest is markdown |
| `content/news/` | Every event and announcement — one file each |
| `content/spark.md` | Spark sessions talk application form (posts to Netlify Forms) |
| `data/*.yaml` | Structured blocks: partners, home cards, "at a glance" facts, competition steps and results, partnership benefits |
| `layouts/` | Templates. `_default/page.html` renders both news articles and plain pages |
| `layouts/partials/func/events.html` | Turns `content/news/` into the event records used by the home page, calendar and archive |
| `assets/css/main.css` | The whole design system — colours, type and every component |
| `assets/js/events.js` | Calendar, tabs, filters and pagination on `/events/` |
| `static/partners/` | Partner logos referenced from `data/partners.yaml` |

## Adding an event or a news item

Create a file in `content/news/`:

```markdown
---
title: "Spark sessions 009"
date: 2026-10-06
draft: false
type: "meetup"        # meetup | workshop | news | competition
short: "Spark 009"    # optional — label inside a calendar cell
meta: "18:00 · FRI, lecture room P22"   # optional — one line of detail
register: "https://..."                 # optional — shows a booking button
cta: "Get tickets"                      # optional — button label
---

Body markdown. Leave it empty for a listing-only entry.
```

Everything else follows automatically: the home page "Next up" card, the events
calendar and list, the archive at `/news/`, and the Spark/workshop history
tables on `/events/`.

`type` drives the colour and the filter an item falls under. `meetup` is red,
`workshop` is dark grey, `news` and `competition` are grey. Where `short` and
`meta` are missing they are derived from the title — a workshop titled
"… by Jure Žabkar" shows the presenter as its detail line.

Dates in the future are built (`buildFuture = true`), so an event can be
published before it happens; it moves from "What's on" to "Past events" on the
day it passes.
