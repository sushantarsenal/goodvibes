/* Copyright (C) Go9, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Bryan Starbuck <bryan@go9.com>, October 2019
*/
import { API_ENDPOINT } from 'constants/url'
import axios from 'axios'

export default async function customFetch(
  endpoint,
  method,
  body,
  headers,
) {
  const metaHeaders = { ...headers, 'Content-Type': 'application/json' }
  try {
    const response = await axios({
      method,
      url    : `${API_ENDPOINT}/${endpoint}`,
      headers: headers['Content-Type'] ? headers : metaHeaders,
      params   : body,
      data: body
    })
    return [response.data, await response.headers]
  } catch (error) {
    return [error.response.data, await error.response.headers]
  }
}
