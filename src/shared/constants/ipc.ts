export const IPC = {
  WINDOWS: {
    ABOUT: {
      CREATE_WINDOW: 'windows: create-about-window',
      WHEN_WINDOW_CLOSE: 'windows: when-about-window-close'
    }
  },
  FRAME: {
    MINIMIZE: 'frame: minimize-window',
    TOGGLE_MAXIMIZE: 'frame: toggle-maximize-window',
    CLOSE: 'frame: close-window',
    WINDOW_UNMAXIMIZE: 'frame: window-unmaximize'
  },
  STORE: {
    RECENT_FILES: {
      ADD: 'store: recent-files-add',
      GET: 'store: recent-files-get',
      REMOVE: 'store: recent-files-remove',
      UPDATE: 'store: recent-files-update'
    }
  }
}
