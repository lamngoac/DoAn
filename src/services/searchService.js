import * as httpRequest from '~/utils/httpRequest';

export const search = async (data) => {
    try {
        const res = await httpRequest.get('DAPAboutUs/WA_POW_AboutUs_Get', {
            data,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
