export { useFetchWrapper };

function useFetchWrapper() {
    console.log("useFetchWrapper()");

    return {
        get: request("GET"),
        post: request("POST")
    }

    function request(method) {
        console.log("useFetchWrapper.request()");
        return (url, body) => {
            const requestOptions =  {
                method,
                headers: authHeader()
            };
            if (body) {
                requestOptions.headers["Content-Type"] = "application/json";
                requestOptions.body = JSON.stringify(body);
            }
            return fetch(url, requestOptions).then(handleResponse);
        }
    }

    function authHeader() {
        return { Authorization: "no" };
    }

    function handleResponse(response) {
        console.log("useFetchWrapper.handleResponse()");

        return response.text().then(text => {
            const data = text && JSON.parse(text);
            console.log();
            if (response.status === 409) {
                console.log("status: " + response.status);
                return Promise.reject(data.error);
            }

            if (response.ok) {
                const token = response.headers
                    .get("Authorization")
                    .replaceAll("Bearer ", "");
                localStorage.setItem('token', token);
            }

            return data;
        });
    }

}