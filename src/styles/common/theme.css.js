const light = {
    id: "light",
    bg: {
      primary: '#eff0f5',
      secondary: '#ffffff',
      tertiary: "#D9DCE7",
    },
    text: {
      primary: '#050505',
      secondary: '#2f3037',
      tertiary: '#525560',
      quarternary: '#9194a1',
      placeholder: 'rgba(82,85,96,0.5)',
    },
    header: {
      primary: '#0C4767', //indigo dye
      secondary: 'white'
    },
    textShadow: {
      primary: '#ffffff' 
    },
    dropShadow: {
      primary: '#bbb2e9', //maximum blue purple
      secondary: "#D9DCE7"
    },
    accent: {
      primary: "#1477AE"
    },
    error: {
      primary: "red"
    }
  }
  
  const dark = {
    id: "dark",
    bg: {
      primary: '#050505',
      secondary: '#474747',
      tertiary: "#5C5C5C",
    },
    text: {
      primary: '#fbfbfc',
      secondary: '#e3e4e8',
      tertiary: '#a9abb6',
      quarternary: '#6c6f7e',
      placeholder: 'rgba(145,148,161,0.5)',
    },
    header: {
      primary: '#bbb2e9',
      secondary: '#fbfbfc'
    },
    textShadow: {
      primary: '#663399' //rebecca purple
    },
    dropShadow: {
      primary: '#663399'
    },
    accent: {
      primary: "#988ADE"
    },
    error: {
      primary: "red"
    }
  }
  
  export const lightTheme = { ...light }
  export const darkTheme = { ...dark }