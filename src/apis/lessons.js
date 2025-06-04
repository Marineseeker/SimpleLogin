import request from "@/utils/request.js"

export const getAllLessonsService = () => {
  return request({
    url:"/lessons",
    method:'get',
  })
}

export const getMyLessonsService = () => {
  return request({
    url: "/mylessons",
    method: "get",
  })
}
