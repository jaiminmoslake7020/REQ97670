import {DescendantEmployee, PositionType, StaffType} from '../types/types';
import {Position} from 'postcss';

const url = 'http://localhost:3000';

export const getAllPositions = () : Promise<PositionType[]|string> => {
    return new Promise((resolve) => {
        fetch(url+"/position")
            .then(r => r.json()).then((data: PositionType[]) => {
            console.log(data);
            resolve(data);
        }).catch((e) => {
            console.log(e);
            resolve('Error occured!');
        });
    })
}

export const updateEmployeeFn = (id:number, formData: Partial<StaffType>) : Promise<StaffType|string> => {
    return new Promise((resolve) => {
        fetch(url+"/staff/"+id, {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(formData) as any
        })
            .then(r => r.json()).then((data: StaffType) => {
            console.log(data);
            resolve(data);
        }).catch((e) => {
            console.log(e);
            resolve('Error occured!');
        });
    })
}


export const removeEmployeeApi = (id:number) : Promise<PositionType|string> => {
    return new Promise((resolve) => {
        fetch(url+"/position/remove-employee/"+id,{
            method: 'POST'
        })
            .then(r => r.json()).then((data: PositionType) => {
            if (data.id) {
                console.log(data);
                resolve(data);
            } else {
                resolve('Error occured!');
            }
        }).catch((e) => {
            console.log(e);
            resolve('Error occured!');
        });
    })
}


export const addDescendantPositionFn = (id:number,formData: DescendantEmployee) : Promise<PositionType|string> => {
    return new Promise((resolve) => {
        fetch(url+"/position/add-descendant/"+id, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(formData) as any
        })
        .then(r => r.json()).then((data: PositionType) => {
            console.log(data);
            resolve(data);
        }).catch((e) => {
            console.log(e);
            resolve('Error occured!');
        });
    })
}


export const fillPositionStaffFn = (id:number, staff: Partial<StaffType>) : Promise<PositionType|string> => {
    return new Promise((resolve) => {
        fetch(url+"/position/fill/"+id, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            },
            body: JSON.stringify(staff) as any
        })
            .then(r => r.json()).then((data: PositionType) => {
            console.log(data);
            resolve(data);
        }).catch((e) => {
            console.log(e);
            resolve('Error occured!');
        });
    })
}


