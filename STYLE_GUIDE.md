# Style Guide

## Color Palette

### Neutrals (Slate)

- **Backgrounds:** `bg-gray-50/50` (Main Page), `bg-white` (Cards, Modals)
- **Borders:** `border-slate-200`, `border-slate-100` (Separators)
- **Text Primary:** `text-slate-900` (Headings, Values)
- **Text Secondary:** `text-slate-500`, `text-slate-600` (Descriptions, Metadata)
- **Text Tertiary/Icons:** `text-slate-400`, `text-slate-300` (Placeholders, Empty States)

### Brand & Accents

- **Primary:** `text-blue-500` (Icons), `bg-slate-900` (Primary Buttons)
- **AWS:** `#FF9900` (Text/Icon), `bg-[#FF9900]/10` (Backgrounds)
- **Azure:** `#0078D4` (Text/Icon), `bg-[#0078D4]/10` (Backgrounds)

### Semantic Colors (Tiers)

- **Foundational:** `bg-green-100 text-green-800`
- **Associate:** `bg-blue-100 text-blue-800`
- **Expert:** `bg-purple-100 text-purple-800`

## Typography

- **Font Family:** Sans-serif (`font-sans`), Monospace (`font-mono` for codes)
- **Page Title:** `text-3xl font-semibold tracking-tight text-slate-900`
- **Section Headings:** `text-lg font-semibold text-slate-900`
- **Card Titles:** `font-bold text-lg leading-tight text-slate-900`
- **Body Text:** `text-sm text-slate-600`
- **Captions/Metadata:** `text-xs text-slate-500` or `text-[10px] uppercase tracking-wider font-medium`

## Components

### Buttons

1.  **Primary Action (Solid):**
    - `bg-slate-900 text-white hover:bg-slate-800`
    - Used for: Active view toggles, main call-to-actions.
2.  **Secondary Action (Light Blue):**
    - `bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-100 shadow-none`
    - Used for: "Exam Guide" or primary card actions.
3.  **Ghost/Inactive:**
    - `text-slate-600 hover:bg-slate-100`
    - Used for: Inactive view toggles.
4.  **Outline/Icon:**
    - `border-slate-200 text-slate-400 hover:text-slate-600`
    - Used for: Secondary card actions (External Link), Search Help.

### Inputs & Forms

- **Search Input:** `pl-9 border-slate-200 w-full h-10 text-base md:text-sm rounded-md`
- **Select Trigger:** `border-none shadow-none hover:bg-slate-50 focus:ring-0` (Clean style)

### Cards

- **Container:** `bg-white rounded-xl border border-slate-200 shadow-sm`
- **Interactive State:** `hover:border-primary/50 hover:shadow-md transition-all duration-200`
- **Padding:** `p-6` standard padding.

## Layout & Spacing

- **Page Container:** `max-w-7xl mx-auto p-8 space-y-8`
- **Grid Layout:** `grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **List Layout:** `flex flex-col md:flex-row gap-6` (within card)

## Icons

- **Library:** Lucide React
- **Standard Size:** `h-4 w-4`
- **Large/Hero Size:** `h-8 w-8` or `h-6 w-6`
