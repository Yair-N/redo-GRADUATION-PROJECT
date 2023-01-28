import { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";

export default function useFuse(searchTerm, items, options) {
    const fuse = useRef();
    const [suggestions, setSuggestions] = useState([]);
    
    useEffect(() => {
        fuse.current = new Fuse(items,options);
    }, [items, options]);

    useEffect(() => {
        const items = fuse.current.search(searchTerm);
        setSuggestions(items.map(({ item }) => item));
    }, [searchTerm]);

    return suggestions;
}