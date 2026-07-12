# Color Palette

The TransitOps UI follows a warm cream enterprise design system that provides a clean, professional, and modern appearance while ensuring excellent readability and accessibility.

| Purpose | Color | Hex Code |
|---------|--------|----------|
| Primary | Warm Brown | `#A67C52` |
| Primary Hover | Dark Brown | `#8E6844` |
| Secondary | Soft Beige | `#D6C3A5` |
| Background | Warm Cream | `#FAF7F2` |
| Surface / Cards | Soft White | `#FFFDF9` |
| Sidebar | Light Beige | `#F3EDE4` |
| Navbar | Off White | `#FFF8F0` |
| Primary Text | Dark Brown | `#3D3126` |
| Secondary Text | Medium Brown | `#6B5E52` |
| Borders | Light Cream | `#E5D9C8` |
| Success | Green | `#4CAF50` |
| Warning | Orange | `#F4A261` |
| Error | Red | `#D9534F` |
| Information | Blue | `#4F8EF7` |

## Design Guidelines

- Use **Warm Brown (`#A67C52`)** for primary buttons, active navigation items, and key actions.
- Use **Warm Cream (`#FAF7F2`)** as the main application background.
- Use **Soft White (`#FFFDF9`)** for cards, tables, and modal backgrounds.
- Use **Light Beige (`#F3EDE4`)** for the sidebar and **Off White (`#FFF8F0`)** for the navbar.
- Use **Dark Brown (`#3D3126`)** for headings and primary text to maintain high readability.
- Reserve **Green**, **Orange**, and **Red** for status indicators such as Available, Maintenance, and Error states.
- Maintain sufficient color contrast to meet accessibility guidelines (WCAG AA).

# Typography

The TransitOps interface uses a clean, modern, and highly readable typography system designed for enterprise SaaS applications. Typography is kept consistent across all screens to improve readability, accessibility, and visual hierarchy.

## Font Family

- **Primary Font:** Inter
- **Fallback:** Arial, Helvetica, sans-serif

## Font Weights

| Weight | Usage |
|--------|-------|
| 400 (Regular) | Body text, table content, form labels |
| 500 (Medium) | Buttons, navigation items, input fields |
| 600 (SemiBold) | Card titles, section headings |
| 700 (Bold) | Page titles, major headings |

## Font Sizes

| Element | Size | Weight |
|---------|------|--------|
| Page Title (H1) | 36px | Bold (700) |
| Section Heading (H2) | 30px | Bold (700) |
| Subheading (H3) | 24px | SemiBold (600) |
| Card Title | 20px | SemiBold (600) |
| Body Text | 16px | Regular (400) |
| Button Text | 16px | Medium (500) |
| Form Labels | 14px | Medium (500) |
| Table Content | 14px | Regular (400) |
| Helper Text | 12px | Regular (400) |

## Line Height

| Text Type | Line Height |
|-----------|-------------|
| Headings | 1.3 |
| Body Text | 1.5 |
| Small Text | 1.4 |

## Letter Spacing

- Headings: 0px
- Body Text: 0.2px
- Buttons: 0.3px

## Text Colors

| Usage | Color |
|--------|--------|
| Primary Text | `#3D3126` |
| Secondary Text | `#6B5E52` |
| Placeholder Text | `#9B8F83` |
| Disabled Text | `#B8AEA3` |
| Link Text | `#A67C52` |

## Typography Guidelines

- Use **Inter** consistently throughout the application.
- Maintain a clear visual hierarchy using font size and weight.
- Use bold text only for important headings and page titles.
- Keep body text at **16px** for optimal readability.
- Ensure sufficient contrast between text and background for accessibility.
- Use consistent spacing between headings, paragraphs, and UI elements.

# Spacing, Layout & Component Style

## Layout

The TransitOps interface follows a desktop-first enterprise SaaS layout designed for clarity, consistency, and ease of navigation.

### Application Layout

- Fixed left sidebar for primary navigation
- Fixed top navigation bar for global actions
- Scrollable main content area
- Responsive 12-column grid layout
- Consistent spacing between sections and components

### Page Structure

1. Top Navigation Bar
2. Left Sidebar Navigation
3. Page Header
4. Action Buttons & Filters
5. Main Content Area
6. Footer (if required)

---

# Spacing System

TransitOps follows an **8-point spacing system** to maintain consistency across all screens.

| Spacing | Usage |
|---------|-------|
| 4px | Small gaps between icons and text |
| 8px | Spacing between labels and inputs |
| 12px | Small padding inside cards and buttons |
| 16px | Standard padding for forms and cards |
| 24px | Space between sections |
| 32px | Space between major content blocks |
| 48px | Page-level spacing |
| 64px | Large section spacing |

---

# Margins & Padding

## Page Margin

- Left & Right: **32px**
- Top: **24px**
- Bottom: **32px**

## Card Padding

- 24px

## Form Padding

- 24px

## Table Padding

- Cell Padding: 16px
- Header Padding: 16px

---

# Component Style

## Cards

- Background: White (#FFFDF9)
- Border Radius: 12px
- Soft Shadow
- Padding: 24px

---

## Buttons

### Primary Button

- Background: #A67C52
- Text Color: White
- Border Radius: 10px
- Height: 44px

### Secondary Button

- White background
- Brown border
- Rounded corners
- Height: 44px

---

## Input Fields

- Height: 44px
- Border Radius: 10px
- Light border (#E5D9C8)
- Focus border uses primary color
- Consistent placeholder styling

---

## Dropdowns

- Same styling as input fields
- Rounded corners
- Consistent spacing
- Clear hover and focus states

---

## Tables

- Rounded table container
- Zebra-striped rows
- Row hover highlight
- Sticky table header
- Pagination at bottom
- Search and filter controls above table

---

## Status Badges

- Rounded pill design
- Medium font weight
- Small horizontal padding

Status Colors:

- Available – Green
- On Trip – Blue
- Maintenance – Orange
- Retired – Grey

---

## Sidebar

- Fixed position
- Width: 260px
- Light beige background (#F3EDE4)
- Active menu highlighted with primary color
- Icons aligned with text
- Consistent spacing between menu items

---

## Top Navigation Bar

- Height: 72px
- Contains logo, search, notifications, user profile
- Fixed at the top
- Light background (#FFF8F0)

---

## Icons

- Outline style
- Size: 20–24px
- Consistent icon library across the application

---

## Shadows

### Card Shadow

- Soft elevation for cards and panels

### Modal Shadow

- Slightly stronger shadow for focus and depth

---

## Border Radius

| Component | Radius |
|-----------|--------|
| Buttons | 10px |
| Input Fields | 10px |
| Cards | 12px |
| Tables | 12px |
| Modals | 16px |
| Badges | 999px (Pill) |

---

## Responsive Layout

### Desktop (Primary)

- Width: 1440px
- Sidebar visible
- Multi-column layout

### Tablet

- Sidebar collapses
- Grid adjusts to two columns

### Mobile

- Single-column layout
- Collapsible navigation
- Full-width components

---

## Design Principles

- Maintain consistent spacing using the 8-point grid system.
- Keep all components visually aligned.
- Reuse component styles across all pages.
- Use rounded corners and soft shadows consistently.
- Ensure sufficient whitespace for better readability.
- Follow a clean, modern enterprise SaaS design throughout the application.