# Planning Guide

A professional web application for browsing AWS and Microsoft cloud certifications with comprehensive practice exam management, featuring detailed certification information, exam creation tools, and parent-child data relationships.

**Experience Qualities**:
1. **Clean** - Simple, uncluttered interface that puts certification information front and center
2. **Informative** - Users quickly see all relevant exam details including duration, question count, and passing scores
3. **Professional** - Modern card-based layout that reflects the serious, career-focused nature of professional certifications

**Complexity Level**: Light Application (multiple features with basic state)
This is a content showcase app with search functionality, view toggling, certification management, and practice exam creation. It features a clean card layout with detailed exam statistics, search filtering, view mode options (grid/list), and comprehensive practice exam management with parent-child relationships.

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

### Practice Exam Management
- **Functionality**: Add, edit, and manage practice exams for certifications with full metadata tracking
- **Purpose**: Allows users to create comprehensive practice tests with questions, answers, and metadata (domain, service, difficulty, topic)
- **Trigger**: User clicks "Add Practice Exam" on certification card OR selects "Save & Add Practice Exam" from search results
- **Progression**: 
  - From card: Click "Add Practice Exam" → Template dialog opens → User creates exam via JSON editor → Validation → Save
  - From search: Select certification → Choose "Save & Add Practice Exam" → Certification saved → Practice exam editor opens → Create exam → Save
- **Success criteria**: Practice exams are linked to parent certification, JSON validates against schema, exams persist with certification

### Certification Deletion Constraint
- **Functionality**: Prevent deletion of certifications that have associated practice exams
- **Purpose**: Maintain data integrity and prevent orphaned practice exam records
- **Trigger**: User attempts to delete a certification with existing practice exams
- **Progression**: Click delete → System checks for child exams → Display warning with exam count → Prevent deletion
- **Success criteria**: Cannot delete certification with exams, clear error message shown, user must delete exams first

### Practice Exam Metadata
- **Functionality**: Each question includes comprehensive metadata fields
- **Purpose**: Enable detailed tracking and categorization of exam questions
- **Fields**: 
  - IsCorrectAnswer (boolean) - Marks correct answer option(s)
  - IsMultiSelect (boolean) - Indicates multiple correct answers allowed
  - Domain (string) - Certification knowledge domain
  - Service (string) - Cloud service/technology covered
  - Weighted Difficulty Factor (number 0-10) - Granular difficulty rating
  - Topic (optional string) - Specific topic within domain
- **Success criteria**: All metadata fields validate and persist correctly

## Edge Case Handling

- **Empty Search Results**: Show "No certifications found" message when search returns zero results
- **Missing Exam Statistics**: Handle certifications that may not have duration, questions, or pass score data
- **Long Certification Names**: Text wraps appropriately within card boundaries
- **Missing Study Guide Links**: All certifications have valid exam guide URLs
- **Certification with Practice Exams**: Prevent deletion and show warning with exam count
- **Invalid Practice Exam JSON**: Validate JSON structure and show detailed error messages
- **Multi-Select Questions**: Support questions with multiple correct answers
- **Optional Topic Field**: Allow questions without specific topic designation
- **Practice Exam Count Display**: Show badge with count on "Add Practice Exam" button when exams exist

## Design Direction

The design should evoke **clarity, simplicity, and professionalism**. Clean white cards on a light gray background, provider-specific colors (orange for AWS, blue for Azure/Microsoft), clear typography hierarchy, and comprehensive exam information displayed in an organized, spacious layout.

## Color Selection

A minimal, clean palette focused on readability and provider brand colors:

- **Background**: Very Light Gray (oklch(0.98 0.002 240)) - Clean, neutral canvas
- **Card**: Pure White (oklch(1.00 0 0)) - Maximum contrast for content
- **Primary Text**: Dark Gray (oklch(0.20 0.005 240)) - Excellent readability
- **Muted Text**: Medium Gray (oklch(0.50 0.01 240)) - Secondary information
- **AWS Orange**: (oklch(0.60 0.18 40)) - AWS branding for icons and text
- **Azure Blue**: (oklch(0.55 0.18 240)) - Microsoft/Azure branding for icons and text
- **Foundational Badge**: Emerald (oklch(0.93 0.08 160) bg, oklch(0.35 0.15 160) text) - Entry-level certifications
- **Associate Badge**: Blue (oklch(0.93 0.08 240) bg, oklch(0.40 0.15 240) text) - Mid-level certifications
- **Border**: Light Gray (oklch(0.90 0.005 240)) - Subtle card borders

## Font Selection

Clean, modern sans-serif focused on readability:

- **Primary Font**: Inter - Excellent for UI and body text, highly legible
- **Hierarchy**:
  - Page Title: Inter Bold/36px
  - Card Titles: Inter Bold/18px
  - Body Text: Inter Regular/14px
  - Labels/Badges: Inter Medium/12px
  - Stats Labels: Inter SemiBold/10px uppercase with wider tracking

## Animations

Minimal, functional animations that enhance usability:

- **Card Entry**: Subtle fade-up (0.3s) with staggered delay (50ms between cards)
- **Hover States**: Gentle lift (-4px translateY) with shadow elevation on card hover (300ms)
- **Button States**: Quick color transitions (200ms)

## Component Selection

- **Components**:
  - **Card**: White background with subtle light gray border, rounded corners, contains all certification information
  - **Badge**: For certification levels (Foundational, Associate, etc.) with color-coded backgrounds
  - **Button**: "Exam Guide" with book icon, plus edit/delete icons, "Add Practice Exam" button
  - **Input**: Search field with icon
  - **Icons**: Phosphor Icons - Cloud (duotone) for providers, BookOpen for exam guide, ArrowSquareOut for external links
  
- **Customizations**:
  - Cards have clean white background with light gray border (oklch(0.90 0.005 240))
  - Provider icons (Cloud duotone) colored orange for AWS, blue for Azure
  - Provider names in matching colors next to icon at card top
  - Level badges in top-right corner with soft pastel backgrounds and dark text
  - Certification code displayed above title in small muted text
  - Three-column stats grid centered with uppercase labels: DURATION, QUESTIONS, PASS SCORE
  - Exam Guide button at bottom with book icon, external link icon button adjacent
  - Edit and delete icon buttons for admin controls
  - "Add Practice Exam" button with plus icon and optional count badge
  
- **States**:
  - Cards: Default (white with border), Hover (lifted with enhanced shadow)
  - Buttons: Default (outlined or ghost), Hover (background color change)
  - Stats: Always visible, using "-" for missing values
  
- **Icon Selection**:
  - **Cloud (duotone)**: AWS and Azure provider icons
  - **BookOpen**: Exam guide button
  - **ArrowSquareOut**: External link indicator
  - **Plus**: Add practice exam button
  - **PencilSimple**: Edit button
  - **Trash**: Delete button
  
- **Spacing**:
  - Card padding: p-6 (24px)
  - Grid gap: gap-6 (24px)
  - Container padding: px-4 py-8
  - Stats grid: gap-4 (16px) between columns, centered layout
  - Generous margins between card sections (mb-3, mb-5, mb-6)
  
- **Mobile**:
  - Grid: 1 column on mobile, 2 on tablet, 3 on desktop
  - Cards: Full width with maintained padding
  - All interactive elements maintain minimum 44px touch targets
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
