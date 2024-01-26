"use client";

import type { ReactNode } from "react";
import { Reshaped } from "reshaped";
import "reshaped/themes/reshaped/theme.css";

const App = ({ children }: { children: ReactNode }) => {
  return <Reshaped theme="reshaped">{children}</Reshaped>;
};

export default App;
