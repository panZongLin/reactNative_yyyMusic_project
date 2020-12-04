import request from '@/utils/request';

export function submitLoginQuest(payload) {
    return request({
        url: `/login/cellphone`, 
        method: 'post',
        data: payload
    })
}

export function submitLoginOutQuest(payload) {
    return request({
        url: `/logout`, 
        method: 'post',
    })
}