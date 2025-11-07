/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			mywhite: '#e8e8e8',
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
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: 0
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: 0
  				}
  			},
				fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0)' }, // 初始：透明、缩小
          '100%': { opacity: '1', transform: 'scale(1)' }, // 结束：不透明、正常大小
        }
				
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
				'fadeIn': 'fadeIn 0.5s ease-out forwards',
  		},
  		transitionDuration: {
  			'0': '0ms'
  		},
  		padding: {
  			'0.8': '0.2rem'
  		},
  		width: {
  			'15': '3.75rem',
  			'18': '4.5rem',
  			'70': '17.5rem',
  			'75': '18.75rem',
  			'84': '21rem',
  			'85': '21.25rem',
  			'100': '25rem',
  			'116': '29rem',
  			'150': '37.5rem',
  			'160': '40rem',
  			'200': '50rem',
  			'3.5': '0.875rem',
  			'5.5': '1.375rem'
  		},
  		height: {
  			'15': '3.75rem',
  			'18': '4.5rem',
  			'22': '5.5rem',
  			'112': '28rem',
  			'120': '30rem',
  			'152': '38rem',
  			'3.5': '0.875rem',
  			'5.5': '1.375rem'
  		},
  		borderWidth: {
  			'3': '3px'
  		},
  		screens: {
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px',
  			dic3: '1100px',
  			dic4: '1440px'
  		},
  		boxShadow: {
  			custom: '2px 2px 5px grey',
				cardClick:'2px 2px 25px 0px rgba(0, 0, 0, 0.16) inset',
				cardEnter:'2px 2px 30px 0px rgba(0, 0, 0, 0.16)',
				sideMenu:'4px 6px 9px 0px rgba(0,0,0,0.16)',
				menuItem:'2px 2px 5px 0px rgba(0, 0, 0, 0.11)'
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
      visibility: ['hover', 'group-hover'],
      textOpacity: ['dark'],
      backgroundOpacity: ['dark'],
    },
  },
  plugins: [require('@headlessui/tailwindcss'), require('@tailwindcss/forms'), require('tailwindcss-animate')],
}
