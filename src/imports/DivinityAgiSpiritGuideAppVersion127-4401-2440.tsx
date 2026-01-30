import svgPaths from "./svg-ctsgmcegic";
import clsx from "clsx";
import imgImageWithFallback from "figma:asset/a131b5c5a7b658d8d80b1a1ef545f5a67a41aa30.png";
import imgImageOm from "figma:asset/fc363bf8713e2e810f69904b94bbd531b064ce0f.png";
import imgImageDivinityAgi from "figma:asset/61e6939d809ba54cb8cc52bd066079fa481abb31.png";

function ContainerBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(11,20,38,0.6)] h-[77px] relative rounded-[16px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-0 px-0 relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function ButtonBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(255,255,255,0.9)] relative rounded-[3.35544e+07px] shrink-0 size-[48px]">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(244,81,30,0.3)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(244,81,30,0.2)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("bg-gradient-to-b relative rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 size-[44px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}

function BackgroundImage8({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute h-[23.375px] left-0 top-[68px]">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[23.375px] left-0 text-[17px] text-nowrap text-white top-[-1px]">{children}</p>
    </div>
  );
}
type BackgroundImage8Props = {
  additionalClassNames?: string;
};
type BackgroundImage7Props = {
  additionalClassNames?: string;
};

function BackgroundImage7({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage7Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage6Props = {
  additionalClassNames?: string;
};

function BackgroundImage6({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage6Props>) {
  return <BackgroundImage7 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</BackgroundImage7>;
}
type BackgroundImage5Props = {
  additionalClassNames?: string;
};

function BackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage5Props>) {
  return <BackgroundImage7 additionalClassNames={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>{children}</BackgroundImage7>;
}
type BackgroundImage4Props = {
  additionalClassNames?: string;
};

function BackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage4Props>) {
  return (
    <div className={clsx("size-[20px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return (
    <div className={additionalClassNames}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        {children}
      </svg>
    </div>
  );
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={additionalClassNames}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
        {children}
      </svg>
    </div>
  );
}
type Icon34VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function Icon34VectorBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon34VectorBackgroundImageProps>) {
  return (
    <div className={clsx("absolute bottom-[8.33%] top-[70.83%]", additionalClassNames)}>
      <div className="absolute inset-[-20%_-14.29%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 6">
          {children}
        </svg>
      </div>
    </div>
  );
}
type VectorBackgroundImage2Props = {
  additionalClassNames?: string;
};

function VectorBackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<VectorBackgroundImage2Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <BackgroundImage2 additionalClassNames="absolute inset-[-5%]">{children}</BackgroundImage2>
    </div>
  );
}
type IconBackgroundImage7Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage7({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage7Props>) {
  return (
    <BackgroundImage3 additionalClassNames={clsx("size-[12px]", additionalClassNames)}>
      <g id="Icon">{children}</g>
    </BackgroundImage3>
  );
}
type IconBackgroundImage6Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage6({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage6Props>) {
  return (
    <BackgroundImage4 additionalClassNames={additionalClassNames}>
      <g id="Icon">{children}</g>
    </BackgroundImage4>
  );
}

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
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
    <div className={clsx("size-[16px]", additionalClassNames)}>
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
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
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
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 7">
          <path d={svgPaths.p6877e0} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </svg>
      </div>
    </div>
  );
}

function IconBackgroundImage5() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p43eff00} id="Vector" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}
type TextBackgroundImageAndText3Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText3({ text, additionalClassNames = "" }: TextBackgroundImageAndText3Props) {
  return (
    <BackgroundImage7 additionalClassNames={clsx("h-[21px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[21px] left-0 text-[#f4511e] text-[14px] text-nowrap top-0">{text}</p>
    </BackgroundImage7>
  );
}

function IconBackgroundImage4() {
  return (
    <BackgroundImage1>
      <path d={svgPaths.p1d820380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p27451300} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p2981fe00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p161d4800} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage1>
  );
}

function IconBackgroundImage3() {
  return (
    <BackgroundImage1>
      <path d={svgPaths.p1dff4600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage1>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function HeadingBackgroundImageAndText({ text, additionalClassNames = "" }: HeadingBackgroundImageAndTextProps) {
  return <BackgroundImage8 additionalClassNames={additionalClassNames}>{text}</BackgroundImage8>;
}

function IconBackgroundImage2() {
  return (
    <BackgroundImage1>
      <path d={svgPaths.p296ad200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M20 3V7" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M22 5H18" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M4 17V19" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M5 18H3" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage1>
  );
}

function IconBackgroundImage1() {
  return (
    <BackgroundImage1>
      <path d={svgPaths.p2460274} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage1>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage additionalClassNames="absolute left-[268px] top-[18px]">
      <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}
type TextBackgroundImageAndText2Props = {
  text: string;
};

function TextBackgroundImageAndText2({ text }: TextBackgroundImageAndText2Props) {
  return (
    <BackgroundImage5 additionalClassNames="h-[18.563px]">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[18.571px] left-0 text-[#f4511e] text-[13px] text-nowrap top-[-1px] tracking-[0.65px]">{text}</p>
    </BackgroundImage5>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BackgroundImageAndText({ text, additionalClassNames = "" }: BackgroundImageAndTextProps) {
  return (
    <p style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(244, 81, 30) 0%, rgb(255, 111, 60) 50%, rgb(255, 138, 101) 100%)" }} className={clsx("absolute bg-clip-text font-['Raleway:Regular',sans-serif] font-normal leading-[35px] text-[28px] text-[rgba(0,0,0,0)] text-center text-nowrap translate-x-[-50%]", additionalClassNames)}>
      {text}
    </p>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText1({ text, additionalClassNames = "" }: TextBackgroundImageAndText1Props) {
  return (
    <div className={clsx("absolute h-[20px] left-[12.92px] top-0", additionalClassNames)}>
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] text-nowrap top-0">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
};

function TextBackgroundImageAndText({ text }: TextBackgroundImageAndTextProps) {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[4.922px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#f4511e] text-[14px] text-nowrap top-0">{text}</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[24px] left-[62.7px] top-0 w-[64.609px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[32.5px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Our Mission</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[24px] left-[139.31px] top-0 w-[69.844px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[35px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Spirit Guides</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[24px] left-[221.16px] top-0 w-[40.078px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[20.5px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Privacy</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[24px] left-[273.23px] top-0 w-[34.063px]" data-name="Button">
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
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[185.09px] text-[#62748e] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">© 2025 DivinityAGI</p>
    </div>
  );
}

function AppFooter() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[52px] items-start left-[16px] top-[5552.22px] w-[370px]" data-name="AppFooter">
      <Container />
      <Paragraph />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="absolute h-[1125.173px] left-[-10.05px] opacity-30 top-[-26.79px] w-[422.1px]" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container1() {
  return <div className="absolute bg-gradient-to-b from-[rgba(11,20,38,0.4)] h-[1071.594px] left-0 to-[rgba(11,20,38,0.95)] top-0 via-50% via-[rgba(22,40,68,0.7)] w-[402px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="absolute h-[1071.594px] left-0 top-[-80px] w-[402px]" data-name="Container">
      <ImageWithFallback />
      <Container1 />
    </div>
  );
}

function Container3() {
  return <div className="absolute h-[5708.219px] left-0 top-0 w-[402px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 402 5708.2\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -457.52 -457.52 0 120.6 1141.6)\\\'><stop stop-color=\\\'rgba(244,81,30,0.15)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(122,41,15,0.075)\\\' offset=\\\'0.35\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container4() {
  return <div className="absolute h-[5708.219px] left-0 top-0 w-[402px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 402 5708.2\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -457.52 -457.52 0 281.4 4566.6)\\\'><stop stop-color=\\\'rgba(216,67,21,0.12)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.6\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container5() {
  return <div className="absolute h-[5708.219px] left-0 top-0 w-[402px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 402 5708.2\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -400.08 -400.08 0 201 1712.5)\\\'><stop stop-color=\\\'rgba(244,81,30,0.08)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.7\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container6() {
  return <div className="absolute h-[5708.219px] left-0 top-0 w-[402px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 402 5708.2\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -400.87 -400.87 0 80.4 3995.8)\\\'><stop stop-color=\\\'rgba(216,67,21,0.06)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0.6\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container7() {
  return <div className="absolute h-[5708.219px] left-0 opacity-[0.08] top-0 w-[402px]" data-name="Container" />;
}

function Container8() {
  return <div className="absolute h-[5708.219px] left-0 opacity-[0.06] top-0 w-[402px]" data-name="Container" />;
}

function Container9() {
  return <div className="absolute h-[5708.219px] left-0 opacity-5 top-0 w-[402px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 402 5708.2\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(0 -286.12 -286.12 0 201 2854.1)\\\'><stop stop-color=\\\'rgba(244,81,30,0.2)\\\' offset=\\\'0.0024876\\\'/><stop stop-color=\\\'rgba(122,41,15,0.1)\\\' offset=\\\'0.0012438\\\'/><stop stop-color=\\\'rgba(0,0,0,0)\\\' offset=\\\'0\\\'/></radialGradient></defs></svg>')" }} />;
}

function Container10() {
  return <div className="absolute h-[5708.219px] left-0 opacity-[0.04] top-0 w-[402px]" data-name="Container" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 402 5708.2\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -286.12 -286.12 0 201 2854.1)\\'><stop stop-color=\\'rgba(244,81,30,0.15)\\' offset=\\'0.0024876\\'/><stop stop-color=\\'rgba(122,41,15,0.075)\\' offset=\\'0.0012438\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0\\'/></radialGradient></defs></svg>'), url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 402 5708.2\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(0 -286.12 -286.12 0 201 2854.1)\\'><stop stop-color=\\'rgba(216,67,21,0.1)\\' offset=\\'0.0024876\\'/><stop stop-color=\\'rgba(0,0,0,0)\\' offset=\\'0\\'/></radialGradient></defs></svg>')" }} />;
}

function Container11() {
  return <div className="absolute h-[5708.219px] left-0 opacity-[0.03] top-0 w-[402px]" data-name="Container" />;
}

function Container12() {
  return (
    <div className="absolute h-[5708.219px] left-0 top-0 w-[402px]" data-name="Container">
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
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[33.594px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[33.6px] left-[185.08px] text-[#ffd369] text-[24px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Hindu Community</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[54.375px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[27.2px] left-[185.13px] text-[#d1d5dc] text-[16px] text-center top-0 translate-x-[-50%] w-[343px]">Connect with seekers exploring Vedic wisdom, yoga philosophy, and diverse Hindu traditions</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[103.969px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Paragraph1 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[8.33%_15.83%_24.17%_16.67%] leading-[normal] not-italic text-[26.667px] text-center text-nowrap text-white">🕉</p>
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="bg-gradient-to-b from-[#f4511e] relative rounded-[3.35544e+07px] shrink-0 size-[64px] to-[#d84315]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24px] left-0 text-[#ffd369] text-[16px] text-nowrap top-[-1px]">Hinduism Circle</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[68.25px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-0 text-[#99a1af] text-[14px] top-0 w-[198px]">Explore Vedic wisdom, yoga philosophy, and Hindu spiritual practices together.</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="basis-0 grow h-[100.25px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading2 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[16px] h-[100.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container15 />
    </div>
  );
}

function Icon1() {
  return (
    <IconBackgroundImage6 additionalClassNames="absolute left-[38px] top-[17px]">
      <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p3e0acf00} id="Vector_2" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p16b3b0c0} id="Vector_3" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage6>
  );
}

function Container17() {
  return (
    <div className="absolute h-[24px] left-[17px] top-[45px] w-[62px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24px] left-[31.06px] text-[16px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%]">734</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[16px] left-[17px] top-[73px] w-[62px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[31.02px] text-[#99a1af] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Members</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(13,11,43,0.5)] place-self-stretch relative rounded-[10px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(244,81,30,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon1 />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Icon2() {
  return (
    <IconBackgroundImage6 additionalClassNames="absolute left-[38px] top-[17px]">
      <path d={svgPaths.p26705e00} id="Vector" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage6>
  );
}

function Container20() {
  return (
    <div className="absolute h-[24px] left-[17px] top-[45px] w-[62px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24px] left-[31.42px] text-[16px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%]">1,876</p>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[16px] left-[17px] top-[73px] w-[62px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[31.44px] text-[#99a1af] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Posts</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="[grid-area:1_/_2] bg-[rgba(13,11,43,0.5)] place-self-stretch relative rounded-[10px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(244,81,30,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon2 />
      <Container20 />
      <Container21 />
    </div>
  );
}

function Icon3() {
  return (
    <IconBackgroundImage6 additionalClassNames="absolute left-[38px] top-[17px]">
      <path d={svgPaths.p3ac0b600} id="Vector" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p3c797180} id="Vector_2" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage6>
  );
}

function Container23() {
  return (
    <div className="absolute h-[24px] left-[17px] top-[45px] w-[62px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24px] left-[31.08px] text-[16px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%]">Active</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute h-[16px] left-[17px] top-[73px] w-[62px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[31.14px] text-[#99a1af] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Activity</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="[grid-area:1_/_3] bg-[rgba(13,11,43,0.5)] place-self-stretch relative rounded-[10px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(244,81,30,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon3 />
      <Container23 />
      <Container24 />
    </div>
  );
}

function Container26() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[106px] relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container22 />
      <Container25 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#ffd369] text-[14px] text-nowrap top-0">Community Guidelines</p>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[40px] left-[12.92px] top-0 w-[273.078px]" data-name="Text">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#99a1af] text-[14px] top-0 w-[267px]">Share teachings from Vedas, Upanishads, and Gita</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="List Item">
      <TextBackgroundImageAndText text="•" />
      <Text />
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <TextBackgroundImageAndText text="•" />
      <TextBackgroundImageAndText1 text="Discuss yoga, meditation, and dharma" additionalClassNames="w-[245.25px]" />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <TextBackgroundImageAndText text="•" />
      <TextBackgroundImageAndText1 text="Respect all paths within Hindu tradition" additionalClassNames="w-[251.484px]" />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[100px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <ListItem1 />
      <ListItem2 />
    </div>
  );
}

function Container27() {
  return (
    <div className="bg-[rgba(13,11,43,0.3)] h-[166px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(244,81,30,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[17px] px-[17px] relative size-full">
          <Heading3 />
          <List />
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="basis-0 bg-gradient-to-b from-[#f4511e] grow min-h-px min-w-px relative rounded-[8px] shrink-0 to-[#d84315] w-[320px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative size-full">
        <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white">Join Group</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <BackgroundImage additionalClassNames="absolute left-[197.95px] top-[10px]">
      <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button5() {
  return (
    <div className="bg-[rgba(41,41,41,0.3)] h-[36px] relative rounded-[8px] shrink-0 w-[320px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#292929] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[144.05px] text-[#f4511e] text-[14px] text-center text-nowrap top-[8px] translate-x-[-50%]">View Group</p>
        <Icon4 />
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Button4 />
      <Button5 />
    </div>
  );
}

function HinduismFaithGroups() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[576.25px] items-start left-px pb-0 pt-[24px] px-[24px] top-[217px] w-[368px]" data-name="HinduismFaithGroups">
      <Container16 />
      <Container26 />
      <Container27 />
      <Container28 />
    </div>
  );
}

function ImageHinduismCommunity() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[368px]" data-name="Image (Hinduism Community)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src="917f4c7405ac86f803a0fbc949ccc73cc4de42df.png" />
    </div>
  );
}

function Container29() {
  return <div className="absolute bg-gradient-to-b from-[#0d0b2b] h-[192px] left-0 to-[rgba(0,0,0,0)] top-0 via-50% via-[rgba(0,0,0,0)] w-[368px]" data-name="Container" />;
}

function Text1() {
  return (
    <div className="content-stretch flex h-[19px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#f4511e] text-[16px] text-nowrap">public</p>
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute bg-[rgba(13,11,43,0.8)] content-stretch flex flex-col h-[42px] items-start left-[272.13px] pb-px pt-[11px] px-[17px] rounded-[3.35544e+07px] top-[16px] w-[79.875px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f4511e] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <Text1 />
    </div>
  );
}

function HinduismFaithGroups1() {
  return (
    <div className="absolute h-[192px] left-px overflow-clip top-px w-[368px]" data-name="HinduismFaithGroups">
      <ImageHinduismCommunity />
      <Container29 />
      <Container30 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-gradient-to-b from-[#1a1533] h-[794.25px] relative rounded-[14px] shrink-0 to-[#0d0b2b] w-full" data-name="Card">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <HinduismFaithGroups />
        <HinduismFaithGroups1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(244,81,30,0.5)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function HinduismFaithGroups2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[946.219px] items-start left-[16px] top-[4542px] w-[370px]" data-name="HinduismFaithGroups">
      <Container13 />
      <Card />
    </div>
  );
}

function HinduismFaithPage() {
  return <div className="absolute h-[199.125px] left-0 top-0 w-[354px]" data-name="HinduismFaithPage" />;
}

function Container31() {
  return <div className="absolute bg-[#f4511e] left-[35.79px] opacity-[0.301] rounded-[3.35544e+07px] size-[3.202px] top-[10.32px]" data-name="Container" />;
}

function Container32() {
  return <div className="absolute bg-[#f4511e] left-[77.74px] opacity-[0.567] rounded-[3.35544e+07px] size-[4.277px] top-[76.47px]" data-name="Container" />;
}

function Container33() {
  return <div className="absolute bg-[#f4511e] left-[119.97px] opacity-[0.922] rounded-[3.35544e+07px] size-[4.788px] top-[128.81px]" data-name="Container" />;
}

function Container34() {
  return <div className="absolute bg-[#f4511e] left-[162.74px] opacity-[0.528] rounded-[3.35544e+07px] size-[4.167px] top-[33.95px]" data-name="Container" />;
}

function Container35() {
  return <div className="absolute bg-[#f4511e] left-[205.61px] opacity-[0.342] rounded-[3.35544e+07px] size-[3.403px] top-[55.06px]" data-name="Container" />;
}

function Container36() {
  return <div className="absolute bg-[#f4511e] left-[248.2px] opacity-30 rounded-[3.35544e+07px] size-[3.2px] top-[89.92px]" data-name="Container" />;
}

function Container37() {
  return <div className="absolute bg-[#f4511e] left-[290.67px] opacity-30 rounded-[3.35544e+07px] size-[3.2px] top-[10.26px]" data-name="Container" />;
}

function Container38() {
  return <div className="absolute bg-[#f4511e] left-[333.15px] opacity-30 rounded-[3.35544e+07px] size-[3.2px] top-[50.09px]" data-name="Container" />;
}

function HinduismFaithPage1() {
  return (
    <div className="absolute h-[199.125px] left-0 overflow-clip top-0 w-[354px]" data-name="HinduismFaithPage">
      <Container31 />
      <Container32 />
      <Container33 />
      <Container34 />
      <Container35 />
      <Container36 />
      <Container37 />
      <Container38 />
    </div>
  );
}

function HinduismFaithPage2() {
  return <div className="absolute bg-gradient-to-t from-[rgba(11,20,38,0.9)] h-[199.125px] left-0 to-[rgba(0,0,0,0)] top-0 via-50% via-[rgba(244,81,30,0.2)] w-[354px]" data-name="HinduismFaithPage" />;
}

function Container39() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[199.125px] left-0 overflow-clip rounded-[16px] shadow-[0px_10px_40px_0px_rgba(244,81,30,0.2)] top-0 w-[354px]" data-name="Container">
      <HinduismFaithPage />
      <HinduismFaithPage1 />
      <HinduismFaithPage2 />
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[46.656px] left-[16px] shadow-[0px_2px_16px_0px_rgba(244,81,30,0.3)] top-0 w-[322px]" data-name="Heading 1">
      <p className="absolute bg-clip-text font-['Caveat:Bold',sans-serif] font-bold leading-[46.667px] left-[161.14px] text-[37.333px] text-[rgba(0,0,0,0)] text-center text-nowrap top-[-1px] translate-x-[-50%]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(244, 81, 30) 0%, rgb(255, 111, 60) 50%, rgb(255, 138, 101) 100%)" }}>
        Hinduism
      </p>
    </div>
  );
}

function Container40() {
  return <div className="absolute bg-gradient-to-b from-[#f4511e] h-[2px] left-[137px] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(244,81,30,0.4)] to-[#ff6f3c] top-[62.66px] w-[80px]" data-name="Container" />;
}

function Paragraph3() {
  return (
    <div className="absolute h-[48.75px] left-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.6)] top-[80.66px] w-[322px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[24.375px] left-[161.34px] text-[15px] text-center text-white top-0 translate-x-[-50%] w-[236px]">Explore the diverse traditions and wisdom of Hinduism.</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="absolute h-[129.406px] left-0 top-[34.86px] w-[354px]" data-name="Container">
      <Heading />
      <Container40 />
      <Paragraph3 />
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute h-[199.125px] left-[24px] top-[32px] w-[354px]" data-name="Container">
      <Container39 />
      <Container41 />
    </div>
  );
}

function Container43() {
  return <div className="absolute h-[44px] left-0 opacity-0 top-0 w-[90.781px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.141deg, rgba(255, 229, 219, 0.15) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Icon5() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #D84315)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #D84315)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Text2() {
  return (
    <BackgroundImage5 additionalClassNames="h-[22.5px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.5px] left-[17.5px] text-[#d84315] text-[15px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Back</p>
    </BackgroundImage5>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[22.5px] items-center left-[16px] top-[10.75px] w-[58.781px]" data-name="Container">
      <Icon5 />
      <Text2 />
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] border-2 border-[rgba(244,81,30,0.3)] border-solid h-[48px] left-[24px] overflow-clip rounded-[16px] shadow-[0px_4px_15px_0px_rgba(244,81,30,0.15)] top-[24px] w-[94.781px]" data-name="Button">
      <Container43 />
      <Container44 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute h-[291.125px] left-0 overflow-clip top-0 w-[402px]" data-name="Section">
      <Container42 />
      <Button6 />
    </div>
  );
}

function Container45() {
  return <div className="absolute bg-[rgba(244,81,30,0.15)] blur-3xl filter left-[16px] rounded-[3.35544e+07px] size-[96px] top-[16px]" data-name="Container" />;
}

function ImageOm() {
  return (
    <div className="absolute blur-[0.5px] filter left-0 opacity-25 shadow-[0px_0px_40px_0px_rgba(244,81,30,0.2)] size-[128px] top-0" data-name="Image (Om)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageOm} />
    </div>
  );
}

function Container46() {
  return <div className="absolute border-2 border-[rgba(244,81,30,0.2)] border-solid left-[-0.02px] opacity-[0.15] rounded-[3.35544e+07px] size-[128.039px] top-[-0.02px]" data-name="Container" />;
}

function Container47() {
  return (
    <div className="absolute left-0 size-[128px] top-0" data-name="Container">
      <ImageOm />
      <Container46 />
    </div>
  );
}

function Container48() {
  return (
    <div className="absolute left-[113px] size-[128px] top-[-32px]" data-name="Container">
      <Container45 />
      <Container47 />
    </div>
  );
}

function HinduismFaithPage3() {
  return (
    <div className="absolute h-[51px] left-0 shadow-[0px_2px_12px_0px_rgba(244,81,30,0.3)] top-0 w-[354px]" data-name="HinduismFaithPage">
      <BackgroundImageAndText text="Meet Your Spirit Guides" additionalClassNames="left-[177.09px] top-[16px]" />
    </div>
  );
}

function HinduismFaithPage4() {
  return <div className="absolute bg-gradient-to-b from-[#f4511e] h-[2px] left-[145px] rounded-[3.35544e+07px] shadow-[0px_0px_12px_0px_rgba(244,81,30,0.5)] to-[#ff6f3c] top-[67px] w-[64px]" data-name="HinduismFaithPage" />;
}

function Container49() {
  return (
    <div className="absolute h-[69px] left-0 top-0 w-[354px]" data-name="Container">
      <HinduismFaithPage3 />
      <HinduismFaithPage4 />
    </div>
  );
}

function Container50() {
  return <div className="absolute h-[798.625px] left-0 top-0 w-[354px]" data-name="Container" />;
}

function Button7() {
  return (
    <div className="bg-[#f4511e] h-[8px] relative rounded-[3.35544e+07px] shrink-0 w-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-[rgba(244,81,30,0.25)] relative rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Container51() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[8px] items-start justify-center left-0 top-[822.63px] w-[354px]" data-name="Container">
      <Button7 />
      {[...Array(6).keys()].map((_, i) => (
        <Button8 key={i} />
      ))}
    </div>
  );
}

function Icon6() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #D84315)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button9() {
  return (
    <ButtonBackgroundImage>
      <Icon6 />
    </ButtonBackgroundImage>
  );
}

function Icon7() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #D84315)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button10() {
  return (
    <ButtonBackgroundImage>
      <Icon7 />
    </ButtonBackgroundImage>
  );
}

function Container52() {
  return (
    <div className="absolute content-stretch flex h-[48px] items-start justify-between left-0 px-[16px] py-0 top-[391.31px] w-[354px]" data-name="Container">
      <Button9 />
      <Button10 />
    </div>
  );
}

function AgentSlider() {
  return (
    <div className="absolute h-[830.625px] left-0 top-[117px] w-[354px]" data-name="AgentSlider">
      <Container50 />
      <Container51 />
      <Container52 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute h-[947.625px] left-[24px] top-[291.13px] w-[354px]" data-name="Section">
      <Container48 />
      <Container49 />
      <AgentSlider />
    </div>
  );
}

function Icon8() {
  return (
    <BackgroundImage4 additionalClassNames="relative shrink-0">
      <g clipPath="url(#clip0_4401_2491)" id="Icon">
        <path d={svgPaths.p1902bdf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M18.3333 4.16667H15" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M4.16667 15H2.5" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_4401_2491">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </BackgroundImage4>
  );
}

function Container53() {
  return (
    <ContainerBackgroundImage additionalClassNames="from-[#f4511e] to-[#d84315]">
      <Icon8 />
    </ContainerBackgroundImage>
  );
}

function HinduismFaithPage5() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[44px] items-center left-[20px] top-[16px] w-[161.422px]" data-name="HinduismFaithPage">
      <Container53 />
      <TextBackgroundImageAndText2 text="HOW IT WORKS" />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="h-[76px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <HinduismFaithPage5 />
      <IconBackgroundImage />
    </div>
  );
}

function Container54() {
  return (
    <ContainerBackgroundImage1>
      <PrimitiveButton />
    </ContainerBackgroundImage1>
  );
}

function Icon9() {
  return (
    <IconBackgroundImage6 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p26705e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage6>
  );
}

function Container55() {
  return (
    <ContainerBackgroundImage additionalClassNames="from-[#d84315] to-[#bf360c]">
      <Icon9 />
    </ContainerBackgroundImage>
  );
}

function HinduismFaithPage6() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[44px] items-center left-[20px] top-[16px] w-[150.359px]" data-name="HinduismFaithPage">
      <Container55 />
      <TextBackgroundImageAndText2 text="WHAT TO ASK" />
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="h-[76px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <HinduismFaithPage6 />
      <IconBackgroundImage />
    </div>
  );
}

function Container56() {
  return (
    <ContainerBackgroundImage1>
      <PrimitiveButton1 />
    </ContainerBackgroundImage1>
  );
}

function Icon10() {
  return (
    <IconBackgroundImage6 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p5cb4500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage6>
  );
}

function Container57() {
  return (
    <ContainerBackgroundImage additionalClassNames="from-[#bf360c] to-[#f4511e]">
      <Icon10 />
    </ContainerBackgroundImage>
  );
}

function HinduismFaithPage7() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[44px] items-center left-[20px] top-[16px] w-[176.375px]" data-name="HinduismFaithPage">
      <Container57 />
      <TextBackgroundImageAndText2 text="WHAT TO EXPECT" />
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="h-[76px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <HinduismFaithPage7 />
      <IconBackgroundImage />
    </div>
  );
}

function Container58() {
  return (
    <div className="bg-[rgba(11,20,38,0.6)] content-stretch flex flex-col h-[76px] items-start overflow-clip relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <PrimitiveButton2 />
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[262px] items-start left-[24px] top-[128px] w-[304px]" data-name="Primitive.div">
      <Container54 />
      <Container56 />
      <Container58 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute content-stretch flex h-[30px] items-start left-0 shadow-[0px_2px_8px_0px_rgba(244,81,30,0.25)] top-0 w-[304px]" data-name="Heading 3">
      <p className="basis-0 bg-clip-text font-['Raleway:Regular',sans-serif] font-normal grow leading-[30px] min-h-px min-w-px relative shrink-0 text-[24px] text-[rgba(0,0,0,0)] text-center" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(255, 255, 255) 0%, rgb(244, 81, 30) 50%, rgb(255, 255, 255) 100%)" }}>
        Agent Interaction Guide
      </p>
    </div>
  );
}

function Container59() {
  return <div className="absolute bg-gradient-to-b from-[#f4511e] h-[2px] left-[120px] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(244,81,30,0.4)] to-[#ff6f3c] top-[46px] w-[64px]" data-name="Container" />;
}

function HinduismFaithPage8() {
  return (
    <div className="absolute h-[48px] left-[24px] top-[24px] w-[304px]" data-name="HinduismFaithPage">
      <Heading4 />
      <Container59 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-[rgba(22,40,68,0.4)] border border-[rgba(30,58,95,0.4)] border-solid h-[416px] left-[24px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(244,81,30,0.15)] top-0 w-[354px]" data-name="Card">
      <PrimitiveDiv />
      <HinduismFaithPage8 />
    </div>
  );
}

function Container60() {
  return <div className="absolute h-[414px] left-[25px] opacity-80 top-px w-[352px]" data-name="Container" style={{ backgroundImage: "linear-gradient(130.373deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Section2() {
  return (
    <div className="absolute h-[416px] left-0 top-[1318.75px] w-[402px]" data-name="Section">
      <Card1 />
      <Container60 />
    </div>
  );
}

function HinduismFaithPage9() {
  return (
    <div className="absolute h-[35px] left-0 shadow-[0px_2px_12px_0px_rgba(244,81,30,0.3)] top-0 w-[354px]" data-name="HinduismFaithPage">
      <BackgroundImageAndText text="Explore Topics" additionalClassNames="left-[177.13px] top-0" />
    </div>
  );
}

function HinduismFaithPage10() {
  return <div className="absolute bg-gradient-to-b from-[#f4511e] h-[2px] left-[145px] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(244,81,30,0.4)] to-[#ff6f3c] top-[51px] w-[64px]" data-name="HinduismFaithPage" />;
}

function HinduismFaithPage11() {
  return (
    <div className="absolute h-[48.75px] left-0 top-[77px] w-[354px]" data-name="HinduismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24.375px] left-[177.36px] text-[#cad5e2] text-[15px] text-center top-0 translate-x-[-50%] w-[294px]">Discover the rich wisdom and practices of Hinduism through engaging conversations</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="h-[125.75px] relative shrink-0 w-full" data-name="Container">
      <HinduismFaithPage9 />
      <HinduismFaithPage10 />
      <HinduismFaithPage11 />
    </div>
  );
}

function Container62() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <IconBackgroundImage1 />
    </div>
  );
}

function Heading5() {
  return <BackgroundImage8 additionalClassNames="w-[312px]">{`Karma & Dharma`}</BackgroundImage8>;
}

function HinduismFaithPage12() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[312px]" data-name="HinduismFaithPage">
      <Container62 />
      <Heading5 />
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage12 />
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <IconBackgroundImage2 />
    </div>
  );
}

function Heading6() {
  return <BackgroundImage8 additionalClassNames="w-[312px]">{`Meditation & Yoga`}</BackgroundImage8>;
}

function HinduismFaithPage13() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[312px]" data-name="HinduismFaithPage">
      <Container63 />
      <Heading6 />
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:2_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage13 />
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <IconBackgroundImage1 />
    </div>
  );
}

function HinduismFaithPage14() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[312px]" data-name="HinduismFaithPage">
      <Container64 />
      <HeadingBackgroundImageAndText text="Sacred Texts" additionalClassNames="w-[312px]" />
    </div>
  );
}

function Card4() {
  return (
    <div className="[grid-area:3_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage14 />
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <IconBackgroundImage3 />
    </div>
  );
}

function HinduismFaithPage15() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[312px]" data-name="HinduismFaithPage">
      <Container65 />
      <HeadingBackgroundImageAndText text="Devotional Practices" additionalClassNames="w-[312px]" />
    </div>
  );
}

function Card5() {
  return (
    <div className="[grid-area:4_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage15 />
    </div>
  );
}

function Container66() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <IconBackgroundImage4 />
    </div>
  );
}

function HinduismFaithPage16() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[312px]" data-name="HinduismFaithPage">
      <Container66 />
      <HeadingBackgroundImageAndText text="Philosophy" additionalClassNames="w-[312px]" />
    </div>
  );
}

function Card6() {
  return (
    <div className="[grid-area:5_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage16 />
    </div>
  );
}

function Icon11() {
  return (
    <BackgroundImage1>
      <path d={svgPaths.p9b81900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage1>
  );
}

function Container67() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <Icon11 />
    </div>
  );
}

function Heading7() {
  return <BackgroundImage8 additionalClassNames="w-[312px]">{`Festivals & Rituals`}</BackgroundImage8>;
}

function HinduismFaithPage17() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[312px]" data-name="HinduismFaithPage">
      <Container67 />
      <Heading7 />
    </div>
  );
}

function Card7() {
  return (
    <div className="[grid-area:6_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage17 />
    </div>
  );
}

function Container68() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <IconBackgroundImage2 />
    </div>
  );
}

function HinduismFaithPage18() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[312px]" data-name="HinduismFaithPage">
      <Container68 />
      <HeadingBackgroundImageAndText text="Spiritual Paths" additionalClassNames="w-[312px]" />
    </div>
  );
}

function Card8() {
  return (
    <div className="[grid-area:7_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage18 />
    </div>
  );
}

function Icon12() {
  return (
    <BackgroundImage1>
      <path d={svgPaths.p1c68f900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p11abce80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M12 10V22" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p1e272200} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p24ee1e00} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage1>
  );
}

function Container69() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <Icon12 />
    </div>
  );
}

function HinduismFaithPage19() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[312px]" data-name="HinduismFaithPage">
      <Container69 />
      <HeadingBackgroundImageAndText text="Divine Consciousness" additionalClassNames="w-[312px]" />
    </div>
  );
}

function Card9() {
  return (
    <div className="[grid-area:8_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage19 />
    </div>
  );
}

function Container70() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[repeat(8,_minmax(0px,_1fr))] h-[1275px] relative shrink-0 w-full" data-name="Container">
      <Card2 />
      <Card3 />
      <Card4 />
      <Card5 />
      <Card6 />
      <Card7 />
      <Card8 />
      <Card9 />
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[1448.75px] items-start left-[24px] top-0 w-[354px]" data-name="Container">
      <Container61 />
      <Container70 />
    </div>
  );
}

function Container72() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[174.75px] w-[352px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.838deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container73() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[336.13px] w-[352px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.838deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container74() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[497.5px] w-[352px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.838deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container75() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[658.88px] w-[352px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.838deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container76() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[820.25px] w-[352px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.838deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container77() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[981.63px] w-[352px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.838deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container78() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[1143px] w-[352px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.838deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container79() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[1304.38px] w-[352px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.838deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Section3() {
  return (
    <div className="absolute h-[1448.75px] left-0 top-[1782.75px] w-[402px]" data-name="Section">
      <Container71 />
      <Container72 />
      <Container73 />
      <Container74 />
      <Container75 />
      <Container76 />
      <Container77 />
      <Container78 />
      <Container79 />
    </div>
  );
}

function HinduismCommunityHub() {
  return (
    <div className="absolute h-[35px] left-[16px] shadow-[0px_2px_12px_0px_rgba(244,81,30,0.3)] top-0 w-[338px]" data-name="HinduismCommunityHub">
      <p className="absolute bg-clip-text font-['Raleway:Regular',sans-serif] font-normal leading-[35px] left-[169.3px] text-[28px] text-[rgba(0,0,0,0)] text-center text-nowrap top-0 translate-x-[-50%]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(255, 255, 255) 0%, rgb(244, 81, 30) 50%, rgb(255, 255, 255) 100%)" }}>
        Join Our Community
      </p>
    </div>
  );
}

function HinduismCommunityHub1() {
  return <div className="absolute bg-gradient-to-b from-[#f4511e] h-[2px] left-[153px] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(244,81,30,0.4)] to-[#ff6f3c] top-[51px] w-[64px]" data-name="HinduismCommunityHub" />;
}

function HinduismCommunityHub2() {
  return (
    <div className="absolute h-[48.75px] left-[16px] top-[77px] w-[338px]" data-name="HinduismCommunityHub">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24.375px] left-[169.33px] text-[#cad5e2] text-[15px] text-center top-0 translate-x-[-50%] w-[296px]">Connect with fellow seekers on the path of dharma and spiritual growth</p>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[125.75px] relative shrink-0 w-full" data-name="Container">
      <HinduismCommunityHub />
      <HinduismCommunityHub1 />
      <HinduismCommunityHub2 />
    </div>
  );
}

function Container81() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <IconBackgroundImage4 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[45.5px] left-0 top-[103.38px] w-[328px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-0 text-[#90a1b9] text-[14px] top-0 w-[254px]">Join intimate groups for shared spiritual exploration</p>
    </div>
  );
}

function Container82() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-0 top-[164.88px] w-[328px]" data-name="Container">
      <TextBackgroundImageAndText3 text="Browse Circles" additionalClassNames="w-[96.953px]" />
      <IconBackgroundImage5 />
    </div>
  );
}

function HinduismCommunityHub3() {
  return (
    <div className="absolute h-[185.875px] left-[21px] top-[21px] w-[328px]" data-name="HinduismCommunityHub">
      <Container81 />
      <HeadingBackgroundImageAndText text="Faith Circles" additionalClassNames="w-[328px]" />
      <Paragraph4 />
      <Container82 />
    </div>
  );
}

function Card10() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismCommunityHub3 />
    </div>
  );
}

function Icon13() {
  return (
    <BackgroundImage1>
      <path d={svgPaths.p3c61fe80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage1>
  );
}

function Container83() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#ff6f3c] items-center justify-center left-0 rounded-[14px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[52px] to-[#ff8a65] top-0" data-name="Container">
      <Icon13 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[45.5px] left-0 top-[103.38px] w-[328px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-0 text-[#90a1b9] text-[14px] top-0 w-[318px]">Engage in meaningful conversations about Hindu philosophy</p>
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-0 top-[164.88px] w-[328px]" data-name="Container">
      <TextBackgroundImageAndText3 text="Join Discussions" additionalClassNames="w-[106.688px]" />
      <IconBackgroundImage5 />
    </div>
  );
}

function HinduismCommunityHub4() {
  return (
    <div className="absolute h-[185.875px] left-[21px] top-[21px] w-[328px]" data-name="HinduismCommunityHub">
      <Container83 />
      <HeadingBackgroundImageAndText text="Discussion Forums" additionalClassNames="w-[328px]" />
      <Paragraph5 />
      <Container84 />
    </div>
  );
}

function Card11() {
  return (
    <div className="[grid-area:2_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismCommunityHub4 />
    </div>
  );
}

function Icon14() {
  return (
    <BackgroundImage1>
      <path d="M8 2V6" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M16 2V6" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p32f12c00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M3 10H21" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage1>
  );
}

function Container85() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#ff8a65] items-center justify-center left-0 rounded-[14px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[52px] to-[#ffab91] top-0" data-name="Container">
      <Icon14 />
    </div>
  );
}

function Heading8() {
  return <BackgroundImage8 additionalClassNames="w-[328px]">{`Events & Gatherings`}</BackgroundImage8>;
}

function Paragraph6() {
  return (
    <div className="absolute h-[22.75px] left-0 top-[103.38px] w-[328px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-0 text-[#90a1b9] text-[14px] text-nowrap top-0">Participate in virtual satsangs and celebrations</p>
    </div>
  );
}

function Container86() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-0 top-[142.13px] w-[328px]" data-name="Container">
      <TextBackgroundImageAndText3 text="View Events" additionalClassNames="w-[79.25px]" />
      <IconBackgroundImage5 />
    </div>
  );
}

function HinduismCommunityHub5() {
  return (
    <div className="absolute h-[163.125px] left-[21px] top-[21px] w-[328px]" data-name="HinduismCommunityHub">
      <Container85 />
      <Heading8 />
      <Paragraph6 />
      <Container86 />
    </div>
  );
}

function Card12() {
  return (
    <div className="[grid-area:3_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismCommunityHub5 />
    </div>
  );
}

function Container87() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#d84315] items-center justify-center left-0 rounded-[14px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[52px] to-[#f4511e] top-0" data-name="Container">
      <IconBackgroundImage3 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[45.5px] left-0 top-[103.38px] w-[328px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-0 text-[#90a1b9] text-[14px] top-0 w-[324px]">Find guidance and companionship in your spiritual journey</p>
    </div>
  );
}

function Container88() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[21px] items-center left-0 top-[164.88px] w-[328px]" data-name="Container">
      <TextBackgroundImageAndText3 text="Find Support" additionalClassNames="w-[84.781px]" />
      <IconBackgroundImage5 />
    </div>
  );
}

function HinduismCommunityHub6() {
  return (
    <div className="absolute h-[185.875px] left-[21px] top-[21px] w-[328px]" data-name="HinduismCommunityHub">
      <Container87 />
      <HeadingBackgroundImageAndText text="Support Groups" additionalClassNames="w-[328px]" />
      <Paragraph7 />
      <Container88 />
    </div>
  );
}

function Card13() {
  return (
    <div className="[grid-area:4_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismCommunityHub6 />
    </div>
  );
}

function Container89() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_227.88fr)_minmax(0px,_227.88fr)_minmax(0px,_205.12fr)_minmax(0px,_1fr)] h-[936.75px] relative shrink-0 w-full" data-name="Container">
      <Card10 />
      <Card11 />
      <Card12 />
      <Card13 />
    </div>
  );
}

function Container90() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[40px] h-[1102.5px] items-start left-[16px] top-0 w-[370px]" data-name="Container">
      <Container80 />
      <Container89 />
    </div>
  );
}

function Container91() {
  return <div className="absolute h-[225.875px] left-[17px] opacity-0 rounded-[16px] top-[166.75px] w-[368px]" data-name="Container" style={{ backgroundImage: "linear-gradient(148.459deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container92() {
  return <div className="absolute h-[225.875px] left-[17px] opacity-0 rounded-[16px] top-[410.63px] w-[368px]" data-name="Container" style={{ backgroundImage: "linear-gradient(148.459deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container93() {
  return <div className="absolute h-[203.125px] left-[17px] opacity-0 rounded-[16px] top-[654.5px] w-[368px]" data-name="Container" style={{ backgroundImage: "linear-gradient(151.103deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container94() {
  return <div className="absolute h-[225.875px] left-[17px] opacity-0 rounded-[16px] top-[875.63px] w-[368px]" data-name="Container" style={{ backgroundImage: "linear-gradient(148.459deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function HinduismCommunityHub7() {
  return (
    <div className="absolute h-[1102.5px] left-0 top-[3311.5px] w-[402px]" data-name="HinduismCommunityHub">
      <Container90 />
      <Container91 />
      <Container92 />
      <Container93 />
      <Container94 />
    </div>
  );
}

function Container95() {
  return (
    <div className="absolute h-[5552.219px] left-0 top-0 w-[402px]" data-name="Container">
      <HinduismFaithGroups2 />
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <HinduismCommunityHub7 />
    </div>
  );
}

function HinduismFaithPage20() {
  return (
    <div className="bg-[#0b1426] h-[5708.219px] overflow-clip relative shrink-0 w-full" data-name="HinduismFaithPage">
      <AppFooter />
      <Container12 />
      <Container95 />
    </div>
  );
}

function Section4() {
  return <div className="h-0 shrink-0 w-full" data-name="Section" />;
}

function AppContent() {
  return (
    <div className="absolute bg-[#121212] content-stretch flex flex-col h-[5781.219px] items-start left-0 pb-0 pt-[73px] px-0 top-0 w-[402px]" data-name="AppContent">
      <HinduismFaithPage20 />
      <Section4 />
    </div>
  );
}

function ImageBackground() {
  return <div className="absolute h-[893px] left-0 opacity-0 top-0 w-[402px]" data-name="Image (Background)" />;
}

function Source() {
  return <div className="h-0 shrink-0 w-full" data-name="Source" />;
}

function Video() {
  return (
    <div className="absolute content-stretch flex flex-col h-[893px] items-start left-0 overflow-clip pl-0 pr-[402px] py-0 top-0 w-[402px]" data-name="Video">
      <Source />
    </div>
  );
}

function BackgroundVideo() {
  return (
    <div className="absolute h-[893px] left-0 rounded-[16px] top-0 w-[402px]" data-name="BackgroundVideo">
      <ImageBackground />
      <Video />
    </div>
  );
}

function ImageDivinityAgi() {
  return (
    <div className="h-[44px] relative shrink-0 w-[71.609px]" data-name="Image (DivinityAGI)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageDivinityAgi} />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid size-full" />
    </div>
  );
}

function Icon15() {
  return (
    <IconBackgroundImage7 additionalClassNames="absolute left-[16px] top-[18px]">
      <path d="M5 1H7" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 7L7.5 5.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p5139500} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage7>
  );
}

function Badge() {
  return (
    <div className="bg-gradient-to-b from-[#6b5dd3] h-[48px] relative rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] shrink-0 to-[#ffb84d] w-[109.969px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Icon15 />
        <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[40px] text-[14px] text-white top-[14px] w-[54px]">250 MIN</p>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <ImageDivinityAgi />
      <Badge />
    </div>
  );
}

function AppHeader() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[73px] items-start left-0 pb-px pt-[12px] px-[16px] top-0 w-[402px]" data-name="AppHeader">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(107,93,211,0.1)] border-solid inset-0 pointer-events-none shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)]" />
      <Container96 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <VectorBackgroundImage additionalClassNames="inset-[62.5%_33.33%_12.5%_8.33%]" />
      <div className="absolute inset-[13.03%_20.85%_54.7%_66.67%]" data-name="Vector">
        <div className="absolute inset-[-12.92%_-33.38%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 9">
            <path d={svgPaths.p2cf69e00} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[63.04%_8.33%_12.5%_79.17%]" data-name="Vector">
        <div className="absolute inset-[-17.04%_-33.33%_-17.04%_-33.34%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 7">
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
      <Icon16 />
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

function Button11() {
  return (
    <div className="absolute h-[56px] left-[8.16px] rounded-[16px] top-[14px] w-[55.047px]" data-name="Button">
      <BottomNavigation />
      <BottomNavigation1 />
    </div>
  );
}

function Container97() {
  return <div className="absolute bg-gradient-to-b border border-[rgba(107,93,211,0.2)] border-solid from-[#e8e5ff] h-[56px] left-0 rounded-[16px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] to-[#fff8e8] top-0 w-[48.953px]" data-name="Container" />;
}

function Container98() {
  return <div className="absolute bg-gradient-to-b from-[#6b5dd3] left-[21.47px] rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] size-[6px] to-[#ffb84d] top-[-4px]" data-name="Container" />;
}

function Icon17() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <VectorBackgroundImage2 additionalClassNames="inset-[8.33%]">
        <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </VectorBackgroundImage2>
    </div>
  );
}

function BottomNavigation2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.47px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon17 />
    </div>
  );
}

function BottomNavigation3() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[32px] w-[32.953px]" data-name="BottomNavigation">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[16px] left-[16.5px] text-[#6b5dd3] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Circle</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute h-[60px] left-[71.53px] rounded-[16px] top-[12px] w-[48.953px]" data-name="Button">
      <Container97 />
      <Container98 />
      <BottomNavigation2 />
      <BottomNavigation3 />
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <VectorBackgroundImage2 additionalClassNames="inset-[8.33%_8.32%_8.33%_8.34%]">
        <path d={svgPaths.p3937b100} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </VectorBackgroundImage2>
      <div className="absolute inset-[12.5%_16.67%_70.83%_83.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 5">
            <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[79.17%] left-3/4 right-[8.33%] top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 2">
            <path d="M4.16667 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_83.33%_20.83%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 4">
            <path d="M0.833333 0.833333V2.5" id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[12.5%] right-[79.17%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 2">
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
      <Icon18 />
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

function Button13() {
  return (
    <div className="absolute h-[56px] left-[128.81px] rounded-[16px] top-[14px] w-[80.703px]" data-name="Button">
      <BottomNavigation4 />
      <BottomNavigation5 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[41.67%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
        <BackgroundImage3 additionalClassNames="absolute inset-[-8.33%]">
          <path d={svgPaths.p77fa900} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </BackgroundImage3>
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
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 12">
            <path d="M0.833333 0.833333V10.8333" id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <Icon34VectorBackgroundImage additionalClassNames="left-1/2 right-[20.83%]">
        <path d={svgPaths.p18da42f0} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon34VectorBackgroundImage>
      <Icon34VectorBackgroundImage additionalClassNames="left-[20.83%] right-1/2">
        <path d={svgPaths.p115f4d00} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon34VectorBackgroundImage>
    </div>
  );
}

function BottomNavigation6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13.09px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon19 />
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

function Button14() {
  return (
    <div className="absolute h-[56px] left-[217.84px] rounded-[16px] top-[14px] w-[46.188px]" data-name="Button">
      <BottomNavigation6 />
      <BottomNavigation7 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%_8.32%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 19">
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
      <Icon20 />
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

function Button15() {
  return (
    <div className="absolute h-[56px] left-[272.36px] rounded-[16px] top-[14px] w-[61.531px]" data-name="Button">
      <BottomNavigation8 />
      <BottomNavigation9 />
    </div>
  );
}

function Icon21() {
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
      <Icon21 />
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

function Button16() {
  return (
    <div className="absolute h-[56px] left-[342.22px] rounded-[16px] top-[14px] w-[51.594px]" data-name="Button">
      <BottomNavigation10 />
      <BottomNavigation11 />
    </div>
  );
}

function Container99() {
  return (
    <div className="absolute h-[84px] left-0 top-0 w-[402px]" data-name="Container">
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
      <Button16 />
    </div>
  );
}

function Container100() {
  return <div className="absolute bg-gradient-to-t from-[rgba(107,93,211,0.05)] h-[84px] left-0 to-[rgba(0,0,0,0)] top-0 w-[402px]" data-name="Container" />;
}

function Icon22() {
  return (
    <IconBackgroundImage7 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p2e69df00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage7>
  );
}

function Text3() {
  return (
    <BackgroundImage5 additionalClassNames="h-[16px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[33px] text-[#90a1b9] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Need Help?</p>
    </BackgroundImage5>
  );
}

function CrisisSupportButton() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center left-[312.33px] top-[4px] w-[81.672px]" data-name="CrisisSupportButton">
      <Icon22 />
      <Text3 />
    </div>
  );
}

function BottomNavigation12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-[1px_0px_0px] border-[rgba(107,93,211,0.1)] border-solid h-[85px] left-0 shadow-[0px_16px_48px_0px_rgba(107,93,211,0.2)] top-[808px] w-[402px]" data-name="BottomNavigation">
      <Container99 />
      <Container100 />
      <CrisisSupportButton />
    </div>
  );
}

function Container101() {
  return (
    <BackgroundImage5 additionalClassNames="w-[229.173px]">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#008a2e] text-[13px] text-nowrap top-[-0.05px] tracking-[-0.0762px]">🏆 Badge Unlocked: Hinduism Explorer</p>
    </BackgroundImage5>
  );
}

function Container102() {
  return (
    <BackgroundImage6 additionalClassNames="h-[17.278px] w-[229.173px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-0 not-italic text-[#008a2e] text-[13px] text-nowrap top-[-0.05px] tracking-[-0.0762px]">+30 wisdom points earned!</p>
    </BackgroundImage6>
  );
}

function Container103() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.9px] h-[37.703px] items-start left-[37px] opacity-0 top-[15.15px] w-[229.173px]" data-name="Container">
      <Container101 />
      <Container102 />
    </div>
  );
}

function Icon23() {
  return (
    <BackgroundImage2 additionalClassNames="relative shrink-0 size-[19px]">
      <g id="Icon">
        <path clipRule="evenodd" d={svgPaths.p3c49d300} fill="var(--fill-0, #008A2E)" fillRule="evenodd" id="Vector" />
      </g>
    </BackgroundImage2>
  );
}

function Container104() {
  return (
    <div className="absolute content-stretch flex items-center left-[12.3px] opacity-0 pl-[-0.95px] pr-0 py-0 size-[15.2px] top-[26.4px]" data-name="Container">
      <Icon23 />
    </div>
  );
}

function He() {
  return (
    <div className="absolute bg-[#ecfdf3] border border-[#bffcd9] border-solid h-[70.003px] left-[9.25px] rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] top-[15.84px] w-[351.5px]" data-name="he3">
      <Container103 />
      <Container104 />
    </div>
  );
}

function Container105() {
  return (
    <BackgroundImage5 additionalClassNames="w-[219.516px]">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#008a2e] text-[13px] text-nowrap top-0 tracking-[-0.0762px]">Exploring Hinduism wisdom!</p>
    </BackgroundImage5>
  );
}

function Container106() {
  return (
    <BackgroundImage6 additionalClassNames="h-[18.188px] w-[219.516px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-0 not-italic text-[#008a2e] text-[13px] text-nowrap top-0 tracking-[-0.0762px]">{`You've gained new spiritual insights.`}</p>
    </BackgroundImage6>
  );
}

function Container107() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[39.688px] items-start left-[39px] top-[16px] w-[219.516px]" data-name="Container">
      <Container105 />
      <Container106 />
    </div>
  );
}

function Icon24() {
  return (
    <IconBackgroundImage6 additionalClassNames="relative shrink-0">
      <path clipRule="evenodd" d={svgPaths.p19773c80} fill="var(--fill-0, #008A2E)" fillRule="evenodd" id="Vector" />
    </IconBackgroundImage6>
  );
}

function Container108() {
  return (
    <div className="absolute content-stretch flex items-center left-[13px] pl-[-1px] pr-0 py-0 size-[16px] top-[27.84px]" data-name="Container">
      <Icon24 />
    </div>
  );
}

function He1() {
  return (
    <div className="absolute bg-[#ecfdf3] border border-[#bffcd9] border-solid h-[73.688px] left-0 rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] top-0 w-[370px]" data-name="he3">
      <Container107 />
      <Container108 />
    </div>
  );
}

function NumberedList() {
  return (
    <div className="absolute h-0 left-[16px] top-[16px] w-[402px]" data-name="Numbered List">
      <He />
      <He1 />
    </div>
  );
}

export default function DivinityAgiSpiritGuideAppVersion() {
  return (
    <div className="bg-[#121212] relative size-full" data-name="DivinityAGI Spirit Guide App Version 12-7">
      <AppContent />
      <BackgroundVideo />
      <AppHeader />
      <BottomNavigation12 />
      <NumberedList />
    </div>
  );
}