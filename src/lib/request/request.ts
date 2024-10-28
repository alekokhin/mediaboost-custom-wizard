/**
 * The HTTP request function.
 *
 * @param method The HTTP method (e.g., 'GET', 'POST', etc.).
 * @returns A function that makes an HTTP request with the specified method.
 */
type Method = 'POST' | 'GET' | 'PUT' | 'PATCH' | 'DELETE'

export const request =
  (method: Method) =>
  async <T>(path: string, body?: Record<string, any>): Promise<T> => {
    const result = await fetch(path, {
      method,
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${''}`,
      },
      body: JSON.stringify(body),
    })

    // If request is successful, parse and return the response data
    if (result.ok) {
      const data = await result.json()
      return data as T
    } else {
      // If request fails
      // Parse the error response data
      const error = (await result.json()) as T
      // If response status is 417 (Expectation Failed), reload the page
      if (result.status == 417) {
        window.location.reload()
      }
      // Reject the promise with the error data
      return Promise.reject({
        ...error,
      }) as unknown as T
    }
  }

// Functions for making specific HTTP requests
export const get = request('GET')
export const post = request('POST')
export const put = request('PUT')
export const patch = request('PATCH')
export const del = request('DELETE')
