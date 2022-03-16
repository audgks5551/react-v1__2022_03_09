import { useSetRecoilState } from "recoil";
import { useFetchWrapper } from "_helpers";
import { authAtom } from "_state";
import { useNavigate } from "react-router-dom";

export { useUserActions };

function useUserActions() {
    const baseUrl = process.env.REACT_APP_API_URL;
    const fetchWrapper = useFetchWrapper();
    const setAuth = useSetRecoilState(authAtom);
    const history = useNavigate();

    return {
        signup,
        login
    };

    function signup(username, password, name) {
        return fetchWrapper.post(`${baseUrl}/users`,{ username, password, name })
            .then(() => {
                history("/login");
            })
    }

    function login(username, password) {
        return fetchWrapper.post(`${baseUrl}/login`,{ username, password })
            .then(response => {
                const access_token = response.data.access_token;
                const refresh_token = response.data.refresh_token;
                localStorage.setItem('access_token', access_token);
                localStorage.setItem('refresh_token', refresh_token);
                history("/");
            })
    }
}


