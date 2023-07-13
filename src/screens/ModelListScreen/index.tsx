import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import ModelList from './ModelList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllModels } from '../../store/features/modelSlice';
import { modelSliceState } from '../../types/state.types';
import Loader from '../../components/Loader';
import ErrorComponent from '../../components/ErrorComponent';
import Input from '../../components/Input';

const ModelListScreen = () => {
  const { error, loading, models } = useAppSelector(state => state.model) as modelSliceState
  const dispatch = useAppDispatch()
  const timerRef = useRef<NodeJS.Timeout>()

  useEffect(()=>{
    dispatch(getAllModels(''))
    return ()=> timerRef.current && clearTimeout(timerRef.current)
  },[])

  const handleUserInput = useCallback((val: string) => {
        //debounce effect
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(()=>{
          dispatch(getAllModels(val))
        },300)
  }, [])

  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
      {
        loading ? <Loader /> : !!error ? <ErrorComponent errorMsg={error} /> : <View style={styles.wrapperStyle}>
          <Input placeHolder='Type to Search' label='' onChangeText={handleUserInput} />
          <ModelList models={models} />
        </View>
      }
    </SafeAreaView>
  )
}

export default ModelListScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapperStyle:{
    flex:1,
    paddingTop: 40,
    paddingHorizontal: 20
  }
})