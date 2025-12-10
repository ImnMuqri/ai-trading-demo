// plugins/auth-restore.client.js
import { useAuthStore } from "@/stores/auth";

export default defineNuxtPlugin(async () => {
  const auth = useAuthStore();
  console.log("[AuthRestore] Restoring session before any request");
  await auth.restoreSession();
  console.log("[AuthRestore] Session restored:", auth.token);
  console.log("[AuthRestore] Refresh restored:", auth.refreshToken);
});
