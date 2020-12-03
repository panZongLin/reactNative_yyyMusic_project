import request from '@/utils/request';

export function getBannerQuest(payload) {
    return request({
        url: `/banner?type=${payload.type}`, 
        method: 'get',
    })
}