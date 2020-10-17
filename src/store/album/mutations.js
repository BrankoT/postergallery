export function ADD_ALBUM (state, album) {
  state.albums = [album, ...state.albums]
}

export function SET_ALBUM (state, albumId) {
  if (!albumId) {
    state.album = null
  } else {
    state.album = state.albums.find(album => album.id === albumId)
  }
}

export function EDIT_ALBUM (state, editedAlbum) {
  Object.assign(state.albums.find(album => album.id === editedAlbum.id), editedAlbum)
}

export function SET_ALBUM_NAME (state, albumTitle) {
  state.albumName = albumTitle
}

export function DELETE_ALBUM (state, { albumId, rootState }) {
  state.albums = state.albums.filter(album => album.id !== albumId)
  rootState.image.posters = rootState.image.posters.filter(poster => poster.albumId !== albumId)
}

export function TOGGLE_NEW_ALBUM_MODAL (state, isOpen) {
  state.newAlbumModal = isOpen
}

export function TOGGLE_CHOOSE_ALBUM_MODAL (state, isOpen) {
  state.chooseAlbumModal = isOpen
}
