import { useState, useEffect } from 'react';

const CustomNumberInput = ({ id, name, initialValue, unit, value, onChange }) => {
    const [internalValue, setInternalValue] = useState(initialValue);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const handleWheel = (event) => {
        const newValue = event.deltaY < 0 ? internalValue + 1 : internalValue - 1;
        setInternalValue(newValue);
        onChange({ target: { name, value: newValue } });
    };

    const handleChange = (event) => {
        const newValue = Number(event.target.value);
        setInternalValue(newValue);
        onChange(event);
    };

    return (
        <div className="relative text-center" onWheel={handleWheel}>
            <div className="flex justify-center items-center top-0 left-0 right-0 h-full">
                <span className="text-gray-300">{internalValue - 1}</span>
            </div>
            <input
                type="number"
                id={id}
                name={name}
                value={internalValue}
                onChange={handleChange}
                className="text-center text-xl w-24 border-b-2 border-black focus:outline-none focus:border-red-400"
            />
            <div className="absolute w-full flex justify-center items-center top-0 left-0 right-0 h-full mt-10">
                <span className="text-gray-300">{internalValue + 1}</span>
            </div>
            <span className="bottom-0 left-0 right-0 text-xl">{unit}</span>
        </div>
    );
};

export default CustomNumberInput;
