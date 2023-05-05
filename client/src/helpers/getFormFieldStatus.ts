export const getFormFieldStatus = (invalid: boolean, isDirty: boolean) => {
  if (invalid) return 'error';
  if (isDirty && !invalid) return 'valid';
  return 'default';
};
