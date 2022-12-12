const fetchWithoutToken = async (endpoint, method ="GET", date) => {

    const apiUrlBase = "http://localhost:4000/api"
    const url = `${apiUrlBase}${endpoint}`;

    let response;

    if (method === "GET") {
        response = await fetch(url);
    }

    if(method === "POST") {
        response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(date)
        })
    }


    let result = await response.json();


    return result
}

const useFetchWithToken = async (endpoint, method ="GET", token, date) => {

    const apiUrlBase = "http://localhost:4000/api"
    const url = `${apiUrlBase}${endpoint}`;

    let response;

    if (method === "GET") {
        response = await fetch(url, {
            method,
            headers: {
                Authorization: token
            }
        });
    }

    if(method === "POST") {
        response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(date)
        })
    }


    let result = await response.json();


    return result
}

export {
    fetchWithoutToken,
    useFetchWithToken
}