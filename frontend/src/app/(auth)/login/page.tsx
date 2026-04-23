'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLogin } from '@/hooks/useAuth';
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
          "w-full h-10 px-3 bg-white border border-black/10 rounded-md text-sm text-[#0f1720]",
          "placeholder:text-[#6b7276]",
          "focus:outline-none focus:ring-2 focus:ring-[#2f9a4a]/20 focus:border-[#2f9a4a]",
          "transition-colors"
        )}
      />
    </div>
  );
}

export default function LoginPage() {
  const loginMutation = useLogin();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <h1 className="text-xl font-semibold text-[#0f1720]">Welcome back</h1>
        <p className="mt-1 text-sm text-[#6b7276]">Sign in to access your farm insights</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
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
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className={cn(
            "w-full h-11 px-5 bg-[#2f9a4a] text-white rounded-md text-sm font-medium",
            "hover:bg-[#268a3f] transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center justify-center gap-2"
          )}
        >
          {loginMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm text-[#6b7276]">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-[#2f9a4a] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
