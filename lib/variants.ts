/**
 * Variantes para animaciones de framer motion
 */
export const example = {
  initial: {
    opacity: 0,
    x: 100
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 1.5,
      duration: 0.5
    }
  },
  exit: {
    opacity: 0
  }
};

export const FadeVariants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  hidden: { opacity: 0, y: 100 },
  exit: { opacity: 0 }
};

export const ListVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.3
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren'
    }
  }
};

export const ListItemVariants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.3
    }
  }),
  hidden: { opacity: 0 }
};

export const FloorVariants = {
  visible: { opacity: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0 },
  exit: { opacity: 0 }
};

export const HeaderVariants = {
  visible: {
    opacity: 1,
    transition: { duration: 1.5 }
  },
  hidden: { opacity: 0 },
  exit: {
    opacity: 0,
    transition: { duration: 0.1 }
  }
};

export const MenuVariants = {
  opened: {
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};
