# Implementation Plan: Responsive Styling & Dark/Light Mode

## Overview

This plan outlines the implementation of responsive styling using Tailwind CSS, Headless UI components with Catalyst UI for default styling, semantic HTML improvements, accessibility enhancements, and dark/light mode toggle functionality. The connected internal browser will be used to validate changes throughout the implementation process.

---

## Phase 1: Setup & Dependencies

### 1.1 Install Dependencies

- Install `tailwindcss`, `postcss`, `autoprefixer` as dev dependencies
- Install `@headlessui/react` for accessible UI components (required by Catalyst UI)
- Install `@heroicons/react` for icons (sun/moon for theme toggle)
- Install `@i4o/catalystui` for default styling of Headless UI components (provides pre-styled components built on Headless UI and Tailwind CSS)
- **Note**: Catalyst UI requires React 18.x, so ensure React and react-dom are at version 18.3.1 or compatible
- **Note**: Catalyst UI provides styled versions of Headless UI components (Button, Listbox, Input, etc.) with default Tailwind CSS styling

### 1.2 Configure Tailwind CSS

- Create `tailwind.config.js` with:
  - Dark mode: `'class'` strategy
  - Content paths for scanning all component files (including Catalyst UI components from `node_modules/@i4o/catalystui`)
  - Custom theme extensions if needed
- Create `postcss.config.js` with Tailwind and Autoprefixer plugins
- Update `src/index.css`:
  - Remove existing styles
  - Add Tailwind directives (`@import "tailwindcss"` for Tailwind v4, or `@tailwind base`, `@tailwind components`, `@tailwind utilities` for v3)
  - Add base styles for dark mode support
  - **Note**: Catalyst UI components use Tailwind CSS classes and will automatically work with your Tailwind configuration

### 1.3 Browser Validation

- Start dev server and verify Tailwind is working
- Check browser console for any errors
- Verify base styles are applied
- Verify Catalyst UI components can be imported (test import in a component)
- Check that Tailwind CSS is processing Catalyst UI component classes correctly

---

## Phase 2: Semantic HTML & Accessibility Improvements

### 2.1 RepoList.tsx

- Replace generic `<div>` wrapper with semantic `<main>` element
- Add proper ARIA landmarks (`role="main"` is implicit with `<main>`)
- Add proper structure for screen readers

### 2.2 RepoListControls.tsx

- Wrap controls in `<section>` or `<form>` element with proper semantics
- Add `<fieldset>` and `<legend>` for grouped form controls
- Ensure proper label associations for all form elements
- Add ARIA attributes where needed (`aria-label`, `aria-describedby`)
- **Note**: Labels of controls can be changed according to best UX practices to improve clarity and user experience

### 2.3 TextSearchControl.tsx

- Use Catalyst UI `Input` component (from `@i4o/catalystui`) for default styling, or use native input with proper label association
- If using Catalyst UI `Input`:
  - Import `Input` from `@i4o/catalystui`
  - Use `Field` and `Label` components from Headless UI for proper label association
  - Catalyst UI Input provides default styling with Tailwind CSS classes
- If using native input:
  - Add proper `<label>` element (nested or with `htmlFor` matching input `id`)
  - Ensure input has proper `id` attribute
  - Add ARIA attributes if needed (`aria-label`, `aria-describedby`)
- Ensure input is properly associated with label for screen readers
- **Note**: Label text can be optimized according to best UX practices for better clarity

### 2.4 SelectControl.tsx

- Replace native `<select>` with Catalyst UI `Listbox` components (from `@i4o/catalystui`)
- Import Catalyst UI Listbox components: `Listbox`, `ListboxButton`, `ListboxOption`, `ListboxOptions` from `@i4o/catalystui`
- Import Headless UI `Field` and `Label` components from `@headlessui/react` for proper label association
- Structure:
  - Wrap in `Field` component from Headless UI
  - Use `Label` component from Headless UI for the label text
  - Use Catalyst UI `Listbox` with `ListboxButton`, `ListboxOptions`, and `ListboxOption` components
- Catalyst UI Listbox provides:
  - Default Tailwind CSS styling for button trigger and dropdown menu
  - Proper accessibility attributes (handled by underlying Headless UI)
  - Keyboard navigation support (handled by Headless UI)
  - Dark mode support (via Tailwind dark mode classes)
  - Smooth transitions and animations
- Maintain proper form semantics with `name` attribute on Listbox component
- Customize styling with additional Tailwind classes where needed
- **Note**: Label text can be optimized according to best UX practices for better clarity

### 2.5 RepoItems.tsx

- Use semantic `<article>` element for each repository card
- Use proper heading hierarchy (`<h2>` for repository name)
- Add proper link semantics with descriptive text
- Use `<dl>`, `<dt>`, `<dd>` for structured data display (ID, Language, Stars)
- Add `aria-label` for external links indicating they open in new tab
- Ensure proper semantic structure for repository information

### 2.6 LoadMoreButton.tsx

- Use Catalyst UI `Button` component (from `@i4o/catalystui`) for default styling
- Import `Button` from `@i4o/catalystui`
- Catalyst UI Button provides:
  - Default Tailwind CSS styling with proper padding, borders, and colors
  - Built-in disabled state styling
  - Dark mode support
  - Focus states and hover effects
- Add loading state with spinner icon (from Heroicons) and proper ARIA attributes
- Add `aria-busy` and `aria-live` for loading state announcements
- Ensure proper disabled state handling (Catalyst UI Button handles this, but verify ARIA attributes)
- Customize with additional Tailwind classes for sizing, spacing, or layout as needed

### 2.7 ErrorFallback.tsx

- Use semantic `<section>` or `<article>` element
- Add proper heading (`<h1>` or `<h2>`) for error message
- Use Catalyst UI `Button` component (from `@i4o/catalystui`) for retry button
- Import `Button` from `@i4o/catalystui`
- Catalyst UI Button provides default styling that matches other buttons in the app
- Add `role="alert"` or `aria-live="assertive"` for error announcements
- Ensure error message is properly announced to screen readers
- Customize button appearance with Tailwind classes if needed (e.g., variant styles)

### 2.8 LoadingPlaceholder.tsx

- Add proper loading indicator with spinner animation
- Use Tailwind CSS animations or CSS for spinner (Catalyst UI doesn't provide a loading spinner component)
- Consider using Heroicons spinner icon or create custom spinner with Tailwind
- Add `aria-live="polite"` for screen reader announcements
- Use semantic structure for loading state
- Add descriptive text for screen readers
- Style with Tailwind CSS classes for consistent appearance with rest of app

### 2.9 Browser Validation

- Test with browser accessibility tools (DevTools Accessibility panel)
- Verify semantic HTML structure in browser Elements panel
- Test keyboard navigation through all interactive elements
- Verify screen reader compatibility (if available)
- Verify Catalyst UI components render correctly with default styling
- Check that all Catalyst UI components have proper ARIA attributes (should be handled automatically)
- Test that Catalyst UI Button, Listbox, and Input components are accessible

---

## Phase 3: Dark/Light Mode Infrastructure

### Overview

**Important Note:** Neither Catalyst UI nor Headless UI provide built-in theme management components or infrastructure. Both libraries are designed to work with Tailwind CSS's dark mode feature, which uses the `dark:` variant and requires the `dark` class to be applied to a root element (typically `<html>` or `<body>`).

- **Catalyst UI:** Provides styled components built on Headless UI and Tailwind CSS, but does not include theme management infrastructure
- **Headless UI:** Provides unstyled, accessible components without theme management capabilities
- **Implementation Approach:** Custom React Context-based solution that works with Tailwind CSS's `class` strategy (already configured in `tailwind.config.js`)

**Alternative Libraries (Optional):**

- `next-themes` is a popular library that provides a ready-made theme provider for React applications using Tailwind CSS, but it's not required for this implementation
- A custom implementation gives full control and avoids additional dependencies

### 3.1 Theme Provider Setup

- Create `src/theme/ThemeProvider.tsx`:
  - React Context for theme state management
  - `useState` for current theme ('light' | 'dark')
  - `useEffect` to read from localStorage on mount
  - `useEffect` to apply/remove `dark` class on document root (`<html>` or `<body>`)
  - Persist theme preference to localStorage
  - System preference detection on initial load (optional, using `window.matchMedia('(prefers-color-scheme: dark)')`)
  - **Important:** Apply `dark` class to `<html>` element (not just a container) so that Headless UI components rendered outside the main DOM (like modals/dialogs) also receive dark mode styles
  - Handle SSR-safe implementation (check for `window`/`document` availability)

### 3.2 Theme Toggle Component

- Create `src/theme/ThemeToggle.tsx`:
  - Use Catalyst UI `Button` component (from `@i4o/catalystui`) for consistent styling
  - Toggle button with sun/moon icons from Heroicons (`SunIcon` for light mode, `MoonIcon` for dark mode)
  - Accessible with proper ARIA labels (`aria-label` for screen readers, e.g., "Toggle dark mode")
  - Smooth transitions between states (can use Tailwind transition classes like `transition-colors`)
  - Positioned appropriately (header or controls area)
  - Customize button appearance with Tailwind classes (e.g., icon-only button style)
  - Show appropriate icon based on current theme state
  - Use `useTheme` hook to access theme context

### 3.3 Theme Hook

- Create `src/theme/useTheme.ts`:
  - Custom hook to access theme context
  - Returns `{ theme, toggleTheme, setTheme }`
  - Throws error if used outside ThemeProvider context
  - Provides type safety for theme values ('light' | 'dark')

### 3.4 Integrate Theme Provider

- Wrap `App.tsx` with `ThemeProvider`:
  - Place `ThemeProvider` as the outermost wrapper (or inside QueryClientProvider if needed)
  - Ensure it wraps all components that need theme access
- Add `ThemeToggle` component to `PageLayout.tsx`:
  - The `PageLayout` component wraps the main content and includes the `ThemeToggle`
  - ThemeToggle is positioned with fixed positioning in the top-right corner
  - Ensure it's accessible and visible at all breakpoints

### 3.5 Browser Validation

- Test theme toggle functionality:
  - Click toggle button and verify theme changes
  - Check that all components update correctly (including Catalyst UI components)
- Verify `dark` class is applied/removed from root element:
  - Inspect `<html>` element in DevTools
  - Verify class is present in dark mode, absent in light mode
- Check localStorage persistence:
  - Toggle theme, refresh page, verify theme persists
  - Check `localStorage.getItem('theme')` in DevTools
- Test theme persistence across page refreshes:
  - Set theme, refresh, verify it's maintained
- Verify smooth transitions:
  - Check that color changes are smooth (not jarring)
  - Verify no flash of incorrect theme on page load
- Test with Headless UI components:
  - Open dropdowns/modals and verify they respect dark mode
  - Check that components rendered outside main DOM tree (if any) receive dark mode styles

---

## Phase 4: Responsive Styling with Tailwind CSS

### 4.1 Layout Structure

- Update `PageLayout.tsx`:
  - Ensure ThemeToggle is properly positioned with responsive spacing
  - Fixed positioning for theme toggle (`fixed top-4 right-4`)
  - Responsive spacing adjustments if needed (`top-2 right-2 sm:top-4 sm:right-4`)
  - Ensure z-index is appropriate (`z-50`) to keep toggle above other content
  - Verify theme toggle is accessible and visible at all breakpoints

- Update `RepoList.tsx`:
  - Container with max-width, centered, responsive padding
  - Mobile-first approach with proper spacing
  - Responsive padding: `p-4 sm:p-6 lg:p-8`
  - Ensure content doesn't overlap with fixed theme toggle (add top padding if needed)

### 4.2 RepoListControls Section

- Mobile: Stack controls vertically with full width
- Tablet: 2-column grid for controls (`grid-cols-1 sm:grid-cols-2`)
- Desktop: Horizontal flex layout with proper spacing (`lg:flex-row`)
- Responsive spacing and gaps (`gap-4 sm:gap-6`)
- Styled form controls with consistent sizing
- Proper spacing between control groups

### 4.3 TextSearchControl

- Use Catalyst UI `Input` component (from `@i4o/catalystui`) for default styling
- Import `Input` from `@i4o/catalystui`
- Catalyst UI Input provides:
  - Default Tailwind CSS styling with proper padding, borders, and colors
  - Built-in focus states
  - Dark mode support
  - Consistent sizing
- Apply responsive classes:
  - Full-width input on mobile (`w-full`)
  - Additional Tailwind classes for spacing and layout as needed
- Customize focus ring colors with Tailwind classes if needed (Catalyst UI provides default focus styling)
- Ensure proper label styling and spacing (using Headless UI `Field` and `Label` components)

### 4.4 SelectControl (Headless UI Listbox with Catalyst UI)

- Use Catalyst UI `Listbox` components for default styling
- Styled button trigger with consistent sizing (provided by Catalyst UI)
- Dropdown menu with proper positioning (handled by Catalyst UI)
- Mobile-friendly touch targets (min-height: 44px)
- Dark mode styling for both button and dropdown (provided by Catalyst UI)
- Proper z-index for dropdown overlay (handled by Catalyst UI)
- Smooth transitions and animations (provided by Catalyst UI)
- Customize styling with Tailwind classes where needed

### 4.5 Reset Button

- Use Catalyst UI `Button` component (from `@i4o/catalystui`) for consistent default styling
- Import `Button` from `@i4o/catalystui`
- Catalyst UI Button provides:
  - Consistent styling with other buttons in the app
  - Built-in hover and focus states
  - Dark mode support
  - Proper padding and sizing
- Apply Tailwind classes for:
  - Proper spacing and alignment
  - Icon positioning if using icons from Heroicons
- Customize with additional Tailwind classes for layout (e.g., full-width on mobile)

### 4.6 Repository Cards (RepoItems)

- Use semantic HTML with Tailwind CSS for styling (Catalyst UI doesn't provide a Card component)
- Mobile: Full-width cards with padding
- Tablet/Desktop: Grid layout:
  - Mobile: 1 column (`grid-cols-1`)
  - Tablet: 2 columns (`sm:grid-cols-2`)
  - Desktop: 3 columns (`lg:grid-cols-3`)
- Card styling with Tailwind classes:
  - Shadow (`shadow-md` or `shadow-lg`)
  - Border (`border border-gray-200 dark:border-gray-700`)
  - Hover effects (`hover:shadow-xl hover:scale-[1.02]`)
  - Rounded corners (`rounded-lg`)
  - Background colors with dark mode support (`bg-white dark:bg-gray-800`)
- Proper spacing between elements (`p-4 sm:p-6`)
- Typography hierarchy with Tailwind classes:
  - Repository name: larger, bold (`text-xl font-bold`)
  - Description: medium (`text-base`)
  - Metadata: smaller (`text-sm`)
- Dark mode colors for all text and backgrounds (using Tailwind dark mode classes)
- Proper link styling with hover states (using Tailwind classes)

### 4.7 LoadMoreButton

- Use Catalyst UI `Button` component (from `@i4o/catalystui`) for default styling
- Import `Button` from `@i4o/catalystui`
- Apply Tailwind classes for layout:
  - Centered with proper spacing (`mx-auto my-8`)
  - Full-width on mobile, auto-width on desktop (`w-full sm:w-auto`)
- Add loading spinner animation (using Heroicons spinner icon or custom spinner)
- Disabled state styling (provided by Catalyst UI, customize with additional Tailwind classes if needed)
- Proper padding and sizing (provided by Catalyst UI, can be customized with Tailwind classes)
- Dark mode compatible (provided by Catalyst UI)
- Show loading state with spinner icon and disable button during loading

### 4.8 ErrorFallback

- Use Tailwind CSS for container styling (Catalyst UI doesn't provide error/alert components)
- Centered error message container (using Tailwind flex/grid utilities)
- Proper spacing and typography (using Tailwind classes)
- Use Catalyst UI `Button` component (from `@i4o/catalystui`) for retry button
- Import `Button` from `@i4o/catalystui`
- Catalyst UI Button provides consistent design with other buttons
- Dark mode compatible colors (provided by Catalyst UI Button, use Tailwind classes for container)
- Proper visual hierarchy (using Tailwind typography and spacing classes)

### 4.9 LoadingPlaceholder

- Use Tailwind CSS for styling (Catalyst UI doesn't provide a loading component)
- Centered loading indicator (using Tailwind flex utilities)
- Spinner animation (using Tailwind animations or CSS, consider using Heroicons spinner icon)
- Proper spacing (using Tailwind spacing classes)
- Dark mode compatible (using Tailwind dark mode classes for text/background colors)
- Accessible loading announcement (using `aria-live` and descriptive text)
- Style consistently with rest of app using Tailwind utility classes

### 4.10 Browser Validation

- Test responsive behavior at different breakpoints:
  - Mobile (< 640px)
  - Tablet (640px - 1024px)
  - Desktop (> 1024px)
- Verify all components adapt properly (including Catalyst UI components)
- Check spacing and alignment at all breakpoints
- Test dark mode appearance (verify Catalyst UI components support dark mode correctly)
- Verify hover and focus states (Catalyst UI components should have built-in focus states)
- Check animations and transitions (Catalyst UI components include transitions)
- Verify Catalyst UI Button, Input, and Listbox components render correctly at all breakpoints
- Test that custom Tailwind classes work correctly with Catalyst UI components

---

## Phase 5: CSS Modules (Where Needed)

### 5.1 Component-Specific Styles

- Use CSS modules for complex animations that don't fit Tailwind patterns
- Custom styles for specific component needs
- Keep Tailwind as primary styling method
- Only use CSS modules when absolutely necessary
- **Note**: Catalyst UI components use Tailwind CSS classes internally, so prefer Tailwind utilities over CSS modules when possible
- If custom CSS is needed, ensure it doesn't conflict with Catalyst UI's default styles

### 5.2 Browser Validation

- Verify CSS modules work correctly
- Check for style conflicts
- Ensure proper scoping

---

## Phase 6: Accessibility Enhancements

### 6.1 Keyboard Navigation

- Ensure all interactive elements are keyboard accessible
- Proper tab order throughout the application
- Focus indicators visible in both light and dark modes (Catalyst UI components provide built-in focus indicators)
- Skip links if needed for main content
- Escape key handling for modals/dropdowns (handled by Headless UI, which Catalyst UI components are built on)
- Verify Catalyst UI Button, Input, and Listbox components are fully keyboard accessible
- Test that custom interactive elements maintain proper keyboard navigation

### 6.2 Screen Reader Support

- Proper ARIA labels and descriptions throughout
- Live regions for dynamic content updates
- Semantic HTML structure (from Phase 2)
- Proper heading hierarchy
- Form labels properly associated (using Headless UI `Field` and `Label` with Catalyst UI components)
- **Note**: Catalyst UI components built on Headless UI provide proper ARIA attributes automatically
- Verify that Catalyst UI Button, Input, and Listbox components announce correctly to screen readers
- Test with screen reader to ensure all Catalyst UI components are accessible

### 6.3 Color Contrast

- Verify all text meets WCAG AA standards (4.5:1 for normal text, 3:1 for large text)
- Test in both light and dark modes
- Ensure interactive elements have sufficient contrast
- Test with browser accessibility tools
- **Note**: Catalyst UI components use Tailwind CSS color palette which should meet contrast requirements, but verify:
  - Button text and backgrounds
  - Input borders and text
  - Listbox button and option text
- Customize Catalyst UI component colors with Tailwind classes if contrast needs improvement

### 6.4 Browser Validation

- Use browser DevTools Accessibility panel
- Test with keyboard only (Tab, Enter, Space, Arrow keys)
- Verify focus indicators are visible
- Check color contrast ratios
- Test with screen reader if available
- Verify ARIA attributes are correct

---

## Phase 7: Final Polish & Testing

### 7.1 Cross-Browser Testing

- Test in Chrome/Edge
- Test in Firefox
- Test in Safari
- Verify consistent appearance and behavior

### 7.2 Responsive Testing

- Test on various screen sizes
- Test on mobile devices (if possible)
- Verify touch targets are adequate (min 44x44px)
- Check scrolling behavior

### 7.3 Dark/Light Mode Testing

- Verify all components look good in both modes
- Test theme persistence
- Verify smooth transitions
- Check for any hardcoded colors
- **Note**: Catalyst UI components support dark mode via Tailwind's dark mode classes
- Verify Catalyst UI Button, Input, and Listbox components switch correctly between light and dark modes
- Test that all custom Tailwind classes used with Catalyst UI components support dark mode
- Ensure no hardcoded colors conflict with dark mode

### 7.4 Performance Check

- Verify Tailwind CSS is properly purged (unused styles removed)
- Check bundle size
- Verify animations are smooth
- Check for any layout shifts

### 7.5 Browser Validation

- Final comprehensive testing in browser
- Verify all functionality works correctly
- Check for console errors
- Verify accessibility compliance
- Test user flows end-to-end

---

## Implementation Order

1. **Phase 1**: Install dependencies and configure Tailwind
2. **Phase 3**: Set up dark/light mode infrastructure (needed for styling)
3. **Phase 2**: Update semantic HTML structure (foundation for styling)
4. **Phase 4**: Apply Tailwind styling (mobile-first approach)
5. **Phase 5**: Add CSS modules if needed
6. **Phase 6**: Enhance accessibility
7. **Phase 7**: Final polish and testing

---

## Files to Create/Modify

### New Files:

- `tailwind.config.js`
- `postcss.config.js`
- `src/theme/ThemeProvider.tsx` (custom React Context provider for theme management)
- `src/theme/ThemeToggle.tsx` (toggle button component using Catalyst UI Button)
- `src/theme/useTheme.ts` (custom hook to access theme context)

### Modified Files:

- `package.json` (add dependencies including `@i4o/catalystui`)
- `src/index.css` (Tailwind directives + base styles)
- `src/App.tsx` (wrap with ThemeProvider and PageLayout)
- `src/common/components/PageLayout.tsx` (responsive styling for layout wrapper and ThemeToggle positioning)
- `src/repos/RepoList.tsx` (semantic HTML + Tailwind styling)
- `src/repos/RepoList/RepoListControls.tsx` (semantic HTML + Tailwind styling)
- `src/repos/RepoList/RepoListControls/TextSearchControl.tsx` (Catalyst UI Input or Headless UI + Tailwind styling)
- `src/repos/RepoList/RepoListControls/SelectControl.tsx` (Catalyst UI Listbox + Tailwind styling)
- `src/repos/RepoList/RepoItems.tsx` (semantic HTML + Tailwind styling)
- `src/repos/RepoList/LoadMoreButton.tsx` (Catalyst UI Button + Tailwind styling)
- `src/common/components/ErrorFallback.tsx` (Catalyst UI Button + Tailwind styling)
- `src/common/components/LoadingPlaceholder.tsx` (Tailwind styling + spinner)

---

## Browser Validation Strategy

Throughout the implementation, use the connected internal browser to:

1. **Visual Validation**: Check appearance at each step
2. **Responsive Testing**: Resize browser window to test breakpoints
3. **Interactive Testing**: Click, type, and interact with all controls
4. **Dark Mode Testing**: Toggle theme and verify all components
5. **Accessibility Testing**: Use DevTools Accessibility panel
6. **Console Monitoring**: Check for errors or warnings
7. **Performance**: Monitor network requests and rendering
8. **User Flow Testing**: Complete full user journeys

---

## Success Criteria

- ✅ All components are fully responsive (mobile, tablet, desktop)
- ✅ Dark/light mode toggle works and persists
- ✅ All components use semantic HTML
- ✅ Accessibility standards are met (WCAG AA minimum)
- ✅ Headless UI components are properly integrated with Catalyst UI for default styling
- ✅ Catalyst UI Button, Input, and Listbox components are used consistently throughout
- ✅ All Catalyst UI components support dark mode correctly
- ✅ Tailwind CSS is used consistently
- ✅ No console errors or warnings
- ✅ Smooth animations and transitions
- ✅ Proper focus indicators in both themes
- ✅ All interactive elements are keyboard accessible
