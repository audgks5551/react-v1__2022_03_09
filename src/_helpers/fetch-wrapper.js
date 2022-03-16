export { useFetchWrapper };

function useFetchWrapper() {
    return {
        get: request("GET"),
        post: request("POST")
    }

    function request(method) {
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
        return { };
    }

    function handleResponse(response) {
        return response.text().then(text => {
            const data = text && JSON.parse(text);

            if (response.status === 409) {
                return Promise.reject(data.error);
            }

            // if (response.ok) {
            //     const token = response.headers
            //         .get("Authorization")
            //         .replaceAll("Bearer ", "");
            //     localStorage.setItem('token', token);
            // }

            return data;
        });
    }

}