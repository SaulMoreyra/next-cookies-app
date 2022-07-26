import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { GetServerSideProps } from "next";
import type { AppContext, AppProps } from "next/app";
import { darkTheme, lightTheme, customTheme } from "../themes";

type Props =AppProps & {theme: string}
function MyApp({ Component, pageProps, theme }: Props) {

  const themes = {
    "light": lightTheme,
    "dark": darkTheme,
    "custom": customTheme
  }

  const currentTheme = themes[theme as keyof typeof  themes] || themes.custom;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline/>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// IT WORKS ACCESING TO pageProps
// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   // const { data } = await
//   const validThemes = ["light", "dark", "custom"];
//   const { theme = "light" } = req.cookies;
//   return {
//     props: {
//       theme: validThemes.includes(theme) ? theme : "light",
//     },
//   };
// };

MyApp.getInitialProps = async (appctx: AppContext) => {
  const {theme} = appctx.ctx.req ? (appctx.ctx.req as any).cookies : {theme: "light"}
  const validThemes = ["light", "dark", "custom"];
  return {
    theme:  validThemes.includes(theme) ? theme : "light",
  }
}

export default MyApp;
