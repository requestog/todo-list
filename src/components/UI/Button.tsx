import React, {ButtonHTMLAttributes} from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    danger?: boolean;
    small?: boolean;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, danger, small, ...props }) => {
    const buttonClasses = `
        flex items-center px-4 py-2 rounded-lg
        focus:outline-none focus:ring-2 cursor-pointer
        ${danger ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500' : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500'}
        text-white
        ${small ? 'text-sm px-2 py-1' : ''}
    `;
    return (
        <button
            {...props}
            className={buttonClasses}
        >
            {children}
        </button>
    );
};

export default Button;