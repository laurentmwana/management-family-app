import { ChevronDown, Loader2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "./input";
import { Separator } from "./separator";

interface Option {
    value: string;
    label: string;
}

interface MultipleSelectProps {
    options: Option[];
    placeholder?: string;
    onChange: (selectedOptions: string[]) => void;
    values?: string[];
    isPending?: boolean;
}

const mapOption = (options: Option[], values: string[]) => {
    const newOptions: Option[] = [];

    for (let index = 0; index < values.length; index++) {
        const v = values[index];
        const option = options.find((option) => option.value == v);
        if (option) newOptions.push(option);
    }

    return newOptions;
};

export const SelectMultiple: React.FC<MultipleSelectProps> = ({
    values = [],
    options,
    placeholder = "Selectionner les options...",
    onChange,
    isPending = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Option[]>(
        mapOption(options, values)
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

    const toggleOption = (option: Option) => {
        if (isPending) return;
        const updatedSelection = selectedOptions.some(
            (item) => item.value === option.value
        )
            ? selectedOptions.filter((item) => item.value !== option.value)
            : [...selectedOptions, option];

        setSelectedOptions(updatedSelection);
        onChange(updatedSelection.map((v) => v.value));
    };

    const removeOption = (option: Option) => {
        if (isPending) return;
        const updatedSelection = selectedOptions.filter(
            (item) => item.value !== option.value
        );
        setSelectedOptions(updatedSelection);
        onChange(updatedSelection.map((v) => v.value));
    };

    const filteredOptions = options.filter((option) => {
        if (!option) {
            return false;
        }

        return option.label.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <div
                className={`flex h-auto w-full items-center flex-wrap cursor-pointer whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring ${
                    isPending ? "opacity-50 cursor-not-allowed" : ""
                } [&>span]:line-clamp-1`}
                onClick={() => !isPending && setIsOpen(!isOpen)}
            >
                {isPending ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : selectedOptions.length === 0 ? (
                    <div className="text-gray-400">{placeholder}</div>
                ) : (
                    selectedOptions.map((option) => (
                        <div
                            key={option.value}
                            className="border cursor-pointer shadow-sm bg-accent text-muted-foreground rounded-lg px-2 py-1 text-xs mr-1 mb-1 flex items-center"
                        >
                            <span>{option.label}</span>
                            <X
                                size={14}
                                className="ml-1 cursor-pointer hover:text-destructive"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeOption(option);
                                }}
                            />
                        </div>
                    ))
                )}
                <ChevronDown size={20} className="ml-auto" />
            </div>
            {isOpen && !isPending && (
                <div className="absolute z-10 w-full mt-1 bg-card border border-input rounded-md shadow-lg px-3 py-4">
                    <Input
                        className="w-full p-2 border-b border-gray-300"
                        placeholder="Recherche..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Separator className="my-3" />
                    <ul className="max-h-60 overflow-y-auto">
                        {filteredOptions.map((option) => (
                            <li
                                key={option.value}
                                className={`p-2 cursor-pointer text-sm hover:bg-accent rounded-md mb-2 ${
                                    selectedOptions.some(
                                        (item) => item.value === option.value
                                    )
                                        ? "bg-accent"
                                        : ""
                                }`}
                                onClick={() => toggleOption(option)}
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
