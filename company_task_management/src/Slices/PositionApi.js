import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:5036/" });

export const fetchPositionData = () => {
  return axiosInstance.get("api/PositionMasters");
};

export const deletePositionData = (id) => {
  return axiosInstance.delete(`api/PositionMasters/${id}`);
};

export const updatePositionData = (id) => {
  return axiosInstance.put(`api/PositionMasters/${id}`);
};

export const insertPositionData = (positionWithGuidlines) => {
  return axiosInstance.post(`api/PositionMasters`, positionWithGuidlines)
}

export const fetchPositionById = (id) => {
  return axiosInstance.get(`api/PositionMasters/${id}`);
};

export const getChainPostionByIds = (ids) => {
  return axiosInstance.get(`api/PositionMasters/postionChain/${ids}`);
};
