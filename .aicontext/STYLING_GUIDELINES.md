# Styling Guidelines

## Overview

This document outlines the styling guidelines, libraries, and requirements for the repository search application.

---

## Libraries & Dependencies

### Core Styling Libraries

1. **Tailwind CSS v4** (`tailwindcss@4.1.17`)
   - Primary CSS framework for utility-first styling
   - Dark mode support via `class` strategy
   - PostCSS integration via `@tailwindcss/postcss`

2. **Catalyst UI** (`@i4o/catalystui@0.9.3`)
   - Pre-styled React components built on Headless UI and Tailwind CSS
   - Provides default styling for common UI components
   - Components available:
     - `Button` - Styled button component with loading states
     - `Select` - Styled select component (different API from Headless UI Listbox)
   - **Note**: Catalyst UI requires React 18.x

3. **Headless UI** (`@headlessui/react@2.2.9`)
   - Unstyled, fully accessible UI components
   - Provides accessibility features (ARIA attributes, keyboard navigation)
   - Components used:
     - `Field` - Form field wrapper
     - `Label` - Accessible label component
     - `Listbox`, `ListboxButton`, `ListboxOptions`, `ListboxOption` - Accessible listbox components

4. **Heroicons** (`@heroicons/react@2.2.0`)
   - Icon library for React
   - Used for:
     - Theme toggle icons (sun/moon)
     - Loading spinner icons (`ArrowPathIcon`)
     - Other UI icons as needed

### Supporting Libraries

- **PostCSS** (`postcss@8.5.6`) - CSS processing
- **Autoprefixer** (`autoprefixer@10.4.21`) - Automatic vendor prefixing

---

## Styling Approach

### Primary Method: Tailwind CSS

- **Utility-first approach**: Use Tailwind utility classes for all styling
- **Mobile-first responsive design**: Start with mobile styles, add breakpoints for larger screens
- **Dark mode**: Use `dark:` prefix for dark mode styles
- **Customization**: Extend Tailwind theme in `tailwind.config.js` if needed

### Component Styling Strategy

1. **Catalyst UI Components** (when available):
   - Use Catalyst UI components for default styling
   - Customize with additional Tailwind classes as needed
   - Available components: `Button`, `Select`

2. **Headless UI Components** (when Catalyst UI doesn't provide):
   - Use Headless UI for accessibility and functionality
   - Apply Tailwind CSS classes for styling
   - Examples: `Listbox`, `Field`, `Label`

3. **Native HTML Elements**:
   - Style with Tailwind utility classes
   - Ensure proper semantic HTML structure
   - Add ARIA attributes for accessibility

4. **CSS Modules** (only when necessary):
   - Use sparingly for complex animations that don't fit Tailwind patterns
   - Prefer Tailwind utilities over CSS modules
   - Ensure no conflicts with Catalyst UI default styles

---

## Responsive Design

### Breakpoints

- **Mobile**: `< 640px` (default, no prefix)
- **Tablet**: `sm:` (640px and up)
- **Desktop**: `lg:` (1024px and up)

### Responsive Patterns

- **Mobile-first**: Base styles for mobile, add larger breakpoint styles
- **Grid layouts**: Use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` pattern
- **Spacing**: Use responsive spacing like `p-4 sm:p-6 lg:p-8`
- **Width**: Use `w-full sm:w-auto` for responsive width control

---

## Dark Mode

### Implementation

- **Strategy**: `class` strategy (add/remove `dark` class on document root)
- **Usage**: Use `dark:` prefix for dark mode styles
- **Example**: `bg-white dark:bg-gray-800`

### Color Palette

- **Light mode backgrounds**: `bg-white`, `bg-gray-50`
- **Dark mode backgrounds**: `dark:bg-gray-800`, `dark:bg-gray-900`
- **Light mode text**: `text-gray-900`
- **Dark mode text**: `dark:text-gray-100`
- **Borders**: `border-gray-200 dark:border-gray-700`

---

## Component-Specific Guidelines

### Buttons

- **Use Catalyst UI `Button`** component for consistent styling
- **Loading states**: Use `loading` and `loadingText` props
- **Icons**: Use Heroicons, position with Tailwind flex utilities
- **Sizing**: Use Tailwind classes like `w-full sm:w-auto` for responsive sizing

### Form Controls

- **Inputs**: Use native `<input>` with Tailwind classes (Catalyst UI doesn't provide Input component)
- **Selects/Listboxes**: Use Headless UI `Listbox` with Tailwind styling (Catalyst UI doesn't provide Listbox)
- **Labels**: Use Headless UI `Field` and `Label` components for proper association
- **Focus states**: Use Tailwind focus utilities like `focus:ring-2 focus:ring-blue-600`

### Cards

- **Semantic HTML**: Use `<article>` for repository cards
- **Styling**: Use Tailwind classes for shadows, borders, hover effects
- **Responsive**: Use grid layouts with responsive column counts
- **Dark mode**: Ensure all colors support dark mode

### Loading States

- **Spinner**: Use Heroicons `ArrowPathIcon` with `animate-spin` class
- **ARIA**: Use `role="status"` and `aria-live="polite"`
- **Styling**: Center with flexbox, use consistent spacing

### Error States

- **Semantic HTML**: Use `<section>` with `role="alert"`
- **ARIA**: Use `aria-live="assertive"` for error announcements
- **Button**: Use Catalyst UI `Button` for retry action

---

## Accessibility Requirements

### ARIA Attributes

- **Labels**: Always associate labels with form controls
- **Live regions**: Use `aria-live` for dynamic content updates
- **Roles**: Use semantic HTML and ARIA roles appropriately
- **Descriptive text**: Provide descriptive `aria-label` for icon-only buttons

### Keyboard Navigation

- **Focus indicators**: Ensure visible focus states in both light and dark modes
- **Tab order**: Maintain logical tab order throughout the application
- **Keyboard shortcuts**: Headless UI components handle keyboard navigation automatically

### Screen Reader Support

- **Semantic HTML**: Use proper HTML5 semantic elements
- **Heading hierarchy**: Maintain proper heading levels (h1, h2, etc.)
- **Descriptive text**: Provide context for all interactive elements
- **Form labels**: Always associate labels with form controls

---

## Code Style Guidelines

### Tailwind Class Organization

- Group related classes logically
- Break long className strings across multiple lines for readability
- Use template literals or string concatenation for long class lists

### Component Structure

- Import Catalyst UI components from `@i4o/catalystui`
- Import Headless UI components from `@headlessui/react`
- Import icons from `@heroicons/react/24/outline` or `@heroicons/react/24/solid`
- Use named exports (per coding preferences)

### Function Arguments

- Use argument destructuring for functions with more than 1 argument
- Follow coding preferences for function signatures

---

## Color Contrast

### Requirements

- **Normal text**: Minimum 4.5:1 contrast ratio (WCAG AA)
- **Large text**: Minimum 3:1 contrast ratio (WCAG AA)
- **Interactive elements**: Ensure sufficient contrast in both light and dark modes

### Testing

- Verify contrast ratios using browser DevTools Accessibility panel
- Test in both light and dark modes
- Customize Catalyst UI component colors with Tailwind classes if needed

---

## Animation & Transitions

### Tailwind Animations

- **Spinner**: Use `animate-spin` utility class
- **Transitions**: Use Tailwind transition utilities like `transition-colors`
- **Hover effects**: Use `hover:` prefix for hover states

### Custom Animations

- Prefer Tailwind utilities over custom CSS
- Use CSS modules only for complex animations that don't fit Tailwind patterns

---

## File Structure

### Configuration Files

- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration with Tailwind plugin
- `src/index.css` - Global styles with Tailwind directives

### Component Files

- Components use Tailwind utility classes directly in JSX
- No separate CSS files needed for most components
- CSS modules only when absolutely necessary

---

## Best Practices

1. **Consistency**: Use Catalyst UI components where available for consistent styling
2. **Accessibility First**: Always ensure proper semantic HTML and ARIA attributes
3. **Mobile First**: Design for mobile, then enhance for larger screens
4. **Dark Mode**: Always include dark mode styles for all components
5. **Performance**: Let Tailwind purge unused styles in production
6. **Maintainability**: Use Tailwind utilities over custom CSS when possible
7. **Documentation**: Keep this file updated as styling patterns evolve

---

## Version Information

- **Tailwind CSS**: 4.1.17
- **Catalyst UI**: 0.9.3
- **Headless UI**: 2.2.9
- **Heroicons**: 2.2.0
- **React**: 18.3.1 (required for Catalyst UI compatibility)

---

## Notes

- Catalyst UI doesn't provide all components (e.g., Input, Listbox, Card, Loading spinner)
- When Catalyst UI components are not available, use Headless UI with Tailwind styling
- Always verify that custom Tailwind classes work correctly with Catalyst UI components
- Test all components in both light and dark modes
- Ensure all interactive elements are keyboard accessible
