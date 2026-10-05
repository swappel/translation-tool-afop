/**
 * LoadFromLocalServer.ts
 *
 * This file holds the logic to fetch the JSON information from the AFoP translation backends.
 *
 * @author Palkxarunä
 */

const defaultURL = "http://localhost:8080/";

/**
 * Fetches all lines and returns the JSON for the lines as a string.
 *
 * WARNING: This can fetch upwards of 60k-100k+ lines and cause extreme lag.
 *
 * @returns The raw response as a `Response` object.
 */
async function fetchAllLines() {
    const url = defaultURL + "all-lines/";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}\nMessage: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.error(error.message);
    }
}

/**
 * Fetches lines in a certain range.
 *
 * @param start The line to start the fetch from.
 * @param count The number of lines to be fetched.
 * If range exits the bounds of available lines, the returned list will be cut short
 *
 * WARNING: Higher numbers for the count parameter can cause
 *
 * @returns The raw response as a `Response` object.
 */
async function fetchLineRange(start: number, count: number) {
    const url = defaultURL + `line-range?start=${start}&count=${count}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}\nMessage: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.error(error.message);
    }
}

/**
 * Searches through the lines in the files.
 *
 * @param query The string in the searchbar. Has to be at least 3 characters.
 * @param ignoreCase Whether or not to ignore case in the query.
 *
 * @returns The raw response as a `Response` object containing all the lines that have matches.
 */
async function searchLine(query: string, ignoreCase: boolean) {
    const url = defaultURL + `search-lines?query="${query}"&ignoreCase=${ignoreCase}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}\nMessage: ${response.statusText}`);
        }

        return response;
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.error(error.message);
    }
}
