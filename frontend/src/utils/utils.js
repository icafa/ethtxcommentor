/**
 * Grid 8px constant used by the Aragon Team.
 */
export const GU = 8

/**
 * Converts a Wei value to ether.
 * @param {number} wei Value in wei.
 * @returns {number} wei converted to ether.
 */
export const toEther = wei => wei / 1000000000000000000

/**
 * Shorten an Ethereum address. `charsLength` allows to change the number of
 * characters on both sides of the ellipsis.
 * May or may not be taken from aragon/aragon-ui repo. :)
 *
 * Examples:
 *   shortenAddress('0x19731977931271')    // 0x1973…1271
 *   shortenAddress('0x19731977931271', 2) // 0x19…71
 *   shortenAddress('0x197319')            // 0x197319 (already short enough)
 *
 * @param {string} address The address to shorten
 * @param {number} [charsLength=4] The number of characters to change on both sides of the ellipsis
 * @returns {string} The shortened address
 */
export function shortenAddress(address, charsLength = 4) {
  const prefixLength = 2 // "0x"
  if (!address) {
    return ''
  }
  if (address.length < charsLength * 2 + prefixLength) {
    return address
  }
  return `${address.slice(0, charsLength + prefixLength)}…${address.slice(
    -charsLength
  )}`
}
