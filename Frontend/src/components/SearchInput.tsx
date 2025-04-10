import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchInputProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm }) => {
    const [focused, setFocused] = useState(false);
    const [inputValue, setInputValue] = useState(searchTerm);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setSearchTerm(value);
    };

    const handleClearInput = () => {
        setInputValue('');
        setSearchTerm('');
        setFocused(false);
    };

    return (
        <div className="relative flex w-full pl-2 py-1 rounded-md bg-gray-600 text-white group">
            <AnimatePresence>
                {!focused && (
                    <motion.div
                        className="flex justify-center items-center absolute ri-search-line text-white w-5 h-5"
                        initial={{ rotate: 125 }}
                        animate={{ rotate: 0 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {focused && (
                    <motion.div
                        className="flex justify-center items-center absolute ri-arrow-left-line text-blue-300 w-5 h-5 cursor-pointer text-xl"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        onClick={handleClearInput}
                    ></motion.div>
                )}
            </AnimatePresence>

            <input
                type="text"
                placeholder={!focused ? "Buscar" : ""}
                value={inputValue}
                className="relative left-7 text-sm font-semibold focus:border-none focus:outline-none bg-transparent w-full placeholder:hidden pt-[0.5px]"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={handleSearchChange}
            />
            <AnimatePresence>
                {inputValue !== '' && (
                    <motion.div
                        className="flex justify-center items-center absolute right-2 ri-close-line text-gray-400 w-6 h-6 cursor-pointer text-xl"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.1 }}
                        onClick={handleClearInput}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchInput;
