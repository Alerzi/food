import react from "react";

// закрытие меню при клике за его пределами

export const useClickOutside = (ref: any, ref2: any, callback: any) => {
    const handleClick = (e: any) => {
        if(ref.current && !ref.current.contains(e.target) && ref2.current && !ref2.current.contains(e.target)) {
            callback();
        }
    };
    react.useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    });
}