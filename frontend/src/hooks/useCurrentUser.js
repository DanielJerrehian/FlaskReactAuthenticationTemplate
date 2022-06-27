import { useContext } from "react";

import CurrentUserContext from "../context/UserProvider";


const useCurrentUser = () => {
    return useContext(CurrentUserContext);
}

export default useCurrentUser;