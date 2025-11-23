# FormField Component

A composite component that wraps form inputs with label, error messages, and helper text in a standardized way.

## Usage

```tsx
import { FormField } from '@/components/shared/form-field';
import { TextInput } from '@/components/ui/text-input';
import { useForm } from 'react-hook-form';

function MyForm() {
  const { register, formState: { errors } } = useForm();
  
  return (
    <FormField 
      label="Email Address" 
      error={errors.email?.message} 
      required
    >
      <TextInput 
        type="email"
        {...register('email')}
      />
    </FormField>
  );
}
```

## When to Use

- When you need custom error handling outside of TextInput's built-in validation
- When using custom input components that don't have built-in label/error support
- When you need consistent spacing and styling across form fields
- When working with react-hook-form and want to display field-level errors

## Props

| Prop | Type | Description |
|------|------|-------------|
| `label` | `string` | Label text (required) |
| `error` | `string` | Error message to display |
| `warning` | `string` | Warning message to display |
| `helperText` | `string` | Helper text to display |
| `required` | `boolean` | Show required indicator |
| `id` | `string` | HTML id (auto-generated if not provided) |
| `className` | `string` | Additional CSS classes |
| `labelProps` | `object` | Props for Label component (color, size) |
| `children` | `ReactNode` | The input component |

## Examples

### With Error
```tsx
<FormField 
  label="Password" 
  error="Password must be at least 8 characters"
  required
>
  <TextInput type="password" />
</FormField>
```

### With Warning
```tsx
<FormField 
  label="Email" 
  warning="Email verification pending"
>
  <TextInput type="email" />
</FormField>
```

### With Helper Text
```tsx
<FormField 
  label="Username" 
  helperText="Choose a unique username"
>
  <TextInput />
</FormField>
```

