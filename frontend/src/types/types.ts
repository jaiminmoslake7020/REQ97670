export type StaffType = {
    id: number,
    firstName: string,
    lastName: string,
    createdAt: Date,
    updatedAt: Date
};

export type PositionTypeType = {
    id: number,
    title: string,
    level: number,
    createdAt: Date,
    updatedAt: Date
};

export type PositionType = {
    id: number,
    title: string,
    staff: StaffType | null,
    positionType: PositionTypeType,
    reportingPositionId: number | null | undefined,
    createdAt: Date,
    updatedAt: Date
};

export type DescendantEmployee = {
    staff: Partial<StaffType> | undefined,
    position: Partial<PositionType>,
};

export type PositionsDataSliceType = {
    positions: PositionType[],
    loading: boolean,
}

export type CurrentPositionSliceType = {
    position: PositionType | undefined,
}
