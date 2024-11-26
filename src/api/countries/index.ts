import { TYPES } from 'constants/types'
import { request } from 'lib/request'

export const getCountries = () =>
  request('https://restcountries.com/v3.1/all?fields=name,flags').get<
    Array<TYPES.country>
  >({})
