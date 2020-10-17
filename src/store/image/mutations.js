export function ADD_IMAGE (state, image) {
  state.images = [image, ...state.images]
}

export function SET_IMAGE (state, image) {
  state.image = image
}

export function SET_SELECTED_IMAGE (state, image) {
  state.selectedImage = image
}

export function DELETE_IMAGE (state, imageId) {
  state.images = state.images.filter(image => image.id !== imageId)
}

export function ADD_POSTER (state, poster) {
  state.posters = [poster, ...state.posters]
}

export function SET_POSTER (state, poster) {
  state.poster = poster
}

export function UPDATE_POSTER (state, editedPoster) {
  Object.assign(state.posters.find(poster => poster.id === editedPoster.id), editedPoster)
}

export function DELETE_POSTER (state, posterId) {
  state.posters = state.posters.filter(poster => poster.id !== posterId)
}

export function TOGGLE_NEW_IMAGE_MODAL (state, isOpen) {
  state.newImageModal = isOpen
}

export function TOGGLE_EDIT_POSTER_MODAL (state, isOpen) {
  state.editPosterModal = isOpen
}
