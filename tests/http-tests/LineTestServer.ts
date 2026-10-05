const baseURL = "http://localhost:8080/";

async function getAllLines() {
    const url = baseURL + "lines/102";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}\nMessage: ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.error(error.message);
    }
}

getAllLines().then((result) => {
    console.log(result);
});