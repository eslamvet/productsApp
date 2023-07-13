import { StyleSheet , View } from 'react-native'
import React, { memo, useRef } from 'react'
import TextComponent from '../../components/TextComponent'
import { useAppSelector } from '../../store/hooks'
import { Model } from '../../types/state.types'

const ModelInfo = () => {
  const {id,name,description,image_url,...rest} = useAppSelector(state => state.modelDetail.model?.info) as Model
  const modelInfo = useRef(Object.entries({name,...rest,description})).current
    
  return (
    <View>
        {
            modelInfo.map((detail,index)=>(
                <View key={index} style={[styles.detailItemWrapperStyle,index == modelInfo.length-1 && {flexDirection:'column',alignItems:'flex-start'}]}>
                    <TextComponent>{detail[0]}</TextComponent>
                    <TextComponent numOfLines={index == modelInfo.length-1 ? 2 : 1}>{detail[1]}</TextComponent>
                </View>
            ))
        }
    </View>
  )
}

export default memo(ModelInfo)

const styles = StyleSheet.create({
    detailItemWrapperStyle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        gap:10,
        marginBottom:10
    }
})