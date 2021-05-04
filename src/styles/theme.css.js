const light = {
    id: "light",
    bg: {
      primary: '#eff0f5',
      secondary: '#ffffff',
      tertiary: "#ffffff",
      inset: '#e2e4e8',
      input: 'rgba(65,67,78,0.12)'
    },
    text: {
      primary: '#050505',
      secondary: '#2f3037',
      tertiary: '#525560',
      quarternary: '#9194a1',
      placeholder: 'rgba(82,85,96,0.5)',
      onPrimary: '#ffffff',
    },
    header: {
        primary: '#0C4767', //indigo dye
        secondary: '#0F5880'
    },
    textShadow: {
      primary: '#ffffff' 
    },
    dropShadow: {
      primary: '#bbb2e9' //maximum blue purple
    },
    bgImages: {

    }

    // ...
  }
  
  const dark = {
    id: "dark",
    bg: {
      primary: '#050505',
      secondary: '#111111',
      tertiary: "#BFC4C4",
      inset: '#e2e4e8',
      input: 'rgba(191,193,201,0.12)'
    },
    text: {
      primary: '#fbfbfc',
      secondary: '#e3e4e8',
      tertiary: '#a9abb6',
      quarternary: '#6c6f7e',
      placeholder: 'rgba(145,148,161,0.5)',
      onPrimary: '#050505'
    },
    header: {
        primary: '#fbfbfc',
        secondary: '#bbb2e9'
    },
    textShadow: {
      primary: '#663399' //rebecca purple
    },
    dropShadow: {
      primary: '#663399'
    },
    bgImages: {

    }
    // ...
  }
  
  const defaultTheme = {
    fontSizes: [
      '14px', // 0
      '16px', // 1
      '18px', // 2
      '22px', // 3
      '26px', // 4
      '32px', // 5
      '40px'  // 6
    ],
    fontWeights: {
      body: 400,
      subheading: 500,
      link: 600,
      bold: 700,
      heading: 800,
    },
    lineHeights: {
      body: 1.5,
      heading: 1.3,
      code: 1.6,
    },
    // ...
  };
  
  export const lightTheme = { ...defaultTheme, ...light }
  export const darkTheme = { ...defaultTheme, ...dark }