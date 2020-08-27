export type ApplierType = "INDIVIDUAL" | "ENTERPRISE";

export interface ApplierInfo {
    contactAddress: string;
    email: string;
    fax: string;
    id: number;
    name: string;
    tel: string;
    type: ApplierType;
    zipCode: string;
}

export interface IndividualApplierInfo extends ApplierInfo {
    citizenId: string;
}

export interface EnterpriseApplierInfo extends ApplierInfo {
    legalPerson: string;
    legalPersonPost: string;
    licenseId: string;
    registrationAddress: string;
    registrationCapital: number;
    contact: String;
    contactPost: String;
}
