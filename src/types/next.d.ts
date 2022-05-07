import { EmotionCache } from "@emotion/cache";
import type {
  NextComponentType,
  NextPageContext,
  NextLayoutComponentType,
} from "next";
import type { AppProps } from "next/app";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

declare module "next" {
  type NextLayoutComponentType<P = {}> = NextComponentType<
    NextPageContext,
    any,
    P
  > & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

declare module "next/app" {
  type AppLayoutProps<P = {}> = MyAppProps & {
    Component: NextLayoutComponentType;
  };
}
