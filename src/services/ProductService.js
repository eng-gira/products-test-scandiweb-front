import axios from 'axios'


const apiClient = axios.create({
    baseURL: 'http://localhost/products-test-scandiweb-back/api/products/',
    withCredentials: false,
})


export default {
    getProducts() {
        return apiClient.get('index')
    },
    saveProduct(data) {
        return apiClient.post('store', data)
    },
    massDelete(data) {
        return apiClient.post('massDelete', data)
    }
}