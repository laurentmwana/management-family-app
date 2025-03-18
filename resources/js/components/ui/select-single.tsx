import { ChevronDown, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { Separator } from "./separator";

interface Option {
    value: string;
    label: string;
}

interface SingleSelectProps {
    options: Option[];
    placeholder?: string;
    onChange: (selectedOption: string) => void;
    value?: string;
}

const findOption = (
    options: Option[],
    value: string | undefined
): Option | undefined => {
    return options.find((option) => option.value === value);
};

export const SelectSingle: React.FC<SingleSelectProps> = ({
    value,
    options,
    placeholder = "Selectionne une option...",
    onChange,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | undefined>(
        findOption(options, value)
    );
    const [searchTerm, setSearchTerm] = useState("");
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const selectOption = (option: Option) => {
        setSelectedOption(option);
        onChange(option.value);
        setIsOpen(false);
    };

    const removeOption = () => {
        setSelectedOption(undefined);
        onChange("");
    };

    const filteredOptions = options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div
                className="flex h-9 w-full items-center rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm  placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                onClick={() => setIsOpen(!isOpen)}
            >
                {!selectedOption ? (
                    <div className="text-gray-400">{placeholder}</div>
                ) : (
                    <div className="border cursor-pointer shadow-sm bg-gray-50  dark:bg-gray-50/45 dark:text-gray-200 rounded-lg px-2 py-1 text-xs mr-1 mb-1 flex items-center">
                        <span>{selectedOption.label}</span>
                        <X
                            size={14}
                            className="ml-1 cursor-pointer hover:text-destructive"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeOption();
                            }}
                        />
                    </div>
                )}
                <ChevronDown size={20} className="ml-auto" />
            </div>
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-card border border-input rounded-md shadow-lg px-3 py-4">
                    <Input
                        className="w-full p-2 border-b border-gray-300"
                        placeholder="Recherche..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Separator className="my-3" />
                    <ul className="max-h-[100px] overflow-y-auto">
                        {filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                className={`p-2 cursor-pointer text-sm hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md mb-2 ${
                                    selectedOption?.value === option.value
                                        ? "bg-gray-50 dark:bg-gray-700"
                                        : ""
                                }`}
                                onClick={() => selectOption(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
