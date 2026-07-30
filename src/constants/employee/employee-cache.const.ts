import type { EmployeesQuery, ObjectIdString, ValueOf } from "@/types/employee/employee.types";

export const EMPLOYEES_CACHE_KEYS = {
  list: (q: EmployeesQuery) =>
    `employees:list:${JSON.stringify({
      page: q.page ?? 1,
      limit: q.limit ?? 20,
      sortBy: q.sortBy ?? "createdAt",
      sortOrder: q.sortOrder ?? "desc",
      filters: q.filters ?? {},
    })}`,
  detail: (id: ObjectIdString) => `employees:detail:${id}`,
  enums: "employees:enums",
} as const;

export type EmployeesCacheKey = ValueOf<typeof EMPLOYEES_CACHE_KEYS>;

export const sortableEmployeeFields = [
  "user.name",
  "user.email",
  "employmentType",
  "status",
  "salary",
  "dateOfJoining",
  "dateOfLeaving",
  "createdAt",
  "updatedAt",
] as const;

export type SortableEmployeeField = (typeof sortableEmployeeFields)[number];
