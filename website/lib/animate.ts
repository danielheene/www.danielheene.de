export const pageTransitionSpeed = 350;
export const pageTransitionAnimation = {
  show: {
    opacity: 1,
    transition: {
      duration: pageTransitionSpeed / 1000,
      delay: 0.2,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: pageTransitionSpeed / 1000,
      ease: 'linear',
      when: 'beforeChildren',
    },
  },
};

export const fadeInSpeed = 200;
export const fadeInAnimation = {
  show: {
    opacity: 1,
    transition: {
      duration: fadeInSpeed / 1000,
      ease: 'easeInOut',
      when: 'beforeChildren',
    },
  },
  hide: {
    opacity: 0,
    transition: {
      duration: fadeInSpeed / 1000,
      ease: 'easeInOut',
      when: 'beforeChildren',
    },
  },
};
