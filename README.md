# 📄 Paper Trail Sprint

A calm, stage-by-stage homebuyer education feature that helps people learn which documents matter when. 🏡

## ✨ Overview

Paper Trail Sprint is a guided practice experience for homebuyers. It takes a stressful question, "What paperwork do I need right now?", and turns it into a short, approachable activity.

Instead of giving users one long checklist, the feature breaks the homebuying journey into smaller stages. In the current prototype, learners sort realistic documents into the right part of the process which makes the experience easier to follow and easier to remember.

The goal is not to turn homebuying into a game for the sake of it. The goal is to help users feel calmer, more prepared, and more confident before they talk with lenders, agents, or other professionals. 

## 🛠️ Setup Instructions

This project is a Vite-based React prototype. To run it locally:

```bash
npm install
npm run dev
```

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🔗 Integration Steps

Paper Trail Sprint currently runs as a standalone app, but the main host-facing entry point is `PracticeCard` in `src/features/paperTrailSprint/integration/PracticeCard.tsx`.

1. Render `PracticeCard` from the lesson or learning surface where you want the sprint to begin.
2. Keep the feature inside a React Router context. The card uses navigation to move into the sprint flow.
3. Mount `PaperTrailSprintProvider` above the sprint routes so progress, attempt state, rewards, and integration callbacks stay in sync.
4. Load the shared feature styles. In this prototype, the app imports `src/shared/styles/app.css` from `src/main.tsx`.

The current route flow is:

- `/` for the lesson completion wrapper
- `/sprint/:scenarioId` for the active sorting experience
- `/results/:scenarioId` for results and feedback

## 🎨 Design Decisions

Homebuying already comes with enough pressure, so the experience keeps the interaction focused, short, and easy to understand.

Progression is intentionally simple. Users move through small rounds and unlock later challenges by doing well on earlier ones. That structure helps reduce overwhelm and creates a sense of forward motion without making the feature feel heavy.

Rewards are included as light motivation. Mock NestCoins give users a small sense of progress, but the main reward is clarity. Visually, the prototype also aims to stay aligned with the Nest Navigate look and feel so it feels like part of the same learning experience.

## 🧱 Technical Architecture

The prototype is built with React, TypeScript, and Vite. Routing is handled with React Router, and the user flow moves from a lesson completion view into the sprint board and then into a results screen.

Current structure:

```txt
src/
  app/                         App shell and route definitions
  pages/                       Lesson, sprint, and results pages
  features/paperTrailSprint/
    components/                Sprint-specific UI pieces
    constants/                 UI and analytics constants
    data/                      Mock scenarios and reward data
    hooks/                     Provider and feature orchestration
    integration/               Host-facing PracticeCard entry point
    services/                  Mock repositories and reward service
    state/                     Types, reducer, actions, and selectors
    utils/                     Scoring, persistence, analytics, and accessibility helpers
  shared/                      Reusable components, helpers, and styles
```

## 🚀 Future Enhancements

- Replace mock repositories and services with real backend integrations for scenarios, progress, and rewards.
- Add more scenarios that cover a wider range of homebuying moments, including later-stage document preparation.
- Expand measurement so the team can better track completion, return usage, and whether the experience improves confidence and clarity.

## 🗂️ Mock Data Structure

Mock data for the prototype is centered around a `SprintScenario` shape. Each scenario includes stage buckets, document cards, reward rules, and short success or retry messages. The current repo keeps this data in feature-level mock files so the experience can feel realistic before a backend is connected.

Example mock scenario can be found: `src/features/paperTrailSprint/data/scenarios.ts`
