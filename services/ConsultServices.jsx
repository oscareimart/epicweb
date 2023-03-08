import axios from "axios"
import { env_values } from './../settings/env'

export const getAllData = (
    routeConsult = "",
    optionsConsult = {},
    query = []
) => {
    const options = {
        populate: "%2A",
        paginate: {
            page: 1,
            pageSize: 10,
            ...optionsConsult.paginate
        },
        random: false,
        ...optionsConsult
    }
    let urlConsult = `/${routeConsult}`
    if (options?.populate)
        urlConsult = `${urlConsult}${urlConsult.includes("?") ? '&' : '?'}populate=${options?.populate}`
    const languaje = localStorage.getItem("lan_w")
    if (languaje) {
        if (languaje !== "en")
            urlConsult = `${urlConsult}${urlConsult.includes("?") ? '&' : '?'}locale=${languaje === "es" ? `${languaje}-BO` : languaje}`
    }
    // console.log(options)
    if (options.paginate?.page && options.paginate?.pageSize) {
        // if (options.paginate?.pageSize > 25) {
        //     console.log("entro aqui")
        //     urlConsult = `${urlConsult}${urlConsult.includes("?") ? '&' : '?'}pagination[start]=0
        //     &pagination[limit]=${options.paginate?.pageSize}`
        // } else {
        urlConsult = `${urlConsult}${urlConsult.includes("?") ? '&' : '?'}pagination[page]=${options.paginate?.page}
            &pagination[pageSize]=${options.paginate?.pageSize}`
        // }
    }
    if (options.random) {
        urlConsult = `${urlConsult}${urlConsult.includes("?") ? '&' : '?'}randomSort=true`
    }
    if (query.length > 0) {
        let i = 0
        for (let row of query) {
            if (row.name && row.value) {
                urlConsult = `${urlConsult}${urlConsult.includes("?") ? '&' : '?'}
                filters[$and][${i}]${row.type === 0 ? `[${row.name}]` : ""}
                ${row.type === 1 ? `[${row.name}][${row.field}]` : ""}[$${row.sentence || 'eq'}]=${row.value}`
            } else {
                console.log("Valores incompletos para la consulta ... se excluyo del query")
            }
            i++
        }
    }
    urlConsult = urlConsult.split("\n").join("")
    urlConsult = urlConsult.split(" ").join("")
    // console.log(urlConsult)
    return axios({
        method: "get",
        baseURL: env_values.URL_BACKEND,
        url: `/api${urlConsult}`,
        headers: {
            ["Authorization"]: `bearer ${env_values.TOKEN_APP}`,
        }
    }).then(res => res)
}

export const getDataToursRandom = () => {
    return axios({
        method: "get",
        baseURL: env_values.URL_BACKEND,
        url: `/api/tourss?randomSort=true`,
        headers: {
            ["Authorization"]: `bearer b5932efef3dc2127eacda1edca2e32f418fc8d3b3e137da36fd0aceaceb52661aeb66b81dc030778c889f8237b2846f3d97aefff9a62f7e31daf5687f2d64e0fab2201bd6a6d6f554a3148189b907c4711f3bfc587e4444a0d010db40773feec5b2cf5dcef2cacd73c4d2eb7cf31bcbe150a02ba2ae8ffe3dbbab72c622daed2`,
        }
    }).then(res => res)
}

export const getSingleData = (routeConsult = "", id = "", optionsRec = {}) => {
    const options = {
        populate: "%2A",
        ...optionsRec
    }
    let urlConsult = `/${routeConsult}/${id}`
    if (options?.populate)
        urlConsult = `${urlConsult}${urlConsult.includes("?") ? '&' : '?'}populate=${options?.populate}`
    const languaje = localStorage.getItem("lan_w")
    if (languaje) {
        if (languaje !== "en") {
            urlConsult = `${urlConsult}${urlConsult.includes("?") ? '&' : '?'}locale=${languaje === "es" ? `${languaje}-BO` : languaje}`
        } else {
            urlConsult = `${urlConsult}${urlConsult.includes("?") ? '&' : '?'}locale=${languaje}`
        }
    }

    console.log(urlConsult)
    return axios({
        method: "get",
        baseURL: env_values.URL_BACKEND,
        url: `/api${urlConsult}`,
        headers: {
            ["Authorization"]: `bearer ${env_values.TOKEN_APP}`
        }
    }).then(res => res)
}

export const sendData = (routeConsult = "", data = {}, tokenCaptcha = "") => {
    let urlConsult = `/${routeConsult}`
    // console.log(data)
    return axios({
        method: "post",
        baseURL: env_values.URL_BACKEND,
        url: `/api${urlConsult}`,
        headers: {
            ["Authorization"]: `bearer ${env_values.TOKEN_APP}`,
            // ["TokenCaptcha"]: tokenCaptcha
        },
        data: {
            data: {
                ...data,
                Token: tokenCaptcha
            },

        }
    })
}