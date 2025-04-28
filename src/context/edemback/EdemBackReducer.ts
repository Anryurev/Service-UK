import {Action, IState} from "../../models";
import {
    GET_ALL_OBJECTS,
    GET_ONE_OBJECT,
    GET_AREND_OBJECT,
    GET_OBJECT_1_FILIAL,
    GET_ALL_Users,
    GET_REQUEST,
    GET_ACTIVE_REQUEST,
    GET_ENDED_REQUEST,
    GET_ADDITIONAL_MATERIAL,
    CREATE_OBJECT,
    CREATE_USER,
    CREATE_FILIAL,
    CREATE_ADDITIONAL_MATERIAL,
    CREATE_ROLE,
    CREATE_REQUEST,
    UPDATE_OBJECT,
    UPDATE_USER,
    UPDATE_ADDITIONAL_MATERIAL,
    UPDATE_ROLE,
    DELETE_OBJECT,
    DELETE_USER,
    DELETE_ROLE,
    DELETE_PHOTO,
    DELETE_ADDITIONAL_MATERIAL,
    GET_ALL_ROLES,
    GET_ALL_OFFICES,
    CREATE_OFFICE,
    GET_ONE_USER,
    GET_ONE_ROLE,
    DELETE_REQUEST,
    UPDATE_REQUEST, GET_ALL_BOOKINGS, CREATE_BOOKING, UPDATE_BOOKING, DELETE_BOOKING
} from '../typesAction'

const handlers: { [key: string]: (state: IState, action: Action) => IState } = {
    // Objects
    [GET_ALL_OBJECTS]: (state, {payload}) => ({...state, objects: payload}),
    [GET_ONE_OBJECT]: (state, {payload}) => ({
        ...state,
        object: payload
    }),
    [GET_AREND_OBJECT]: (state, {payload}) => ({
        ...state,
        objects: payload
    }),
    [GET_OBJECT_1_FILIAL]: (state, {payload}) => ({
        ...state,
        objects: payload
    }),
    [CREATE_OBJECT]: (state, {payload}) => ({
        ...state,
        objects: [...state.objects, payload]
    }),
    [UPDATE_OBJECT]: (state, {payload}) => ({
        ...state,
        object: payload
    }),
    [DELETE_OBJECT]: (state, {payload}) => ({
        ...state,
        objects: state.objects.filter(object => object.id !== payload)
    }),

    // Users
    [GET_ALL_Users]: (state, {payload}) => ({
        ...state,
        users: payload
    }),
    [GET_ONE_USER]: (state, {payload}) => ({...state, user: payload}),
    [CREATE_USER]: (state, {payload}) => ({
        ...state,
        users: [...state.users, payload]
    }),
    [UPDATE_USER]: (state, {payload}) => ({
        ...state,
        user: payload
    }),
    [DELETE_USER]: (state, {payload}) => ({
        ...state,
        users: payload
    }),

    // Roles
    [GET_ALL_ROLES]: (state, {payload}) => ({
        ...state,
        roles: payload
    }),
    [GET_ONE_ROLE]: (state, {payload}) => ({
        ...state,
        role: payload
    }),
    [CREATE_ROLE]: (state, {payload}) => ({
        ...state,
        roles: [...state.roles, payload]
    }),
    [UPDATE_ROLE]: (state, {payload}) => ({
        ...state,
        roles: state.roles.map(role => role.role_Id === payload.id ? payload : role)
    }),
    [DELETE_ROLE]: (state, {payload}) => ({
        ...state,
        roles: state.roles.filter(role => role.role_Id !== payload.id)
    }),


    // Offices
    [GET_ALL_OFFICES]: (state, {payload}) => ({
        ...state,
        offices: payload
    }),
    [CREATE_OFFICE]: (state, {payload}) => ({
        ...state,
        offices: [...state.offices, payload]
    }),


    // Requests
    [GET_REQUEST]: (state, {payload}) => ({
        ...state,
        requests: payload
    }),
    [GET_ENDED_REQUEST]: state => ({...state}),
    [CREATE_REQUEST]: (state, {payload}) => ({
        ...state,
        requests: [...state.requests, payload]
    }),
    [UPDATE_REQUEST]: (state, {payload}) => ({
        ...state,
        requests: payload
    }),
    [DELETE_REQUEST]: (state, {payload}) => ({
        ...state,
        requests: payload
    }),

    // Booking
    [GET_ALL_BOOKINGS]: (state, {payload}) => ({
        ...state,
        bookings: payload
    }),
    [CREATE_BOOKING]: (state, {payload}) => ({
        ...state,
        bookings: [...state.bookings, payload]
    }),
    [UPDATE_BOOKING]: (state, {payload}) => ({
        ...state,
        bookings: payload
    }),
    [DELETE_BOOKING]: (state, {payload}) => ({
        ...state,
        bookings: payload
    }),


    // [GET_ACTIVE_REQUEST]: state => ({...state}),
    // [GET_ADDITIONAL_MATERIAL]: state => ({...state}),
    // [CREATE_FILIAL]: state => ({...state}),
    // [CREATE_ADDITIONAL_MATERIAL]: state => ({...state}),
    // [UPDATE_ADDITIONAL_MATERIAL]: state => ({...state}),
    // [DELETE_PHOTO]: state => ({...state}),
    // [DELETE_ADDITIONAL_MATERIAL]: state => ({...state}),
    DEFAULT: (state) => state,
}

export const edemBackReducer = (state: IState, action: Action): IState => {
    const handle = handlers[action.type] || handlers.DEFAULT
    return handle(state, action)
}