
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#00ff41',
					foreground: '#000000'
				},
				secondary: {
					DEFAULT: '#000000',
					foreground: '#ffffff'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#333333',
					foreground: '#888888'
				},
				accent: {
					DEFAULT: '#ffffff',
					foreground: '#000000'
				},
				popover: {
					DEFAULT: '#0a0a0a',
					foreground: '#ffffff'
				},
				card: {
					DEFAULT: '#0a0a0a',
					foreground: '#ffffff'
				},
				// Colores personalizados para Soy Maker 3D
				neon: {
					green: '#00ff41',
					cyan: '#00ffff',
					purple: '#8b5cf6'
				},
				dark: {
					bg: '#0a0a0a',
					surface: '#1a1a1a',
					border: '#333333'
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['JetBrains Mono', 'monospace'],
			},
			backgroundImage: {
				'gradient-neon': 'linear-gradient(135deg, #00ff41 0%, #00ffff 100%)',
				'gradient-dark': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
			},
			animation: {
				'glow': 'glow 2s ease-in-out infinite alternate',
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-up': 'slideUp 0.5s ease-out',
			},
			keyframes: {
				glow: {
					'from': { boxShadow: '0 0 20px #00ff41' },
					'to': { boxShadow: '0 0 40px #00ff41' }
				},
				fadeIn: {
					'from': { opacity: '0' },
					'to': { opacity: '1' }
				},
				slideUp: {
					'from': { transform: 'translateY(20px)', opacity: '0' },
					'to': { transform: 'translateY(0)', opacity: '1' }
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
