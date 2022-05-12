import type { Colors } from "@fuel/css";
import { cx, styled } from "@fuel/css";
import type { ElementType } from "react";
import { useMemo, createElement } from "react";
import * as IconSet from "react-icons/bi";

import { createComponent } from "../../utils";

export type Icons = keyof typeof IconSet;
type OmitProps = "as" | "children";

export type IconProps = {
  icon: Icons | ElementType;
  size?: number;
  className?: string;
  color?: Colors;
  ["aria-label"]?: string;
};

const IconBase = createComponent<IconProps, OmitProps>(
  ({ icon, size = 16, color, className, ...props }) => {
    const classes = cx("fuel_icon", `fuel_icon--${icon}`, className);
    const element = useMemo(
      () => styled(typeof icon === "string" ? IconSet[icon] : icon),
      [icon]
    );
    const ariaLabel = props["aria-label"];
    const iconProps = {
      ...props,
      className: classes,
      css: { color: `$${color}` },
      ...(ariaLabel && { "aria-label": ariaLabel }),
      ...(size && { size }),
    };

    return createElement(element, iconProps);
  }
);

export type IconComponent = typeof IconBase & {
  iconList: Icons[];
  id: string;
};

export const Icon = IconBase as IconComponent;
Icon.iconList = Object.keys(IconSet) as Icons[];
Icon.id = "Icon";
