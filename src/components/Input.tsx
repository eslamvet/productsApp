import React, { forwardRef, memo, useImperativeHandle, useState } from 'react'
import { Image, StyleSheet, TextInput, View } from 'react-native'
import { InputProps } from '../types/component.types'
import IconButton from './IconButton'
import { useTheme } from '@react-navigation/native'


const Input = ({suffixInputIcon,customInputStyle,customInputContainerStyle,label,onChangeText,placeHolder,...iconButtonProps}:InputProps,ref: React.Ref<any> | undefined) => {
  const [inputValue, setInputValue] = useState('')
  const {colors:{text:color}} = useTheme()
  useImperativeHandle(ref,()=>({
    reset:()=>setInputValue('')
  }))

  return (
    <View>
      {!!label && <IconButton label='save' {...iconButtonProps} />}
      <View style={[styles.inputContainerStyle,customInputContainerStyle]}>
        <TextInput value={inputValue} placeholder={placeHolder} placeholderTextColor={color} onChangeText={(val)=>{setInputValue(val);onChangeText(val)}} style={[styles.inputStyle,{color},customInputStyle]} multiline  />
        {suffixInputIcon && <Image source={suffixInputIcon} resizeMode='cover' />}
      </View>
    </View>
  )

}

export default memo(forwardRef(Input))

const styles = StyleSheet.create({
  inputContainerStyle:{
    flexDirection:'row',
    backgroundColor:'#F0F0F0',
    elevation:15,
    borderRadius:30,
    marginBottom:30,
    paddingHorizontal:25,
    gap:15,
  },
  inputStyle:{
    flex:1,
    height:50,
    fontSize:18,
  }
})