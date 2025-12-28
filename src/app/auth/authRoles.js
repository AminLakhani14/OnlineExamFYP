export const authRoles = {
  sa: ["SA"], // Super Admin Only
  admin: ["SA", "Admin"], // Super Admin & School Admin
  teacher: ["SA", "Admin", "Teacher"], // Super Admin, Admin & Teacher
  student: ["SA", "Admin", "Teacher", "Student"], // Everyone except GUEST
  guest: ["SA", "Admin", "Teacher", "Student", "GUEST"], // Everyone
};
