import {Action, IState} from "../../models";
import {
    GET_ALL_OBJECT,
    GET_ONE_OBJECT,
    GET_AREND_OBJECT,
    GET_OBJECT_1_FILIAL,
    GET_WORKERS,
    GET_REQUEST,
    GET_ACTIVE_REQUEST,
    GET_ENDED_REQUEST,
    GET_ADDITIONAL_MATERIAL,
    CREATE_OBJECT,
    CREATE_WORKER,
    CREATE_FILIAL,
    CREATE_ADDITIONAL_MATERIAL,
    CREATE_ROLE,
    CREATE_REQUEST,
    UPDATE_OBJECT,
    UPDATE_WORKER,
    UPDATE_ADDITIONAL_MATERIAL,
    UPDATE_ROLE,
    DELETE_OBJECT,
    DELETE_WORKER,
    DELETE_ROLE,
    DELETE_PHOTO,
    DELETE_ADDITIONAL_MATERIAL,
} from '../typesAction'

const handlers: { [key: string]: (state: IState, action: Action) => IState } = {
    [GET_ALL_OBJECT]: (state, {payload}) => ({...state, objects: payload}),
    [GET_ONE_OBJECT]: (state, {payload}) => ({
        ...state,
        objects: state.objects.filter(object => object.id === payload)
    }),
    [GET_AREND_OBJECT]: (state, {payload}) => ({
        ...state,
        objects: state.objects.filter(object => object.status === payload)
    }),
    [GET_OBJECT_1_FILIAL]: (state, {payload}) => ({
        ...state,
        objects: state.objects.filter(object => object.office_id === payload)
    }),
    [GET_WORKERS]: (state, {payload}) => ({...state, users: payload}),
    // [GET_REQUEST]: state => ({...state}),
    // [GET_ACTIVE_REQUEST]: state => ({...state}),
    // [GET_ENDED_REQUEST]: state => ({...state}),
    // [GET_ADDITIONAL_MATERIAL]: state => ({...state}),
    [CREATE_OBJECT]: (state, {payload}) => ({
        ...state,
        objects: [...state.objects, payload]
    }),
    [CREATE_WORKER]: (state, {payload}) => ({
        ...state,
        users: [...state.users, payload]
    }),
    // [CREATE_FILIAL]: state => ({...state}),
    // [CREATE_ADDITIONAL_MATERIAL]: state => ({...state}),
    // [CREATE_ROLE]: state => ({...state}),
    // [CREATE_REQUEST]: state => ({...state}),
    [UPDATE_OBJECT]: (state, {payload}) => ({
        ...state,
        objects: state.objects.map(object => object.id === payload.id ? payload : object)
    }),
    [UPDATE_WORKER]: (state, {payload}) => ({
        ...state,
        users: state.users.map(user => user.id === payload.id ? payload : user)
    }),
    // [UPDATE_ADDITIONAL_MATERIAL]: state => ({...state}),
    // [UPDATE_ROLE]: state => ({...state}),
    [DELETE_OBJECT]: (state, {payload}) => ({
        ...state,
        objects: state.objects.filter(object => object.id !== payload)
    }),
    [DELETE_WORKER]: (state, {payload}) => ({
        ...state,
        users: state.users.filter(user => user.id !== payload)
    }),
    // [DELETE_ROLE]: state => ({...state}),
    // [DELETE_PHOTO]: state => ({...state}),
    // [DELETE_ADDITIONAL_MATERIAL]: state => ({...state}),
    DEFAULT: (state) => state,
}

export const edemBackReducer = (state: IState, action: Action): IState => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}