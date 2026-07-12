import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Briefcase, MapPin, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { PATHS } from '../../routes/paths';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain an uppercase letter')
  .regex(/[a-z]/, 'Must contain a lowercase letter')
  .regex(/[0-9]/, 'Must contain a number')
  .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Must contain a special character');

const signupSchema = z.object({
  name:            z.string().min(2, 'Full name must be at least 2 characters').max(80, 'Name too long'),
  email:           z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password:        passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  role:            z.string().min(1, 'Please select your role'),
  terms:           z.literal(true, { errorMap: () => ({ message: 'You must accept the terms to continue' }) }),
}).refine((d) => d.password === d.confirmPassword, {
  message: 'Passwords do not match',
  path:    ['confirmPassword'],
});

const ROLES = [
  { value: 'fleet-manager',     label: 'Fleet Manager'      },
  { value: 'dispatcher',        label: 'Dispatcher'         },
  { value: 'safety-officer',    label: 'Safety Officer'     },
  { value: 'financial-analyst', label: 'Financial Analyst'  },
];

/* Password strength indicator */
const getStrength = (pwd) => {
  if (!pwd) return 0;
  let score = 0;
  if (pwd.length >= 8)                                 score++;
  if (/[A-Z]/.test(pwd))                              score++;
  if (/[a-z]/.test(pwd))                              score++;
  if (/[0-9]/.test(pwd))                              score++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) score++;
  return score;
};

const strengthColors = ['', '#dc2626', '#f97316', '#eab308', '#22c55e', '#16a34a'];
const strengthLabels = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [showPassword, setShowPassword]         = useState(false);
  const [showConfirmPassword, setShowConfirm]   = useState(false);
  const [apiError, setApiError]                 = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', role: '', terms: false },
  });

  const passwordValue = watch('password', '');
  const strength = getStrength(passwordValue);

  const onSubmit = async (data) => {
    setApiError('');
    try {
      await signup({ name: data.name, email: data.email, password: data.password, role: data.role });
      navigate(PATHS.DASHBOARD, { replace: true });
    } catch (err) {
      setApiError(err.message ?? 'Signup failed. Please try again.');
    }
  };

  const Field = ({ id, label, error, children }) => (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-[#434655] uppercase tracking-wide">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-[#dc2626] flex items-center gap-1 mt-0.5">
          <AlertCircle size={11} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  );

  const inputClass = (hasError) => [
    'w-full h-11 text-sm rounded-lg border bg-white text-[#131b2e] placeholder-[#737686]',
    'transition-colors duration-150 focus:outline-none focus:ring-2',
    hasError
      ? 'border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/20'
      : 'border-[#cbd5e1] hover:border-[#94a3b8] focus:border-[#2563eb] focus:ring-[#2563eb]/20',
  ].join(' ');

  return (
    <div className="min-h-screen bg-[#faf8ff] flex items-center justify-center p-4 sm:p-6">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#2563eb]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#004ac6]/5 rounded-full blur-3xl" />
      </div>

      <main className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl border border-[#e2e8f0] shadow-[0_8px_40px_rgba(37,99,235,0.08)] p-8 sm:p-10">

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-7">
            <div className="w-14 h-14 bg-[#2563eb] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-[#2563eb]/25">
              <MapPin size={26} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-[#004ac6]">TransitOps</h1>
            <p className="text-[13px] text-[#737686] mt-1">Smart Transport Management Platform</p>
            <div className="mt-4 space-y-0.5">
              <h2 className="text-lg font-semibold text-[#131b2e]">Create your account</h2>
              <p className="text-sm text-[#737686]">Join the TransitOps operations network</p>
            </div>
          </div>

          {/* API Error */}
          {apiError && (
            <div role="alert" className="flex items-start gap-2.5 mb-5 px-4 py-3 bg-[#fee2e2] border border-[#fca5a5] rounded-lg">
              <AlertCircle size={16} className="text-[#dc2626] shrink-0 mt-0.5" />
              <p className="text-sm text-[#b91c1c]">{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

            {/* Full Name */}
            <Field id="signup-name" label="Full Name" error={errors.name?.message}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none">
                  <User size={16} />
                </span>
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Arjun Mehta"
                  aria-invalid={!!errors.name}
                  className={`${inputClass(!!errors.name)} pl-10 pr-4`}
                  {...register('name')}
                />
              </div>
            </Field>

            {/* Email */}
            <Field id="signup-email" label="Email Address" error={errors.email?.message}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none">
                  <Mail size={16} />
                </span>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  aria-invalid={!!errors.email}
                  className={`${inputClass(!!errors.email)} pl-10 pr-4`}
                  {...register('email')}
                />
              </div>
            </Field>

            {/* Role */}
            <Field id="signup-role" label="Role" error={errors.role?.message}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none">
                  <Briefcase size={16} />
                </span>
                <select
                  id="signup-role"
                  aria-invalid={!!errors.role}
                  className={`${inputClass(!!errors.role)} pl-10 pr-8 appearance-none cursor-pointer`}
                  {...register('role')}
                >
                  <option value="">Select your role</option>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Field>

            {/* Password */}
            <Field id="signup-password" label="Password" error={errors.password?.message}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none">
                  <Lock size={16} />
                </span>
                <input
                  id="signup-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Min 8 chars with uppercase, number, symbol"
                  aria-invalid={!!errors.password}
                  className={`${inputClass(!!errors.password)} pl-10 pr-11`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] hover:text-[#131b2e] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2563eb] rounded p-0.5"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* Strength bar */}
              {passwordValue && (
                <div className="mt-2 space-y-1">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <div
                        key={i}
                        className="h-1 flex-1 rounded-full transition-all duration-300"
                        style={{ backgroundColor: i <= strength ? strengthColors[strength] : '#e2e8f0' }}
                      />
                    ))}
                  </div>
                  <p className="text-xs" style={{ color: strengthColors[strength] || '#737686' }}>
                    {strengthLabels[strength]}
                  </p>
                </div>
              )}
            </Field>

            {/* Confirm Password */}
            <Field id="signup-confirm" label="Confirm Password" error={errors.confirmPassword?.message}>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737686] pointer-events-none">
                  <Lock size={16} />
                </span>
                <input
                  id="signup-confirm"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  aria-invalid={!!errors.confirmPassword}
                  className={`${inputClass(!!errors.confirmPassword)} pl-10 pr-11`}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737686] hover:text-[#131b2e] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2563eb] rounded p-0.5"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            {/* Terms */}
            <div className="space-y-1">
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  id="signup-terms"
                  type="checkbox"
                  aria-invalid={!!errors.terms}
                  className="mt-0.5 w-4 h-4 rounded border-[#cbd5e1] text-[#2563eb] focus:ring-[#2563eb]/30 cursor-pointer shrink-0"
                  {...register('terms')}
                />
                <span className="text-sm text-[#434655] group-hover:text-[#131b2e] transition-colors select-none leading-relaxed">
                  I agree to the{' '}
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[#2563eb] font-medium hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-[#2563eb] font-medium hover:underline">Privacy Policy</a>
                </span>
              </label>
              {errors.terms && (
                <p role="alert" className="text-xs text-[#dc2626] flex items-center gap-1">
                  <AlertCircle size={11} className="shrink-0" />
                  {errors.terms.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className={[
                'w-full h-11 flex items-center justify-center gap-2 px-4 rounded-lg font-semibold text-sm text-white mt-2',
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
                  Creating account…
                </>
              ) : (
                <>
                  <CheckCircle2 size={16} />
                  Create Account
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-[#737686]">
            Already have an account?{' '}
            <Link
              to={PATHS.LOGIN}
              className="font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors focus:outline-none focus-visible:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-5 text-center text-xs text-[#737686]">
          TransitOps © 2026 · Secure Registration
        </p>
      </main>
    </div>
  );
};

export default SignupPage;
