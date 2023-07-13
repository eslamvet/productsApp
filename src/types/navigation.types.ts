export type NavigationRootParamList = {
    Home:undefined
    Model:undefined
    ModelDetails:{modelId:number,modelImgUrl:string}
}

declare global {
    namespace ReactNavigation {
      interface RootParamList extends NavigationRootParamList {}
    }
}