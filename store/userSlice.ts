import {createSlice} from "@reduxjs/toolkit"
import type {PayloadAction} from "@reduxjs/toolkit"
import {userProps} from "@/utils/types"

const initialState = {
    user: <userProps> {
        name: "",
        email: "",
        id: "",
        token: "",
        city: "",
        address: ""
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userProps>) => {
            state.user = action.payload;
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;