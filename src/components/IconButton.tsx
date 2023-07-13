import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { IconButtonProps } from '../types/component.types'
import { useTheme } from '@react-navigation/native'
import TextComponent from './TextComponent'

const IconButton = ({suffixIcon,prefixIcon,label,onPress,customContainerStyle,customLabelStyle}:IconButtonProps) => {
  const {colors:{border:shadowColor}} = useTheme()
  
  return (
    <TouchableOpacity style={[styles.buttonContainerStyle,{shadowColor},customContainerStyle]} onPress={onPress}>
        {prefixIcon && <Image source={prefixIcon} resizeMode='cover' />}
        <TextComponent customTextStyle={customLabelStyle}>{label}</TextComponent>
        {suffixIcon && <Image source={suffixIcon} resizeMode='cover' />}
    </TouchableOpacity>
  )
}

export default memo(IconButton)

const styles = StyleSheet.create({
    buttonContainerStyle:{
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        backgroundColor:'#EAEAEA',
        paddingVertical:15,
        paddingHorizontal:25,
        borderRadius:25
    }
})