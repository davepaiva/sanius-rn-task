const renderTMDBImage = (endpoint: string, size?: number)=>{
    return  endpoint ? `https://image.tmdb.org/t/p/w${size || 500}/${endpoint}` : null;
};

const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => func(...args), waitFor);
  };
};


export {
    renderTMDBImage,
    debounce,
};