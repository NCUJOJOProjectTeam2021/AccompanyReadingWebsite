import { useCallback } from "react";

export const useFetchRooms = (url) => {
    const fetchRooms = useCallback(() => {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => response.json())
                .then((data) => {
                    console.log(data.rooms);
                    resolve(data.rooms);
                })
                .catch((error) => {
                    console.log(error);
                });
        });
    }, [url]);
    return fetchRooms;
};