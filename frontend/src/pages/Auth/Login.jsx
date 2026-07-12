import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { PATHS } from '../../routes/paths';

/* ── colour tokens ── */
const C = {
  bg:         '#FAF7F2',
  card:       '#FFFDF9',
  border:     '#d4c4b7',
  primary:    '#A67C52',
  primaryDk:  '#7c5730',
  text:       '#3D3126',
  textMuted:  '#50453b',
  textDim:    '#6f6148',
  input:      '#F3EDE4',
  error:      '#ba1a1a',
  errorBg:    '#fee2e2',
  errorBdr:   '#fca5a5',
};

const schema = z.object({
  email:    z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  remember: z.boolean().optional(),
});

const InputField = ({ id, type, placeholder, error, children, register, showToggle, onToggle, show }) => (
  <div style={{ position: 'relative' }}>
    {children}
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      autoComplete={id}
      aria-invalid={!!error}
      style={{
        width: '100%',
        height: '44px',
        paddingLeft: children ? '40px' : '14px',
        paddingRight: showToggle ? '44px' : '14px',
        fontSize: '14px',
        borderRadius: '8px',
        border: `1px solid ${error ? C.error : C.border}`,
        backgroundColor: '#FFFFFF',
        color: C.text,
        outline: 'none',
        transition: 'border-color 0.15s',
      }}
      onFocus={e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = `0 0 0 3px rgba(166,124,82,0.15)`; }}
      onBlur={e => { e.target.style.borderColor = error ? C.error : C.border; e.target.style.boxShadow = 'none'; }}
      {...register}
    />
    {showToggle && (
      <button type="button" onClick={onToggle} aria-label={show ? 'Hide' : 'Show'}
        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: C.textDim, background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    )}
  </div>
);

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

  const iconStyle = { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: C.textDim, pointerEvents: 'none' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, sans-serif' }}>

      {/* Subtle bg blobs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', background: 'rgba(166,124,82,0.07)', borderRadius: '50%', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', background: 'rgba(124,87,48,0.06)', borderRadius: '50%', filter: 'blur(60px)' }} />
      </div>

      <main style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px' }}>

        {/* Card */}
        <div style={{ backgroundColor: C.card, borderRadius: '16px', border: `1px solid rgba(212,196,183,0.6)`, boxShadow: '0 8px 40px rgba(61,49,38,0.1)', padding: '40px 36px' }}>

          {/* Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '56px', height: '56px', backgroundColor: C.primary, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', boxShadow: `0 6px 20px rgba(166,124,82,0.3)` }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', color: C.primaryDk, margin: 0 }}>TransitOps</h1>
            <p style={{ fontSize: '13px', color: C.textDim, marginTop: '4px' }}>Smart Transport Management</p>
            <div style={{ marginTop: '16px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: C.text, margin: 0 }}>Welcome back</h2>
              <p style={{ fontSize: '13px', color: C.textMuted, marginTop: '4px' }}>Sign in to your operations account</p>
            </div>
          </div>

          {/* API Error */}
          {apiError && (
            <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '20px', padding: '12px 14px', backgroundColor: C.errorBg, border: `1px solid ${C.errorBdr}`, borderRadius: '8px' }}>
              <AlertCircle size={15} style={{ color: C.error, marginTop: '1px', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', color: '#991b1b', margin: 0 }}>{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label htmlFor="email" style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                Email Address
              </label>
              <InputField id="email" type="email" placeholder="name@company.com" error={errors.email} register={register('email')}>
                <svg style={iconStyle} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </InputField>
              {errors.email && <p role="alert" style={{ fontSize: '12px', color: C.error, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={11} />{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '12px' }}>
              <label htmlFor="password" style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                Password
              </label>
              <InputField id="password" type={showPw ? 'text' : 'password'} placeholder="••••••••" error={errors.password} register={register('password')} showToggle onToggle={() => setShowPw(v => !v)} show={showPw}>
                <svg style={iconStyle} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </InputField>
              {errors.password && <p role="alert" style={{ fontSize: '12px', color: C.error, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}><AlertCircle size={11} />{errors.password.message}</p>}
            </div>

            {/* Remember + Forgot */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" id="remember" style={{ width: '15px', height: '15px', accentColor: C.primary, cursor: 'pointer' }} {...register('remember')} />
                <span style={{ fontSize: '13px', color: C.textMuted }}>Remember me</span>
              </label>
              <a href="#" onClick={e => e.preventDefault()} style={{ fontSize: '13px', fontWeight: '600', color: C.primary, textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = C.primaryDk}
                onMouseLeave={e => e.target.style.color = C.primary}>
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                backgroundColor: isSubmitting ? '#c49a72' : C.primary, color: '#fff', fontWeight: '700', fontSize: '14px',
                borderRadius: '10px', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(166,124,82,0.3)', transition: 'background-color 0.15s, transform 0.1s',
              }}
              onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = C.primaryDk; }}
              onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = C.primary; }}
              onMouseDown={e => { if (!isSubmitting) e.currentTarget.style.transform = 'scale(0.98)'; }}
              onMouseUp={e => { e.currentTarget.style.transform = 'scale(1)'; }}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/><path fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
                  Signing in…
                </>
              ) : (
                <>Login <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Footer */}
          <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '13px', color: C.textDim }}>
            Don&apos;t have an account?{' '}
            <Link to={PATHS.SIGNUP} style={{ color: C.primary, fontWeight: '600', textDecoration: 'none' }}>
              Sign up
            </Link>
          </p>
        </div>

        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '12px', color: C.textDim }}>
          TransitOps © 2026 · Secure Login
        </p>
      </main>
    </div>
  );
};

export default LoginPage;
