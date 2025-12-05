# Planning Guide

A clean, professional web application for browsing AWS and Microsoft cloud certifications, featuring detailed certification information including exam duration, questions, and passing scores.

**Experience Qualities**:
1. **Clean** - Simple, uncluttered interface that puts certification information front and center
2. **Informative** - Users quickly see all relevant exam details including duration, question count, and passing scores
3. **Professional** - Modern card-based layout that reflects the serious, career-focused nature of professional certifications

**Complexity Level**: Light Application (multiple features with basic state)
This is a content showcase app with search functionality and view toggling. It features a clean card layout with detailed exam statistics, search filtering, and view mode options (grid/list).

## Essential Features

### Certification Display
- **Functionality**: Displays certification cards with comprehensive exam details in a clean white card layout
- **Purpose**: Provides users with complete certification information at a glance
- **Trigger**: App loads with default certification data
- **Progression**: App loads → Display certifications in grid → Show provider icons, badges, stats, and exam guide links
- **Success criteria**: All certifications display with provider, level badge, code, name, description, duration, questions, pass score, and exam guide button

### Search & Filtering
- **Functionality**: Search bar with provider dropdown and info icon for finding specific certifications
- **Purpose**: Helps users quickly find certifications by name, code, or filter by provider
- **Trigger**: User types in search field or selects provider from dropdown
- **Progression**: User enters search term → Filter updates in real-time → Result count updates → Grid refreshes with filtered results
- **Success criteria**: Search is instant, provider dropdown works, result count is accurate

### View Mode Toggle
- **Functionality**: Toggle between Grid and List view modes
- **Purpose**: Allows users to choose their preferred viewing layout
- **Trigger**: User clicks Grid or List button
- **Progression**: User clicks view button → Active button highlights → Layout updates (future enhancement for list view)
- **Success criteria**: Grid button is active by default, both buttons are clearly styled

### Exam Statistics
- **Functionality**: Each card displays duration (minutes), number of questions, and passing score
- **Purpose**: Gives users concrete exam expectations
- **Trigger**: Cards render with certification data
- **Progression**: Card renders → Stats section displays three columns → Each stat shows label and value
- **Success criteria**: All three stats are clearly visible and properly formatted

## Edge Case Handling

- **Empty Search Results**: Show "No certifications found" message when search returns zero results
- **Missing Exam Statistics**: Handle certifications that may not have duration, questions, or pass score data
- **Long Certification Names**: Text wraps appropriately within card boundaries
- **Missing Study Guide Links**: All certifications have valid exam guide URLs

## Design Direction

The design should evoke **clarity, simplicity, and professionalism**. Clean white cards on a light gray background, with provider-specific colors (orange for AWS, blue for Azure/Microsoft), clear typography hierarchy, and comprehensive exam information displayed in an organized manner.

## Color Selection

A minimal, clean palette focused on readability and provider brand colors:

- **Background**: Light Gray (oklch(0.98 0.002 240)) - Clean, neutral canvas
- **Card**: Pure White (oklch(1.00 0 0)) - Maximum contrast for content
- **Primary Text**: Dark Gray (oklch(0.15 0.005 240)) - Excellent readability
- **Muted Text**: Medium Gray (oklch(0.50 0.01 240)) - Secondary information
- **AWS Orange**: (oklch(0.65 0.15 40)) - AWS branding
- **Azure Blue**: (oklch(0.45 0.12 240)) - Microsoft/Azure branding
- **Foundational Badge**: Emerald (emerald-50 bg, emerald-700 text) - Entry-level certifications
- **Associate Badge**: Blue (blue-50 bg, blue-700 text) - Mid-level certifications

## Font Selection

Clean, modern sans-serif focused on readability:

- **Primary Font**: Inter - Excellent for UI and body text, highly legible
- **Hierarchy**:
  - Page Title: Inter Bold/30px
  - Card Titles: Inter SemiBold/16px
  - Body Text: Inter Regular/14px
  - Labels/Badges: Inter Medium/12px
  - Stats Labels: Inter Regular/11px uppercase

## Animations

Minimal, functional animations that enhance usability:

- **Card Entry**: Subtle fade-up (0.3s) with staggered delay (50ms between cards)
- **Hover States**: Gentle shadow elevation on card hover
- **Button States**: Quick color transitions (200ms)
- **View Toggle**: Instant feedback on active state

## Component Selection

- **Components**:
  - **Card**: White background, subtle border, contains all certification information
  - **Badge**: For certification levels (Foundational, Associate, etc.)
  - **Button**: View toggle (Grid/List), Exam Guide link
  - **Input**: Search field with icon
  - **Select**: Provider dropdown (All Providers, Microsoft, AWS)
  - **Icons**: Phosphor Icons for provider logos, search, info, grid/list, external link
  
- **Customizations**:
  - Cards have clean white background with subtle border
  - Provider icons and names at top (AWS with orange, Azure with blue)
  - Level badges in top-right corner with appropriate colors
  - Three-column stats grid showing Duration, Questions, Pass Score
  - Exam Guide button with book icon and external link icon
  - Search bar with search icon on left, provider dropdown, and info icon
  - View toggle buttons showing Grid/List with active state
  - Result count display "Showing X of Y certifications"
  
- **States**:
  - Cards: Default (white with border), Hover (elevated shadow)
  - Buttons: Default (outlined), Active (filled), Hover (background change)
  - Search: Default (white), Focus (ring border)
  
- **Icon Selection**:
  - **MagnifyingGlass**: Search functionality
  - **Info**: Information/help icon
  - **SquaresFour**: Grid view icon
  - **List**: List view icon
  - **AmazonLogo**: AWS provider icon
  - **Cloud**: Azure provider icon
  - **BookOpen**: Exam guide icon
  - **ArrowSquareOut**: External link indicator
  
- **Spacing**:
  - Card padding: p-6 (24px)
  - Grid gap: gap-6 (24px)
  - Container padding: px-4 py-8
  - Stats grid: gap-4 (16px)
  
- **Mobile**:
  - Grid: 1 column on mobile, 2 on tablet, 3 on desktop
  - Search bar: Full width, elements stack if needed
  - Cards: Full width with adjusted padding
  - View toggle: Remains horizontal, smaller buttons
- **Empty Search Query**: Allow empty search to show all results (filtered by provider if selected)
- **Keyboard Navigation**: Support Enter key to trigger search without clicking button

## Design Direction

The design should evoke **trust, clarity, and professionalism**—qualities that align with career advancement and technical credibility. The interface should feel like a premium resource for IT professionals, with clean typography, purposeful color coding for certification levels, and a layout that emphasizes content hierarchy.

## Color Selection

A professional, tech-forward palette with strong blues and strategic accent colors:

- **Primary Color**: Deep Azure Blue (oklch(0.45 0.15 250)) - Conveys trust, technology, and professionalism associated with both Microsoft and AWS
- **Secondary Colors**: 
  - Slate Gray (oklch(0.35 0.01 250)) for text and UI elements - Professional, neutral
  - Light Cloud (oklch(0.97 0.005 250)) for subtle backgrounds - Airy, unobtrusive
- **Accent Color**: Electric Cyan (oklch(0.70 0.15 210)) - Highlights interactive elements and draws attention to CTAs
- **Foreground/Background Pairings**:
  - Primary (Deep Azure #0052CC): White text (#FFFFFF) - Ratio 8.2:1 ✓
  - Accent (Electric Cyan #00B8D4): Dark Gray (#1A1A1A) - Ratio 7.9:1 ✓
  - Background (Light Cloud #F7F9FC): Dark Slate (#2D3748) - Ratio 11.4:1 ✓
  - Muted (Cool Gray #E2E8F0): Slate (#475569) - Ratio 5.2:1 ✓

## Font Selection

Typography should balance modern tech aesthetics with excellent readability for information-dense content.

- **Primary Font**: Space Grotesk - A geometric sans-serif with technical character, perfect for headings and certification names
- **Secondary Font**: Inter - Highly legible system font for body text, descriptions, and UI elements

- **Typographic Hierarchy**:
  - H1 (App Title): Space Grotesk Bold/32px/tight leading (-0.02em)
  - H2 (Section Headers): Space Grotesk SemiBold/20px/normal leading
  - Certification Name: Space Grotesk Medium/18px/tight leading
  - Body (Descriptions): Inter Regular/14px/relaxed leading (1.6)
  - Labels/Badges: Inter SemiBold/12px/wide tracking (0.05em)

## Animations

Animations should be subtle and functional, reinforcing the professional tone while providing helpful visual feedback.

- **Card Entry**: Staggered fade-up animation as certifications load (100ms delay between cards)
- **Filter Transitions**: Smooth 200ms opacity/scale transition when cards filter in/out
- **Hover States**: Gentle lift (translateY -4px) with shadow expansion on card hover (300ms ease)
- **Button Feedback**: Quick scale down (0.98) on click for tactile feedback
- **Loading States**: Subtle pulse animation on skeleton cards while data loads

## Component Selection

- **Components**:
  - **Card**: Primary container for each certification (custom shadow and hover effects)
  - **Badge**: For certification levels (Foundational, Associate, Expert, Specialty)
  - **Button**: Filter controls and search button with active state styling
  - **Select**: Provider dropdown for filtering (Microsoft, AWS, All Providers)
  - **Input**: Search input field with validation and keyboard support
  - **Skeleton**: Loading placeholders during LLM data generation
  - **Alert**: Error messages if data generation fails
  - **Separator**: Visual dividers between card sections
  - **Toast**: Success/info notifications for search actions
  
- **Customizations**:
  - Custom gradient backgrounds for different provider cards (subtle blue tint for Microsoft, orange tint for AWS)
  - Badge variants for certification levels with color coding (green for foundational, blue for associate, purple for expert)
  - Card hover effect with smooth shadow and transform
  - Integrated search bar with provider dropdown, input validation, and dual trigger (button + Enter key)
  - Search button with icon-only design for clean interface
  - Clear button appears when search has text
  - Inline validation messages for search input
  - Helper text showing search term examples (codes, names, tiers)
  
- **States**:
  - Buttons: Default (neutral), Active (primary color with bold text), Hover (subtle background), Disabled (reduced opacity)
  - Cards: Default (elevated shadow), Hover (lifted with enhanced shadow), Loading (skeleton with pulse)
  - Links: Default (accent color), Hover (darker accent), Visited (muted accent)
  - Search Input: Default (white background), Focus (ring border), Error (destructive border with message), Disabled (reduced opacity)
  - Select Dropdown: Closed (chevron down), Open (content visible), Selected (checkmark indicator)
  
- **Icon Selection**:
  - **MagnifyingGlass**: Search button and filter representation
  - **X**: Clear search input button
  - **Certificate**: App branding and certification indicator
  - **ArrowSquareOut**: External study guide links
  - **FunnelSimple**: Filter controls
  - **CloudArrowDown**: Microsoft Azure representation
  - **AmazonLogo**: AWS representation
  - **ChevronDown/Up**: Select dropdown indicators
  
- **Spacing**:
  - Card padding: p-6 (24px)
  - Grid gap: gap-6 (24px)
  - Section spacing: space-y-4 (16px between elements)
  - Button group gap: gap-2 (8px)
  - Generous top/bottom page padding: py-12 (48px)
  
- **Mobile**:
  - Grid: 1 column on mobile (<640px), 2 columns on tablet (640-1024px), 3 columns on desktop (>1024px)
  - Filter buttons: Stack vertically on mobile, horizontal pill group on tablet+
  - Card padding: Reduce to p-4 on mobile
  - Typography: Scale down headings by 20% on mobile
  - Touch targets: Minimum 44px height for all interactive elements
