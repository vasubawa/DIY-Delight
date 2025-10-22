export function isValidCombination(selectedOptions) {
  if (selectedOptions.wheels === 'sport' && selectedOptions.interior !== 'sport') {
    return false;
  }
  return true;
}
