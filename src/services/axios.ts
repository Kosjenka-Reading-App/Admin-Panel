import axios from "axios";
import config from "../config";

export function get(path: string, params: Record<string, unknown>) {
  return axios.get(config.API_BASE_ROUTE + path, { params });
}
