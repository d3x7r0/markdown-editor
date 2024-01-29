import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type EditorStatus = 'created' | 'initializing' | 'ready'

export interface EditorState {
  value: string
  status: EditorStatus,
}

const initialState: EditorState = {
  value: `# Hello, World`,
  status: 'created',
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateText(state, action: PayloadAction<string>) {
      state.value = action.payload
    },
    updateStatus(state, action: PayloadAction<EditorStatus>) {
      state.status = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateText, updateStatus } = editorSlice.actions

export default editorSlice.reducer
