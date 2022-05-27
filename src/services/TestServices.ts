import axios from "@/request";
import CommonApiModel from "@/type/API";
import { AxiosResponse } from "axios";

export function test_api_service(params): Promise<any> {
  return new Promise((resolve: (data) => void, reject: (err) => void) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    }, 3000);
  });
}
