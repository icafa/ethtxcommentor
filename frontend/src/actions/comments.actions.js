export const actions = {
    COMMENTS: {
      GET: 'COMMENTS_GET',
      SUCCESS: 'COMMENTS_SUCCESS',
      FAILURE: 'COMMENTS_FAILURE',
      ADD: 'COMMENTS_ADD',
      ADD_SUCCESS: 'COMMENTS_ADD_SUCCESS',
      ADD_FAILURE: 'COMMENTS_ADD_FAILURE',
    }
  }
  
  export const getComments = (payload) => ({
    type: actions.COMMENTS.GET,
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

  export const addComment = (payload) => ({
    type: actions.COMMENTS.ADD,
    payload
  })

  export const addCommentSuccess = (payload) => ({
    type: actions.COMMENTS.ADD_SUCCESS,
    payload
  })
  
  export const addCommentFailure = (payload) => ({
    type: actions.COMMENTS.ADD_FAILURE,
    payload
  })