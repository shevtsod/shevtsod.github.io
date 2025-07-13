import { useInView, type UseInViewOptions } from 'motion/react';
import { type RefObject, useEffect } from 'react';

export default function useFadeInView(
  ref: RefObject<Element | null>,
  opts?: UseInViewOptions
) {
  const isInView = useInView(ref, opts);

  useEffect(() => {
    const { current } = ref;

    if (current) {
      // Add transition classes
      ['transition-opacity', 'ease-[steps(7,end)]', 'duration-1000'].forEach(
        (className) => {
          if (!current.classList.contains(className)) {
            current.classList.add(className);
          }
        }
      );

      // Show/hide
      if (isInView) {
        current.classList.remove('opacity-0');
      } else {
        current.classList.add('opacity-0');
      }
    }
  }, [ref, isInView]);

  return isInView;
}
