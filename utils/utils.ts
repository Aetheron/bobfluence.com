import { redirect } from "next/navigation"

/**
 * Redirects to a specified path with an encoded message as a query parameter.
 * @param {('error' | 'success')} type - The type of message, either 'error' or 'success'.
 * @param {string} path - The path to redirect to.
 * @param {string} message - The message to be encoded and added as a query parameter.
 * @returns {never} This function doesn't return as it triggers a redirect.
 */
export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`)
}

export function parseFormData(formData: FormData) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parsedData: any = {}
  for (const [key, value] of formData.entries()) {
    const match = key.match(/^([^\[]+)\[(\d+)\]\[([\w-]+)\]$/) // Match keys like "field[index][key]"
    if (match) {
      const field = match[1]
      const index = parseInt(match[2], 10)
      const key = match[3]

      if (!parsedData[field]) {
        parsedData[field] = []
        parsedData[field][index] = {}
      } else if (!parsedData[field][index]) {
        parsedData[field][index] = {}
      }
      parsedData[field][index][kebabCaseToCamelCase(key)] = value
    } else {
      parsedData[kebabCaseToCamelCase(key)] = value // Handle non-indexed keys
    }
  }

  return parsedData
}

function kebabCaseToCamelCase(str: string) {
  return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
}

export function initialsToColors(firstName: string, lastName: string) {
  const firstInitialIndex = firstName.charAt(0).toLowerCase().charCodeAt(0) - 96
  const lastInitialIndex = lastName.charAt(0).toLowerCase().charCodeAt(0) - 96

  const firstInitialHex = Math.floor(firstInitialIndex * 157.5).toString(16)
  const lastInitialHex = Math.floor(lastInitialIndex * 157.5).toString(16)

  return `#${firstInitialHex}${lastInitialHex}`
}
