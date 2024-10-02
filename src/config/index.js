import { mock } from "mockjs";

const env = import.meta.env.MODE || "prod";
const EnvConfig = {
  development: {
    baseApi: "/api",
    mockApi: "https://apifoxmock.com/m1/4068509-0-default/api", // 使用正确的 mock 地址
  },
  test: {
    baseApi: "//test.future.com/api",
    mockApi: "",
  },
  prod: {
    baseApi: "//future.com/api",
    mockApi: "",
  },
};

export default {
  env,
  ...EnvConfig[env],
  // mock
  mock: false,
};
