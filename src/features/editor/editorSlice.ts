import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface EditorState {
  value: string
}

const initialState: EditorState = {
  value: `# Hello, World`,
}

export const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    updateText(state, action: PayloadAction<string>) {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateText } = editorSlice.actions

export default editorSlice.reducer
