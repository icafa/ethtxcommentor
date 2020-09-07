export const actions = {
    TRANSACTIONS: {
      GET: 'TRANSACTIONS_GET',
      SUCCESS: 'TRANSACTIONS_SUCCESS',
      FAILURE: 'TRANSACTIONS_FAILURE',
    }
  }
  
  export const getTransactions = (payload) => ({
    type: actions.TRANSACTIONS.GET,
    payload
  })
  
  export const getTransactionsSuccess = (payload) => ({
    type: actions.TRANSACTIONS.SUCCESS,
    payload
  })
  
  export const getTransactionsFailure = (payload) => ({
    type: actions.TRANSACTIONS.FAILURE,
    payload
  })
