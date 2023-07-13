import { StyleSheet } from 'react-native'
import React, { useCallback, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import IconButton from '../../components/IconButton'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { NavigationRootParamList } from '../../types/navigation.types'

const HomeScreen = () => {
  const tabs = useRef(['Asset Inventory','Model','person']).current
  const navigation = useNavigation<NativeStackNavigationProp<NavigationRootParamList,'Home'>>()

  const goToModelList = useCallback(() => {
      navigation.navigate('Model')
    },[])
  
  return (
    <SafeAreaView edges={['right','left','bottom']} style={styles.container}>
      {
        tabs.map((tab,index)=> <IconButton key={index} customContainerStyle={styles.tabItemStyle} customLabelStyle={styles.tabItemLabelStyle} onPress={index == 1 ? goToModelList : undefined} label={tab} prefixIcon={index == 0 ? require('../../../assets/icons/stock-file-icon-gray.png') : require('../../../assets/icons/vendors-icon-gray.png')} suffixIcon={require('../../../assets/icons/arrow-right-gray1.png')} />)
      }
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:50,
        paddingHorizontal:40
    },
    tabItemStyle:{
      marginBottom:30,
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
  },
  tabItemLabelStyle:{
      flex:1,
      fontSize:18,
      fontWeight: '700'
  }
})
