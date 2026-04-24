const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function getSupabaseEnv() {
  return {
    url: SUPABASE_URL,
    key: SUPABASE_KEY,
  };
}

export function hasSupabaseEnv() {
  return Boolean(SUPABASE_URL && SUPABASE_KEY);
}

export function requireSupabaseEnv() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    const missing = [
      !SUPABASE_URL ? "NEXT_PUBLIC_SUPABASE_URL" : null,
      !SUPABASE_KEY
        ? "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (or NEXT_PUBLIC_SUPABASE_ANON_KEY)"
        : null,
    ].filter(Boolean);

    throw new Error(
      `Missing Supabase environment variables: ${missing.join(", ")}`
    );
  }

  return {
    url: SUPABASE_URL,
    key: SUPABASE_KEY,
  };
}
