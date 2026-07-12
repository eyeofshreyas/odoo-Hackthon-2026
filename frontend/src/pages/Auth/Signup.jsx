import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { PATHS } from '../../routes/paths';

/* ── colour tokens ── */
const C = {
  bg: '#FAF7F2', card: '#FFFDF9', border: '#d4c4b7', primary: '#A67C52', primaryDk: '#7c5730',
  text: '#3D3126', textMuted: '#50453b', textDim: '#6f6148', error: '#ba1a1a',
  errorBg: '#fee2e2', errorBdr: '#fca5a5',
};

const passwordSchema = z.string()
  .min(8, 'At least 8 characters')
  .regex(/[A-Z]/, 'Needs an uppercase letter')
  .regex(/[a-z]/, 'Needs a lowercase letter')
  .regex(/[0-9]/, 'Needs a number')
  .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Needs a special character');

const schema = z.object({
  name:            z.string().min(2, 'At least 2 characters').max(80),
  email:           z.string().min(1, 'Email is required').email('Enter a valid email'),
  password:        passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  role:            z.string().min(1, 'Please select a role'),
  terms:           z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
}).refine(d => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

const ROLES = [
  { value: 'fleet-manager',     label: 'Fleet Manager'     },
  { value: 'dispatcher',        label: 'Dispatcher'        },
  { value: 'safety-officer',    label: 'Safety Officer'    },
  { value: 'financial-analyst', label: 'Financial Analyst' },
];

/* Strength */
const getStrength = pwd => {
  if (!pwd) return 0;
  let s = 0;
  if (pwd.length >= 8) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[a-z]/.test(pwd)) s++;
  if (/[0-9]/.test(pwd)) s++;
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd)) s++;
  return s;
};
const sColors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
const sLabels = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];

const fieldLabelStyle = { display: 'block', fontSize: '11px', fontWeight: '700', color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' };
const iconStyle = { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: C.textDim, pointerEvents: 'none' };

const inputStyle = (err) => ({
  width: '100%', height: '44px', paddingLeft: '40px', paddingRight: '14px', fontSize: '14px',
  borderRadius: '8px', border: `1px solid ${err ? C.error : C.border}`,
  backgroundColor: '#FFFFFF', color: C.text, outline: 'none', transition: 'border-color 0.15s',
});

const errStyle = { fontSize: '12px', color: C.error, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' };

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [apiError, setApiError] = useState('');

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', role: '', terms: false },
  });

  const pwVal = watch('password', '');
  const strength = getStrength(pwVal);

  const onSubmit = async data => {
    setApiError('');
    try {
      await signup({ name: data.name, email: data.email, password: data.password, role: data.role });
      navigate(PATHS.DASHBOARD, { replace: true });
    } catch (err) {
      setApiError(err.message ?? 'Signup failed. Please try again.');
    }
  };

  const focusInput = e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = '0 0 0 3px rgba(166,124,82,0.15)'; };
  const blurInput  = (e, err) => { e.target.style.borderColor = err ? C.error : C.border; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: C.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, sans-serif' }}>

      {/* Background blobs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', background: 'rgba(166,124,82,0.07)', borderRadius: '50%', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', background: 'rgba(124,87,48,0.06)', borderRadius: '50%', filter: 'blur(60px)' }} />
      </div>

      <main style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '440px' }}>
        <div style={{ backgroundColor: C.card, borderRadius: '16px', border: '1px solid rgba(212,196,183,0.6)', boxShadow: '0 8px 40px rgba(61,49,38,0.1)', padding: '36px' }}>

          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '52px', height: '52px', backgroundColor: C.primary, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', boxShadow: '0 6px 20px rgba(166,124,82,0.3)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
            </div>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: C.primaryDk, margin: 0 }}>TransitOps</h1>
            <p style={{ fontSize: '12px', color: C.textDim, marginTop: '3px' }}>Smart Transport Management</p>
            <div style={{ marginTop: '14px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: '700', color: C.text, margin: 0 }}>Create your account</h2>
              <p style={{ fontSize: '13px', color: C.textMuted, marginTop: '3px' }}>Join the TransitOps operations network</p>
            </div>
          </div>

          {apiError && (
            <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '16px', padding: '10px 14px', backgroundColor: C.errorBg, border: `1px solid ${C.errorBdr}`, borderRadius: '8px' }}>
              <AlertCircle size={14} style={{ color: C.error, marginTop: '1px', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', color: '#991b1b', margin: 0 }}>{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Name */}
            <div style={{ marginBottom: '14px' }}>
              <label style={fieldLabelStyle}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <svg style={iconStyle} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>
                <input {...register('name')} id="signup-name" type="text" autoComplete="name" placeholder="Arjun Mehta" aria-invalid={!!errors.name}
                  style={inputStyle(errors.name)} onFocus={focusInput} onBlur={e => blurInput(e, errors.name)} />
              </div>
              {errors.name && <p style={errStyle}><AlertCircle size={11} />{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div style={{ marginBottom: '14px' }}>
              <label style={fieldLabelStyle}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <svg style={iconStyle} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <input {...register('email')} id="signup-email" type="email" autoComplete="email" placeholder="name@company.com" aria-invalid={!!errors.email}
                  style={inputStyle(errors.email)} onFocus={focusInput} onBlur={e => blurInput(e, errors.email)} />
              </div>
              {errors.email && <p style={errStyle}><AlertCircle size={11} />{errors.email.message}</p>}
            </div>

            {/* Role */}
            <div style={{ marginBottom: '14px' }}>
              <label style={fieldLabelStyle}>Role</label>
              <div style={{ position: 'relative' }}>
                <svg style={iconStyle} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                <select {...register('role')} id="signup-role" aria-invalid={!!errors.role}
                  style={{ ...inputStyle(errors.role), paddingRight: '36px', appearance: 'none', cursor: 'pointer' }}
                  onFocus={focusInput} onBlur={e => blurInput(e, errors.role)}>
                  <option value="">Select your role</option>
                  {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
                <svg style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: C.textDim }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
              {errors.role && <p style={errStyle}><AlertCircle size={11} />{errors.role.message}</p>}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '14px' }}>
              <label style={fieldLabelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <svg style={iconStyle} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input {...register('password')} id="signup-password" type={showPw ? 'text' : 'password'} autoComplete="new-password" placeholder="Min 8 chars, uppercase, number, symbol" aria-invalid={!!errors.password}
                  style={{ ...inputStyle(errors.password), paddingRight: '44px' }} onFocus={focusInput} onBlur={e => blurInput(e, errors.password)} />
                <button type="button" onClick={() => setShowPw(v => !v)} aria-label={showPw ? 'Hide' : 'Show'}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: C.textDim, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Strength bar */}
              {pwVal && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} style={{ flex: 1, height: '3px', borderRadius: '9999px', backgroundColor: i <= strength ? sColors[strength] : '#e7e0d9', transition: 'background-color 0.3s' }} />
                    ))}
                  </div>
                  <p style={{ fontSize: '11px', color: sColors[strength] || C.textDim }}>{sLabels[strength]}</p>
                </div>
              )}
              {errors.password && <p style={errStyle}><AlertCircle size={11} />{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '14px' }}>
              <label style={fieldLabelStyle}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <svg style={iconStyle} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <input {...register('confirmPassword')} id="signup-confirm" type={showCf ? 'text' : 'password'} autoComplete="new-password" placeholder="Re-enter your password" aria-invalid={!!errors.confirmPassword}
                  style={{ ...inputStyle(errors.confirmPassword), paddingRight: '44px' }} onFocus={focusInput} onBlur={e => blurInput(e, errors.confirmPassword)} />
                <button type="button" onClick={() => setShowCf(v => !v)} aria-label={showCf ? 'Hide' : 'Show'}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: C.textDim, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}>
                  {showCf ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.confirmPassword && <p style={errStyle}><AlertCircle size={11} />{errors.confirmPassword.message}</p>}
            </div>

            {/* Terms */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input {...register('terms')} type="checkbox" id="terms" style={{ marginTop: '2px', width: '15px', height: '15px', accentColor: C.primary, flexShrink: 0, cursor: 'pointer' }} aria-invalid={!!errors.terms} />
                <span style={{ fontSize: '13px', color: C.textMuted, lineHeight: '1.5' }}>
                  I agree to the{' '}
                  <a href="#" onClick={e => e.preventDefault()} style={{ color: C.primary, fontWeight: '600' }}>Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" onClick={e => e.preventDefault()} style={{ color: C.primary, fontWeight: '600' }}>Privacy Policy</a>
                </span>
              </label>
              {errors.terms && <p style={{ ...errStyle, marginTop: '4px' }}><AlertCircle size={11} />{errors.terms.message}</p>}
            </div>

            {/* Submit */}
            <button type="submit" disabled={isSubmitting}
              style={{ width: '100%', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: isSubmitting ? '#c49a72' : C.primary, color: '#fff', fontWeight: '700', fontSize: '14px', borderRadius: '10px', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer', boxShadow: '0 4px 16px rgba(166,124,82,0.3)', transition: 'all 0.15s' }}
              onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = C.primaryDk; }}
              onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.backgroundColor = C.primary; }}
              onMouseDown={e => { if (!isSubmitting) e.currentTarget.style.transform = 'scale(0.98)'; }}
              onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
              {isSubmitting ? (
                <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/><path fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>Creating account…</>
              ) : (
                <><CheckCircle2 size={16} />Create Account</>
              )}
            </button>
          </form>

          <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: C.textDim }}>
            Already have an account?{' '}
            <Link to={PATHS.LOGIN} style={{ color: C.primary, fontWeight: '600', textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
        <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: C.textDim }}>TransitOps © 2026 · Secure Registration</p>
      </main>
    </div>
  );
};

export default SignupPage;
