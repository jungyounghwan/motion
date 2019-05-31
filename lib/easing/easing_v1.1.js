// no easing, no acceleration
export const easeIn  = p => t => Math.pow(t, p);
export const easeOut = p => t => (1 - Math.abs(Math.pow(t-1, p)));
export const easeInOut = p => t => t<.5 ? easeIn(p)(t*2)/2 : easeOut(p)(t*2 - 1)/2+0.5;

export const easeLinear = t => easeInOut(1)(t);