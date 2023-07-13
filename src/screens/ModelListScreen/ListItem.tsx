import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { ListItemProps } from '../../types/component.types'
import ImageComponent from '../../components/ImageComponent'
import TextComponent from '../../components/TextComponent'

const ListItem = ({id,image_url,name,onPress}:ListItemProps) => {
    
  return (
    <TouchableOpacity style={styles.listItemStyle} onPress={()=>onPress(id,image_url)}>
        <ImageComponent uri={image_url} />
        <TextComponent customTextStyle={styles.listItemLabelStyle}>{name}</TextComponent>
    </TouchableOpacity>
  )
}

export default memo(ListItem)

const styles = StyleSheet.create({
    listItemStyle:{
        width:'46%',
        height:180,
        overflow:'hidden'
    },
    listItemLabelStyle:{
        marginTop:10,
        textAlign:'center'
    }
})