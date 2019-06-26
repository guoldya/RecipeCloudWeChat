import axios from 'axios';

// 加载就诊卡片
export const loadDepart = (data = {orgType: 2}) => axios.put('/api/hos/bdHospitalOrg/read/selectHospitalAreaList', data).then(res => res.data)
