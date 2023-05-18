function withOpacity(cssVariable) {
  return ({ opacityValue }) => {
    return `rgba(var(${cssVariable}), ${opacityValue})`
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        main: '42.5rem',
      },

      // 颜色
      colors: {
        // 主题
        primary: withOpacity('--ds-primary-color'),
        'primary-disabled': withOpacity('--ds-primary-disabled-color'),
        'primary-hover': withOpacity('--ds-primary-hover-color'),

        // 成功
        success: withOpacity('--ds-success-color'),
        'success-disabled': withOpacity('--ds-success-disabled-color'),
        'success-hover': withOpacity('--ds-success-hover-color'),

        // 警告
        warning: withOpacity('--ds-warning-color'),
        'warning-disabled': withOpacity('--ds-warning-disabled-color'),
        'warning-hover': withOpacity('--ds-warning-hover-color'),

        // 危险
        danger: withOpacity('--ds-danger-color'),
        'danger-disabled': withOpacity('--ds-danger-disabled-color'),
        'danger-hover': withOpacity('--ds-danger-hover-color'),

        // info
        info: withOpacity('--ds-info-color'),
        'info-disabled': withOpacity('--ds-info-disabled-color'),
        'info-hover': withOpacity('--ds-info-hover-color'),
      },

      // 背景
      backgroundColor: {
        'primary-color': withOpacity('--ds-bg-primary-color'),
        'regular-color': withOpacity('--ds-bg-regular-color'),
        'secondary-color': withOpacity('--ds-bg-secondary-color'),
        'placeholder-color': withOpacity('--ds-bg-placeholder-color'),

        'base-color': withOpacity('--ds-bg-base-color'),
        'base-hover-color': withOpacity('--ds-bg-base-hover-color'),
        'base-muted-color': withOpacity('--ds-bg-base-muted-color'),
      },

      // 字体
      textColor: {
        'primary-color': withOpacity('--ds-text-primary-color'),
        'regular-color': withOpacity('--ds-text-regular-color'),
        'secondary-color': withOpacity('--ds-text-secondary-color'),
        'placeholder-color': withOpacity('--ds-text-placeholder-color'),

        'base-color': withOpacity('--ds-text-base-color'),
        'base-hover-color': withOpacity('--ds-text-base-hover-color'),
      },

      // 边框
      borderColor: {
        'primary-color': withOpacity('--ds-border-primary-color'),
        'regular-color': withOpacity('--ds-border-regular-color'),
        'secondary-color': withOpacity('--ds-border-secondary-color'),
        'placeholder-color': withOpacity('--ds-border-placeholder-color'),

        'base-color': withOpacity('--ds-border-base-color'),
        'base-muted-color': withOpacity('--ds-border-base-muted-color'),
      },

      // 动画
      animation: {
        'bounce-x': 'bounce-x 1s ease-in-out infinite',
      },

      // 动画帧
      keyframes: {
        'bounce-x': {
          '0%, 100%': {
            'animation-timing-function': 'cubic-bezier(.8,0,1,1)',
            transform: 'rotate(-3deg)',
          },
          '50%': {
            'animation-timing-function': 'cubic-bezier(0,0,.2,1)',
            transform: 'translateX(-25%)',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
