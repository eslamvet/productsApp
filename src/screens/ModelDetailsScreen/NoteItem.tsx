import { StyleSheet, Text, View } from 'react-native'
import React, { memo } from 'react'
import { NoteItemProps } from '../../types/component.types'
import TextComponent from '../../components/TextComponent'

const NoteItem = ({note:{by,details,date}}:NoteItemProps) => {

  return (
    <View>
      <TextComponent>{by}</TextComponent>
      <TextComponent customTextStyle={styles.noteDateTextStyle}>{date}</TextComponent>
      <TextComponent customTextStyle={styles.noteDetailsTextStyle}>{details}</TextComponent>
    </View>
  )
}

export default memo(NoteItem)

const styles = StyleSheet.create({
    noteDateTextStyle:{
        fontSize:10,
        fontWeight:'400',
        marginVertical:3
    },
    noteDetailsTextStyle:{
        fontSize:14,
        fontWeight:'500'
    }
})