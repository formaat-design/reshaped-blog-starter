"use client";

import type { ReactNode } from "react";
import { Reshaped } from "reshaped";
import "../../themes/blog/theme.css";

const App = ({ children }: { children: ReactNode }) => {
  return <Reshaped theme="blog">{children}</Reshaped>;
};

export default App;
