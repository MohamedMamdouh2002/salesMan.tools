import type { Config } from "tailwindcss";
import sharedConfig from "@repo/tailwind-config";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
const config: Pick<Config, "prefix" | "presets" | "content" | "theme" |"darkMode" |"plugins"> = {
  content: [
    "./src/**/*.tsx",
    "./node_modules/rizzui/dist/*.{js,ts,jsx,tsx}",
    '../../packages/isomorphic-core/src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        mainBg: '#1C1C1C',
        secDark:"#171717",
        secondaryBg:'#E7F9EF',
        greenLight:'#F9FEFB',
        mainText: '#fff',
        secondaryText : '#000',
        border:"",
        greenColor:"#21E786",
        darkGreenColor:'#003829'
        

      },
      backgroundImage: {
        'lightGradient': 'linear-gradient(to bottom, #fff 32%, #61F1A5 )',
        'lightGradientTable': 'linear-gradient(to top, #fff 32%, #61F1A5 )',
        'darkGradientTable': 'linear-gradient(to top, #040B11 32%, #1c746580 )',
        'darkGradient': 'linear-gradient(to bottom, #040B11 , #040B11)',
        'mobileFlash': 'radial-gradient(41.11% 49.93% at 50% 49.93%, #1C7466   0%, #1c746580 52.26%, #040B11 100%);',
        'flash': 'radial-gradient(41.11% 49.93% at 50% 49.93%, #1C7466   0%, #262C31 52.26%, #040B11 100%);',
        
      },
      boxShadow: {
        'custom': '0 1px 20px rgba(82, 255, 168, 0.35);',
      },
      fontFamily: {
        // poppins: ['var(--font-poppins)', 'sans-serif'],
        // lexend: ['var(--font-lexend)', 'sans-serif'],
        // inter: ['var(--font-inter)', 'sans-serif'],
        // hahmlet: ['var(--font-hahmlet)', 'sans-serif'],
        // alex: ['var(--font-alex)', 'sans-serif'], try 
        'montserrat': ['Montserrat Arabic', 'sans-serif'],
      },
      fontWeight: {
        regular : "400",
        monbold: "700",
        light: "300",
        monmedium: "500",
        monsemibold: "600",
    },
  },
  },
  plugins: [
    // rest of the code
    addVariablesForColors,
  ],
};
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

export default config;
