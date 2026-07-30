import { apiRequest } from "./authApi";

export const getMyApplications = () => apiRequest("/api/applications");
export const getAdminDashboard = () => apiRequest("/api/admin/dashboard");
export const getAdminApplications = () => apiRequest("/api/admin/applications");
export const reviewAdminApplication = (id, status, reviewNote) => apiRequest(`/api/admin/applications/${encodeURIComponent(id)}`, {
  method: "PATCH", body: JSON.stringify({ status, reviewNote }),
});
export const getAdminUsers = () => apiRequest("/api/admin/users");
export const updateAdminUser = (id, changes) => apiRequest(`/api/admin/users/${encodeURIComponent(id)}`, {
  method: "PATCH", body: JSON.stringify(changes),
});
