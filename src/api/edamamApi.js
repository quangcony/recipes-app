import axiosClient from './axiosClient'

const edamamApi = {
  getRecipeSearch: (params) => {
    const url = ''
    return axiosClient.get(url, params)
  },
  getRecipeDetail: (id, params) => {
    const url = id
    return axiosClient.get(url, params)
  },
  getRecipeSimilar: (params) => {
    const url = ''
    return axiosClient.get(url, params)
  },
}

export default edamamApi
