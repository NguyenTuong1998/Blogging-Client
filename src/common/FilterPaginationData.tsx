import axios from "axios";

// @ts-ignore
export const FilterPaginationData = async({create_new_arr = false, state, data, page, countRoute, data_to_send = {}}) => {

    let obj;

    if(state !== null && !create_new_arr){
        // @ts-ignore
        obj = {...state, results: [...state.results, ...data], page: page}
    }else{

        await axios.post(process.env.VITE_SERVER_DOMAIN + countRoute, data_to_send)
        .then(({data : {totalDocs}}) => {
            obj = {results: data, page: 1, totalDocs}
        })
        .catch(err => console.log(err));
    }

    return obj;
}