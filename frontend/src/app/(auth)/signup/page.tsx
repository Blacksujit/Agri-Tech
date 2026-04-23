'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSignup } from '@/hooks/useAuth';
import { Loader2, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

// Input component matching Banani design
function InputField({
  id,
  name,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  required,
  autoComplete,
  error,
}: {
  id: string;
  name: string;
  type?: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-[#0f1720]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        className={cn(
          "w-full h-10 px-3 bg-white border rounded-md text-sm text-[#0f1720]",
          "placeholder:text-[#6b7276]",
          "focus:outline-none focus:ring-2 focus:ring-[#2f9a4a]/20 focus:border-[#2f9a4a]",
          "transition-colors",
          error ? "border-[#e03e3e]" : "border-black/10"
        )}
      />
      {error && <p className="text-xs text-[#e03e3e]">{error}</p>}
    </div>
  );
}

export default function SignupPage() {
  const signupMutation = useSignup();
  const [confirmError, setConfirmError] = useState<string | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setConfirmError('Passwords do not match');
      return;
    }

    setConfirmError(undefined);

    signupMutation.mutate({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') {
      setConfirmError(undefined);
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white border border-black/5 rounded-lg p-8 w-full">
      {/* Brand Header */}
      <div className="text-center mb-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-[#2f9a4a]">
          <LayoutDashboard className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-xl font-semibold text-[#0f1720]">Create account</h1>
        <p className="mt-1 text-sm text-[#6b7276]">Start your journey to smarter farming</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <InputField
          id="name"
          name="name"
          label="Full name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
        />
        <InputField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="farmer@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
        <InputField
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        <InputField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="Repeat your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
          error={confirmError}
        />

        <button
          type="submit"
          disabled={signupMutation.isPending}
          className={cn(
            "w-full h-11 px-5 bg-[#2f9a4a] text-white rounded-md text-sm font-medium",
            "hover:bg-[#268a3f] transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center justify-center gap-2"
          )}
        >
          {signupMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm text-[#6b7276]">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-[#2f9a4a] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
