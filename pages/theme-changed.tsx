import { ChangeEvent, FC, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Layout } from "../components/layouts";
import { GetServerSideProps } from "next";
import Cookies from "js-cookie";
import axios from 'axios'

const ThemeChangedPage: FC<{theme: string}> = (props) => {
  const [currentTheme, setCurrentTheme] = useState(props.theme);

  const onThemeChanged = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: selectedTheme } = event.target;
    setCurrentTheme(selectedTheme);
    Cookies.set("theme", selectedTheme);
  };

  const onClick = async ()=> {
    const {data} = await axios.get("/api/hello");
    console.log(data)
  }

  return (
    <Layout>
      <Card>
        <CardContent>
          <FormControl>
            <FormLabel>Theme</FormLabel>
            <RadioGroup value={currentTheme} onChange={onThemeChanged}>
              <FormControlLabel
                value="light"
                label="Light"
                control={<Radio />}
              />
              <FormControlLabel value="dark" label="Dark" control={<Radio />} />
              <FormControlLabel
                value="custom"
                label="Custom"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
          <Button onClick={onClick}>Request</Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // const { data } = await
  const validThemes = ["light", "dark", "custom"];
  const { theme = "light" } = req.cookies;
  return {
    props: {
      theme: validThemes.includes(theme) ? theme : "light",
    },
  };
};

export default ThemeChangedPage;
