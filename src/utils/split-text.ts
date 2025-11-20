export const splitTitle = (title: string) => {
  const match = title.match(/^([a-zA-Z0-9\s]*)([\u0600-\u06FF\s]*)$/);
  if (match) {
    return {
      en: match[1].trim(),
      fa: match[2].trim(),
    };
  }
  const englishParts = title.match(/[a-zA-Z0-9\s]+/g) || [];
  const persianParts = title.match(/[\u0600-\u06FF\s]+/g) || [];
  return {
    en: englishParts.join(' ').trim(),
    fa: persianParts.join(' ').trim(),
  };
};
