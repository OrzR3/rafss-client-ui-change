const getters = {
  avatar: state => state.user.avatar,
  applyRole: state => state.user.applyRole,
  userInfo: state => state.user.userInfo,
  reviewStatus: state => state.user.reviewStatus,
  reserveTypeId: state => state.user.reserveTypeId,
}
export default getters

/* export const threads = state => state.threads

export const currentThread = state => {
  return state.currentThreadID
    ? state.threads[state.currentThreadID]
    : {}
}

export const currentMessages = state => {
  const thread = currentThread(state)
  return thread.messages
    ? thread.messages.map(id => state.messages[id])
    : []
}

export const unreadCount = ({ threads }) => {
  return Object.keys(threads).reduce((count, id) => {
    return threads[id].lastMessage.isRead ? count : count + 1
  }, 0)
}

export const sortedMessages = (state, getters) => {
  const messages = getters.currentMessages
  return messages.slice().sort((a, b) => a.timestamp - b.timestamp)
}
 */
