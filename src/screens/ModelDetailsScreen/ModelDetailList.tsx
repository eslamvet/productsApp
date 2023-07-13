import { ScrollView, StyleSheet , View } from 'react-native'
import React, { memo } from 'react'
import ImageComponent from '../../components/ImageComponent'
import { ModelDetailListProps } from '../../types/component.types'
import Accordion from './Accordion'
import LineDivider from '../../components/LineDivider'

const ModelDetailList = ({imgSrc}:ModelDetailListProps) => {

  return (
    <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
    >
        <View style={styles.mainWrapperStyle}>
            <View style={styles.listHeaderStyle}>
                <ImageComponent uri={imgSrc} />
            </View>
            <LineDivider customLineStyle={styles.customLineStyle} />
            <Accordion />
        </View>
    </ScrollView>
  )
}

export default memo(ModelDetailList)

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    contentContainerStyle:{
        paddingVertical:30,
        paddingHorizontal:20
    },
    mainWrapperStyle:{
        borderRadius:25,
        padding:15,
        backgroundColor:'#EAEAEA'
    },
    listHeaderStyle:{
        paddingHorizontal:40,
        height:200
    },
    customLineStyle:{
        marginVertical:25
    }
})