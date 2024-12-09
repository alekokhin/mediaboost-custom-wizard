import { TYPES } from 'constants/types'
import { request } from 'lib/request'

export const getPlans = () =>
  request(`${process.env.REACT_APP_API_URL}/plans`).get<Array<TYPES.Plan>>({})
