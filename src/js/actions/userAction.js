export function setStartGame (loading, authenticated, currentUser) {
  return {
    type: 'AUTENTICATED',
    payLoad: {
      loading,
      authenticated,
      currentUser
    }
  }
}
