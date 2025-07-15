"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (data: { nickname: string; password: string }) => {
    await login(data.nickname, data.password);
    router.push("/dashboard");
  };

  return <AuthForm mode="login" onSubmit={handleLogin} />;
}
