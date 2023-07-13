export type Note={
    id:number
	by:string
	date:string
	details:string
	model_id:number
}

export type queryStatus = {
    loading: boolean,
    error:string
}

export type modelSliceState = queryStatus & {
    models:Model[]
}

export type modelDetailSliceState = queryStatus & {
    model:{info:Model,notes:Note[]} |undefined
}

export type Model={
    id:number
	code:string
	name:string
	type:string
	cost:number
	category:string
	description:string
	image_url:string
}