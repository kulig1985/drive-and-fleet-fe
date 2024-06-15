

export interface PartnerDTO {
    partnerId?: number | null;
    partnerName?: string;
    partnerType?: string;
    partnerMail?: string;
    partnerPhone?: string;
}

export interface WorkOrderDTO {
    orderId?: number | null;
    plateNr?: string | null;
    carType?: string | null;
    carUserName?: string | null;
    rideCnt?: number | null;
    commentText?: string | null;
    crDate?: string | null;
    crUser?: null | null;
    modDate?: string | null;
    modUser?: null | null;
    boolId?: number | null;
    rides?: RideDTO[];
    partner?: PartnerDTO;
}
export interface DriverDTO {
    driverId: number;
    driverName?: string;
    driverRealName?: string;
    driverMail?: string;
    driverType?: string;
}
export interface RelRideDriverDTO {
    ridrId: number;
    driver: DriverDTO;
}
export interface RideDTO {
    
    rideId?: number;
    orderId?: number;
    executeNr: number;
    pickUpTime: Date | null;
    startLocationZip: number | null;
    startLocationCity: string | null;
    startLocationAddress: string | null;
    finishLocationZip: number | null;
    finishLocationCity: string | null;
    finishLocationAddress: string | null;
    crDate?: string;
    crUser?: string | null | undefined;
    modDate?: string | null | undefined;
    modUser?: string | null;
    boolId?: number | null | undefined;
    relRideDrivers: RelRideDriverDTO[];
    order?: WorkOrderDTO |  null ;
    files?: FileDTO[] |  null;
    rideSurveyResults?: RideSurveyResultDTO[] | undefined | null;
}

export class SurveyDResultTypeDTO {
    stypeId: number;
    typeName: string;
}

export class RideSurveyResultDTO {
    sureId: number;
    survValue: string | null;
    crDate: Date | null;
    crUser: string | null;
    modDate: Date | null;
    modUser: string | null;
    boolId: number | null;
    stype: SurveyDResultTypeDTO;
}
export class FileDTO {
    fileId: number;
    fileName: string | null;
    filePath: string | null;
    fileType: string | null;
    crDate: Date | null;
    crUser: string | null;
    modDate: Date | null;
    modUser: string | null;
    boolId: number | null;
}
