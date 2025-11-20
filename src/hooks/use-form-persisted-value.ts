import { useEffect, useRef } from 'react';
import type { UseFormReset } from 'react-hook-form';

type FormObject = Record<string, any>;
type Transformers<T extends FormObject> = {
  [key in keyof T]: (value: T[key]) => any;
};
type Options<T extends FormObject> = {
  transformers?: Partial<Transformers<T>>;
  defaults?: Partial<T>;
};

export const useFormPersistedValue = <T extends FormObject>(
  formObject: T,
  hasHydrated: boolean,
  reset: UseFormReset<T>,
  options?: Options<T>,
) => {
  const { transformers, defaults } = options || {};
  const isReset = useRef(false);

  useEffect(() => {
    if (hasHydrated && !isReset.current) {
      const hydratedFormObject = {} as T;
      Object.keys(formObject).forEach((key) => {
        if (defaults?.[key]) {
          // we are prioritizing the persisted value over the default value
          const value = formObject[key] || defaults[key];
          const finalValue = transformers?.[key] ? transformers[key](value) : value;
          hydratedFormObject[key as keyof T] = finalValue;
        } else {
          hydratedFormObject[key as keyof T] = transformers?.[key]
            ? transformers[key](formObject[key])
            : formObject[key];
        }
      });
      reset(hydratedFormObject);
      isReset.current = true;
    }
  }, [hasHydrated, reset, formObject, transformers, defaults]);
};
