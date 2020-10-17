export function addAlbum ({ commit }, album) {
  commit('ADD_ALBUM', album)
}

export function setAlbum ({ commit }, albumId) {
  commit('SET_ALBUM', albumId)
}

export function updateAlbumName ({ commit }, albumTitle) {
  commit('SET_ALBUM_NAME', albumTitle)
}

export function editAlbum ({ commit }, album) {
  commit('EDIT_ALBUM', album)
}

export function deleteAlbum ({ commit, rootState }, albumId) {
  commit('DELETE_ALBUM', { albumId, rootState })
}

export function setAlbumName ({ commit }, albumTitle) {
  commit('SET_ALBUM_NAME', albumTitle)
}

export function toggleNewAlbumModal ({ commit }, isOpen) {
  commit('TOGGLE_NEW_ALBUM_MODAL', isOpen)
}

export function toggleChooseAlbumModal ({ commit }, isOpen) {
  commit('TOGGLE_CHOOSE_ALBUM_MODAL', isOpen)
}
