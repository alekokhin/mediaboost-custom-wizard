import { RequestType } from './create-request'

export const createRequestBody = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any> | undefined,
  type: RequestType,
): any => {
  if (!body) return

  if (type === 'json') return JSON.stringify(body)
  // eslint-disable-next-line no-console
  console.log(body)
  return body

  // const formData = new FormData()

  // for (const [key, value] of Object.entries(body)) {
  //   if (value) {
  //     if (Array.isArray(value) && value.length > 0) {
  //       for (const file of value) {
  //         formData.append(key, file)
  //       }
  //     } else {
  //       formData.append(key, value)
  //     }
  //   }
  // }

  // return formData
}
