const getWordEnding = (count: number, rules: string[]) => {
  const result = new Intl.PluralRules("ru-Ru").select(count);

  switch (result) {
    case "one":
      return `${count} ${rules[0]}`;
    case "few":
      return `${count} ${rules[1]}`;
    default:
      return `${count} ${rules[2]}`;
  }
};

export default getWordEnding;
