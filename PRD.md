# Planning Guide

A web application that aggregates and displays cloud certification information for Microsoft and AWS, helping IT professionals discover certifications and their associated study materials.

**Experience Qualities**:
1. **Informative** - Users should quickly understand each certification's purpose, level, and how to prepare for it
2. **Organized** - Certifications should be clearly categorized and easily filterable to help users find relevant credentials
3. **Professional** - The interface should reflect the serious, career-focused nature of professional certifications

**Complexity Level**: Light Application (multiple features with basic state)
This is a content showcase app with filtering functionality and LLM-powered data generation. It features multiple views (grid layout), filtering controls, and persistent state, but doesn't require complex workflows or multi-page navigation.

## Essential Features

### Certification Data Generation
- **Functionality**: Uses Spark LLM API to generate comprehensive certification data for Microsoft and AWS
- **Purpose**: Provides users with up-to-date certification information without manual data entry
- **Trigger**: Automatically on initial app load if no cached data exists
- **Progression**: App loads → Check for cached certifications → If none, generate via LLM → Parse JSON response → Store in persistent state → Display in grid
- **Success criteria**: Certifications display with name, level, description, and study guide links

### Grid Display
- **Functionality**: Displays certification cards in a responsive grid layout
- **Purpose**: Allows users to scan multiple certifications at once and compare options
- **Trigger**: After data is loaded or filtering is applied
- **Progression**: Data ready → Map certifications to card components → Render in CSS grid → Animate on appearance
- **Success criteria**: Cards are visually distinct, readable, and adapt to screen sizes

### Provider Filtering & Enhanced Search
- **Functionality**: Filter certifications by provider (All, Microsoft, AWS) with integrated search by name, code, or tier
- **Purpose**: Helps users focus on certifications from their preferred cloud platform and find specific certifications quickly
- **Trigger**: User selects provider from dropdown and/or enters search term, then clicks search button or presses Enter key
- **Progression**: User selects provider → Enters search term (name, code like AZ-900, or tier) → Validates minimum 2 characters → Triggers search via button or Enter key → Updates filtered results → Shows toast notification
- **Success criteria**: Filtering is instant, provider dropdown is accessible, search validates input, Enter key and button both trigger search, visual feedback shows active search state

### Certification Details
- **Functionality**: Each card displays certification name, provider, level, description, and study guide link
- **Purpose**: Gives users all essential information to decide if a certification is right for them
- **Trigger**: Data loads into card components
- **Progression**: Certification data → Card receives props → Render badge for level → Display formatted description → Include external link to study materials
- **Success criteria**: All information is legible, links work, badges are color-coded

## Edge Case Handling

- **LLM Generation Failure**: Display error message with retry button if certification data fails to generate
- **Empty Filter Results**: Show "No certifications found" message when filter returns zero results
- **Missing Study Guide Links**: Display "Study guide coming soon" if a certification lacks a guide URL
- **Long Certification Names**: Truncate or wrap text appropriately to maintain card layout
- **Slow LLM Response**: Show loading skeleton cards while data is being generated
- **Invalid Search Terms**: Validate search input requires minimum 2 characters with inline error message
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
