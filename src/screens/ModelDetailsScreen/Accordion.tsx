import { Image, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useRef, useState } from 'react'
import ModelInfo from './ModelInfo'
import ModelNotes from './ModelNotes'
import TextComponent from '../../components/TextComponent'
import LineDivider from '../../components/LineDivider'

const Accordion = () => {
    const sections = useRef(['info','notes']).current
    const [activeIndexs, setActiveIndexs] = useState([0,1])

    function toggleAccordionHandler(index:number){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const indexExists = activeIndexs.indexOf(index)
        indexExists > -1 ?  setActiveIndexs(activeIndexs.filter(i=>i != index)) : setActiveIndexs([...activeIndexs,index])
    }

    return (
      <View>
        {
          sections.map((key,index)=>(
              <View key={index}>
                  <TouchableOpacity style={styles.headerAccordionStyle} onPress={()=>toggleAccordionHandler(index)}>
                      <TextComponent customTextStyle={styles.headerAccordionlabelStyle}>{key}</TextComponent>
                      <Image style={{transform:[{scale:activeIndexs.includes(index) ? 1 : -1}]}} source={require('../../../assets/icons/arrow-up.png')} resizeMode='cover' />
                  </TouchableOpacity>
                  <View>
                    {
                      activeIndexs.includes(index) ? index == 0 ?  <ModelInfo  /> : <ModelNotes /> : null
                    }
                  </View>
                  {index%2 == 0 && <LineDivider  />}
              </View>
          ))
        }
      </View>
    )
}

export default memo(Accordion)

const styles = StyleSheet.create({
    headerAccordionlabelStyle:{
        fontSize:18,
        textTransform:'capitalize'
    },
    headerAccordionStyle:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingVertical:10
    }
})