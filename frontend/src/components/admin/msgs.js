import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export function defaultError(payload) {
    const mensagem = payload === undefined || !payload.msg ? "Oops.. Erro Inesperado." : payload.msg
    toast.error(mensagem, {
        position: toast.POSITION.TOP_RIGHT
    });
}

export function defaultSucess(payload) {
    const mensagem = payload === undefined || !payload.msg ? "Operação realizada com sucesso!" : payload.msg
    toast.success(mensagem, {
        position: toast.POSITION.TOP_RIGHT
    });
}




