"use strict";
const baseURL = "http://localhost:8080/";
async function getAllLines() {
    const url = baseURL + "lines/";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result);
        return result;
    }
    catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.error(error.message);
    }
}
getAllLines();
