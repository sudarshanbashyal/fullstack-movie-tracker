export const AppReducer = (state,action)=>{

    switch(action.type){

        case 'SET_USER':
            return{
                ...state,
                render:true,
                error:"",
                user:action.payload.user,
                token:action.payload.token,
                movieList:action.payload.movieList
            }

        case 'RENDER':
            return{
                ...state,
                render:true
            }

        case 'DISPLAY_ERROR':
            return{
                ...state,
                error:action.payload.error
            }

        case 'LOG_OUT':
            return{
                render:false,
                token:'',
                user:{},
                movieList:[],
                error:'',
                modal:{
                    showModal:false,
                    modalComponent:''
                }
            }

        case 'CLEAR_ERROR':
            return{
                ...state,
                error:''
            }

        case 'UPDATE_MOVIE_LIST':
            return{
                ...state,
                movieList:action.payload.updatedList.movieList
            }

        case 'UPDATE_MODAL_COMPONENT':
            return{
                ...state,
                error:"",
                modal:{
                    ...state.modal,
                    modalComponent:action.payload.newComponent
                }
            }

        case 'TOGGLE_MODAL':
            return{
                ...state,
                error:'',
                modal:{
                    ...state.modal,
                    showModal: action.payload.show,
                    modalComponent: action.payload.component
                }
            }

        default: return state;
    }

}