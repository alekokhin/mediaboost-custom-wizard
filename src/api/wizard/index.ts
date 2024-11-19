import { request } from 'lib/request'

export const sendWizard = async (body: any) => {
  // eslint-disable-next-line no-console
  console.log(body)
  // eslint-disable-next-line sonarjs/no-clear-text-protocols
  return request('http://192.168.100.14:8080/wizard/create').post({
    body,
    type: 'file',
  })
}
