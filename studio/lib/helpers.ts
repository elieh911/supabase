export const tryParseJson = (jsonString: any) => {
  try {
    let parsed = JSON.parse(jsonString)
    return parsed
  } catch (error) {
    return undefined
  }
}

export const minifyJSON = (prettifiedJSON: string) => {
  try {
    return JSON.stringify(JSON.parse(prettifiedJSON))
  } catch (err) {
    throw err
  }
}

export const prettifyJSON = (minifiedJSON: string) => {
  try {
    if (minifiedJSON && minifiedJSON.length > 0) {
      return JSON.stringify(JSON.parse(minifiedJSON), undefined, 2)
    } else {
      return minifiedJSON
    }
  } catch (err) {
    // dont need to throw error, just return text value
    // Users have to fix format if they want to save
    return minifiedJSON
  }
}

// https://stackoverflow.com/a/2117523
// a "good enough" unique ID that typescript is happy with, and doesn't have external dependencies
export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getURL = () => {
  const url =
    process?.env?.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ''
      ? process.env.VERCEL_URL
      : 'https://app.supabase.io'
  return url.includes('http') ? url : `https://${url}`
}

/**
 * Gnerates a random string using alpha characters
 */
export const makeRandomString = (length: number) => {
  var result = ''
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result.toString()
}

/**
 * Get a subset of fields from an object
 * @param {object} model
 * @param {array} fields a list of properties to pluck. eg: ['first_name', 'last_name']
 */
export const pluckObjectFields = (model: any, fields: any[]) => {
  let o: any = {}
  fields.forEach((field) => {
    o[field] = model[field]
  })
  return o
}

/**
 * Trims down a JSON Schema only to the fields that a user wants.
 * @param {object} jsonSchema
 * @param {array} fields a list of properties to pluck. eg: ['first_name', 'last_name']
 */
export const pluckJsonSchemaFields = (jsonSchema: any, fields: any) => {
  let schema: any = {
    type: 'object',
    required: [],
    properties: {},
  }
  fields.forEach((field: any) => {
    if (jsonSchema.properties[field]) {
      schema.properties[field] = jsonSchema.properties[field]
      if (jsonSchema.required.includes(field)) schema.required.push(field)
    }
  })
  return schema
}

/**
 * before return to frontend, we should filter sensitive project props
 */
export const filterSensitiveProjectProps = (project: any) => {
  project.db_user_supabase = undefined
  project.db_pass_supabase = undefined

  return project
}

/**
 * Returns undefine if the string isn't parse-able
 */
export const tryParseInt = (str: string) => {
  try {
    return parseInt(str, 10)
  } catch (error) {
    return undefined
  }
}

// Used as checker for memoised components
export const propsAreEqual = (prevProps: any, nextProps: any) => {
  try {
    Object.keys(prevProps).forEach((key) => {
      if (typeof prevProps[key] !== 'function') {
        if (prevProps[key] !== nextProps[key]) {
          throw new Error()
        }
      }
    })
    return true
  } catch (e) {
    return false
  }
}

export const formatBytes = (bytes: any, decimals = 2) => {
  if (bytes === 0) return '0 bytes'

  const k = 1000
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export const snakeToCamel = (str: string) =>
  str.replace(/([-_][a-z])/g, (group: string) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  )

export const copyToClipboard = (str: string, callback = () => {}) => {
  const focused = window.document.hasFocus()
  if (focused) {
    window.navigator?.clipboard?.writeText(str).then(callback)
  } else {
    console.warn('Unable to copy to clipboard')
  }
}
