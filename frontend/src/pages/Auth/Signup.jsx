import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle2, User, Mail, Lock, Briefcase, Truck } from 'lucide-react';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { PATHS } from '../../routes/paths';

const passwordSchema = z.string()
  .min(8, 'At least 8 characters')
  .regex(/[A-Z]/, 'Needs an uppercase letter')
  .regex(/[a-z]/, 'Needs a lowercase letter')
  .regex(/[0-9]/, 'Needs a number');

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

const inputBase = (err) => ({
  width: '100%', height: '44px', paddingLeft: '40px', paddingRight: '14px',
  fontSize: '14px', borderRadius: '10px',
  border: `1px solid ${err ? '#dc2626' : '#e2e8f0'}`,
  backgroundColor: '#ffffff', color: '#131b2e', outline: 'none', transition: 'all 0.15s',
});

const iconStyle = { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' };
const labelStyle = { display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' };
const errStyle = { fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' };

const focusIn  = e => { e.target.style.borderColor = '#2563eb'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; };
const focusOut = (e, err) => { e.target.style.borderColor = err ? '#dc2626' : '#e2e8f0'; e.target.style.boxShadow = 'none'; };

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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#faf8ff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'Inter, sans-serif' }}>

      {/* Background blobs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', background: 'rgba(37,99,235,0.06)', borderRadius: '50%', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', background: 'rgba(29,78,216,0.05)', borderRadius: '50%', filter: 'blur(80px)' }} />
      </div>

      <main style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '460px', paddingTop: '16px', paddingBottom: '16px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 8px 40px rgba(19,27,46,0.10)', padding: '36px' }}>

          {/* Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '28px' }}>
            <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '14px', boxShadow: '0 6px 20px rgba(37,99,235,0.3)' }}>
              <Truck size={26} color="white" />
            </div>
            <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#131b2e', margin: 0, letterSpacing: '-0.01em' }}>TransitOps</h1>
            <p style={{ fontSize: '12px', color: '#737686', marginTop: '3px' }}>Logistics Management Platform</p>
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', width: '100%' }}>
              <h2 style={{ fontSize: '17px', fontWeight: '700', color: '#131b2e', margin: 0 }}>Create your account</h2>
              <p style={{ fontSize: '13px', color: '#475569', marginTop: '3px' }}>Join the TransitOps operations network</p>
            </div>
          </div>

          {apiError && (
            <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '16px', padding: '10px 14px', backgroundColor: '#fee2e2', border: '1px solid #fca5a5', borderRadius: '10px' }}>
              <AlertCircle size={14} style={{ color: '#dc2626', marginTop: '1px', flexShrink: 0 }} />
              <p style={{ fontSize: '13px', color: '#991b1b', margin: 0 }}>{apiError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} noValidate>

            {/* Name */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Full Name</label>
              <div style={{ position: 'relative' }}>
                <User size={15} style={iconStyle} />
                <input {...register('name')} id="signup-name" type="text" autoComplete="name" placeholder="Arjun Mehta" aria-invalid={!!errors.name}
                  style={inputBase(errors.name)} onFocus={focusIn} onBlur={e => focusOut(e, errors.name)} />
              </div>
              {errors.name && <p style={errStyle}><AlertCircle size={11} />{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} style={iconStyle} />
                <input {...register('email')} id="signup-email" type="email" autoComplete="email" placeholder="name@company.com" aria-invalid={!!errors.email}
                  style={inputBase(errors.email)} onFocus={focusIn} onBlur={e => focusOut(e, errors.email)} />
              </div>
              {errors.email && <p style={errStyle}><AlertCircle size={11} />{errors.email.message}</p>}
            </div>

            {/* Role */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Role</label>
              <div style={{ position: 'relative' }}>
                <Briefcase size={15} style={iconStyle} />
                <select {...register('role')} id="signup-role" aria-invalid={!!errors.role}
                  style={{ ...inputBase(errors.role), paddingRight: '36px', appearance: 'none', cursor: 'pointer' }}
                  onFocus={focusIn} onBlur={e => focusOut(e, errors.role)}>
                  <option value="">Select your role</option>
                  {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
                </select>
                <svg style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#94a3b8' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </div>
              {errors.role && <p style={errStyle}><AlertCircle size={11} />{errors.role.message}</p>}
            </div>

            {/* Password */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={iconStyle} />
                <input {...register('password')} id="signup-password" type={showPw ? 'text' : 'password'} autoComplete="new-password" placeholder="Min 8 chars, uppercase, number" aria-invalid={!!errors.password}
                  style={{ ...inputBase(errors.password), paddingRight: '44px' }} onFocus={focusIn} onBlur={e => focusOut(e, errors.password)} />
                <button type="button" onClick={() => setShowPw(v => !v)} aria-label={showPw ? 'Hide' : 'Show'}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}>
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {/* Strength bar */}
              {pwVal && (
                <div style={{ marginTop: '8px' }}>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '4px' }}>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} style={{ flex: 1, height: '3px', borderRadius: '9999px', backgroundColor: i <= strength ? sColors[strength] : '#e2e8f0', transition: 'background-color 0.3s' }} />
                    ))}
                  </div>
                  <p style={{ fontSize: '11px', color: sColors[strength] || '#737686' }}>{sLabels[strength]}</p>
                </div>
              )}
              {errors.password && <p style={errStyle}><AlertCircle size={11} />{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '14px' }}>
              <label style={labelStyle}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={iconStyle} />
                <input {...register('confirmPassword')} id="signup-confirm" type={showCf ? 'text' : 'password'} autoComplete="new-password" placeholder="Re-enter your password" aria-invalid={!!errors.confirmPassword}
                  style={{ ...inputBase(errors.confirmPassword), paddingRight: '44px' }} onFocus={focusIn} onBlur={e => focusOut(e, errors.confirmPassword)} />
                <button type="button" onClick={() => setShowCf(v => !v)} aria-label={showCf ? 'Hide' : 'Show'}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}>
                  {showCf ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.confirmPassword && <p style={errStyle}><AlertCircle size={11} />{errors.confirmPassword.message}</p>}
            </div>

            {/* Terms */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input {...register('terms')} type="checkbox" id="terms" style={{ marginTop: '2px', width: '15px', height: '15px', accentColor: '#2563eb', flexShrink: 0, cursor: 'pointer' }} aria-invalid={!!errors.terms} />
                <span style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
                  I agree to the{' '}
                  <a href="#" onClick={e => e.preventDefault()} style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" onClick={e => e.preventDefault()} style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Privacy Policy</a>
                </span>
              </label>
              {errors.terms && <p style={{ ...errStyle, marginTop: '4px' }}><AlertCircle size={11} />{errors.terms.message}</p>}
            </div>

            {/* Submit */}
            <button type="submit" disabled={isSubmitting}
              style={{
                width: '100%', height: '46px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: isSubmitting ? '#93c5fd' : 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                color: '#fff', fontWeight: '700', fontSize: '14px',
                borderRadius: '12px', border: 'none', cursor: isSubmitting ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 16px rgba(37,99,235,0.3)', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!isSubmitting) { e.currentTarget.style.background = 'linear-gradient(135deg, #1d4ed8, #1e40af)'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
              onMouseLeave={e => { if (!isSubmitting) { e.currentTarget.style.background = 'linear-gradient(135deg, #2563eb, #1d4ed8)'; e.currentTarget.style.transform = 'translateY(0)'; } }}>
              {isSubmitting ? (
                <><svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/><path fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>Creating account…</>
              ) : (
                <><CheckCircle2 size={16} />Create Account</>
              )}
            </button>
          </form>

          <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '13px', color: '#737686' }}>
            Already have an account?{' '}
            <Link to={PATHS.LOGIN} style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'none' }}>Sign in</Link>
          </p>
        </div>
        <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>TransitOps © 2026 · Secure Registration</p>
      </main>
    </div>
  );
};

export default SignupPage;
