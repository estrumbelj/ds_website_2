# datascience.fri.uni-lj.si

The DataScience@UL-FRI website — a [Hugo](https://gohugo.io) static site with
custom layouts (no external theme).

## Run it

```sh
brew install hugo     # or see gohugo.io/installation
hugo server           # http://localhost:1313
hugo --gc --minify    # production build into public/
```

Netlify builds with the Hugo version pinned in `netlify.toml`. There's no
separate publish step: pushing to `main` triggers a Netlify build, and the
change is live within a minute or two.

## Where things live

| Path | What |
| --- | --- |
| `content/_index.md` | Home page hero copy |
| `content/masters.md`, `events.md`, `competition.md`, `partnership.md` | The four main pages; hero copy is front matter, the rest is markdown |
| `content/news/` | Every event and announcement — one file each |
| `content/spark.md` | Spark sessions talk application form (posts to Netlify Forms) |
| `data/partners.yaml` | Industry partners shown on the home page and `/partnership/` — name, blurb, logo path, link |
| `data/paths.yaml` | The "Three ways in" cards on the home page |
| `data/masters.yaml` | The Master's page's "at a glance" facts table |
| `data/partnership.yaml` | The four partnership benefits listed on `/partnership/` |
| `data/competition.yaml` | The competition's "how it runs" timeline steps only — results/winners come from `content/news/`, see below |
| `layouts/` | Templates. `_default/page.html` renders both news articles and plain pages |
| `layouts/partials/func/events.html` | Turns `content/news/` into the event records used by the home page, calendar and archive |
| `assets/css/main.css` | The whole design system — colours, type and every component |
| `assets/js/events.js` | Calendar, tabs, filters and pagination on `/events/` |
| `static/partners/` | Partner logos referenced from `data/partners.yaml` — add a file here and point `logo:` at it to add a partner |

Every file under `data/` starts with a comment explaining its own shape — open
the one you need and follow the pattern of the entries already there.

## Adding an event or a news item

Create a file in `content/news/` — either by hand, or with
`hugo new content/news/<slug>.md` to start from the template in
`archetypes/default.md`:

```markdown
---
title: "Spark sessions 009"
date: 2026-10-06
draft: false
type: "meetup"        # meetup | workshop | news | competition
short: "Spark 009"    # optional — label inside a calendar cell
time: "18:00"         # optional — start time, shown before the detail line
meta: "FRI, lecture room P22"   # optional — one line of detail
register: "https://..."                 # optional — shows a booking button
cta: "Get tickets"                      # optional — button label
---

Body markdown. Leave it empty for a listing-only entry.
```

Everything else follows automatically: the home page "Next up" card, the events
calendar and list, and the archive at `/news/`.

`type` drives the colour and the filter an item falls under. `meetup` is red,
`workshop` is dark grey, `news` and `competition` are grey. Where `short` and
`meta` are missing they are derived from the title — a workshop titled
"… by Jure Žabkar" shows the presenter as its detail line. `time`, if set, is
prepended to `meta` automatically (e.g. "18:00 · FRI, lecture room P22") — no
need to include it in `meta` yourself.

Dates in the future are built (`buildFuture = true`), so an event can be
published before it happens; it moves from "What's on" to "Past events" on the
day it passes.

**`draft: true` hides a post completely, with no warning.** The production
build (`hugo --gc --minify`, no `--buildDrafts`) skips draft posts entirely —
it won't appear anywhere on the site, and nothing will tell you it's missing.
Leave it `false` unless you specifically want a post to not be live yet.

## Adding an image to a post

A post with no images stays a flat file as above. A post **with** an image
becomes a folder instead — its markdown goes in `index.md`, with the image
sitting right next to it:

```
content/news/2027-03-12-spark-sessions-009/
├── index.md
└── photo.jpg
```

Reference the image from `index.md` with a plain relative path — no leading
slash, no `static/` prefix:

```markdown
---
title: "Spark sessions 009"
date: 2027-03-12
draft: false
type: "meetup"
---

![Full room at Spark sessions 009](photo.jpg)

Body text continues here...
```

Hugo resolves and copies the image automatically at build time, and it's
already sized and styled by the site's CSS — nothing else to configure. Add
more images by dropping more files into the same folder and referencing each
one the same way.

To create one: `hugo new content/news/<slug>/index.md`, then add the image
file(s) to that same folder before committing.

## Publishing project competition results

The `/competition/` page's "20XX results" heading, winner cards, and "results
page" link are **not** stored anywhere separately — they're read directly from
whichever post in `content/news/` has a `winners` list in its front matter,
picking whichever one is dated most recently. Add a normal results post with
that list and everything else follows automatically:

```markdown
---
title: "Project competition 2027 results"
date: 2027-06-05
draft: false
type: "news"
winners:
  - place: First place
    title: Name of the winning project
    partner: Partner or team name
    team: Student names
  - place: Second place
    title: ...
    partner: ...
    team: ...
---

Body text as usual.
```

The page shows the first three entries as cards; list as many as actually
placed (fourth, fifth, etc.) — they just won't appear on the cards, only in
the post itself. There's nothing else to update: no data file, no year to set
by hand. `data/competition.yaml` still holds the evergreen "how it runs"
timeline steps, which don't change year to year.
