import axios from "lib/utils/axios";

// const urlPrefix = "/coffee/app";
const urlPrefix = "/v1";

const TokiAPI = {
    getUser: (token: string) =>
        axios.post(
            `${urlPrefix}/token?grant_type=client_credentials&client_id=toki&client_secret=toki&code=${token}`
        ),

    getAllOffices: () => axios.get(`${urlPrefix}/offices`),

    getOfficesByNearby: (lat: number, lon: number) =>
        axios.get(`${urlPrefix}/offices?lat=${lat}&lon=${lon}`),

    getOfficesByName: (name: string) =>
        axios.get(`${urlPrefix}/offices?keyword=${name}`),

    getCategories: () => axios.get(`${urlPrefix}/categories`),

    getProductsByCategory: (categoryId: string) =>
        axios.get(`${urlPrefix}/products?category=${categoryId}`),
    getProductsByMerchant: (merchantId: string) =>
        axios.get(`${urlPrefix}/products?merchant=${merchantId}`),

    getBanner: (merchantId: string) =>
        axios.get(`${urlPrefix}/merchant/${merchantId}/banner`),

    getMerchantProductsByCategory: (merchantId: string, categoryId: string) =>
        axios.get(`${urlPrefix}/merchant/${merchantId}/product/${categoryId}`),

    addToCart: async (values: any) => {
        const { data, status } = await axios.post(
            `${urlPrefix}/order/cart`,
            values
        );

        return {
            data,
            status,
        };
    },

    orderCurrentIncrement: async (values: any) => {
        const { data, status } = await axios.post(
            `${urlPrefix}/order/current/increment`,
            values
        );

        return {
            data,
            status,
        };
    },

    orderCurrentDecrement: async (values: any) => {
        const { data, status } = await axios.post(
            `${urlPrefix}/order/current/decrement`,
            values
        );

        return {
            data,
            status,
        };
    },

    viewCart: async (values: any) => {
        const { data, status } = await axios.post(
            `${urlPrefix}/order/current`,
            values
        );

        return {
            data,
            status,
        };
    },

    placeOrder: async (values: any) => {
        const { data, status } = await axios.post(`${urlPrefix}/order`, values);

        return {
            data,
            status,
        };
    },

    getOrder: (
        status: string = "ongoing",
        pageSize: number = 10,
        page: number = 1,
        merchantId: string
    ) =>
        axios.get(
            `${urlPrefix}/order/${merchantId}?status=${status}&page_size=${pageSize}&page=${page}`
        ),

    getOrderById: (orderId: string) =>
        axios.get(`${urlPrefix}/order/${orderId}`),

    submitReview: async (values: any) => {
        const { data, status } = await axios.post(
            `${urlPrefix}/review`,
            values
        );

        return {
            data,
            status,
        };
    },

    refreshEstimate: (orderId: string) =>
        axios.get(`${urlPrefix}/order/${orderId}/estimate`),

    getReviewTypes: () => axios.get(`${urlPrefix}/review/type`),

    jump: () => axios.get(`${urlPrefix}/jump`),

    jumpMerchant: (merchantId: string) =>
        axios.get(`${urlPrefix}/jump/merchant/${merchantId}`),

    getUpoint: (orderId: string) =>
        axios.get(`${urlPrefix}/order/${orderId}/upoint`),
};

export default TokiAPI;
