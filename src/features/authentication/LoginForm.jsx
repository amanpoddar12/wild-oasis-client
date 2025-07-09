import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm({ onCloseModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
  
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSuccess: () => {
          // Close modal if it exists
          if (typeof onCloseModal === 'function') {
            setTimeout(() => onCloseModal(), 1000);
          }
        },
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit} type={onCloseModal ? "modal" : "regular"}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <div style={{ fontSize: '1.4rem', color: 'var(--color-grey-600)', textAlign: 'center', marginBottom: '1rem' }}>
          <p>Demo Accounts:</p>
          <p><strong>Admin:</strong> admin@wildoasis.com / password123</p>
          <p><strong>Guest:</strong> guest@example.com / password123</p>
        </div>
      </FormRowVertical>
      <FormRowVertical>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          {onCloseModal && (
            <Button 
              variation="secondary" 
              type="button" 
              onClick={onCloseModal}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button size="large" onClick={handleSubmit} disabled={isLoading}>
            {!isLoading ? "Login" : <SpinnerMini />}
          </Button>
        </div>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
