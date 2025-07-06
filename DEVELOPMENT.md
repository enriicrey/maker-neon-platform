
# Development Setup - Soy Maker 3D

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd soy-maker-3d
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Husky hooks**
   ```bash
   npm run prepare
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run lint` - Run ESLint with auto-fix
- `npm run lint:check` - Check linting without fixing
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without fixing
- `npm run type-check` - Run TypeScript type checking
- `npm run prepare` - Setup Husky hooks

## Code Standards

### Formatting
- 80 character line limit
- 2 spaces for indentation
- Single quotes for strings
- Trailing commas in ES5 contexts

### Linting Rules
- No unused variables (error)
- No explicit any (warning)  
- Exhaustive dependency arrays for hooks (error)
- Prefer const over let (error)
- Console logs discouraged (warning)

### TypeScript
- Strict mode enabled
- No unused locals or parameters
- Explicit return types required
- No fallthrough cases in switches

### File Organization
- Components in `/src/components`
- Pages in `/src/pages`
- Hooks in `/src/hooks`
- Utils in `/src/lib`
- Types in `/src/types`

### Naming Conventions
- Files: kebab-case (`my-component.tsx`)
- Components: PascalCase (`MyComponent`)
- Functions/variables: camelCase (`myFunction`)
- Constants: UPPER_SNAKE_CASE (`API_ENDPOINT`)

## Pre-commit Checks

Before each commit, the following checks run automatically:
1. ESLint auto-fix
2. Prettier formatting
3. TypeScript type checking

## VSCode Setup

Install recommended extensions:
- ESLint
- Prettier
- TypeScript Importer

Settings are automatically configured in `.vscode/settings.json`.

## Documentation Standards

All public functions and components must include:
- JSDoc comments
- Parameter descriptions  
- Return type documentation
- Usage examples
- Since version tags

## Git Workflow

1. Create feature branch from `develop`
2. Make changes following code standards
3. Pre-commit hooks will run automatically
4. Create pull request to `develop`
5. CI/CD pipeline will verify build
6. Merge after review approval
