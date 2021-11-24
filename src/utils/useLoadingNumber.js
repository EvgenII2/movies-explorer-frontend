import { useEffect, useState } from "react";

function getLoadingNumber() {
    const { innerWidth: width } = window;
    let firstLoadingNumber = 0;
    let anotherLoadingNumber = 0;
    if (width < 480) {
        firstLoadingNumber = 5;
        anotherLoadingNumber = 2;
    }
    else if (width < 900) {
        firstLoadingNumber = 8;
        anotherLoadingNumber = 2;
    }
    else {
        firstLoadingNumber = 12;
        anotherLoadingNumber = 4;
    }
    return {
        firstLoadingNumber,
        anotherLoadingNumber
    };
}

export default function useLoadingNumber() {
    const [loadingNumber, setLoadingNumber] = useState(
        getLoadingNumber()
    );

    useEffect(() => {
        function handleResize() {
            setLoadingNumber(getLoadingNumber());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return { loadingNumber };
}