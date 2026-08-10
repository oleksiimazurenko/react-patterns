/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Compiler — auto-memoization, no manual useMemo/useCallback.
  reactCompiler: true,
  // Cache Components (Next 16): Partial Prerendering + the `use cache`
  // directive. Static shell is prerendered; dynamic holes stream in.
  cacheComponents: true,
}

export default nextConfig
