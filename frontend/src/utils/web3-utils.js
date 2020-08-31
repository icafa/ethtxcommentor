import range from 'lodash.range'
/**
 * Returns the injected provider, if there is one.
 * @returns {Object} Returns web3 object.
 */
export function getInjectedProvider() {
  if (window.ethereum) {
    return window.ethereum
  }
  if (window.web3 && window.web3.currentProvider) {
    return window.web3.currentProvider
  }
  return null
}

export function fetchBlocks(web3, startBlock, endBlock) {
  return new Promise((resolve, reject) => {
    let blockArray = []
    const blockBatch = new web3.eth.BatchRequest()
    const blockRange = range(startBlock, endBlock)
    blockRange.forEach(blockNumber =>
      blockBatch.add(
        web3.eth.getBlock.request(blockNumber, (err, newBlock) => {
          if (err) {
            reject(new Error('Could not fetch blocks'))
          }
          const newBlockArray = [...blockArray, newBlock]
          blockArray = newBlockArray
          if (blockArray.length === endBlock - startBlock) {
            resolve(blockArray)
          }
        })
      )
    )
    blockBatch.execute()
  })
}
