import { TYPES } from 'constants/types'
import { request } from 'lib/request'

export const getCountries = () =>
  request(`${process.env.REACT_APP_COUNTRY_FLAGS}/all?fields=name,flags`).get<
    Array<TYPES.country>
  >({})
