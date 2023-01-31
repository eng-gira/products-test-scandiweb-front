import axios from 'axios'


const apiClient = axios.create({
    baseURL: 'http://localhost/products-test-scandiweb/api/products/',
    withCredentials: false,
})


export default {
    getProducts() {
        return apiClient.get('index')
    },
    saveProduct(data) {
        return apiClient.post('store', data)
    }
}