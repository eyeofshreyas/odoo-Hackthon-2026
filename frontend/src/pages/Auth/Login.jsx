import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, AlertCircle, Mail, Lock, Truck } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { PATHS } from '../../routes/paths';

const schema = z.object({
  email:    z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [apiError, setApiError] = useState('');

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
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
    <div style={{ minHeight: '100vh', backgroundColor: '#faf8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, sans-serif', position: 'relative', overflow: 'hidden' }}>

      {/* Background blobs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'rgba(37,99,235,0.06)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', background: 'rgba(29,78,216,0.05)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', top: '40%', left: '30%', width: '200px', height: '200px', background: 'rgba(219,234,254,0.4)', borderRadius: '50%', filter: 'blur(60px)' }} />
      </div>

      <main style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px' }}>

        {/* Card */}
        <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 8px 40px rgba(19,27,46,0.10), 0 1px 3px rgba(19,27,46,0.06)', padding: '40px 36px' }}>

          {/* Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', boxShadow: '0 8px 24px rgba(37,99,235,0.3)' }}>
              <Truck size={28} color="white" />
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#131b2e', margin: 0, letterSpacing: '-0.02em' }}>TransitOps</h1>
            <p style={{ fontSize: '13px', color: '#737686', marginTop: '4px' }}>Logistics Management Platform</p>
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f1f5f9', width: '100%' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#131b2e', margin: 0 }}>Welcome back</h2>
              <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px' }}>Sign in to your operations account</p>
            </div>
          </div>

          {/* API Error */}
          {apiError && (
            <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px', padding: '12px 14px', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '10px' }}>
              <AlertCircle size={15} style={{ color: '#dc2626', marginTop: '1px', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', color: '#991b1b', margin: 0 }}>{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="email" style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  style={{
                    width: '100%', height: '44px', paddingLeft: '40px', paddingRight: '14px',
                    fontSize: '14px', borderRadius: '10px',
                    border: `1px solid ${errors.email ? '#dc2626' : '#e2e8f0'}`,
                    backgroundColor: '#ffffff', color: '#131b2e', outline: 'none', transition: 'all 0.15s',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; }}
                  onBlur={e => { e.target.style.borderColor = errors.email ? '#dc2626' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  {...register('email')}
                />
              </div>
              {errors.email && <p role="alert" style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={11} />{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '12px' }}>
              <label htmlFor="password" style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
                <input
                  id="password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  aria-invalid={!!errors.password}
                  style={{
                    width: '100%', height: '44px', paddingLeft: '40px', paddingRight: '44px',
                    fontSize: '14px', borderRadius: '10px',
                    border: `1px solid ${errors.password ? '#dc2626' : '#e2e8f0'}`,
                    backgroundColor: '#ffffff', color: '#131b2e', outline: 'none', transition: 'all 0.15s',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; }}
                  onBlur={e => { e.target.style.borderColor = errors.password ? '#dc2626' : '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                  {...register('password')}
                />
                <button type="button" onClick={() => setShowPw(v => !v)} aria-label={showPw ? 'Hide password' : 'Show password'}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p role="alert" style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={11} />{errors.password.message}</p>}
            </div>

            {/* Remember + Forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" id="remember" style={{ width: '15px', height: '15px', accentColor: '#2563eb', cursor: 'pointer' }} {...register('remember')} />
                <span style={{ fontSize: '13px', color: '#475569' }}>Remember me</span>
              </label>
              <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: '13px', fontWeight: '600', color: '#2563eb', textDecoration: 'none' }}>
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: isSubmitting ? '#93c5fd' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: '#fff', fontWeight: '700', fontSize: '14px',
                borderRadius: '12px', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(37,99,235,0.3)', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!isSubmitting) { e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8, #1e40af)'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,99,235,0.35)'; } }}
              onMouseLeave={e => { if (!isSubmitting) { e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.3)'; } }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/><path fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
                  Signing in…
                </>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Footer */}
          <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: '#737686' }}>
            Don&apos;t have an account?{' '}
            <Link to={PATHS.SIGNUP} style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>
              Create account
            </Link>
          </p>
        </div>

        <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
          TransitOps © 2026 · Enterprise Logistics Platform
        </p>
      </main>
    </div>
  );
};

export default LoginPage;
