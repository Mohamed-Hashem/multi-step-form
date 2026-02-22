/// <reference types="@welldone-software/why-did-you-render" />
import React from "react";

if (import.meta.env.DEV) {
  const { default: whyDidYouRender } =
    await import("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: false,
    logOnDifferentValues: true,
  });
}
