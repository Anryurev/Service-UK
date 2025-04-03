import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
}

export const SidebarMenu: React.FC<SidebarProps> = ({ isOpen}) => {
    return (
        <div className="sidebar">
            <ul>
                <div className="dropdown dropdown-toggle" data-bs-toggle="dropdown">
                    <ul className="dropdown-menu">
                        <li className="dropdown-item"><a href="/">Шахматка</a></li>
                        <li className="dropdown-item"><a href="/about">О нас</a></li>
                        <li className="dropdown-item"><a href="/contact">Контакты</a></li>
                    </ul>
                </div>
                <li className="dropdown dropdown-toggle"><a href="/execut">Шахматка</a></li>
                <li><a href="/about">О нас</a></li>
                <li><a href="/contact">Контакты</a></li>
            </ul>
        </div>
    )
}