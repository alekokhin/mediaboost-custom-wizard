import { request } from 'lib/request'

export const sendWizard = async (body: any) => {
  return request(`${process.env.REACT_APP_API_URL}/checkout`).post<string>({
    body,
    type: 'file',
  })
}
