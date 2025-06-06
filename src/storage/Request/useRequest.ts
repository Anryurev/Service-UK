import {IRequest} from "../../models";

export const useRequest = () => {
    const saveRequestToLocalStorage = (data: IRequest): void => {
        try {
            localStorage.setItem('request', JSON.stringify(data))
        } catch (error) {
            console.error('Ошибка при сохранении в localStorage:', error);
        }
    }
    const getRequestFromLocalStorage = () => {
        const requestItem = localStorage.getItem('request')
        return requestItem ? JSON.parse(requestItem) : null
    }

    const updateRequestObject = (objectId: number) => {
        const request: IRequest = getRequestFromLocalStorage()
        console.log("request", request)
        console.log('updateRequestObject', objectId)
        request.object_Id = objectId
        localStorage.setItem('request', JSON.stringify(request))
    }
    const updateRequestTypeWork = (typeWork: string, worker_Id?: number[]) => {
        const request: IRequest = getRequestFromLocalStorage()
        request.type_Work = typeWork
        if(worker_Id){
            request.workers_Id = worker_Id
        }
        localStorage.setItem('request', JSON.stringify(request))
    }
    const updateRequestDescription = (description: string, urgency: boolean) => {
        const request: IRequest = getRequestFromLocalStorage()
        request.description = description
        request.urgency = urgency
        localStorage.setItem('request', JSON.stringify(request))
    }
    const updateRequestPhotos = (photos: Array<{ id_photo: number; url: string }>) => {
        const request: IRequest = getRequestFromLocalStorage()
        request.photos = photos
        localStorage.setItem('request', JSON.stringify(request))
    }


    const removeRequest = () => {
        localStorage.removeItem('request')
    }

    return { saveRequestToLocalStorage, getRequestFromLocalStorage, updateRequestObject, updateRequestTypeWork, updateRequestDescription, updateRequestPhotos, removeRequest }
}