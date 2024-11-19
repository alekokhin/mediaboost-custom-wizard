export const getCountryOptions = (countries: Array<TYPES.country>) =>
  countries.map(country => ({
    label: country.name.common,
    flag: country.flags.png,
  }))
