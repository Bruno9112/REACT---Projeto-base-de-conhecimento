import { defaultError, successToaste } from "./components/admin/msgs"

export const baseApiUrl = "http://localhost:3001"

export function showError(e) {
    if(e && e.response && e.response.data){
        defaultError({ msg: e.response.data })
    } else if(typeof e === "string"){
        defaultError({ msg: e })
    } else {
        defaultError()
    }
}