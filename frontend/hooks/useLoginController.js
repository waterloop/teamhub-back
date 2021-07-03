import { useEffect } from "react"
import { useSelector } from "react-redux"
import api from "../store/api"
import useShouldRedirect from "./useShouldRedirect"
import { useRouter } from "next/router"
import { UserTypes } from "../store/reducers/userReducer"

/**
 * Authenticate the user (check the access token's validity)
 * and redirect the user to the appropriate webpage (if needed)
 * 
 * @param {*} loginTransition
 * @param {*} dispatch
 * @param {String} route
 */
const useLoginController = (loginTransition, dispatch, route) => {
    const router = useRouter()
    const { hydrated, token, user } = useSelector(state => state.userState)

    useEffect(() => {
        if (hydrated && token) {
            // Authenticate and check the validity of the user access token
            api.auth.loginWithToken(token, dispatch, router).then(user => {
                dispatch({ type: UserTypes.RECEIVED_LOGIN, payload: user }) // Update the Redux Store

                // Redirect the user (if necessary) to the appropriate webpage
                if (!useShouldRedirect(user, router)) {
                    loginTransition.show()
                }
            }).catch(err => {
                console.error(err);

                // Redirect the user (if necessary) to the appropriate webpage
                if (!useShouldRedirect(user,router)) {
                    loginTransition.show()
                }
            })
            return;
        }
        if (route && route === '/login') {
            loginTransition.show();
            return;
        }

        // Redirect user to initial login/signup page if they tried accessing the 2nd, 3rd, etc. step of the signup process directly
        if (hydrated && route && route.startsWith('/login')) {
            if (!useShouldRedirect(user, router)) {
                loginTransition.show();
            }
            return;
        }
    }, [hydrated])
}
export default useLoginController;