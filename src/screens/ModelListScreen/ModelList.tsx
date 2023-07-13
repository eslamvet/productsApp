import { FlatList, ListRenderItem, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback } from 'react'
import ListItem from './ListItem'
import { ModelListProps } from '../../types/component.types'
import { Model } from '../../types/state.types'
import { useNavigation } from '@react-navigation/native'
import { NavigationRootParamList } from '../../types/navigation.types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import LineDivider from '../../components/LineDivider'
import TextComponent from '../../components/TextComponent'

const ModelList = ({models}:ModelListProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<NavigationRootParamList,'Model'>>()

  const renderItem = useCallback<ListRenderItem<Model>>(({item:{id,name,image_url}})=> <ListItem id={id} name={name} onPress={modelItemPressHandler} image_url={image_url} />,[])

  const ItemSeparatorComponent = useCallback(()=> <LineDivider customLineStyle={styles.customLineStyle} />,[])
  
  const getItemLayout = useCallback((_: any,index: number)=> ({index,length:180,offset:index*180+52}),[])

  const modelItemPressHandler = useCallback<(modelId: number,modelImgUrl:string) => void>((modelId,modelImgUrl)=> navigation.navigate('ModelDetails',{modelId,modelImgUrl}),[])


  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.rootListcontentContainerStyle} showsVerticalScrollIndicator={false}>
        <ScrollView contentContainerStyle={styles.container} horizontal scrollEnabled={false} showsHorizontalScrollIndicator={false}>
            <FlatList
                style={styles.container}
                numColumns={2}
                scrollEnabled={false}
                columnWrapperStyle={styles.columnWrapperStyle}
                data={models}
                keyExtractor={(item,index)=>item.id.toString()}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparatorComponent}
                getItemLayout={getItemLayout}
                ListEmptyComponent={<TextComponent customTextStyle={styles.listEmptyTextStyle}>The are no models matching your search</TextComponent>}
            />
        </ScrollView>
    </ScrollView>
  )
}

export default memo(ModelList)

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    rootListcontentContainerStyle:{
        paddingBottom:30
    },
    columnWrapperStyle:{
        justifyContent:'space-between'
    },
    listEmptyTextStyle:{
        textAlign:'center'
    },
    customLineStyle:{
        marginTop:20,
        marginBottom:30
    }
})