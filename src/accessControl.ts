import {UserType} from "@/model/User";
import {StageSelectNameMap} from "@/model/Verification";

export function ifRoleCanVerify(role: UserType): boolean {
    return role === "ARCH_DEPT" || role === "JUDICIAL_DEPT" || role === "ADMIN";
}
export function ifRoleCanAdmin(role: UserType): boolean {
    return role === "ADMIN";
}

export function ifRoleCanImport(role: UserType): boolean {
    return role === "ARCH_DEPT" || role === "JUDICIAL_DEPT" || role === "ADMIN" || role === "AUCTIONEER" || role === "ANTIQUE_STORE";
}
