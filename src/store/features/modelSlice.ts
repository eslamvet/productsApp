import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Transaction } from "react-native-sqlite-storage";
import { modelSliceState } from "../../types/state.types";


const initialState: modelSliceState = {
    loading:true,
    models: [],
    error:''
}

export const getAllModels = createAsyncThunk('model/getAll', async (query:string, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const result = await new Promise((resolve, reject) => {
            global.db.transaction(function (txn: Transaction) {
                txn.executeSql('SELECT id,name, image_url FROM Model where name LIKE ?', [query+'%'], (_: any, res: any) => {
                    resolve(Array.from({ length: res.rows.length }, (_: any, i: number) =>{
                        const modelRecord = res.rows.item(i)
                        modelRecord.image_url = modelRecord.image_url.split('.')[0]
                        return modelRecord
                    }))
                }, err => {
                    console.log(err);
                    reject(err)
                }
                );
            })
        })
        return result
    } catch (error) {
        return rejectWithValue(error)
    }
})

const modelSlice = createSlice({
    name: 'model',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllModels.fulfilled, (state, action: any) => {
            state.loading=false
            state.models = action.payload
        }).addCase(getAllModels.rejected,(state, action: any)=>{
            state.loading=false
            state.error = action.payload.message
        })
    }
})

export default modelSlice.reducer