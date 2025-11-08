# GitHub Repository Search App

A modern React application for searching and filtering GitHub repositories with backend-driven search, filtering, and sorting.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Testing

```bash
npm test              # Run tests once
npm run test:watch    # Run tests in watch mode
```

### Building

```bash
npm run build
```

### Code Quality

```bash
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
```

## Technical Decisions & Trade-offs

### 1. **TanStack Query (React Query) for Data Fetching**

- **Decision**: Use React Query instead of custom fetch hooks or Redux
- **Rationale**:
  - Built-in caching, background refetching, and optimistic updates
  - Reduces boilerplate for loading/error states
- **Trade-off**: Adds a dependency, but significantly simplifies data management

### 2. **Context API for Local State Management**

- **Decision**: Use React Context for search parameters instead of global state management
- **Rationale**:
  - Search state is scoped to a specific feature (RepoList)
  - Avoids over-engineering with Redux/Zustand for simple state
- **Trade-off**: Context re-renders can be a concern, but with proper memoization and small scope, performance is acceptable

### 3. **Suspense for Loading States**

- **Decision**: Use React Suspense with `useSuspenseInfiniteQuery` for initial loading
- **Rationale**:
  - Declarative loading states
  - Children components can be replaced without a need to change handling loading state
  - Can be easily extracted and reused in other blocks with minimal changes

### 4. **Tailwind CSS + DaisyUI for Styling**

- **Decision**: Utility-first CSS with DaisyUI component library
- **Rationale**:
  - Rapid development with consistent design system
  - Built-in dark mode support
  - Small bundle size
- **Trade-off**: Learning curve for utility classes, but improves consistency and maintainability

### 5. **Headless UI for Accessible Components**

- **Decision**: Use Headless UI instead of fully styled component libraries
- **Rationale**:
  - Full control over styling (Tailwind/DaisyUI)
  - Built-in accessibility (ARIA, keyboard navigation)
- **Trade-off**: More setup than pre-styled libraries, but better accessibility and customization

### 6. **Feature-Based Folder Structure**

- **Decision**: Organize by feature (`repos/`) rather than by type (`components/`, `hooks/`)
- **Rationale**:
  - Co-location of related code improves discoverability
  - Easier to understand feature boundaries
- **Trade-off**: A bit more complicated folder structure, but improves maintainability for feature teams in case of scaling

## Code Organization

1. **Feature Isolation**: Features should be self-contained with minimal cross-dependencies
2. **Shared Code**: Common components/hooks/utils/constants/types live in `common/` and require team review
3. **API Layer**: Centralize API calls in feature `quieries/` folder for consistency
4. **Refactor Large Files**: When files like `constants.ts` or `types.ts` become too large, refactor them into folders (e.g., `constants/` or `types/`) with files split by domain or feature

## Technical Scaling Considerations

1. **Bundle Splitting**: Use React.lazy() for feature-based code splitting
2. **State Management**: Consider Zustand or Redux Toolkit if Context becomes a bottleneck
3. **Component Library**: Extract shared components to a separate package if reused across projects, otherwise use `common/` folder
4. **API Layer**: Standardize API client with interceptors, error handling, retry logic
5. **Testing**: Maintain good coverage for most reused and frequently changed components and hooks, add E2E tests with Playwright for critical flows
6. **Bundle Size**: Monitor with `vite-bundle-visualizer`
7. **Performance**: Lighthouse CI for performance budgets

## Team Practices

### Feature Ownership

- Each engineer owns 1-2 features
- Features include: components, hooks, API layer, tests, types, documentation
- Clear boundaries reduce merge conflicts

### Communication & Coordination

- Weekly sync on shared code changes and architecture decisions
- Feature flags for large features to enable rapid pushes and parallel work
- Design system documentation for shared components
- Use Storybook to develop complex components in isolation and sharing existing components with product team

### Code Reviews

1. **Pull Request Requirements**:
   - All tests passing
   - No linting errors
   - Self-review completed
   - Description includes: what, why, and testing approach

2. **Code Review Checklist**:

- [ ] Tests added/updated
- [ ] No console errors/warnings
- [ ] Accessibility verified (keyboard navigation, screen reader)
- [ ] TypeScript types are correct
- [ ] No hardcoded values (use constants)
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Performance considerations (memoization, lazy loading)

## CI/CD Pipeline

### Continuous Integration (GitHub Actions / Similar)

1. **Quality Checks**:
   - Lint (ESLint) - runs on commit
   - Type check (TypeScript) - in IDE and on commit
   - Formatting (Prettier) - runs on commit
   - Unit tests (Vitest) - runs on push
   - Build verification - runs for PR

2. **E2E Tests**:
   - Use Playwright, runs on main branch in staging and pull requests in preview envs

3. **Production Build**:
   - Build production bundle, runs on main branch for staging and version tags

### Deployment Strategy

1. **Feature Branches**: Deploy preview environments for PRs
2. **Main Branch**: Auto-deploy to staging
3. **Production**: Manual approval required, deploy on version tags
4. **Rollback**: Quick rollback capability via deployment platform based on version tags

## Code Quality Assurance

### Code Quality Practices

1. **Small PRs**: Keep PRs focused and reviewable
2. **Meaningful Commits**: Clear commit messages following conventional commits
3. **Documentation**: JSDoc for complex functions, README updates for new features
4. **Refactoring**: Dedicate time for technical debt, don't let it accumulate
5. **Accessibility**: Regular accessibility audits, automated checks with eslint-plugin-jsx-a11y

### Knowledge Sharing

1. **Documentation**: Keep README and code comments up to date
2. **Tech Talks**: Monthly or bi-weekly sessions on new patterns, libraries, or learnings
3. **Pair Programming**: Encourage pairing on complex features
4. **Code Walkthroughs**: Share architecture decisions in team meetings

## Contributing

1. Create a feature branch from `main`
2. Make changes and ensure tests pass
3. Create a pull request with a clear description
4. Address review feedback
5. Merge after 1 approval and CI passes

## Notes on AI usage

### Infra and logic

Used for some micro tasks like:

- add eslint validation and run prettier in precommit hook
- prettier should auto-format staged files on commit
- [types.ts] create a type declaration of one item from endpoint [api.github.com/search/repositories?q=GitHub%20language%3Ajavascript]
- [queries.ts] use react-query to add a GET query to URL [api.github.com/search/repositories]
- useSuspenseInfiniteQuery instead of useSuspenseQuery and add load more button

Validated each micro task, adjusted and refactored.

### Persist important context

Generated context files in `.aicontext/` folder for quick agent setup, like:

- describe the application, only its components, layout and possible user interaction, basically the app functionality side. Put this description in markdown file in .aicontext folder. Don't mention specific select options, exact text of elements, how many items does it load, default search parameters
- save styling guidelines (libs used, styling requirements) to the separate markdown file in .aicontext folder

### Styling

1. Setted up a separate agent for styling and asked to first build the plan (see `STYLING_IMPLEMENTATION_PLAN.md`)

```
You are frontend engineer, expert in responsive styling, semantic HTML, tailwind CSS, Headless UI, DaisyUI, React and CSS modules.
You have application and guidelines described in .aicontext folder, load it to the memory.
Currently it has only functionality and initial skeleton markup and components that you need to style in responsive way.
Also you need to validate that right tags and attributes are used to make the app accessible as much as possible.
Also you need to add a toggle to switch between dark and light modes, which should affect the app appearence.
Don't do any modifications yet, lets first make a plan how to implement all that.
```

2. Validated the plan
3. Went over plan sections one by one (like "do the step X.Y of the plan"), validated and adjusted the result after each step
4. When agent context overflows - start a new agent, load to context files from `.aicontext/`

### Readme

Generated initial version of Readme.dm, validated, minimized and adjusted with my personal view, added missing items.
