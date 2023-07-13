import { FlatList , ListRenderItem, ScrollView, StyleSheet, View } from 'react-native'
import React, { memo, useCallback, useRef } from 'react'
import { Note } from '../../types/state.types'
import NoteItem from './NoteItem'
import LineDivider from '../../components/LineDivider'
import TextComponent from '../../components/TextComponent'
import Input from '../../components/Input'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { createNoteThunk } from '../../store/features/modelDetailSlice'
import { useRoute, RouteProp } from '@react-navigation/native'
import { NavigationRootParamList } from '../../types/navigation.types'

const ModelNotes = () => {
  const notes = useAppSelector(state => state.modelDetail.model?.notes) as Note[]
  const noteDetailValue = useRef('')
  const inputRef = useRef<any>()
  const dispatch = useAppDispatch()
  const {params:{modelId}} = useRoute<RouteProp<NavigationRootParamList, 'ModelDetails'>>()

  const ItemSeparatorComponent = useCallback(()=> <LineDivider customLineStyle={styles.customLineStyle}/>,[])

  const renderItem = useCallback<ListRenderItem<Note>>(({item:note})=> <NoteItem note={note} />,[])
  
  const getItemLayout = useCallback((_: any,index: number)=> ({index,length:60,offset:index*60+22}),[])

  const saveNoteHandler = useCallback(()=>{
    if(noteDetailValue.current) dispatch(createNoteThunk({details:noteDetailValue.current,modelId})).unwrap().finally(()=>inputRef.current?.reset())
  },[])

  const handleUserInput = useCallback((val: string) => {
    noteDetailValue.current=val
  }, [])

  return (
        <View>
            <Input placeHolder='' ref={inputRef} label='save' onChangeText={handleUserInput} customInputContainerStyle={{backgroundColor:'white',elevation:5}} customContainerStyle={{justifyContent:'flex-end',backgroundColor:'transparent'}} prefixIcon={require('../../../assets/icons/save-icon-gray.png')} onPress={saveNoteHandler} />
            <TextComponent>History Notes</TextComponent>
            <ScrollView contentContainerStyle={{flex:1}} horizontal scrollEnabled={false} showsHorizontalScrollIndicator={false}>
                <FlatList
                    style={styles.noteListStyle}
                    contentContainerStyle={styles.noteListContentContainerStyle}
                    nestedScrollEnabled
                    data={notes}
                    keyExtractor={(item,index)=>item.id.toString()}
                    getItemLayout={getItemLayout}
                    renderItem={renderItem}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    ListEmptyComponent={<TextComponent customTextStyle={styles.listEmptyTextStyle}>The are no notes for this model</TextComponent>}
                />
            </ScrollView>
        </View>
  )
}

export default memo(ModelNotes)

const styles = StyleSheet.create({
    noteListStyle:{
        marginTop:10,
        maxHeight:300,
    },
    noteListContentContainerStyle:{
        backgroundColor:'white',
        borderRadius:25,
        padding:15
    },
    customLineStyle:{
        marginVertical:10
    },
    listEmptyTextStyle:{
        textAlign:'center'
    }
})