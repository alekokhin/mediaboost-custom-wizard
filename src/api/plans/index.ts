import { TYPES } from 'constants/types'
import { request } from 'lib/request'

export const getPlans = () =>
  // eslint-disable-next-line sonarjs/no-clear-text-protocols
  request('http://192.168.100.14:8080/api/wizard/plans').get<Array<TYPES.Plan>>(
    {},
  )
