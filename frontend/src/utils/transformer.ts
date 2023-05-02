import {PositionType} from '../types/types';

export const getPreviousLevelPosition = (el: PositionType, data: PositionType[]) => {
    const returnArray = [] as number[];
    data.forEach((el: PositionType, index) => {
        if (el.positionType.level !== 0) {
            const reportingPositionId = el.reportingPositionId;
            if (reportingPositionId) {
                // @ts-ignore
                returnArray.push([reportingPositionId, el.id]);
            } else{
                const lastRow = data[index - 1];
                // @ts-ignore
                returnArray.push([lastRow.id, el.id]);
            }
        }
    });
    console.log('returnArray', returnArray);
    return returnArray;
};

export const getDataOptionForOrganizationCharts = (data: PositionType[]) => {
    const returnArray = [] as number[];
    data.forEach((el: PositionType, index) => {
        if (el.positionType.level !== 0) {
            const reportingPositionId = el.reportingPositionId;
            if (reportingPositionId) {
                // @ts-ignore
                returnArray.push([reportingPositionId, el.id]);
            } else{
                const lastRow = data[index - 1];
                // @ts-ignore
                returnArray.push([lastRow.id, el.id]);
            }
        }
    });
    console.log('returnArray', returnArray);
    return returnArray;
};

export const getNodesOptionForOrganizationCharts = (data: PositionType[]) => {
    const returnArray = [] as number[];
    data.forEach((el: PositionType, index) => {
        const {staff, id: positionId} = el;
        const isVacant = !staff;
        const {
            id,
            firstName,
            lastName
        } = staff || {};
        // @ts-ignore
        returnArray.push({
            id: positionId,
            title: el.title,
            name: !isVacant ? `Employee #${id} - ${firstName} ${lastName}` : `Position #${positionId} -Vacant Position`,
            appData: el,
            color: isVacant ? "gray" : undefined,
            dataLabels: {
                color: isVacant ? "black" : undefined,
            },
        });
    });
    return returnArray;
};


export const isStringAndNotEmpty = (p:any) => {
    return p && typeof p === 'string' && p !== '';
}
