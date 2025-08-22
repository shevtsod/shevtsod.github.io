'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * Hook that determined whether or not to play an intro
 */
export function useIntro(): [
  boolean | undefined,
  Dispatch<SetStateAction<boolean | undefined>>,
] {
  const [intro, setIntro] = useState<boolean | undefined>(undefined);

  // Play an intro if the URL has no hash or query string
  useEffect(() => {
    setIntro(!window.location.hash && !window.location.search);
  }, []);

  return [intro, setIntro];
}
