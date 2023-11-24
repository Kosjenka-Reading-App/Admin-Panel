export type AdminPermission = "admin" | "superadmin";

const ADMIN_PERMISSIONS: Record<string, AdminPermission> = {
  ADMIN: "admin",
  SUPERADMIN: "superadmin",
};

const ADMIN_PERMISSIONS_VALUE = {
  admin: 0,
  superadmin: 1,
};

export { ADMIN_PERMISSIONS_VALUE, ADMIN_PERMISSIONS };
