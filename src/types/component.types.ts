import { ImageSourcePropType, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Model, Note } from "./state.types"
import { PropsWithChildren } from "react"

export type IconButtonProps = {
    customContainerStyle?:StyleProp<ViewStyle>
    customLabelStyle?:StyleProp<TextStyle>
    prefixIcon?:ImageSourcePropType
    suffixIcon?:ImageSourcePropType
    label:string
    onPress?:()=>void
}

export type ListItemProps={
    id:number
    image_url:string
    name:string
    onPress:(id:number,imgSrc:string)=>void
}

export type ModelDetailListProps={
    imgSrc:string
}

export type TextComponentProps=PropsWithChildren<{
    customTextStyle?:StyleProp<TextStyle>
    numOfLines?:number
}>

export type ImageComponentProps={
    uri?:string
}

export type LineDividerProps={
    customLineStyle?:StyleProp<ViewStyle>
}

export type NoteItemProps={
    note:Note
}

export type ErrorComponentProps={
    errorMsg:string
}

export type ModelListProps={
    models:Model[]
}

export type InputProps = {
    suffixInputIcon?:ImageSourcePropType
    customInputContainerStyle?:StyleProp<ViewStyle>
    customInputStyle?:StyleProp<TextStyle>
    placeHolder:string
    onChangeText:(val:string)=>void
} & IconButtonProps