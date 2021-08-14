import axios from "axios";
import { parseCookies } from "nookies";
import { getApiClient } from "./axios";

export const api = getApiClient();
