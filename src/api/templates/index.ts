import { TYPES } from 'constants/types'
import { request } from 'lib/request'

export const getTemplates = () =>
  request('https://spw.propertyminder.com/home/layouts.do').get<
    Array<TYPES.Template>
  >({})
