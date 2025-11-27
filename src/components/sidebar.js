// Sidebar.js
import React from 'react';

export default function SidebarItem({ name, Icon, onClick, isActive }) {
    return (
        <li>
            <button
                onClick={onClick}
                className={`flex items-center space-x-3 p-3 text-lg font-medium rounded-lg transition duration-150 w-full text-left
                    ${isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
            >
                {Icon && <Icon className="w-6 h-6" />}
                <span>{name}</span>
            </button>
        </li>
    );
}
