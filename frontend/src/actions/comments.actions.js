export const actions = {
    COMMENTS: {
      GET: 'COMMENTS_GET',
      ADD: 'COMMENTS_ADD',
      SUCCESS: 'COMMENTS_SUCCESS',
      FAILURE: 'COMMENTS_FAILURE'
    }
  }
  
  export const getComments = (payload) => ({
    type: actions.COMMENTS.GET,
    payload
  })

  export const addComments = (payload) => ({
    type: actions.COMMENTS.ADD,
    payload
  })
  
  export const getCommentsSuccess = (payload) => ({
    type: actions.COMMENTS.SUCCESS,
    payload
  })
  
  export const getCommentsFailure = (payload) => ({
    type: actions.COMMENTS.FAILURE,
    payload
  })
