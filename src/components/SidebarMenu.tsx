import React, {useState} from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
}

export const SidebarMenu: React.FC<SidebarProps> = ({ isOpen}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="position-fixed start-0 top-0 h-100 bg-light"
             style={{ width: '250px', zIndex: 1000, overflowY: 'auto', paddingTop: "60px" }}>
            <div className="d-flex flex-column h-100 p-3 border-start">
                {/* Заголовок сайдбара */}
                {/*<div className="sidebar-header mb-4">*/}
                {/*    <h5 className="text-center">Навигация</h5>*/}
                {/*</div>*/}

                {/* Основные ссылки */}
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link" style={{color: "#274c77"}} aria-current="page">
                            <i className="bi bi-calendar-check me-2"></i>
                            Календарь
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/objects" className="nav-link" style={{color: "#274c77"}}>
                            <i className="bi bi-building me-2"></i>
                            Объекты
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/workers" className="nav-link" style={{color: "#274c77"}}>
                            <i className="bi bi-people me-2"></i>
                            Сотрудники
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/roles" className="nav-link" style={{color: "#274c77"}}>
                            <i className="bi bi-person-workspace me-2"></i>
                            Должности
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/offices" className="nav-link" style={{color: "#274c77"}}>
                            <i className="bi bi-buildings me-2"></i>
                            Офисы
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/works" className="nav-link" style={{color: "#274c77"}} >
                            <i className="bi bi-list-task me-2"></i>
                            Задания
                        </Link>
                    </li>
                </ul>

                {/* Выпадающий список */}
                <div className="dropdown mb-3">
                    <button
                        className="btn btn-secondary dropdown-toggle w-100"
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        aria-expanded={isDropdownOpen}
                    >
                        <i className="bi bi-gear me-2"></i>
                        Настройки
                    </button>
                    <ul className={`dropdown-menu w-100 ${isDropdownOpen ? 'show' : ''}`}>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <Link to="/" className="dropdown-item text-danger">
                                Выйти
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}