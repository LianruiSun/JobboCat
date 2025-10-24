import { Turnstile as TurnstileWidget } from '@marsidev/react-turnstile';

interface TurnstileProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
}

export default function Turnstile({ onVerify, onError, onExpire }: TurnstileProps) {
  const siteKey = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    console.error('Missing Cloudflare Turnstile site key!');
    console.log('Please set VITE_CLOUDFLARE_TURNSTILE_SITE_KEY in your .env file');
    return null;
  }

  return (
    <TurnstileWidget
      siteKey={siteKey}
      onSuccess={onVerify}
      onError={onError}
      onExpire={onExpire}
      options={{
        theme: 'light',
        size: 'normal',
      }}
    />
  );
}
