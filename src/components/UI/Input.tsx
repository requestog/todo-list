import React from 'react';

const Input = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} {...props} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
    );
});

export default Input;