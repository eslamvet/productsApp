import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { getModelById } from '../../store/features/modelDetailSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { RouteProp, useRoute } from '@react-navigation/native'
import { NavigationRootParamList } from '../../types/navigation.types'
import ErrorComponent from '../../components/ErrorComponent'
import Loader from '../../components/Loader'
import { modelDetailSliceState } from '../../types/state.types'
import { SafeAreaView } from 'react-native-safe-area-context'
import ModelDetailList from './ModelDetailList'

const ModelDetailsScreen = () => {
  const dispatch = useAppDispatch()
  const {params:{modelId,modelImgUrl}} = useRoute<RouteProp<NavigationRootParamList, 'ModelDetails'>>()
  const { error, loading, model } = useAppSelector(state => state.modelDetail) as modelDetailSliceState

  useEffect(()=>{
    dispatch(getModelById(modelId))
  },[])
  
  return (
    <SafeAreaView edges={['right', 'left', 'bottom']} style={styles.container}>
      {
        loading ? <Loader /> : (error || !model?.info) ? <ErrorComponent errorMsg={error || 'No product found'} /> : <ModelDetailList imgSrc={modelImgUrl} />
      }
    </SafeAreaView>
  )
}

export default ModelDetailsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})