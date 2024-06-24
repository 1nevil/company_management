import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

export const fetchPositionData = () => {
  return axiosInstance.get("api/PositionMasters")
}

export const getPositionGuidlinesById = (positionId) => {
  return axiosInstance.get(
    `api/PositionGuidelines/getbypositionid/${positionId}`
  )
}

export const getGuidlineByGuidlineId = (positionId) => {
  return axiosInstance.get(`api/PositionGuidelines/${positionId}`)
}

export const deleteGuidlineByGuidlineId = (guidlineId) => {
  return axiosInstance.delete(`api/PositionGuidelines/${guidlineId}`)
}

export const insertpositionGuidline = (guidline) => {
  return axiosInstance.post(`api/PositionGuidelines/ `, guidline)
}

export const updateGuidline = (guidlineId, name) => {
  console.log(name)
  return axiosInstance.patch(`api/PositionGuidelines/${guidlineId}/${name}`)
}

export const deletePositionData = (id) => {
  return axiosInstance.delete(`api/PositionMasters/${id}`)
}

export const updatePositionData = (id) => {
  return axiosInstance.put(`api/PositionMasters/${id}`)
}

export const insertPositionData = (positionWithGuidlines) => {
  return axiosInstance.post(`api/PositionMasters`, positionWithGuidlines)
}

export const fetchPositionById = (id) => {
  return axiosInstance.get(`api/PositionMasters/${id}`)
}

export const getChainPostionByIds = (ids) => {
  return axiosInstance.get(`api/PositionMasters/postionChain/${ids}`)
}
