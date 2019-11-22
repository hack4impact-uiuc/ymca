const MOBILEWIDTHMAX = 800;
const MOBILEHEIGHTMAX = 1000;

export const detectMobile = () => {
  console.log(window.innerWidth);
  console.log(window.innerHeight);
  if (
    window.innerWidth <= MOBILEWIDTHMAX &&
    window.innerHeight <= MOBILEHEIGHTMAX
  ) {
    return true;
  }
  return false;
};
