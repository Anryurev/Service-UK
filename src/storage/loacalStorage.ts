import {IResponseAuth, IRole, IWorkers} from "../models";


export const saveAuthDataToLocalStorage = (data: IResponseAuth): void => {
    try {
        localStorage.setItem('worker', JSON.stringify(data.worker))
        localStorage.setItem('role', JSON.stringify(data.role))

        // Можно добавить метку времени авторизации
        localStorage.setItem('auth_time', new Date().toISOString());
    } catch (error) {
        console.error('Ошибка при сохранении в localStorage:', error);
    }
}

export const getAuthDataFromLocalStorage = (): {
    worker: IWorkers | null;
    role: IRole | null;
} => {
    try {
        const worker = localStorage.getItem('worker');
        const role = localStorage.getItem('role');

        return {
            worker: worker ? JSON.parse(worker) : null,
            role: role ? JSON.parse(role) : null,
        }
    } catch (error) {
        console.error('Ошибка при чтении из localStorage:', error);
        return { worker: null, role: null };
    }
};