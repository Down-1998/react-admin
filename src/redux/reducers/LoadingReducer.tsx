export const LoadingReducer = (prevState={
    loadingCount:0
},action)=>{
        
    const {type} =action
    const newstate = {...prevState}
    switch(type){
        case "add_loading":
            newstate.loadingCount += 1
            console.log(newstate,'add_loading')
            return newstate
        case "delete_loading":
            newstate.loadingCount -= 1
            console.log(newstate,'delete_loading')
            return newstate
        default:
            return prevState
    }
}