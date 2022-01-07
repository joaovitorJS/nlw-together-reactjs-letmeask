import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    colors: {
      backgroung: string;
      colorTitle: string;
      backgroungForm: string;
      highlighted: string;
      answered: string;
    }
  }
}