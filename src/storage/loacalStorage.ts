import {IResponseAuth, IRole, IWorkers} from "../models";

export const saveAuthDataToLocalStorage = (data: IResponseAuth): void => {
    try {
        localStorage.setItem('worker', JSON.stringify(data.Worker))

        if (data.Roles && data.Roles.length > 0) {
            localStorage.setItem('roles', JSON.stringify(data.Roles))
        } else {
            localStorage.removeItem('roles'); // Очищаем, если ролей нет
        }

        // Можно добавить метку времени авторизации
        localStorage.setItem('auth_time', new Date().toISOString());
    } catch (error) {
        console.error('Ошибка при сохранении в localStorage:', error);
    }
}

export const getAuthDataFromLocalStorage = (): {
    worker: IWorkers | null;
    roles: IRole[] | null;
} => {
    try {
        const worker = localStorage.getItem('worker');
        const roles = localStorage.getItem('roles');

        return {
            worker: worker ? JSON.parse(worker) : null,
            roles: roles ? JSON.parse(roles) : null,
        };
    } catch (error) {
        console.error('Ошибка при чтении из localStorage:', error);
        return { worker: null, roles: null };
    }
};