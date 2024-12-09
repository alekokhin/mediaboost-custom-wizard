import { TYPES } from 'constants/types'
import { request } from 'lib/request'

export const getTemplates = () =>
  request(`${process.env.REACT_APP_SPW_TEMPLATE_URL}`).get<
    Array<TYPES.Template>
  >({})
