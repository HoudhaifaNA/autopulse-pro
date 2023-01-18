const colors = {
  white: "#fff",
  black: "#000",
  primary: {
    "50": "#e8e9fc",
    "300": "#6d80ef",
    "500": "#0045E5",
    "700": "#0031cd",
    "900": "#0005B2",
  },
  neutral: {
    "50": "#f9f9f9",
    "300": "#d8d8d8",
    "500": "#949494",
    "700": "#595959",
    "900": "#1a1a1a",
  },
  success: {
    "200": "#e3f7ed",
    "500": "#00c781",
    "700": "#00ad60",
  },
  error: {
    "200": "#ffecef",
    "500": "#ff4040",
    "700": "#dd2b38",
  },
  warning: {
    "200": "#fff8e2",
    "500": "#ffbb38",
    "700": "#fb8f26",
  },
};
let typographyOptions = {
  h1: [3.981, 700, 5.6],
  h2: [3.318, 700, 4.8],
  h3: [2.764, 700, 4],
  h4: [2.304, 500, 3.2],
  h5: [1.92, 500, 3.2],
  subtitle: [1.6, 400, 3.2],
  body1: [1.6, 400, 2.4],
  body2: [1.4, 400, 1.6],
  button: [1.6, 500, 2.4, "0.012em"],
  label: [1.2, 400, 1.6],
};

let typography = {};

// Setting the typography object from typographyOptions
for (const [key, value] of Object.entries(typographyOptions)) {
  const [size, weight, lineHeight, letterSpacing] = value;
  const options = {
    size: `${size}rem`,
    lineHeight: `${lineHeight}rem`,
    letterSpacing,
    weight,
  };
  typography = { ...typography, [key]: options };
}

const theme = { colors, typography };

export default theme;
