import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Inter', 'sans-serif'],
        headline: ['Inter', 'sans-serif'],
        code: ['monospace'],
      },
      fontSize: {
        'xs': 'clamp(0.75rem, 0.6vw + 0.6rem, 0.875rem)',    // ~12px to 14px
        'sm': 'clamp(0.875rem, 0.5vw + 0.7rem, 1rem)',      // ~14px to 16px
        'base': 'clamp(1rem, 0.5vw + 0.8rem, 1.125rem)',      // ~16px to 18px
        'lg': 'clamp(1.125rem, 0.6vw + 0.9rem, 1.25rem)',   // ~18px to 20px
        'xl': 'clamp(1.25rem, 0.8vw + 1rem, 1.5rem)',      // ~20px to 24px
        '2xl': 'clamp(1.5rem, 1vw + 1.2rem, 1.875rem)',    // ~24px to 30px
        '3xl': 'clamp(1.875rem, 1.5vw + 1.4rem, 2.25rem)', // ~30px to 36px
        '4xl': 'clamp(2.25rem, 2.5vw + 1.5rem, 3rem)',     // ~36px to 48px
        '5xl': 'clamp(3rem, 3.5vw + 2rem, 3.75rem)',       // ~48px to 60px
        '6xl': 'clamp(3.75rem, 5vw + 2.5rem, 4.5rem)',     // ~60px to 72px
        '7xl': 'clamp(4.5rem, 7vw + 3rem, 6rem)',         // ~72px to 96px
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        success: {
          DEFAULT: 'hsl(142 71% 45%)',
          foreground: 'hsl(142 71% 95%)',
        },
        'ui-border': 'hsl(var(--ui-border))',
        'layout-border': 'hsl(var(--layout-border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'main-sm': '0 4px 12px -2px rgba(0,0,0,0.4)',
        'main-lg': '0 10px 30px -5px rgba(0,0,0,0.9)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        ringing: {
            "0%, 100%": { transform: "rotate(0)" },
            "10%, 30%, 50%, 70%, 90%": { transform: "rotate(-10deg)" },
            "20%, 40%, 60%, 80%": { transform: "rotate(10deg)" },
        },
        "wave-out": {
            "0%": {
                transform: "scale(0.5)",
                opacity: "0.5",
            },
            "100%": {
                transform: "scale(1.25)",
                opacity: "0",
            },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        ringing: 'ringing 2s ease-in-out infinite',
        'wave-out': 'wave-out 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
