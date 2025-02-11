import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(slider|popover).js"
  ],
  theme: {
  	extend: {
			spacing: {
        'header': '96px', 
        'footer': '96px', 
      },
  		backgroundColor: {
				'nad-bg-01': "#6E54FF",
				'nad-bg-02': "#391B97",
				'nad-bg-03': "#F7F7F7"
  		},
  		colors: {
				'nad-color-01': "#6E54FF",
				'nad-color-02': "#391B97",
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			'basel-grotesk-book': [
  				'var(--font-basel-grotesk-book)'
  			],
  			'basel-grotesk-medium': [
  				'var(--font-basel-grotesk-medium)'
  			]
  		},
  		screens: {
  			xs: '396px',
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			xxl: '1536px',
  			xxxl: '1920px'
  		},
  		keyframes: {
  			wiggle: {
  				'0%, 100%': {
  					transform: 'rotate(-3deg)'
  				},
  				'50%': {
  					transform: 'rotate(3deg)'
  				}
  			}
  		},
  		animation: {
  			'wiggle-zoom': 'wiggle 0.2s ease-in-out 2, scaleAndColor 0.4s ease-in-out 0.5s forwards'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
    },
  },
  plugins: [nextui(), require("tailwindcss-animate")],
};

export default config;
