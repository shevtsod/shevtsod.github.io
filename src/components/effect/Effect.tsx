import { useEffect } from 'react';

export interface EffectProps {
  effect: () => void;
}

/**
 * useEffect in a component runs in order (children in order they are rendered, then parent).
 * Effect allows running a useEffect from the parent as a child component
 *
 * See https://github.com/facebook/react/issues/15281
 * See https://gist.github.com/nikparo/33544fe0228dd5aa6f0de8d03e96c378
 */
export function Effect({ effect }: EffectProps) {
  useEffect(() => effect?.(), [effect]);
  return null;
}
