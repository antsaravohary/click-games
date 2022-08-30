export function fadeInTop (duration:number = 0.3) {
  return {
    from: { 
      top: '-100%',
      transition: {
        type: 'easeInOut',
				duration: duration,
      } 
    },
    to: { 
      top: 0,
      transition: {
        type: 'easeInOut',
				duration: duration,
      } 
    },
  }
}