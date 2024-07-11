import axios from "axios"

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" })

let config

function setConfig() {
  const token = localStorage.getItem("token")

  config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const fetchPositionData = () => {
  setConfig()
  return axiosInstance.get("api/PositionMasters", config)
}

export const getPositionGuidlinesById = (positionId) => {
  setConfig()
  return axiosInstance.get(
    `api/PositionGuidelines/getbypositionid/${positionId}`,
    config
  )
}

export const getGuidlineByGuidlineId = (positionId) => {
  setConfig()
  return axiosInstance.get(`api/PositionGuidelines/${positionId}`, config)
}

export const deleteGuidlineByGuidlineId = (guidlineId) => {
  setConfig()
  return axiosInstance.delete(`api/PositionGuidelines/${guidlineId}`, config)
}

export const insertpositionGuidline = (guidline) => {
  setConfig()
  return axiosInstance.post(`api/PositionGuidelines/`, guidline, config)
}

export const updateGuidline = (guidlineId, name) => {
  setConfig()
  return axiosInstance.patch(
    `api/PositionGuidelines/${guidlineId}/${name}`,
    config
  )
}

export const deletePositionData = (id) => {
  setConfig()
  return axiosInstance.delete(`api/PositionMasters/${id}`, config)
}

export const updatePositionData = (id) => {
  setConfig()
  return axiosInstance.put(`api/PositionMasters/${id}`, config)
}

export const insertPositionData = (positionWithGuidlines) => {
  setConfig()
  return axiosInstance.post(
    `api/PositionMasters`,
    positionWithGuidlines,
    config
  )
}

export const fetchPositionById = (id) => {
  setConfig()
  return axiosInstance.get(`api/PositionMasters/${id}`, config)
}

export const getChainPostionByIds = (ids) => {
  setConfig()
  return axiosInstance.get(`api/PositionMasters/postionChain/${ids}`, config)
}
