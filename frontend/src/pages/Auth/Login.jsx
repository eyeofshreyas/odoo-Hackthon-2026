import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, MapPin, ArrowRight, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { PATHS } from '../../routes/paths';

const loginSchema = z.object({
  email:    z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError]         = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  });

  const onSubmit = async (data) => {
    setApiError('');
    try {
      await login(data);
      navigate(PATHS.DASHBOARD, { replace: true });
    } catch (err) {
      setApiError(err.message ?? 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-4 sm:p-6">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2563eb]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#004ac6]/5 rounded-full blur-3xl" />
      </div>

      <main className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_8px_40px_rgba(37,99,235,0.08)] p-8 sm:p-10">
          
          {/* Logo + header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-14 h-14 bg-[#2563eb] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#2563eb]/25">
              <MapPin size={26} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#004ac6] leading-tight">TransitOps</h1>
            <p className="text-[13px] text-[#737686] mt-1">Smart Transport Management Platform</p>
            <div className="mt-5 space-y-0.5">
              <h2 className="text-lg font-semibold text-[#131b2e]">Welcome back</h2>
              <p className="text-sm text-[#737686]">Sign in to your operations account</p>
            </div>
          </div>

          {/* API Error */}
          {apiError && (
            <div role="alert" className="flex items-start gap-2.5 mb-5 px-4 py-3 bg-[#fee2e2] border border-[#fca5a5] rounded-lg">
              <AlertCircle size={16} className="text-[#dc2626] shrink-0 mt-0.5" />
              <p className="text-sm text-[#b91c1c]">{apiError}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            
            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="block text-xs font-semibold text-[#434655] uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none">
                  <Mail size={16} />
                </span>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={[
                    'w-full h-11 pl-10 pr-4 text-sm rounded-lg border bg-white text-[#131b2e] placeholder-[#737686]',
                    'transition-colors duration-150 focus:outline-none focus:ring-2',
                    errors.email
                      ? 'border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/20'
                      : 'border-[#cbd5e1] hover:border-[#94a3b8] focus:border-[#2563eb] focus:ring-[#2563eb]/20',
                  ].join(' ')}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p id="email-error" role="alert" className="text-xs text-[#dc2626] flex items-center gap-1 mt-1">
                  <AlertCircle size={11} />
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="login-password" className="block text-xs font-semibold text-[#434655] uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none">
                  <Lock size={16} />
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className={[
                    'w-full h-11 pl-10 pr-11 text-sm rounded-lg border bg-white text-[#131b2e] placeholder-[#737686]',
                    'transition-colors duration-150 focus:outline-none focus:ring-2',
                    errors.password
                      ? 'border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/20'
                      : 'border-[#cbd5e1] hover:border-[#94a3b8] focus:border-[#2563eb] focus:ring-[#2563eb]/20',
                  ].join(' ')}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#737686] hover:text-[#131b2e] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2563eb] rounded"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" role="alert" className="text-xs text-[#dc2626] flex items-center gap-1 mt-1">
                  <AlertCircle size={11} />
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between py-0.5">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#cbd5e1] text-[#2563eb] focus:ring-[#2563eb]/30 cursor-pointer"
                  {...register('remember')}
                />
                <span className="text-sm text-[#434655] group-hover:text-[#131b2e] transition-colors select-none">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8] transition-colors focus:outline-none focus-visible:underline"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={[
                'w-full h-11 flex items-center justify-center gap-2 px-4 rounded-lg font-semibold text-sm text-white',
                'bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] transition-all duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2',
                'shadow-lg shadow-[#2563eb]/20',
                isSubmitting ? 'opacity-80 cursor-not-allowed' : '',
              ].join(' ')}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-7 text-center text-sm text-[#737686]">
            Don&apos;t have an account?{' '}
            <Link
              to={PATHS.SIGNUP}
              className="font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors focus:outline-none focus-visible:underline"
            >
              Create account
            </Link>
          </p>

          {/* Demo hint */}
          <div className="mt-5 px-4 py-3 bg-[#f2f3ff] rounded-lg border border-[#c3c6d7]">
            <p className="text-xs text-[#434655] text-center font-medium">
              🚀 First time? <Link to={PATHS.SIGNUP} className="text-[#2563eb] font-semibold hover:underline">Create an account</Link> to get started
            </p>
          </div>
        </div>

        {/* Footer brand */}
        <p className="mt-5 text-center text-xs text-[#737686]">
          TransitOps © 2026 · Secure Login
        </p>
      </main>
    </div>
  );
};

export default LoginPage;
