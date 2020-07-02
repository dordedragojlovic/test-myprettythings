// Screen sizes
export const screen = {
    xxs: 360,
    xs: 500,
    sm: 768,
    md: 1024,
    mdpi: 1280,
    mac: 1440,
    lg: 1600,
    xl: 1920,
  

    get xsMax() {
      return this.sm - 1;
    },
    get smMin() {
      return this.sm;
    },
    get smMax() {
      return this.md - 1;
    },
    get mdMin() {
      return this.md;
    },
    get mdMax() {
      return this.mdpi - 1;
    },
    get mdpiMin() {
      return this.mdpi;
    },
    get mdpiMax() {
      return this.mac - 1;
    },
    get macMin() {
      return this.mac;
    },
    get macMax() {
        return this.lg - 1;
    },
    get lgMin() {
      return this.lg;
    },
    get lgMax() {
      return this.xl - 1;
    },
    get xlMin() {
      return this.xl;
    }
  };
  