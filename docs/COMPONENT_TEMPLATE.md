
# Component Documentation Template

## JSDoc Standards

All components should follow this documentation pattern:

```typescript
/**
 * Brief description of what the component does
 * 
 * @param props - Component props interface
 * @param props.propName - Description of specific prop
 * @returns JSX.Element
 * 
 * @example
 * ```tsx
 * <ComponentName 
 *   propName="value"
 *   optionalProp={false}
 * />
 * ```
 * 
 * @since 1.0.0
 * @author Your Name
 */
```

## Hook Documentation Template

```typescript
/**
 * Custom hook description and purpose
 * 
 * @param param - Parameter description
 * @returns Object with hook return values
 * 
 * @example
 * ```tsx
 * const { value, setValue, isLoading } = useCustomHook(initialValue);
 * ```
 */
```

## Type Documentation Template

```typescript
/**
 * Interface or type description
 * 
 * @interface ComponentProps
 * @property {string} title - The component title
 * @property {boolean} [optional] - Optional property description
 */
```
