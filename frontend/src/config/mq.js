import React from "react";
import { Mixin } from "react-mq"

Mixin.addMediaQueries({
    xs: "(max-width: 576px)",
    sm: "(max-width: 768px)",
    md: "(max-width: 960px)",
    lg: "(max-width: 1140px)",
    xl: Infinity,
})
