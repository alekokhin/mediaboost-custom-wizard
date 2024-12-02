/* eslint-disable sonarjs/no-clear-text-protocols */
import { request } from 'lib/request'

export const sendWizard = async (body: any) => {
  // eslint-disable-next-line no-console
  console.log(body)
  return request(
    'http://192.168.100.14:8080/api/wizard/checkout ',
  ).post<string>({
    body,
    type: 'file',
  })
}
