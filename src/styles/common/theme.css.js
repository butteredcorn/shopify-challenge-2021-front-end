const light = {
    id: "light",
    bg: {
      primary: '#eff0f5',
      secondary: '#ffffff',
      tertiary: "#ffffff",
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
      secondary: '#0F5880'
    },
    textShadow: {
      primary: '#ffffff' 
    },
    dropShadow: {
      primary: '#bbb2e9' //maximum blue purple
    },
    bgImages: {

    },
    error: {
      primary: "red"
    }
  }
  
  const dark = {
    id: "dark",
    bg: {
      primary: '#050505',
      secondary: '#111111',
      tertiary: "#BFC4C4",
    },
    text: {
      primary: '#fbfbfc',
      secondary: '#e3e4e8',
      tertiary: '#a9abb6',
      quarternary: '#6c6f7e',
      placeholder: 'rgba(145,148,161,0.5)',
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

    },
    error: {
      primary: "red"
    }
  }
  
  export const lightTheme = { ...light }
  export const darkTheme = { ...dark }