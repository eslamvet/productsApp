import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Transaction } from "react-native-sqlite-storage";
import { modelDetailSliceState } from "../../types/state.types";


const initialState: modelDetailSliceState = {
    loading: true,
    model: undefined,
    error: ''
}

export const getModelById = createAsyncThunk('modelDetail/getById', async (id: number, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const result = await new Promise((resolve, reject) => {
            global.db.transaction(function (txn: Transaction) {
                txn.executeSql('SELECT * FROM Model where id=?', [id], (tn: Transaction, record: any) => {
                    tn.executeSql('SELECT * FROM Note where model_id=? ORDER BY Note.date DESC', [id], (tn: Transaction, notes: any) => {
                        resolve({info:record.rows.item(0),notes:Array.from({ length: notes.rows.length }, (_: any, i: number) => notes.rows.item(i))})
                    }, err => {
                        reject(err)
                    })
                }, err => {
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

export const createNoteThunk = createAsyncThunk('modelDetail/createNote', async ({details,modelId:model_id}:{details: string,modelId:number}, thunkApi) => {
    const { rejectWithValue } = thunkApi
    try {
        const result = await new Promise((resolve, reject) => {
            global.db.transaction(function (txn: Transaction) {
                txn.executeSql('INSERT INTO Note (by, date, details,model_id ) VALUES (?,datetime(),?,?)', ['Eslam Soliman',details,model_id], (_, note: any) => {
                    if(note.rowsAffected > 0){
                        resolve({id:Math.random(),details,by:'Eslam Soliman',date:new Date().toISOString().split('.')[0].replace('T', ' '),model_id})
                    }else{
                        reject('something went wrong')
                    }
                    resolve('done')
                }, err => {
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

const modelDetailSlice = createSlice({
    name: 'modelDetail',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getModelById.fulfilled, (state, action: any) => {
            state.loading = false
            state.model = action.payload
        }).addCase(getModelById.rejected, (state, action: any) => {
            state.loading = false
            state.error = action.payload.message
        }).addCase(createNoteThunk.fulfilled, (state, action: any) => {
            state.model?.notes.unshift(action.payload)
        })
    }
})

export default modelDetailSlice.reducer