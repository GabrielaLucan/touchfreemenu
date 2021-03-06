const constants = {
  error: '#f5222d',
  vote: '#b6b6b6',
  upvote: '#f9920b',
  downvote: '#2e70ff'
};

const dark = {
  ...constants,
  normalText: '#ffffff',
  mutedText: '#b0b8bf',
  border: '#333333',
  accent: '#7ac943',
  pageBackground: '#1b1b1b',
  foreground: '#262626',
  blue: '#00BCD4',
  red: '#ff5723',
  activeBackground: '#333333',
  inputBackground: '#212121',
  shadow: 'rgba(0, 0, 0, 0.4)',
  lightLogoDisplay: 'inline-block',
  darkLogoDisplay: 'none'
};

const light = {
  ...constants,
  normalText: '#454f5b',
  mutedText: '#818e99',
  border: '#ebedf0',
  accent: '#7ac943',
  pageBackground: '#f4f6f8',
  foreground: '#ffffff',
  blue: '#00BCD4',
  red: '#ff5723',
  activeBackground: '#fafafa',
  inputBackground: '#fcfcfc',
  shadow: 'rgba(0, 0, 0, 0.05)',
  darkLogoDisplay: 'inline-block',
  lightLogoDisplay: 'none'
};

const theme = isDark => (isDark ? dark : light);

export default theme;
