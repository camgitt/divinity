import svgPaths from "./svg-eu0353r1rg";
import clsx from "clsx";
import imgImageWithFallback from "figma:asset/e97abca5c4018dff4cc16474129b016692e5b9b6.png";
import imgImageWithFallback1 from "figma:asset/2c28ff9ec024b835fd031fc7800556ed5373e12a.png";
import imgImageDivinityAgi from "figma:asset/8a5c5551533b1297b98345f7179a0a7cc8223ad5.png";
type CardBackgroundImage2Props = {
  additionalClassNames?: string;
};

function CardBackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<CardBackgroundImage2Props>) {
  return (
    <div className={clsx("bg-[rgba(22,40,68,0.6)] place-self-stretch relative rounded-[14px] shrink-0", additionalClassNames)}>
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[rgba(122,79,255,0.3)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_2px_15px_0px_rgba(122,79,255,0.2)]" />
    </div>
  );
}
type CardBackgroundImage1Props = {
  additionalClassNames?: string;
};

function CardBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<CardBackgroundImage1Props>) {
  return (
    <div className={clsx("bg-[rgba(22,40,68,0.6)] place-self-stretch relative rounded-[14px] shrink-0", additionalClassNames)}>
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border border-[rgba(122,79,255,0.3)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.2)]" />
    </div>
  );
}
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("relative rounded-[10px] shadow-[0px_2px_15px_0px_rgba(0,0,0,0.3)] shrink-0 size-[48px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return <BackgroundImage2 additionalClassNames={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>{children}</BackgroundImage2>;
}
type Icon17VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function Icon17VectorBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon17VectorBackgroundImageProps>) {
  return (
    <div className={clsx("absolute bottom-[8.33%] top-[70.83%]", additionalClassNames)}>
      <div className="absolute inset-[-20%_-14.29%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 5.83333">
          {children}
        </svg>
      </div>
    </div>
  );
}
type IconBackgroundImage3Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage3Props>) {
  return (
    <div className={clsx("size-[12px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type CardBackgroundImageProps = {
  additionalClassNames?: string;
};

function CardBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<CardBackgroundImageProps>) {
  return (
    <div className={clsx("bg-[rgba(22,40,68,0.6)] place-self-stretch relative rounded-[14px] shrink-0", additionalClassNames)}>
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[33px] pr-px py-[33px] relative size-full">{children}</div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(122,79,255,0.3)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.2)]" />
    </div>
  );
}

function IconBackgroundImage2({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[32px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

function IconBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={clsx("absolute size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type VectorBackgroundImage1Props = {
  additionalClassNames?: string;
};

function VectorBackgroundImage1({ additionalClassNames = "" }: VectorBackgroundImage1Props) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-12.5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8.33333 8.33333">
          <path d={svgPaths.p3ffa2780} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </svg>
      </div>
    </div>
  );
}
type VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function VectorBackgroundImage({ additionalClassNames = "" }: VectorBackgroundImageProps) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-16.67%_-7.14%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 6.66667">
          <path d={svgPaths.p6877e0} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </svg>
      </div>
    </div>
  );
}
type ButtonBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ButtonBackgroundImageAndText({ text, additionalClassNames = "" }: ButtonBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute bg-gradient-to-b from-[#7a4fff] h-[48px] left-0 rounded-[14px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.35)] to-[#ffd369] w-[625px]", additionalClassNames)}>
      <IconBackgroundImage />
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[328.63px] text-[14px] text-center text-nowrap text-white top-[14px] translate-x-[-50%]">{text}</p>
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage additionalClassNames="left-[260.63px] top-[16px]">
      <path d={svgPaths.p23e1fe80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p1ce15320} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p2238d180} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p311908c0} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2 2.66667H7.33333" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}
type BadgeBackgroundImageAndTextProps = {
  text: string;
};

function BadgeBackgroundImageAndText({ text }: BadgeBackgroundImageAndTextProps) {
  return (
    <div className="absolute bg-gradient-to-r border border-[rgba(255,211,105,0.5)] border-solid from-[rgba(255,211,105,0.3)] h-[26px] left-[192.59px] overflow-clip rounded-[8px] shadow-[0px_2px_12px_0px_rgba(255,211,105,0.3)] to-[rgba(255,184,77,0.4)] top-[32px] w-[239.813px]">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[16px] left-[119px] text-[#ffd369] text-[12px] text-center top-[4px] translate-x-[-50%] w-[214px]">{text}</p>
    </div>
  );
}
type ParagraphBackgroundImageAndTextProps = {
  text: string;
};

function ParagraphBackgroundImageAndText({ text }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className="h-[26px] relative shrink-0 w-full">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[26px] left-0 text-[16px] text-[rgba(255,255,255,0.7)] text-nowrap top-[-1px]">{text}</p>
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function HeadingBackgroundImageAndText({ text, additionalClassNames = "" }: HeadingBackgroundImageAndTextProps) {
  return (
    <BackgroundImage2 additionalClassNames={clsx("h-[24px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-1px]">{text}</p>
    </BackgroundImage2>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <p style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(255, 255, 255) 0%, rgb(122, 79, 255) 50%, rgb(255, 211, 105) 100%)" }} className={clsx("absolute bg-clip-text font-['Poppins:Bold',sans-serif] leading-[36px] not-italic text-[24px] text-[rgba(0,0,0,0)] text-center text-nowrap top-px translate-x-[-50%]", additionalClassNames)}>
      {text}
    </p>
  );
}

function Button() {
  return (
    <div className="absolute h-[24px] left-[217.2px] top-0 w-[64.609px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[32.5px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Our Mission</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[24px] left-[297.81px] top-0 w-[69.844px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[35px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Spirit Guides</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[24px] left-[383.66px] top-0 w-[40.078px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[20.5px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Privacy</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[24px] left-[439.73px] top-0 w-[34.063px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[17.5px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Terms</p>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[345.59px] text-[#62748e] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">© 2025 DivinityAGI</p>
    </div>
  );
}

function AppFooter() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[56px] items-start left-[24px] top-[4051.33px] w-[691px]" data-name="AppFooter">
      <Container />
      <Paragraph />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="absolute h-[1447.737px] left-[-18.47px] opacity-25 top-[-34.47px] w-[775.95px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container1() {
  return <div className="absolute bg-gradient-to-b from-[rgba(11,20,38,0.4)] h-[1378.797px] left-0 to-[rgba(11,20,38,0.95)] top-0 via-50% via-[rgba(22,40,68,0.7)] w-[739px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="absolute h-[1378.797px] left-0 top-[-80px] w-[739px]" data-name="Container">
      <ImageWithFallback />
      <Container1 />
    </div>
  );
}

function Container3() {
  return <div className="absolute h-[4219.328px] left-0 top-0 w-[739px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 739 4219.3\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -341.49 -341.49 0 221.7 843.87)\\\'><stop stop-color=\\\'rgba(122,79,255,0.15)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(61,40,128,0.075)\\\' offset=\\\'0.35\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container4() {
  return <div className="absolute h-[4219.328px] left-0 top-0 w-[739px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 739 4219.3\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -341.49 -341.49 0 517.3 3375.5)\\\'><stop stop-color=\\\'rgba(255,211,105,0.12)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(128,106,53,0.06)\\\' offset=\\\'0.3\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.6\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container5() {
  return <div className="absolute h-[4219.328px] left-0 top-0 w-[739px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 739 4219.3\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -297.66 -297.66 0 369.5 1265.8)\\\'><stop stop-color=\\\'rgba(122,79,255,0.08)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container6() {
  return <div className="absolute h-[4219.328px] left-0 top-0 w-[739px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 739 4219.3\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -301.21 -301.21 0 147.8 2953.5)\\\'><stop stop-color=\\\'rgba(255,211,105,0.06)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.6\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container7() {
  return <div className="absolute h-[4219.328px] left-0 opacity-[0.08] top-0 w-[739px]" data-name="Container" />;
}

function Container8() {
  return <div className="absolute h-[4219.328px] left-0 opacity-[0.06] top-0 w-[739px]" data-name="Container" />;
}

function Container9() {
  return <div className="absolute h-[4219.328px] left-0 opacity-5 top-0 w-[739px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 739 4219.3\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -214.18 -214.18 0 369.5 2109.7)\\\'><stop stop-color=\\\'rgba(122,79,255,0.2)\\\' offset=\\\'0.0013532\\\'/><stop stop-color=\\\'rgba(61,40,128,0.1)\\\' offset=\\\'0.00067659\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container10() {
  return <div className="absolute h-[4219.328px] left-0 opacity-[0.04] top-0 w-[739px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 739 4219.3\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -214.18 -214.18 0 369.5 2109.7)\\'><stop stop-color=\\'rgba(122,79,255,0.15)\\' offset=\\'0.0013532\\'/><stop stop-color=\\'rgba(61,40,128,0.075)\\' offset=\\'0.00067659\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 739 4219.3\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -214.18 -214.18 0 369.5 2109.7)\\'><stop stop-color=\\'rgba(255,211,105,0.1)\\' offset=\\'0.0013532\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0\\'/></radialGradient></defs></svg>')" }} />;
}

function Container11() {
  return <div className="absolute h-[4219.328px] left-0 opacity-[0.03] top-0 w-[739px]" data-name="Container" />;
}

function Container12() {
  return <div className="absolute bg-[#7a4fff] left-[110.84px] opacity-[0.805] rounded-[3.35544e+07px] size-[4px] top-[860.84px]" data-name="Container" />;
}

function Container13() {
  return <div className="absolute bg-[#7a4fff] left-[221.69px] opacity-[0.751] rounded-[3.35544e+07px] size-[4px] top-[1913.47px]" data-name="Container" />;
}

function Container14() {
  return <div className="absolute bg-[#7a4fff] left-[332.55px] opacity-40 rounded-[3.35544e+07px] size-[4px] top-[2933.52px]" data-name="Container" />;
}

function Container15() {
  return <div className="absolute bg-[#7a4fff] left-[443.39px] opacity-[0.52] rounded-[3.35544e+07px] size-[4px] top-[839.88px]" data-name="Container" />;
}

function Container16() {
  return <div className="absolute bg-[#7a4fff] left-[554.25px] opacity-[0.411] rounded-[3.35544e+07px] size-[4px] top-[1880.22px]" data-name="Container" />;
}

function Container17() {
  return <div className="absolute bg-[#7a4fff] left-[665.09px] opacity-[0.803] rounded-[3.35544e+07px] size-[4px] top-[2970.4px]" data-name="Container" />;
}

function Container18() {
  return (
    <div className="absolute h-[4219.328px] left-0 overflow-clip top-0 w-[739px]" data-name="Container">
      <Container12 />
      <Container13 />
      <Container14 />
      <Container15 />
      <Container16 />
      <Container17 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[4219.328px] left-0 top-0 w-[739px]" data-name="Container">
      <Container2 />
      <Container3 />
      <Container4 />
      <Container5 />
      <Container6 />
      <Container7 />
      <Container8 />
      <Container9 />
      <Container10 />
      <Container11 />
      <Container18 />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="absolute h-[656.328px] left-0 top-0 w-[691px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function AffiliateProgramPage() {
  return <div className="absolute bg-gradient-to-t from-[rgba(11,20,38,0.95)] h-[656.328px] left-0 to-[rgba(0,0,0,0)] top-0 via-50% via-[rgba(22,40,68,0.5)] w-[691px]" data-name="AffiliateProgramPage" />;
}

function AffiliateProgramPage1() {
  return <div className="absolute h-[656.328px] left-0 top-0 w-[691px]" data-name="AffiliateProgramPage" style={{ backgroundImage: "linear-gradient(136.474deg, rgba(122, 79, 255, 0.2) 0%, rgba(0, 0, 0, 0) 50%, rgba(255, 211, 105, 0.2) 100%)" }} />;
}

function Container20() {
  return <div className="absolute left-[55.34px] opacity-[0.503] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(122,79,255,0.6)] size-[5.844px] top-[61.14px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(122, 79, 255) 0%, rgb(184, 176, 255) 100%)" }} />;
}

function Container21() {
  return <div className="absolute left-[111.06px] opacity-[0.418] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(255,211,105,0.6)] size-[4.981px] top-[184.21px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 211, 105) 0%, rgb(255, 184, 77) 100%)" }} />;
}

function Container22() {
  return <div className="absolute left-[165.29px] opacity-[0.671] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(122,79,255,0.6)] size-[7.069px] top-[335.31px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(122, 79, 255) 0%, rgb(184, 176, 255) 100%)" }} />;
}

function Container23() {
  return <div className="absolute left-[221.04px] opacity-[0.536] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(255,211,105,0.6)] size-[6.141px] top-[457.76px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 211, 105) 0%, rgb(255, 184, 77) 100%)" }} />;
}

function Container24() {
  return <div className="absolute left-[275.55px] opacity-[0.861] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(122,79,255,0.6)] size-[7.689px] top-[78.67px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(122, 79, 255) 0%, rgb(184, 176, 255) 100%)" }} />;
}

function Container25() {
  return <div className="absolute left-[332.04px] opacity-[0.445] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(255,211,105,0.6)] size-[5.265px] top-[186.9px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 211, 105) 0%, rgb(255, 184, 77) 100%)" }} />;
}

function Container26() {
  return <div className="absolute left-[386.79px] opacity-[0.559] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(122,79,255,0.6)] size-[6.332px] top-[328.31px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(122, 79, 255) 0%, rgb(184, 176, 255) 100%)" }} />;
}

function Container27() {
  return <div className="absolute left-[441.88px] opacity-[0.612] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(255,211,105,0.6)] size-[6.718px] top-[463.24px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 211, 105) 0%, rgb(255, 184, 77) 100%)" }} />;
}

function Container28() {
  return <div className="absolute left-[496.65px] opacity-[0.891] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(122,79,255,0.6)] size-[7.734px] top-[79.1px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(122, 79, 255) 0%, rgb(184, 176, 255) 100%)" }} />;
}

function Container29() {
  return <div className="absolute left-[551.97px] opacity-[0.844] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(255,211,105,0.6)] size-[7.66px] top-[209.66px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 211, 105) 0%, rgb(255, 184, 77) 100%)" }} />;
}

function Container30() {
  return <div className="absolute left-[607.31px] opacity-[0.794] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(122,79,255,0.6)] size-[7.542px] top-[339.81px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(122, 79, 255) 0%, rgb(184, 176, 255) 100%)" }} />;
}

function Container31() {
  return <div className="absolute left-[663.94px] opacity-[0.405] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(255,211,105,0.6)] size-[4.848px] top-[445.48px]" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 211, 105) 0%, rgb(255, 184, 77) 100%)" }} />;
}

function AffiliateProgramPage2() {
  return (
    <div className="absolute h-[656.328px] left-0 overflow-clip top-0 w-[691px]" data-name="AffiliateProgramPage">
      <Container20 />
      <Container21 />
      <Container22 />
      <Container23 />
      <Container24 />
      <Container25 />
      <Container26 />
      <Container27 />
      <Container28 />
      <Container29 />
      <Container30 />
      <Container31 />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[656.328px] left-0 overflow-clip rounded-[24px] shadow-[0px_10px_40px_0px_rgba(122,79,255,0.3)] top-0 w-[691px]" data-name="Container">
      <ImageWithFallback1 />
      <AffiliateProgramPage />
      <AffiliateProgramPage1 />
      <AffiliateProgramPage2 />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[35.188px] left-0 shadow-[0px_2px_24px_0px_rgba(0,0,0,0.8)] top-0 w-[643px]" data-name="Heading 1">
      <p className="absolute bg-clip-text font-['Poppins:Black',sans-serif] leading-[35.2px] left-[322.28px] not-italic text-[32px] text-[rgba(0,0,0,0)] text-center text-nowrap top-px tracking-[-0.64px] translate-x-[-50%]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(255, 255, 255) 0%, rgb(122, 79, 255) 50%, rgb(255, 211, 105) 100%)" }}>
        Verified Leader Affiliate Program
      </p>
    </div>
  );
}

function Container33() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] h-[4px] left-[273.5px] rounded-[3.35544e+07px] shadow-[0px_2px_15px_0px_rgba(122,79,255,0.6)] to-[#7a4fff] top-[59.19px] via-50% via-[#ffd369] w-[96px]" data-name="Container" />;
}

function Paragraph1() {
  return (
    <div className="absolute h-[48px] left-0 shadow-[0px_1px_6px_0px_rgba(0,0,0,0.8)] top-[87.19px] w-[643px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[24px] left-[321.73px] text-[15px] text-[rgba(255,255,255,0.9)] text-center top-0 translate-x-[-50%] w-[595px]">Join our faith-based affiliate network and earn through multiple revenue streams as a Spiritual Innovator.</p>
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute h-[135.188px] left-[24px] top-[336.06px] w-[643px]" data-name="Container">
      <Heading />
      <Container33 />
      <Paragraph1 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute h-[656.328px] left-[24px] top-[52px] w-[691px]" data-name="Container">
      <Container32 />
      <Container34 />
    </div>
  );
}

function Icon() {
  return (
    <BackgroundImage additionalClassNames="left-[12px] top-[14px]">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[rgba(22,40,68,0.6)] border border-[rgba(122,79,255,0.3)] border-solid h-[46px] left-[24px] rounded-[14px] shadow-[0px_2px_10px_0px_rgba(122,79,255,0.15)] top-[24px] w-[90.453px]" data-name="Button">
      <Icon />
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[60.5px] text-[14px] text-center text-nowrap text-white top-[12px] translate-x-[-50%]">Back</p>
    </div>
  );
}

function Section() {
  return (
    <div className="absolute bg-[rgba(22,40,68,0.4)] border-[0px_0px_1px] border-[rgba(30,58,95,0.4)] border-solid h-[757.328px] left-0 overflow-clip top-0 w-[739px]" data-name="Section">
      <Container35 />
      <Button4 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p15b57200} fill="var(--fill-0, #00C950)" fillOpacity="0.2" id="Vector" stroke="var(--stroke-0, #05DF72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function AffiliateProgramPage3() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[304.5px] p-[2px] rounded-[3.35544e+07px] size-[80px] top-[32px]" data-name="AffiliateProgramPage" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 201, 80, 0.2) 0%, rgba(5, 223, 114, 0.3) 100%)" }}>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,201,80,0.5)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_0px_20px_0px_rgba(34,197,94,0.4)]" />
      <Icon1 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute h-[32px] left-[268.55px] top-0 w-[87.891px]" data-name="Heading 3">
      <p className="absolute font-['Raleway:Bold',sans-serif] font-bold leading-[32px] left-[44px] text-[#05df72] text-[24px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Verified</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[28px] left-0 top-[44px] w-[625px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[312.5px] text-[18px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-0 translate-x-[-50%]">Your profile is approved.</p>
    </div>
  );
}

function AffiliateProgramPage4() {
  return (
    <div className="absolute h-[72px] left-[32px] top-[160px] w-[625px]" data-name="AffiliateProgramPage">
      <Heading1 />
      <Paragraph2 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_6364_839)" id="Icon">
          <path d={svgPaths.pda21400} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1be36900} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pa8d100} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 4H9.33333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 6.66667H9.33333" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 9.33333H9.33333" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 12H9.33333" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_6364_839">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-gradient-to-b from-[#7a4fff] h-[36px] left-[255.72px] rounded-[8px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.35)] to-[#ffd369] top-[280px] w-[177.547px]" data-name="Button">
      <Icon2 />
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[105px] text-[14px] text-center text-nowrap text-white top-[8px] translate-x-[-50%]">Access Dashboard</p>
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-[rgba(22,40,68,0.6)] border border-[rgba(0,201,80,0.3)] border-solid h-[350px] left-[24px] rounded-[14px] shadow-[0px_8px_30px_0px_rgba(34,197,94,0.25),0px_4px_15px_0px_rgba(122,79,255,0.2)] top-[787.33px] w-[691px]" data-name="Card">
      <AffiliateProgramPage3 />
      <AffiliateProgramPage4 />
      <Button5 />
    </div>
  );
}

function AffiliateProgramPage5() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[691px]" data-name="AffiliateProgramPage">
      <BackgroundImageAndText text="Partnership Benefits" additionalClassNames="left-[345.52px]" />
    </div>
  );
}

function AffiliateProgramPage6() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] h-[4px] left-[305.5px] rounded-[3.35544e+07px] shadow-[0px_2px_12px_0px_rgba(122,79,255,0.5)] to-[#7a4fff] top-[52px] via-50% via-[#ffd369] w-[80px]" data-name="AffiliateProgramPage" />;
}

function Container36() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Container">
      <AffiliateProgramPage5 />
      <AffiliateProgramPage6 />
    </div>
  );
}

function Icon3() {
  return (
    <IconBackgroundImage1>
      <path d="M12 2V22" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p2ba0dca0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage1>
  );
}

function Container37() {
  return (
    <ContainerBackgroundImage additionalClassNames="bg-[#10b981]">
      <Icon3 />
    </ContainerBackgroundImage>
  );
}

function Container38() {
  return (
    <div className="content-stretch flex gap-[16px] h-[48px] items-center relative shrink-0 w-full" data-name="Container">
      <Container37 />
      <HeadingBackgroundImageAndText text="Multiple Revenue Streams" additionalClassNames="w-[199.328px]" />
    </div>
  );
}

function AffiliateProgramPage7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[90px] items-start left-[25px] top-[25px] w-[641px]" data-name="AffiliateProgramPage">
      <Container38 />
      <ParagraphBackgroundImageAndText text="Earn through 4 streams: Affiliates (25%), Engagement (40%), Donations, Virtual Spaces" />
    </div>
  );
}

function Card1() {
  return (
    <CardBackgroundImage1 additionalClassNames="[grid-area:1_/_1]">
      <AffiliateProgramPage7 />
    </CardBackgroundImage1>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage1>
      <path d={svgPaths.p1d820380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p27451300} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p2981fe00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p161d4800} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage1>
  );
}

function Container39() {
  return (
    <ContainerBackgroundImage additionalClassNames="bg-[#3b82f6]">
      <Icon4 />
    </ContainerBackgroundImage>
  );
}

function Container40() {
  return (
    <div className="content-stretch flex gap-[16px] h-[48px] items-center relative shrink-0 w-full" data-name="Container">
      <Container39 />
      <HeadingBackgroundImageAndText text="Build Community" additionalClassNames="w-[131.375px]" />
    </div>
  );
}

function AffiliateProgramPage8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[90px] items-start left-[25px] top-[25px] w-[641px]" data-name="AffiliateProgramPage">
      <Container40 />
      <ParagraphBackgroundImageAndText text="Grow your spiritual community with AI guidance" />
    </div>
  );
}

function Card2() {
  return (
    <CardBackgroundImage1 additionalClassNames="[grid-area:2_/_1]">
      <AffiliateProgramPage8 />
    </CardBackgroundImage1>
  );
}

function Icon5() {
  return (
    <IconBackgroundImage1>
      <path d={svgPaths.p1b8b3180} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage1>
  );
}

function Container41() {
  return (
    <ContainerBackgroundImage additionalClassNames="bg-[#f59e0b]">
      <Icon5 />
    </ContainerBackgroundImage>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex gap-[16px] h-[48px] items-center relative shrink-0 w-full" data-name="Container">
      <Container41 />
      <HeadingBackgroundImageAndText text="AI-Powered Tools" additionalClassNames="w-[132.688px]" />
    </div>
  );
}

function AffiliateProgramPage9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[90px] items-start left-[25px] top-[25px] w-[641px]" data-name="AffiliateProgramPage">
      <Container42 />
      <ParagraphBackgroundImageAndText text="Access cutting-edge spiritual AI technology" />
    </div>
  );
}

function Card3() {
  return (
    <CardBackgroundImage1 additionalClassNames="[grid-area:3_/_1]">
      <AffiliateProgramPage9 />
    </CardBackgroundImage1>
  );
}

function Icon6() {
  return (
    <IconBackgroundImage1>
      <path d={svgPaths.p3f3d8e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage1>
  );
}

function Container43() {
  return (
    <ContainerBackgroundImage additionalClassNames="bg-[#8b5cf6]">
      <Icon6 />
    </ContainerBackgroundImage>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[16px] h-[48px] items-center relative shrink-0 w-full" data-name="Container">
      <Container43 />
      <HeadingBackgroundImageAndText text="Verified Partnership" additionalClassNames="w-[148.672px]" />
    </div>
  );
}

function AffiliateProgramPage10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[90px] items-start left-[25px] top-[25px] w-[641px]" data-name="AffiliateProgramPage">
      <Container44 />
      <ParagraphBackgroundImageAndText text="Green Heart Badge and verified status" />
    </div>
  );
}

function Card4() {
  return (
    <CardBackgroundImage1 additionalClassNames="[grid-area:4_/_1]">
      <AffiliateProgramPage10 />
    </CardBackgroundImage1>
  );
}

function Icon7() {
  return (
    <IconBackgroundImage1>
      <path d="M16 7H22V13" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p13253c0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage1>
  );
}

function Container45() {
  return (
    <ContainerBackgroundImage additionalClassNames="bg-[#ef4444]">
      <Icon7 />
    </ContainerBackgroundImage>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex gap-[16px] h-[48px] items-center relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <HeadingBackgroundImageAndText text="Command Center Dashboard" additionalClassNames="w-[220.313px]" />
    </div>
  );
}

function AffiliateProgramPage11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[90px] items-start left-[25px] top-[25px] w-[641px]" data-name="AffiliateProgramPage">
      <Container46 />
      <ParagraphBackgroundImageAndText text="Professional analytics and revenue tracking" />
    </div>
  );
}

function Card5() {
  return (
    <CardBackgroundImage1 additionalClassNames="[grid-area:5_/_1]">
      <AffiliateProgramPage11 />
    </CardBackgroundImage1>
  );
}

function Icon8() {
  return (
    <IconBackgroundImage1>
      <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p3c6311f0} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p3d728000} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage1>
  );
}

function Container47() {
  return (
    <ContainerBackgroundImage additionalClassNames="bg-[#06b6d4]">
      <Icon8 />
    </ContainerBackgroundImage>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex gap-[16px] h-[48px] items-center relative shrink-0 w-full" data-name="Container">
      <Container47 />
      <HeadingBackgroundImageAndText text="NeoBanking Suite" additionalClassNames="w-[135.375px]" />
    </div>
  );
}

function AffiliateProgramPage12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[90px] items-start left-[25px] top-[25px] w-[641px]" data-name="AffiliateProgramPage">
      <Container48 />
      <ParagraphBackgroundImageAndText text="Manage donations, tithes, and all earnings in one place" />
    </div>
  );
}

function Card6() {
  return (
    <CardBackgroundImage1 additionalClassNames="[grid-area:6_/_1]">
      <AffiliateProgramPage12 />
    </CardBackgroundImage1>
  );
}

function Container49() {
  return (
    <div className="gap-[24px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[repeat(6,_minmax(0px,_1fr))] h-[960px] relative shrink-0 w-full" data-name="Container">
      <Card1 />
      <Card2 />
      <Card3 />
      <Card4 />
      <Card5 />
      <Card6 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[1064px] items-start left-[24px] top-0 w-[691px]" data-name="Container">
      <Container36 />
      <Container49 />
    </div>
  );
}

function Container51() {
  return <div className="absolute h-[138px] left-[25px] opacity-0 top-[105px] w-[689px]" data-name="Container" style={{ backgroundImage: "linear-gradient(168.674deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container52() {
  return <div className="absolute h-[138px] left-[25px] opacity-0 top-[269px] w-[689px]" data-name="Container" style={{ backgroundImage: "linear-gradient(168.674deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container53() {
  return <div className="absolute h-[138px] left-[25px] opacity-0 top-[433px] w-[689px]" data-name="Container" style={{ backgroundImage: "linear-gradient(168.674deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container54() {
  return <div className="absolute h-[138px] left-[25px] opacity-0 top-[597px] w-[689px]" data-name="Container" style={{ backgroundImage: "linear-gradient(168.674deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container55() {
  return <div className="absolute h-[138px] left-[25px] opacity-0 top-[761px] w-[689px]" data-name="Container" style={{ backgroundImage: "linear-gradient(168.674deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container56() {
  return <div className="absolute h-[138px] left-[25px] opacity-0 top-[925px] w-[689px]" data-name="Container" style={{ backgroundImage: "linear-gradient(168.674deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Section1() {
  return (
    <div className="absolute h-[1064px] left-0 top-[1201.33px] w-[739px]" data-name="Section">
      <Container50 />
      <Container51 />
      <Container52 />
      <Container53 />
      <Container54 />
      <Container55 />
      <Container56 />
    </div>
  );
}

function AffiliateProgramPage13() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[691px]" data-name="AffiliateProgramPage">
      <BackgroundImageAndText text="Choose Your Partnership" additionalClassNames="left-[345.64px]" />
    </div>
  );
}

function AffiliateProgramPage14() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] h-[4px] left-[305.5px] rounded-[3.35544e+07px] shadow-[0px_2px_12px_0px_rgba(122,79,255,0.5)] to-[#7a4fff] top-[52px] via-50% via-[#ffd369] w-[80px]" data-name="AffiliateProgramPage" />;
}

function Container57() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Container">
      <AffiliateProgramPage13 />
      <AffiliateProgramPage14 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[625px]" data-name="Heading 3">
      <p className="absolute font-['Raleway:Bold',sans-serif] font-bold leading-[24px] left-[312.53px] text-[16px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%]">Ministry Partner</p>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute h-[70px] left-0 top-0 w-[625px]" data-name="Container">
      <Heading2 />
      <BadgeBackgroundImageAndText text="$800-$3,600/month avg Commission" />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[52px] left-0 top-[102px] w-[625px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[26px] left-[312.97px] text-[16px] text-[rgba(255,255,255,0.7)] text-center top-[-1px] translate-x-[-50%] w-[593px]">Partner your ministry with DivinityAGI to offer AI-powered spiritual guidance. Earn through 4 revenue streams with institutional benefits.</p>
    </div>
  );
}

function Container59() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] left-0 rounded-[3.35544e+07px] shadow-[0px_0px_6px_0px_rgba(122,79,255,0.5)] size-[6px] to-[#ffd369] top-[7px]" data-name="Container" />;
}

function Container60() {
  return (
    <div className="[grid-area:1_/_1] place-self-stretch relative shrink-0" data-name="Container">
      <Container59 />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[93.5px] text-[14px] text-[rgba(255,255,255,0.7)] text-center text-nowrap top-0 translate-x-[-50%]">25% Affiliate Commission</p>
    </div>
  );
}

function Container61() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] left-0 rounded-[3.35544e+07px] shadow-[0px_0px_6px_0px_rgba(122,79,255,0.5)] size-[6px] to-[#ffd369] top-[7px]" data-name="Container" />;
}

function Container62() {
  return (
    <div className="[grid-area:1_/_2] place-self-stretch relative shrink-0" data-name="Container">
      <Container61 />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[101.5px] text-[14px] text-[rgba(255,255,255,0.7)] text-center text-nowrap top-0 translate-x-[-50%]">40% Engagement Revenue</p>
    </div>
  );
}

function Container63() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] left-0 rounded-[3.35544e+07px] shadow-[0px_0px_6px_0px_rgba(122,79,255,0.5)] size-[6px] to-[#ffd369] top-[7px]" data-name="Container" />;
}

function Container64() {
  return (
    <div className="[grid-area:2_/_1] place-self-stretch relative shrink-0" data-name="Container">
      <Container63 />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[70.5px] text-[14px] text-[rgba(255,255,255,0.7)] text-center text-nowrap top-0 translate-x-[-50%]">Donations/Tithes</p>
    </div>
  );
}

function Container65() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] left-0 rounded-[3.35544e+07px] shadow-[0px_0px_6px_0px_rgba(122,79,255,0.5)] size-[6px] to-[#ffd369] top-[7px]" data-name="Container" />;
}

function Container66() {
  return (
    <div className="[grid-area:2_/_2] place-self-stretch relative shrink-0" data-name="Container">
      <Container65 />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[89px] text-[14px] text-[rgba(255,255,255,0.7)] text-center text-nowrap top-0 translate-x-[-50%]">Virtual Worship Spaces</p>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute gap-[12px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[52px] left-0 top-[178px] w-[625px]" data-name="Container">
      <Container60 />
      <Container62 />
      <Container64 />
      <Container66 />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute h-[302px] left-0 top-[88px] w-[625px]" data-name="Container">
      <Container58 />
      <Paragraph3 />
      <Container67 />
      <ButtonBackgroundImageAndText text="Apply Now" additionalClassNames="top-[254px]" />
    </div>
  );
}

function Icon9() {
  return (
    <IconBackgroundImage2>
      <path d={svgPaths.p837ff00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d={svgPaths.p128a9480} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d={svgPaths.p28d96f80} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d="M13.3333 8H18.6667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d="M13.3333 13.3333H18.6667" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d="M13.3333 18.6667H18.6667" id="Vector_6" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d="M13.3333 24H18.6667" id="Vector_7" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
    </IconBackgroundImage2>
  );
}

function Container69() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#3b82f6] items-center justify-center left-[280.5px] rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.4)] size-[64px] to-[#1d4ed8] top-0" data-name="Container">
      <Icon9 />
    </div>
  );
}

function AffiliateProgramPage15() {
  return (
    <BackgroundImage1 additionalClassNames="w-[625px]">
      <Container68 />
      <Container69 />
    </BackgroundImage1>
  );
}

function Card7() {
  return (
    <CardBackgroundImage additionalClassNames="[grid-area:1_/_1]">
      <AffiliateProgramPage15 />
    </CardBackgroundImage>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[24px] left-0 top-0 w-[625px]" data-name="Heading 3">
      <p className="absolute font-['Raleway:Bold',sans-serif] font-bold leading-[24px] left-[312.56px] text-[16px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%]">Spiritual Innovator</p>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute h-[70px] left-0 top-0 w-[625px]" data-name="Container">
      <Heading3 />
      <BadgeBackgroundImageAndText text="$800-$3,600/month avg Commission" />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[78px] left-0 top-[102px] w-[625px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[26px] left-[312.89px] text-[16px] text-[rgba(255,255,255,0.7)] text-center top-[-1px] translate-x-[-50%] w-[613px]">Join as a spiritual leader to create your AI avatar, build your digital ministry, and earn through multiple streams. Perfect for ordained clergy, spiritual teachers, and faith influencers.</p>
    </div>
  );
}

function Container71() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] left-0 rounded-[3.35544e+07px] shadow-[0px_0px_6px_0px_rgba(122,79,255,0.5)] size-[6px] to-[#ffd369] top-[7px]" data-name="Container" />;
}

function Container72() {
  return (
    <div className="[grid-area:1_/_1] place-self-stretch relative shrink-0" data-name="Container">
      <Container71 />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[93.5px] text-[14px] text-[rgba(255,255,255,0.7)] text-center text-nowrap top-0 translate-x-[-50%]">25% Affiliate Commission</p>
    </div>
  );
}

function Container73() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] left-0 rounded-[3.35544e+07px] shadow-[0px_0px_6px_0px_rgba(122,79,255,0.5)] size-[6px] to-[#ffd369] top-[7px]" data-name="Container" />;
}

function Container74() {
  return (
    <div className="[grid-area:1_/_2] place-self-stretch relative shrink-0" data-name="Container">
      <Container73 />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[101.5px] text-[14px] text-[rgba(255,255,255,0.7)] text-center text-nowrap top-0 translate-x-[-50%]">40% Engagement Revenue</p>
    </div>
  );
}

function Container75() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] left-0 rounded-[3.35544e+07px] shadow-[0px_0px_6px_0px_rgba(122,79,255,0.5)] size-[6px] to-[#ffd369] top-[7px]" data-name="Container" />;
}

function Container76() {
  return (
    <div className="[grid-area:2_/_1] place-self-stretch relative shrink-0" data-name="Container">
      <Container75 />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[70.5px] text-[14px] text-[rgba(255,255,255,0.7)] text-center text-nowrap top-0 translate-x-[-50%]">Donations/Tithes</p>
    </div>
  );
}

function Container77() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] left-0 rounded-[3.35544e+07px] shadow-[0px_0px_6px_0px_rgba(122,79,255,0.5)] size-[6px] to-[#ffd369] top-[7px]" data-name="Container" />;
}

function Container78() {
  return (
    <div className="[grid-area:2_/_2] place-self-stretch relative shrink-0" data-name="Container">
      <Container77 />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[89px] text-[14px] text-[rgba(255,255,255,0.7)] text-center text-nowrap top-0 translate-x-[-50%]">Virtual Worship Spaces</p>
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute gap-[12px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[52px] left-0 top-[204px] w-[625px]" data-name="Container">
      <Container72 />
      <Container74 />
      <Container76 />
      <Container78 />
    </div>
  );
}

function Container80() {
  return (
    <div className="absolute h-[328px] left-0 top-[88px] w-[625px]" data-name="Container">
      <Container70 />
      <Paragraph4 />
      <Container79 />
      <ButtonBackgroundImageAndText text="Apply Now" additionalClassNames="top-[280px]" />
    </div>
  );
}

function Icon10() {
  return (
    <IconBackgroundImage2>
      <path d={svgPaths.p37b68780} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      <path d={svgPaths.p229ac080} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
    </IconBackgroundImage2>
  );
}

function Container81() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#8b5cf6] items-center justify-center left-[280.5px] rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.4)] size-[64px] to-[#7c3aed] top-0" data-name="Container">
      <Icon10 />
    </div>
  );
}

function AffiliateProgramPage16() {
  return (
    <BackgroundImage1 additionalClassNames="w-[625px]">
      <Container80 />
      <Container81 />
    </BackgroundImage1>
  );
}

function Card8() {
  return (
    <CardBackgroundImage additionalClassNames="[grid-area:2_/_1]">
      <AffiliateProgramPage16 />
    </CardBackgroundImage>
  );
}

function Container82() {
  return (
    <div className="gap-[32px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_456fr)_minmax(0px,_1fr)] h-[970px] relative shrink-0 w-full" data-name="Container">
      <Card7 />
      <Card8 />
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[1074px] items-start left-[24px] top-0 w-[691px]" data-name="Container">
      <Container57 />
      <Container82 />
    </div>
  );
}

function Container84() {
  return <div className="absolute h-[454px] left-[25px] opacity-0 top-[105px] w-[689px]" data-name="Container" style={{ backgroundImage: "linear-gradient(146.618deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container85() {
  return <div className="absolute h-[480px] left-[25px] opacity-0 top-[593px] w-[689px]" data-name="Container" style={{ backgroundImage: "linear-gradient(145.137deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Section2() {
  return (
    <div className="absolute h-[1074px] left-0 top-[2345.33px] w-[739px]" data-name="Section">
      <Container83 />
      <Container84 />
      <Container85 />
    </div>
  );
}

function AffiliateProgramPage17() {
  return (
    <div className="absolute h-[36px] left-0 top-0 w-[691px]" data-name="AffiliateProgramPage">
      <BackgroundImageAndText text="Learn More About" additionalClassNames="left-[345.63px]" />
    </div>
  );
}

function AffiliateProgramPage18() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] h-[4px] left-[305.5px] rounded-[3.35544e+07px] shadow-[0px_2px_12px_0px_rgba(122,79,255,0.5)] to-[#7a4fff] top-[52px] via-50% via-[#ffd369] w-[80px]" data-name="AffiliateProgramPage" />;
}

function Container86() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="Container">
      <AffiliateProgramPage17 />
      <AffiliateProgramPage18 />
    </div>
  );
}

function AffiliateProgramPage19() {
  return <div className="absolute h-[78px] left-px opacity-0 top-px w-[335.5px]" data-name="AffiliateProgramPage" style={{ backgroundImage: "linear-gradient(166.912deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function AffiliateProgramPage20() {
  return (
    <div className="absolute h-[22.75px] left-[102.83px] top-[28.63px] w-[131.828px]" data-name="AffiliateProgramPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.75px] left-[66px] text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Partnership Benefits</p>
    </div>
  );
}

function Card9() {
  return (
    <CardBackgroundImage2 additionalClassNames="[grid-area:1_/_1]">
      <AffiliateProgramPage19 />
      <AffiliateProgramPage20 />
    </CardBackgroundImage2>
  );
}

function AffiliateProgramPage21() {
  return <div className="absolute h-[78px] left-px opacity-0 top-px w-[335.5px]" data-name="AffiliateProgramPage" style={{ backgroundImage: "linear-gradient(166.912deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function AffiliateProgramPage22() {
  return (
    <div className="absolute h-[22.75px] left-[105.5px] top-[28.63px] w-[126.484px]" data-name="AffiliateProgramPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.75px] left-[63.5px] text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%]">4 Revenue Streams</p>
    </div>
  );
}

function Card10() {
  return (
    <CardBackgroundImage2 additionalClassNames="[grid-area:1_/_2]">
      <AffiliateProgramPage21 />
      <AffiliateProgramPage22 />
    </CardBackgroundImage2>
  );
}

function AffiliateProgramPage23() {
  return <div className="absolute h-[78px] left-px opacity-0 top-px w-[335.5px]" data-name="AffiliateProgramPage" style={{ backgroundImage: "linear-gradient(166.912deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function AffiliateProgramPage24() {
  return (
    <div className="absolute h-[22.75px] left-[99.31px] top-[28.63px] w-[138.875px]" data-name="AffiliateProgramPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.75px] left-[69.5px] text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Application Fee ($99)</p>
    </div>
  );
}

function Card11() {
  return (
    <CardBackgroundImage2 additionalClassNames="[grid-area:2_/_1]">
      <AffiliateProgramPage23 />
      <AffiliateProgramPage24 />
    </CardBackgroundImage2>
  );
}

function AffiliateProgramPage25() {
  return <div className="absolute h-[78px] left-px opacity-0 top-px w-[335.5px]" data-name="AffiliateProgramPage" style={{ backgroundImage: "linear-gradient(166.912deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function AffiliateProgramPage26() {
  return (
    <div className="absolute h-[22.75px] left-[94.91px] top-[28.63px] w-[147.672px]" data-name="AffiliateProgramPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.75px] left-[74px] text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Performance Analytics</p>
    </div>
  );
}

function Card12() {
  return (
    <CardBackgroundImage2 additionalClassNames="[grid-area:2_/_2]">
      <AffiliateProgramPage25 />
      <AffiliateProgramPage26 />
    </CardBackgroundImage2>
  );
}

function AffiliateProgramPage27() {
  return <div className="absolute h-[78px] left-px opacity-0 top-px w-[335.5px]" data-name="AffiliateProgramPage" style={{ backgroundImage: "linear-gradient(166.912deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function AffiliateProgramPage28() {
  return (
    <div className="absolute h-[22.75px] left-[109.16px] top-[28.63px] w-[119.188px]" data-name="AffiliateProgramPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.75px] left-[60px] text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Payment Methods</p>
    </div>
  );
}

function Card13() {
  return (
    <CardBackgroundImage2 additionalClassNames="[grid-area:3_/_1]">
      <AffiliateProgramPage27 />
      <AffiliateProgramPage28 />
    </CardBackgroundImage2>
  );
}

function AffiliateProgramPage29() {
  return <div className="absolute h-[78px] left-px opacity-0 top-px w-[335.5px]" data-name="AffiliateProgramPage" style={{ backgroundImage: "linear-gradient(166.912deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function AffiliateProgramPage30() {
  return (
    <div className="absolute h-[22.75px] left-[104.78px] top-[28.63px] w-[127.938px]" data-name="AffiliateProgramPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.75px] left-[64px] text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Verification Process</p>
    </div>
  );
}

function Card14() {
  return (
    <CardBackgroundImage2 additionalClassNames="[grid-area:3_/_2]">
      <AffiliateProgramPage29 />
      <AffiliateProgramPage30 />
    </CardBackgroundImage2>
  );
}

function AffiliateProgramPage31() {
  return <div className="absolute h-[78px] left-px opacity-0 top-px w-[335.5px]" data-name="AffiliateProgramPage" style={{ backgroundImage: "linear-gradient(166.912deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function AffiliateProgramPage32() {
  return (
    <div className="absolute h-[22.75px] left-[117.34px] top-[28.63px] w-[102.813px]" data-name="AffiliateProgramPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.75px] left-[51.5px] text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Success Stories</p>
    </div>
  );
}

function Card15() {
  return (
    <CardBackgroundImage2 additionalClassNames="[grid-area:4_/_1]">
      <AffiliateProgramPage31 />
      <AffiliateProgramPage32 />
    </CardBackgroundImage2>
  );
}

function AffiliateProgramPage33() {
  return <div className="absolute h-[78px] left-px opacity-0 top-px w-[335.5px]" data-name="AffiliateProgramPage" style={{ backgroundImage: "linear-gradient(166.912deg, rgba(122, 79, 255, 0.1) 0%, rgba(255, 211, 105, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function AffiliateProgramPage34() {
  return (
    <div className="absolute h-[22.75px] left-[106.3px] top-[28.63px] w-[124.906px]" data-name="AffiliateProgramPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.75px] left-[62.5px] text-[14px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Support Resources</p>
    </div>
  );
}

function Card16() {
  return (
    <CardBackgroundImage2 additionalClassNames="[grid-area:4_/_2]">
      <AffiliateProgramPage33 />
      <AffiliateProgramPage34 />
    </CardBackgroundImage2>
  );
}

function Container87() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(4,_minmax(0px,_1fr))] h-[368px] relative shrink-0 w-full" data-name="Container">
      <Card9 />
      <Card10 />
      <Card11 />
      <Card12 />
      <Card13 />
      <Card14 />
      <Card15 />
      <Card16 />
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[472px] items-start left-[24px] top-[3499.33px] w-[691px]" data-name="Section">
      <Container86 />
      <Container87 />
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute h-[3971.328px] left-0 top-0 w-[739px]" data-name="Container">
      <Section />
      <Card />
      <Section1 />
      <Section2 />
      <Section3 />
    </div>
  );
}

function AffiliateProgramPage35() {
  return (
    <div className="bg-[#0b1426] h-[4219.328px] overflow-clip relative shrink-0 w-full" data-name="AffiliateProgramPage">
      <AppFooter />
      <Container19 />
      <Container88 />
    </div>
  );
}

function AppContent() {
  return (
    <div className="absolute bg-[#121212] content-stretch flex flex-col h-[4297.328px] items-start left-0 pb-0 pt-[78px] px-0 top-0 w-[739px]" data-name="AppContent">
      <AffiliateProgramPage35 />
    </div>
  );
}

function ImageDivinityAgi() {
  return (
    <div className="h-[53px] relative shrink-0 w-[100.438px]" data-name="Image (DivinityAGI)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageDivinityAgi} />
    </div>
  );
}

function Icon11() {
  return (
    <IconBackgroundImage3 additionalClassNames="absolute left-[16px] top-[18px]">
      <path d="M5 1H7" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 7L7.5 5.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p5139500} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage3>
  );
}

function Badge() {
  return (
    <div className="bg-gradient-to-b from-[#6b5dd3] h-[48px] relative rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] shrink-0 to-[#ffb84d] w-[109.969px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Icon11 />
        <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[40px] text-[14px] text-white top-[14px] w-[54px]">250 MIN</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex h-[53px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <ImageDivinityAgi />
      <Badge />
    </div>
  );
}

function AppHeader() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[78px] items-start left-0 pb-px pt-[12px] px-[24px] top-0 w-[739px]" data-name="AppHeader">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(107,93,211,0.1)] border-solid inset-0 pointer-events-none shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)]" />
      <Container89 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <VectorBackgroundImage additionalClassNames="inset-[62.5%_33.33%_12.5%_8.33%]" />
      <div className="absolute inset-[13.03%_20.85%_54.7%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-12.92%_-33.38%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.1637 8.1204">
            <path d={svgPaths.p2cf69e00} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]" data-name="Vector">
        <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.16687 6.55854">
            <path d={svgPaths.p39df7200} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <VectorBackgroundImage1 additionalClassNames="inset-[12.5%_45.83%_54.17%_20.83%]" />
    </div>
  );
}

function BottomNavigation() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[17.52px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon12 />
    </div>
  );
}

function BottomNavigation1() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[32px] w-[39.047px]" data-name="BottomNavigation">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[16px] left-[20px] text-[#5d5d7d] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Guides</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute h-[56px] left-[17.38px] rounded-[16px] top-[12px] w-[55.047px]" data-name="Button">
      <BottomNavigation />
      <BottomNavigation1 />
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BottomNavigation2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.16px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon13 />
    </div>
  );
}

function BottomNavigation3() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[32px] w-[32.328px]" data-name="BottomNavigation">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[16px] left-[16.5px] text-[#5d5d7d] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Circle</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute h-[56px] left-[99.19px] rounded-[16px] top-[12px] w-[48.328px]" data-name="Button">
      <BottomNavigation2 />
      <BottomNavigation3 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.32%_8.33%_8.34%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3338 18.3338">
            <path d={svgPaths.p3937b100} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_16.67%_70.83%_83.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 5">
            <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[79.17%] left-3/4 right-[8.33%] top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M4.16667 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_83.33%_20.83%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 3.33333">
            <path d="M0.833333 0.833333V2.5" id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[12.5%] right-[79.17%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 1.66667">
            <path d="M2.5 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BottomNavigation4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[30.34px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon14 />
    </div>
  );
}

function BottomNavigation5() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[32px] w-[64.703px]" data-name="BottomNavigation">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[16px] left-[32.5px] text-[#5d5d7d] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Companion</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute h-[56px] left-[174.28px] rounded-[16px] top-[12px] w-[80.703px]" data-name="Button">
      <BottomNavigation4 />
      <BottomNavigation5 />
    </div>
  );
}

function Icon15() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[41.67%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p77fa900} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[58.33%] left-[41.67%] right-[41.67%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p29efb800} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-[41.67%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 11.6667">
            <path d="M0.833333 0.833333V10.8333" id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <Icon17VectorBackgroundImage additionalClassNames="left-1/2 right-[20.83%]">
        <path d={svgPaths.p18da42f0} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon17VectorBackgroundImage>
      <Icon17VectorBackgroundImage additionalClassNames="left-[20.83%] right-1/2">
        <path d={svgPaths.p115f4d00} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon17VectorBackgroundImage>
    </div>
  );
}

function BottomNavigation6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13.09px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon15 />
    </div>
  );
}

function BottomNavigation7() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[32px] w-[30.188px]" data-name="BottomNavigation">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[16px] left-[15.5px] text-[#5d5d7d] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Quiet</p>
    </div>
  );
}

function Button9() {
  return (
    <div className="absolute h-[56px] left-[281.75px] rounded-[16px] top-[12px] w-[46.188px]" data-name="Button">
      <BottomNavigation6 />
      <BottomNavigation7 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%_8.32%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 18.3361">
            <path d={svgPaths.p30439e00} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BottomNavigation8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[20.77px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon16 />
    </div>
  );
}

function BottomNavigation9() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[32px] w-[45.531px]" data-name="BottomNavigation">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[16px] left-[23px] text-[#5d5d7d] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Leaders</p>
    </div>
  );
}

function Button10() {
  return (
    <div className="absolute h-[56px] left-[354.7px] rounded-[16px] top-[12px] w-[61.531px]" data-name="Button">
      <BottomNavigation8 />
      <BottomNavigation9 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <VectorBackgroundImage additionalClassNames="inset-[62.5%_20.83%_12.5%_20.83%]" />
      <VectorBackgroundImage1 additionalClassNames="inset-[12.5%_33.33%_54.17%_33.33%]" />
    </div>
  );
}

function BottomNavigation10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[15.8px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon17 />
    </div>
  );
}

function BottomNavigation11() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[32px] w-[35.594px]" data-name="BottomNavigation">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[16px] left-[18px] text-[#5d5d7d] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Profile</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="absolute h-[56px] left-[443px] rounded-[16px] top-[12px] w-[51.594px]" data-name="Button">
      <BottomNavigation10 />
      <BottomNavigation11 />
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute h-[80px] left-[113.5px] top-0 w-[512px]" data-name="Container">
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
    </div>
  );
}

function Container91() {
  return <div className="absolute bg-gradient-to-t from-[rgba(107,93,211,0.05)] h-[80px] left-0 to-[rgba(0,0,0,0)] top-0 w-[739px]" data-name="Container" />;
}

function Icon18() {
  return (
    <IconBackgroundImage3 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p2e69df00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage3>
  );
}

function Text() {
  return (
    <BackgroundImage1 additionalClassNames="h-[16px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[33px] text-[#90a1b9] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Need Help?</p>
    </BackgroundImage1>
  );
}

function CrisisSupportButton() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center left-[649.33px] top-[4px] w-[81.672px]" data-name="CrisisSupportButton">
      <Icon18 />
      <Text />
    </div>
  );
}

function BottomNavigation12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-[1px_0px_0px] border-[rgba(107,93,211,0.1)] border-solid h-[81px] left-0 shadow-[0px_16px_48px_0px_rgba(107,93,211,0.2)] top-[1068px] w-[739px]" data-name="BottomNavigation">
      <Container90 />
      <Container91 />
      <CrisisSupportButton />
    </div>
  );
}

export default function DivinityAgiSpiritGuideAppVersion127Copy() {
  return (
    <div className="bg-[#121212] relative size-full" data-name="DivinityAGI Spirit Guide App Version 12-7 (Copy)">
      <AppContent />
      <AppHeader />
      <BottomNavigation12 />
    </div>
  );
}