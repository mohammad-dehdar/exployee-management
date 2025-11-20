export const persianNum = (s: string | number): string => {
  return s
    .toString()
    .replace(/\d/g, (d) => ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'][parseInt(d)]);
};

export const separateNum = (number: number | string): string => {
  const spNum = number.toString().match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = spNum?.join(',') ?? ' ';
  return persianNum(joinedNumber);
};

export const englishNum = (text: string): string => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return text
    .split('')
    .map((char) => {
      const index = persianNumbers.indexOf(char);
      return index > -1 ? englishNumbers[index] : char;
    })
    .join('');
};

export const persianToEnglish = (str: string) => {
  const persianDigits: { [key: string]: string } = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
  };
  return str.replace(/[۰-۹]/g, (match) => persianDigits[match]).replace(/[^\d]/g, '');
};
