import { createSlice } from "@reduxjs/toolkit";
interface UserProps{
    id:number;
    username:string;

}
interface UserState{
    user:UserProps | null,
    error:string | null;
    loading:Boolean
}
const initialState:UserState={
    user:null,
    error:null,
    loading:false
}
export const userSlice=createSlice({
name:"user",
initialState,
reducers:{
    signInStart:(state)=>{
        state.loading=true;
        state.error=null;
    },
    signInFailure:(state,action)=>{
        state.loading=false;
        state.error=action.payload
    },
    signInSuccess:(state,action)=>{
        state.loading=false;
        state.error=null;
        state.user=action.payload
    }
},
})

export const { signInFailure, signInStart, signInSuccess } =userSlice.actions;
export default userSlice.reducer