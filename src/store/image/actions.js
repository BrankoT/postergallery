export function addImage ({ commit }, image) {
  commit('ADD_IMAGE', image)
}

export function setImage ({ commit }, image) {
  commit('SET_IMAGE', image)
}

export function setSelectedImage ({ commit }, image) {
  commit('SET_SELECTED_IMAGE', image)
}

export function deleteImage ({ commit }, imageId) {
  commit('DELETE_IMAGE', imageId)
}

export function toggleNewImageModal ({ commit }, isOpen) {
  commit('TOGGLE_NEW_IMAGE_MODAL', isOpen)
}

export function addPoster ({ commit }, poster) {
  commit('ADD_POSTER', poster)
}

export function updatePoster ({ commit }, poster) {
  commit('UPDATE_POSTER', poster)
}

export function setPoster ({ commit }, poster) {
  commit('SET_POSTER', poster)
}

export function deletePoster ({ commit }, posterId) {
  commit('DELETE_POSTER', posterId)
}

export function toggleEditPosterModal ({ commit }, isOpen) {
  commit('TOGGLE_EDIT_POSTER_MODAL', isOpen)
}
