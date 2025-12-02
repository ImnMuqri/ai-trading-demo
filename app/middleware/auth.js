import { useAuthStore } from "@/stores/auth"

export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()

  if (!auth.token) {
    return navigateTo("/login")
  }

  if (!auth.user) {
    const userCookie = useCookie("user")
    if (userCookie.value) {
      try {
        auth.user = typeof userCookie.value === "string"
          ? JSON.parse(userCookie.value)
          : userCookie.value
      } catch {
        auth.user = null
      }
    }
  }
})
