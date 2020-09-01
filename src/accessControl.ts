import {UserType} from "@/model/User";

export function ifRoleCanVerify(role: UserType): boolean {
    return role === "ARCH_DEPT" || role === "JUDICIAL_DEPT" || role === "ADMIN";
}
export function ifRoleCanAdmin(role: UserType): boolean {
    return role === "ADMIN";
}

export function ifRoleCanImport(role: UserType): boolean {
    return role === "ARCH_DEPT" || role === "JUDICIAL_DEPT" || role === "ADMIN" || role === "AUCTIONEER" || role === "ANTIQUE_STORE";
}

export function ifRoleCanWearAndTear(role: UserType): boolean {
    return role === "JUDICIAL_DEPT" || role === "ADMIN";
}

export function ifRoleCanCred(role: UserType): boolean {
    return role === "ARCH_DEPT" || role === "ADMIN";
}

export function ifRoleCanInventory(role: UserType): boolean {
    return role === "AUTH_CENTER" || role === "ADMIN";
}
