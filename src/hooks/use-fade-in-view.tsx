import { useInView, type UseInViewOptions } from 'motion/react';
import { type RefObject, useEffect } from 'react';

/**
 * Wraps {@link useInView} with a custom fade-in animation.
 *
 * @param ref ref to the node to fade into view
 * @param opts options for {@link useInView}
 * @returns true if the node is in view, false otherwise
 */
export default function useFadeInView(
  ref: RefObject<Element | null>,
  opts?: UseInViewOptions,
) {
  const inView = useInView(ref, opts);

  useEffect(() => {
    const { current } = ref;

    if (current) {
      // Add transition classes
      ['transition-opacity', 'ease-[steps(7,end)]', 'duration-1000'].forEach(
        (className) => {
          if (!current.classList.contains(className)) {
            current.classList.add(className);
          }
        },
      );

      // Show/hide
      if (inView) {
        current.classList.remove('opacity-0');
      } else {
        current.classList.add('opacity-0');
      }
    }
  }, [ref, inView]);

  return inView;
}
