"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";

export type DynamicCloudProps = {
  iconSlugs?: string[]; // Made iconSlugs optional
  imageArray?: string[];
};

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      paddingTop: 40,
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    maxSpeed: 0.05,
    minSpeed: 0.02,
    outlineColour: "#0000",
  },
};

export const renderCustomIcon = (
  icon: SimpleIcon,
  theme: string,
) => {
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";
  const minContrastRatio = theme === "dark" ? 2 : 1.2;

  return renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    minContrastRatio,
    size: 42,
    aProps: {
      href: undefined,
      target: undefined,
      rel: undefined,
      onClick: (e: React.MouseEvent<HTMLAnchorElement>) => e.preventDefault(),
    },
  });
};

type IconData = Awaited<ReturnType<typeof fetchSimpleIcons>>;

export default function IconCloud({
  iconSlugs = [], // Default to an empty array if not provided
  imageArray,
}: DynamicCloudProps) {
  const [data, setData] = useState<IconData | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (iconSlugs.length > 0) {
      console.log("Fetching icons for slugs:", iconSlugs);
      fetchSimpleIcons({ slugs: iconSlugs })
        .then((result) => {
          console.log("Fetched icons:", result);
          setData(result);
        })
        .catch((error) => console.error("Error fetching icons:", error));
    }
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data || !data.simpleIcons) return null;

    return Object.values(data.simpleIcons)
      .filter((icon) => icon) // Filter out undefined icons
      .map((icon) => renderCustomIcon(icon, theme || "light"));
  }, [data, theme]);

  return (
    // @ts-expect-ignore
    <Cloud {...cloudProps}>
      <>
        {renderedIcons}
        {imageArray &&
          imageArray.length > 0 &&
          imageArray.map((image, index) => (
            <a key={index} href="#" onClick={(e) => e.preventDefault()}>
              <img height="42" width="42" alt="A globe" src={image} />
            </a>
          ))}
      </>
    </Cloud>
  );
}
