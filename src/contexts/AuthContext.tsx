"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { User, UserRole, SubscriptionPlan, UserSubscription } from "@/types/auth";
import { SUBSCRIPTION_CONFIG } from "@/config/subscription";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

const AUTH_STORAGE_KEY = "fgc_auth_user_v1";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isPremium: boolean;
  isConfigured: boolean;
  loginWithGoogle: (redirectTo?: string) => Promise<{ success: boolean; error?: string }>;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, name?: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  upgradeToPremium: (plan: SubscriptionPlan) => Promise<void>;
  cancelSubscription: () => Promise<void>;
  resumeSubscription: () => Promise<void>;
  // テスト・デモ用切り替え（開発および動作確認用）
  setDemoRole: (role: UserRole, plan?: SubscriptionPlan) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isConfigured = isSupabaseConfigured();

  // 初期ロード：Supabase セッション確認 ＆ localStorage / トークン互換
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      try {
        // 0. 管理者モード（フッターⒸタップによる管理者権限）が有効な場合
        const isAdminMode = typeof window !== "undefined" && localStorage.getItem("fgc_admin_mode") === "true";
        if (isAdminMode && mounted) {
          const adminUser: User = {
            id: "admin_user",
            email: "admin@nikotaro.com",
            name: "管理者（全権限）",
            authProvider: "demo",
            role: "admin",
            subscription: {
              plan: "monthly",
              status: "active",
              currentPeriodStart: Date.now(),
              currentPeriodEnd: Date.now() + 365 * 24 * 60 * 60 * 1000,
              cancelAtPeriodEnd: false,
            },
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };
          setUser(adminUser);
          setIsLoading(false);
          return;
        }

        // 1. Supabaseが設定されている場合、Supabaseのセッションを確認
        if (isSupabaseConfigured()) {
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();

          if (session?.user && mounted) {
            let storedMeta: any = {};
            try {
              const stored = localStorage.getItem(AUTH_STORAGE_KEY);
              if (stored) storedMeta = JSON.parse(stored);
            } catch {}

            const googleUser: User = {
              id: session.user.id,
              email: session.user.email || "",
              name:
                session.user.user_metadata?.full_name ||
                session.user.user_metadata?.name ||
                session.user.email?.split("@")[0] ||
                "格ゲーLAB会員",
              avatarUrl: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
              authProvider: (session.user.app_metadata?.provider as any) || "google",
              role: storedMeta?.role || "free",
              subscription: storedMeta?.subscription,
              createdAt: new Date(session.user.created_at).getTime(),
              updatedAt: Date.now(),
            };

            setUser(googleUser);
            setIsLoading(false);
            return;
          }
        }

        // 2. localStorageから復元
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored && mounted) {
          const parsed: User = JSON.parse(stored);
          // 有効期限のチェック
          if (parsed.role !== "admin" && parsed.subscription && parsed.subscription.currentPeriodEnd) {
            const isExpired = Date.now() > parsed.subscription.currentPeriodEnd;
            if (isExpired && parsed.subscription.status === "canceled") {
              parsed.role = "free";
              parsed.subscription.status = "none";
            }
          }
          setUser(parsed);
          setIsLoading(false);
          return;
        }

        // 3. 既存の fgc_membership_token が残っている既存プレミアム会員の復元
        const existingMembershipToken = localStorage.getItem("fgc_membership_token");
        const existingEmail = localStorage.getItem("fgc_user_email");
        if (existingMembershipToken && mounted) {
          const migratedUser: User = {
            id: `legacy_${Date.now()}`,
            email: existingEmail || "subscriber@nikotaro.com",
            name: (existingEmail ? existingEmail.split("@")[0] : null) || "プレミアム会員",
            authProvider: "demo",
            role: "premium",
            subscription: {
              plan: "monthly",
              status: "active",
              currentPeriodStart: Date.now() - 7 * 24 * 60 * 60 * 1000,
              currentPeriodEnd: Date.now() + 23 * 24 * 60 * 60 * 1000,
              cancelAtPeriodEnd: false,
            },
            createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
            updatedAt: Date.now(),
          };
          setUser(migratedUser);
        }
      } catch (e) {
        console.error("Failed to restore user auth state:", e);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();

    // Supabase Auth の状態変更監視（Googleログイン後のリダイレクト時など）
    let authListener: { subscription: { unsubscribe: () => void } } | null = null;
    if (isSupabaseConfigured()) {
      try {
        const supabase = createClient();
        const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
          if (!mounted) return;
          if (session?.user) {
            let storedMeta: any = {};
            try {
              const stored = localStorage.getItem(AUTH_STORAGE_KEY);
              if (stored) storedMeta = JSON.parse(stored);
            } catch {}

            setUser({
              id: session.user.id,
              email: session.user.email || "",
              name:
                session.user.user_metadata?.full_name ||
                session.user.user_metadata?.name ||
                session.user.email?.split("@")[0] ||
                "格ゲーLAB会員",
              avatarUrl: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture,
              authProvider: (session.user.app_metadata?.provider as any) || "google",
              role: storedMeta?.role || "free",
              subscription: storedMeta?.subscription,
              createdAt: new Date(session.user.created_at).getTime(),
              updatedAt: Date.now(),
            });
          }
        });
        authListener = data;
      } catch (e) {
        console.error("Failed to attach auth state listener:", e);
      }
    }

    // 管理者モード変更イベント（フッターⒸタップ）のリアルタイム監視
    const handleAdminModeEvent = (e: Event) => {
      if (!mounted) return;
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      const isEnabled = customEvent.detail ? customEvent.detail.enabled : localStorage.getItem('fgc_admin_mode') === 'true';

      if (isEnabled) {
        const adminUser: User = {
          id: 'admin_user',
          email: 'admin@nikotaro.com',
          name: '管理者（全権限）',
          authProvider: 'demo',
          role: 'admin',
          subscription: {
            plan: 'monthly',
            status: 'active',
            currentPeriodStart: Date.now(),
            currentPeriodEnd: Date.now() + 365 * 24 * 60 * 60 * 1000,
            cancelAtPeriodEnd: false,
          },
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        setUser(adminUser);
        try {
          localStorage.setItem('fgc_membership_token', 'active_admin_session');
        } catch {}
      } else {
        setUser(null);
        try {
          localStorage.removeItem('fgc_membership_token');
          localStorage.removeItem(AUTH_STORAGE_KEY);
        } catch {}
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('fgc_admin_mode_changed', handleAdminModeEvent);
    }

    return () => {
      mounted = false;
      if (authListener) authListener.subscription.unsubscribe();
      if (typeof window !== 'undefined') {
        window.removeEventListener('fgc_admin_mode_changed', handleAdminModeEvent);
      }
    };
  }, []);

  // ユーザー情報変更時のlocalStorage同期
  useEffect(() => {
    if (isLoading) return;
    try {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        // プレミアム会員の場合は既存トークンも保存
        if (user.role === "premium" || user.role === "admin") {
          localStorage.setItem("fgc_membership_token", "active_premium_session");
        }
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to persist user to localStorage:", e);
    }
  }, [user, isLoading]);

  // Google OAuth ログイン開始
  const loginWithGoogle = useCallback(async (redirectTo = "/account/subscription") => {
    try {
      if (!isSupabaseConfigured()) {
        return {
          success: false,
          error: "Supabaseの設定が完了していません。環境変数（NEXT_PUBLIC_SUPABASE_URL と NEXT_PUBLIC_SUPABASE_ANON_KEY）を設定してください。",
        };
      }
      const supabase = createClient();
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const callbackUrl = new URL("/auth/callback", origin);
      if (redirectTo) {
        callbackUrl.searchParams.set("next", redirectTo);
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl.toString(),
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "Googleログインの開始に失敗しました" };
    }
  }, []);

  // 簡易メールログイン
  const login = useCallback(async (email: string, _password?: string) => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const existingRaw = localStorage.getItem(AUTH_STORAGE_KEY);
      let existingUser: User | null = null;
      if (existingRaw) {
        try {
          const parsed = JSON.parse(existingRaw);
          if (parsed.email === cleanEmail) {
            existingUser = parsed;
          }
        } catch {}
      }

      const loggedInUser: User = existingUser || {
        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        email: cleanEmail,
        name: cleanEmail.split("@")[0] || "スト6プレイヤー",
        authProvider: "email",
        role: "free",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      setUser(loggedInUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "ログインに失敗しました" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 簡易会員登録
  const register = useCallback(async (email: string, name?: string, _password?: string) => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const newUser: User = {
        id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        email: cleanEmail,
        name: name?.trim() || cleanEmail.split("@")[0] || "格ゲーLAB会員",
        authProvider: "email",
        role: "free",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      setUser(newUser);
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || "会員登録に失敗しました" };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ログアウト処理
  const logout = useCallback(async () => {
    try {
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        await supabase.auth.signOut();
      }
    } catch (e) {
      console.warn("Supabase sign out error:", e);
    }
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      localStorage.removeItem("fgc_membership_token");
    } catch {}
  }, []);

  // プレミアムアップグレード処理（Stripe Checkoutまたはデモ）
  const upgradeToPremium = useCallback(
    async (plan: SubscriptionPlan) => {
      if (!user) {
        throw new Error("ログインしてください");
      }

      // Stripe決済エンドポイント呼び出し
      try {
        const res = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            plan,
            userId: user.id,
            userEmail: user.email,
          }),
        });
        const data = await res.json();

        if (data.url) {
          window.location.href = data.url;
          return;
        }

        // デモモードまたはキー未設定時
        if (data.demo) {
          const now = Date.now();
          const periodEnd = now + (plan === "yearly" ? 365 : 30) * 24 * 60 * 60 * 1000;
          const newSubscription: UserSubscription = {
            plan,
            status: "active",
            currentPeriodStart: now,
            currentPeriodEnd: periodEnd,
            cancelAtPeriodEnd: false,
          };
          setUser((prev) => (prev ? { ...prev, role: "premium", subscription: newSubscription } : null));
          return;
        }

        throw new Error(data.error || "決済セッションの作成に失敗しました");
      } catch (e: any) {
        console.error("Upgrade error:", e);
        // フォールバック: デモアップグレード
        const now = Date.now();
        const periodEnd = now + (plan === "yearly" ? 365 : 30) * 24 * 60 * 60 * 1000;
        const newSubscription: UserSubscription = {
          plan,
          status: "active",
          currentPeriodStart: now,
          currentPeriodEnd: periodEnd,
          cancelAtPeriodEnd: false,
        };
        setUser((prev) => (prev ? { ...prev, role: "premium", subscription: newSubscription } : null));
      }
    },
    [user]
  );

  // 解約予約処理
  const cancelSubscription = useCallback(async () => {
    if (!user || !user.subscription) return;
    const updatedSub: UserSubscription = {
      ...user.subscription,
      status: "canceled",
      cancelAtPeriodEnd: true,
    };
    setUser((prev) => (prev ? { ...prev, subscription: updatedSub } : null));
  }, [user]);

  // 定期更新再開処理
  const resumeSubscription = useCallback(async () => {
    if (!user || !user.subscription) return;
    const updatedSub: UserSubscription = {
      ...user.subscription,
      status: "active",
      cancelAtPeriodEnd: false,
    };
    setUser((prev) => (prev ? { ...prev, subscription: updatedSub } : null));
  }, [user]);

  // デモ・テスト用切り替え
  const setDemoRole = useCallback((role: UserRole, plan: SubscriptionPlan = "monthly") => {
    const now = Date.now();
    const periodEnd = now + 30 * 24 * 60 * 60 * 1000;
    const dummyUser: User = {
      id: `demo_${role}_user`,
      email: role === "free" ? "free_user@example.com" : "premium_user@nikotaro.com",
      name: role === "premium" ? "スト6実力派プレイヤー" : "一般ユーザー",
      authProvider: "demo",
      role,
      subscription:
        role === "premium"
          ? {
              plan,
              status: "active",
              currentPeriodStart: now,
              currentPeriodEnd: periodEnd,
              cancelAtPeriodEnd: false,
              stripeCustomerId: "cus_demo_nikotaro",
            }
          : undefined,
      createdAt: now,
      updatedAt: now,
    };
    setUser(dummyUser);
  }, []);

  const isPremium = user?.role === "premium" || user?.role === "admin";
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        isPremium,
        isConfigured,
        loginWithGoogle,
        login,
        register,
        logout,
        upgradeToPremium,
        cancelSubscription,
        resumeSubscription,
        setDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
