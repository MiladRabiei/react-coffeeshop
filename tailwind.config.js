/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors:{
        "brown":{
          100:"#ECE0D1",
          300:"#DBC1AC",
          600:"#967259",
          900:"#634832"
        }
      },
      boxShadow:{
        "normal":"0px 1px 10px rgba(0,0,0,0.05)"
      },
      borderRadius:{
        "4xl":"2rem"
      },
      fontFamily:{
        "Dana":"Dana",
        "DanaMedium":"Dana Medium",
        "DanaDemiBold":"Dana DemiBold",
        "MorabbaLight":"Morabba Light",
        "MorabbaMedium":"Morabba Medium",
        "MorabbaBold":"Morabba Bold"
      },
      letterSpacing:{
        "tightest":"-0.065em"
      },
      spacing:{
        "4.5":"1.125rem",
        "30":"7.5rem"
      },
      container:{
        center:true,
        padding:{
          DEFAULT:"1rem",
          lg:"0.625rem"
        }
      },
      backgroundImage:{
        "Mobile":"url(/images/headerBgMobile.webp)",
        "Desktop":"url(/images/headerBgDesktop.webp)",
        "Products-white":'linear-gradient(rgba(243, 244, 246, 0.65), rgba(243, 244, 246, 0.65)), url("/images/body-bg.png");',
        "Products-dark":'url("/images/body-bg.png");',
        "category-right":'linear-gradient(270deg,rgba(0, 0, 0, 0.6)33.85%, rgba(243, 244, 246, 0.1)100%), url("/images/categories/category-right.jpg");',
        "category-left":'linear-gradient(270deg,rgba(0, 0, 0, 0.6)33.85%, rgba(243, 244, 246, 0.1)100%), url("/images/categories/category-left.jpg");',
      }
    },
    screens: {
      "xs":"480px",
      
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [
    function ({ addVariant }) {
        addVariant('child', '& > *');
        addVariant('child-hover', '& > *:hover');
    }
],

}