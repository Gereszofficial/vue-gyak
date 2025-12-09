<template>
  <form @submit.prevent="onSubmit" class="form-container">
    <div class="card-header">
      <div class="status-pill">
        <span class="dot"></span>
        Secure Sign In
      </div>
      <h2>Create account</h2>
      <p>Join your control panel with one secure login. No distractions, only progress.</p>
    </div>

    <Form v-slot="{ isValid }">
      <div class="field">
        <label class="label">Full name *</label>
        <Field
          name="name"
          as="input"
          class="input"
          placeholder="John Doe"
          rules="required|min:2"
        />
        <ErrorMessage name="name" class="error" />
      </div>

      <div class="field">
        <label class="label">Email *</label>
        <Field
          name="email"
          type="email"
          class="input"
          placeholder="you@example.com"
          rules="required|email"
        />
        <ErrorMessage name="email" class="error" />
      </div>

      <div class="field">
        <label class="label">Password *</label>
        <Field
          name="password"
          type="password"
          class="input"
          placeholder="Minimum 8 characters"
          rules="required|min:8"
        />
        <ErrorMessage name="password" class="error" />
        <div class="hint-row">
          <span class="hint-dot"></span>
          Use at least one number & symbol.
        </div>
      </div>

      <div class="checkbox-row">
        <Field
          name="terms"
          type="checkbox"
          class="checkbox"
          rules="required"
        />
        <label class="checkbox-label">
          I agree to the <button type="button" class="link-btn">Terms & Conditions</button>
        </label>
      </div>
      <ErrorMessage name="terms" class="error" />

      <button type="submit" :disabled="!isValid" class="submit-btn">
        <span>Create account</span>
        <span class="arrow">→</span>
        <span class="shine"></span>
      </button>

      <p class="footer-text">
        Already have an account?
        <button type="button" class="link-btn">Log in</button>
      </p>
    </Form>
  </form>
</template>

<script>
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);

export default {
  name: 'CreateAccount',
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    onSubmit(values) {
      console.log('Form sikeres:', values);
      alert('Account created!');
    },
  },
};
</script>

<style scoped>
.form-container {
  position: relative;
  max-width: 420px;
  width: 100%;
  margin: 0 auto;
  padding: 26px 26px 24px;
  border-radius: 26px;
  background: radial-gradient(circle at 0 0, rgba(148, 163, 253, 0.42), transparent 55%),
              radial-gradient(circle at 100% 100%, rgba(14, 165, 233, 0.3), transparent 55%),
              rgba(15, 23, 42, 0.82);
  border: 1px solid rgba(148, 163, 184, 0.45);
  box-shadow:
    0 24px 60px rgba(15, 23, 42, 0.9),
    0 0 0 1px rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(28px);
  -webkit-backdrop-filter: blur(28px);
  color: #e5e7eb;
  animation: card-in 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center;
}

.card-header {
  margin-bottom: 20px;
}

.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.6);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #a5b4fc;
}

.status-pill .dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.18);
}

.card-header h2 {
  margin: 14px 0 6px;
  font-size: 24px;
  letter-spacing: -0.03em;
  font-weight: 700;
  color: #f9fafb;
}

.card-header p {
  margin: 0;
  font-size: 13px;
  color: #9ca3af;
}

.field {
  margin-bottom: 16px;
}

.label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #e5e7eb;
}

.input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.55);
  background: rgba(15, 23, 42, 0.85);
  color: #e5e7eb;
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.16s ease,
    box-shadow 0.16s ease,
    background 0.16s ease,
    transform 0.08s ease;
}

.input::placeholder {
  color: #6b7280;
}

.input:focus {
  border-color: #6366f1;
  box-shadow:
    0 0 0 1px rgba(99, 102, 241, 0.75),
    0 0 30px rgba(79, 70, 229, 0.55);
  background: rgba(15, 23, 42, 0.95);
  transform: translateY(-1px);
}

.hint-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  font-size: 11px;
  color: #9ca3af;
}

.hint-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #fbbf24;
}

.checkbox-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 4px;
  margin-bottom: 10px;
  font-size: 12px;
  color: #d1d5db;
}

.checkbox {
  width: 16px;
  height: 16px;
  margin-top: 2px;
  cursor: pointer;
  accent-color: #6366f1;
}

.checkbox-label {
  cursor: pointer;
}

.submit-btn {
  position: relative;
  width: 100%;
  margin-top: 8px;
  padding: 11px 16px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #4f46e5, #0ea5e9, #22c55e);
  background-size: 200% 200%;
  color: #f9fafb;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  box-shadow:
    0 14px 40px rgba(37, 99, 235, 0.7),
    0 0 0 1px rgba(15, 23, 42, 0.8);
  overflow: hidden;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    filter 0.12s ease,
    background-position 0.5s ease;
  animation: pulse 3s ease-in-out infinite;
}

.submit-btn .arrow {
  font-size: 16px;
  transform: translateX(0);
  transition: transform 0.16s ease;
}

.submit-btn .shine {
  position: absolute;
  top: -40%;
  left: -40%;
  width: 60%;
  height: 200%;
  transform: rotate(25deg);
  background: linear-gradient(
    to right,
    transparent 0%,
    rgba(248, 250, 252, 0.8) 50%,
    transparent 100%
  );
  opacity: 0;
  pointer-events: none;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow:
    0 18px 50px rgba(59, 130, 246, 0.9),
    0 0 0 1px rgba(15, 23, 42, 0.9);
  background-position: 100% 0;
  filter: saturate(1.1);
}

.submit-btn:hover:not(:disabled) .arrow {
  transform: translateX(3px);
}

.submit-btn:hover:not(:disabled) .shine {
  opacity: 1;
  animation: shine 0.9s ease-out forwards;
}

.submit-btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  box-shadow: none;
  animation: none;
}

.footer-text {
  margin-top: 14px;
  font-size: 12px;
  color: #9ca3af;
  text-align: center;
}

.link-btn {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: #a5b4fc;
  cursor: pointer;
  text-decoration: none;
  position: relative;
}

.link-btn::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 1px;
  background: linear-gradient(to right, #4f46e5, #0ea5e9);
  opacity: 0;
  transform: scaleX(0.4);
  transform-origin: center;
  transition: opacity 0.16s ease, transform 0.16s ease;
}

.link-btn:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

.error {
  margin-top: 4px;
  font-size: 11px;
  color: #fca5a5;
}

/* Animations */

@keyframes card-in {
  0% {
    opacity: 0;
    transform: translateY(14px) scale(0.96);
  }
  60% {
    opacity: 1;
    transform: translateY(-2px) scale(1.01);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes shine {
  0% {
    transform: translateX(-120%) rotate(25deg);
    opacity: 0;
  }
  40% {
    opacity: 0.9;
  }
  100% {
    transform: translateX(260%) rotate(25deg);
    opacity: 0;
  }
}

@keyframes pulse {
  0%, 100% {
    box-shadow:
      0 14px 40px rgba(37, 99, 235, 0.75),
      0 0 0 1px rgba(15, 23, 42, 0.8);
  }
  50% {
    box-shadow:
      0 20px 55px rgba(59, 130, 246, 1),
      0 0 0 1px rgba(15, 23, 42, 0.9);
  }
}
</style>
