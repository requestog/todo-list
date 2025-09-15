import { useState, useRef, useEffect } from 'react';

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="align-center relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="h-full text-sm inline-flex justify-center items-center px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none border border-gray-300"
            >
                Все
                <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                    <div className="py-1">
                        <a
                            href="#"
                            className="text-sm block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            Все
                        </a>
                        <a
                            href="#"
                            className="text-sm block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            Активные
                        </a>
                        <a
                            href="#"
                            className="text-sm block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                            Выполненные
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
