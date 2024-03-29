import { useEffect, useState } from 'react';
import Boot from '../components/boot/Boot';

export interface UseBootOptions {
  /**
   * Duration to show boot screen, in milliseconds.
   */
  duration?: number;
}

export default function useBoot({ duration = 800 }: UseBootOptions = {}) {
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowBoot(false);
    }, duration + 500);

    return () => clearTimeout(timeout);
  }, [duration]);

  if (showBoot) return <Boot duration={duration} />;
}
