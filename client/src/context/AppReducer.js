export const AppReducer = (state,action)=>{

    switch(action.type){

        case 'SET_USER':
            return{
                ...state,
                error:"",
                user:action.payload.user,
                token:action.payload.token
            }

        case 'DISPLAY_ERROR':
            return{
                ...state,
                error:action.payload.error
            }

        case 'LOG_OUT':
            return{
                token:'',
                user:{},
                movieList:[],
                error:''
            }

        case 'CLEAR_ERROR':
            return{
                ...state,
                error:''
            }

        default: return state;
    }

}