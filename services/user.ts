import axios from "./axios"
import {registerProps, loginProps, updateProps} from "@/utils/types"

export const UserApi = {
    async register({name, email, password, password2}: registerProps) { 
        const data = await axios.post(`/users/register`, { name, email, password, password2 }); 
        return data;
    },
    async login({email, password, token = ""}: loginProps) {
        const data = await axios.get(`/users/login?email=${email}&password=${password}&capcha=${token}`);
        return data;
    },
    async update({email, name, city, address, userId, header}: updateProps) {
        const data = await axios.patch(`/users/update`, { name, email, city, address, userId }, header);
        return data;
    },
    async getUser(id: string, header: any) {
        const data = await axios.get(`/user/` + id, header);
        return data;
    }
}