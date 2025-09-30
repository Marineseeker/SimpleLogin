import request from '@/utils/request.js'

export const getAllLessonsService = () => {
  return request({
    url: '/lessons',
    method: 'get',
  })
}

export const getMyLessonsService = () => {
  return request({
    url: '/mylessons',
    method: 'get',
  })
}

// 根据ID获取课程详情
export const getLessonDetailService = (id) => {
  return request({
    url: `/lessons`,
    method: 'get',
    params: { id },
  })
}
