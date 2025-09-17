import {useEffect, useRef, useState} from 'react';

interface DropdownItem {
    id: string | number;
    label: string;
}

interface DropdownProps {
    items: DropdownItem[];
    defaultValue?: DropdownItem;
    onSelect?: (item: DropdownItem) => void;
    className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
                                               items,
                                               defaultValue,
                                               onSelect,
                                               className
                                           }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
        defaultValue || items[0]
    );
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (item: DropdownItem) => {
        setSelectedItem(item);
        setIsOpen(false);
        if (onSelect) {
            onSelect(item);
        }
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-center items-center px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none border border-gray-300"
            >
                {selectedItem?.label}
                <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className={`relative inline-block text-left ${className || ''}`}>
                    <div className="py-1">
                        {items.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleSelect(item)}
                                className="w-full text-left text-sm block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;
