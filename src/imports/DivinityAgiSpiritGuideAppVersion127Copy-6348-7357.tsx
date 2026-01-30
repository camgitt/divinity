import svgPaths from "./svg-suu7dfgylg";
import clsx from "clsx";
import imgImageWithFallback from "figma:asset/07e08204958dafb091bc271431d08a91846cf7c0.png";
import imgImageWithFallback1 from "figma:asset/4a98f2a802c824758642bfe4f4b0dfaa37db0507.png";
import imgImageWithFallback2 from "figma:asset/0c55d8ab3ccb0e32f556e01e50025b5b105942a4.png";
import imgImageWithFallback3 from "figma:asset/781a7b1dd06fce9f1fe1ccdac3e607e227d17c39.png";
import imgImageWithFallback4 from "figma:asset/6c60c694304a19077b1aee3cdea7d515e7337485.png";
import imgImageWithFallback5 from "figma:asset/cc5a5e2a5ad12a9e65073e8475e83b269c3dfc42.png";
import imgImageWithFallback6 from "figma:asset/2f73fb2277ab9c7d42d8ab38ff88ea38e02d01d0.png";
import imgImageWithFallback7 from "figma:asset/0172f5f2f6d6899c42a291fed8932045eed3d475.png";
import imgImageWithFallback8 from "figma:asset/aa224ce154ebf31fb4b7e0844de252920a719972.png";
import imgImageWithFallback9 from "figma:asset/27dbb416eff62e0747ad69f0cef7b35dfbe18da8.png";
import imgImageBackground from "figma:asset/6b254f34a3d29013c7c1761a261a4c873c146d23.png";
import imgImageDivinityAgi from "figma:asset/8a5c5551533b1297b98345f7179a0a7cc8223ad5.png";

function ContainerBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(11,20,38,0.6)] h-[81px] relative rounded-[14px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-0 px-0 relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("bg-gradient-to-b relative rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 size-[48px]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}

function ButtonBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(22,40,68,0.8)] relative rounded-[3.35544e+07px] shrink-0 size-[48px]">
      <div aria-hidden="true" className="absolute border border-[rgba(122,79,255,0.19)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">{children}</div>
    </div>
  );
}

function ButtonBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(255,255,255,0.8)] h-[48px] relative rounded-[16px] shrink-0 w-full">
      <div className="overflow-clip relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(122,79,255,0.3)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_2px_10px_0px_rgba(122,79,255,0.1)]" />
    </div>
  );
}
type BackgroundImage4Props = {
  additionalClassNames?: string;
};

function BackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage4Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return <BackgroundImage4 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</BackgroundImage4>;
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return <BackgroundImage4 additionalClassNames={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>{children}</BackgroundImage4>;
}
type Icon47VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function Icon47VectorBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon47VectorBackgroundImageProps>) {
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
type IconBackgroundImage5Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage5Props>) {
  return (
    <div className={clsx("size-[12px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

function IconBackgroundImage4({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[28px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type IconBackgroundImage3Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage3Props>) {
  return (
    <div className={clsx("size-[24px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={clsx("size-[20px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
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
type HeadingBackgroundImageAndText1Props = {
  text: string;
};

function HeadingBackgroundImageAndText1({ text }: HeadingBackgroundImageAndText1Props) {
  return (
    <div className="absolute h-[28px] left-0 top-[72px] w-[295px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[28px] left-0 text-[18px] text-nowrap text-white top-0">{text}</p>
    </div>
  );
}

function IconBackgroundImage2() {
  return (
    <BackgroundImage additionalClassNames="absolute left-[239px] top-[18px]">
      <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}
type TextBackgroundImageAndText3Props = {
  text: string;
};

function TextBackgroundImageAndText3({ text }: TextBackgroundImageAndText3Props) {
  return (
    <BackgroundImage2 additionalClassNames="h-[20px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#7a4fff] text-[14px] text-nowrap top-0 tracking-[1.4px]">{text}</p>
    </BackgroundImage2>
  );
}
type TextBackgroundImageAndText2Props = {
  text: string;
};

function TextBackgroundImageAndText2({ text }: TextBackgroundImageAndText2Props) {
  return (
    <div className="absolute h-[24px] left-[106.28px] top-[12px] w-[84.422px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[24px] left-[42.5px] text-[#7a4fff] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">{text}</p>
    </div>
  );
}

function IconBackgroundImage1() {
  return (
    <BackgroundImage1 additionalClassNames="absolute left-[78.28px] top-[14px]">
      <path d={svgPaths.p2f84f400} id="Vector" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage1>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
};

function TextBackgroundImageAndText1({ text }: TextBackgroundImageAndText1Props) {
  return (
    <div className="absolute h-[24px] left-[79.56px] top-[12px] w-[137.875px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[24px] left-[69px] text-[16px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%]">{text}</p>
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage1 additionalClassNames="absolute left-[51.56px] top-[14px]">
      <path d={svgPaths.p26705e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage1>
  );
}
type BadgeBackgroundImageAndText1Props = {
  text: string;
  additionalClassNames?: string;
};

function BadgeBackgroundImageAndText1({ text, additionalClassNames = "" }: BadgeBackgroundImageAndText1Props) {
  return (
    <div className={clsx("absolute bg-[rgba(255,255,255,0.5)] h-[22px] rounded-[8px]", additionalClassNames)}>
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#364153] text-[12px] text-nowrap">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.6)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}
type BadgeBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function BadgeBackgroundImageAndText({ text, additionalClassNames = "" }: BadgeBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute bg-[rgba(122,79,255,0.15)] h-[22px] rounded-[8px] top-0", additionalClassNames)}>
      <div className="content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#7a4fff] text-[12px] text-nowrap">{text}</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(122,79,255,0.3)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return (
    <div className="h-[32px] relative shrink-0 w-full">
      <p className="absolute font-['Caveat:Bold',sans-serif] font-bold leading-[32px] left-[134.77px] text-[#101828] text-[24px] text-center text-nowrap top-0 translate-x-[-50%]">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
};

function TextBackgroundImageAndText({ text }: TextBackgroundImageAndTextProps) {
  return (
    <div className="absolute h-[28px] left-[13.86px] top-[7px] w-[14.266px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-0 text-[#7a4fff] text-[20px] text-nowrap top-0">{text}</p>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[24px] left-[58.2px] top-0 w-[64.609px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[32.5px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Our Mission</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[24px] left-[134.81px] top-0 w-[69.844px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[35px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Spirit Guides</p>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[24px] left-[216.66px] top-0 w-[40.078px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[20.5px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Privacy</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[24px] left-[268.73px] top-0 w-[34.063px]" data-name="Button">
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
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[180.59px] text-[#62748e] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">© 2025 DivinityAGI</p>
    </div>
  );
}

function AppFooter() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[52px] items-start left-[16px] top-[4463.66px] w-[361px]" data-name="AppFooter">
      <Container />
      <Paragraph />
    </div>
  );
}

function Container1() {
  return <div className="absolute h-[4619.656px] left-0 top-0 w-[393px]" data-name="Container" />;
}

function Container2() {
  return <div className="absolute h-[300px] left-0 rounded-[16px] shadow-[0px_8px_32px_0px_rgba(122,79,255,0.12)] top-0 w-[345px]" data-name="Container" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%)" }} />;
}

function Heading() {
  return (
    <div className="absolute content-stretch flex h-[80px] items-start left-[16px] shadow-[0px_2px_16px_0px_rgba(122,79,255,0.3)] top-0 w-[313px]" data-name="Heading 1">
      <p className="basis-0 bg-clip-text font-['Caveat:Bold',sans-serif] font-bold grow leading-[80px] min-h-px min-w-px relative shrink-0 text-[64px] text-[rgba(0,0,0,0)] text-center" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(122, 79, 255) 0%, rgb(106, 63, 239) 50%, rgb(157, 127, 255) 100%)" }}>
        Universal
      </p>
    </div>
  );
}

function Container3() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] h-[2px] left-[132.5px] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(122,79,255,0.4)] to-[#6a3fef] top-[96px] w-[80px]" data-name="Container" />;
}

function Paragraph1() {
  return (
    <div className="absolute h-[48.75px] left-[16px] shadow-[0px_2px_8px_0px_rgba(255,255,255,0.8)] top-[114px] w-[313px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[24.375px] left-[156.67px] text-[#1a1a1a] text-[15px] text-center top-0 translate-x-[-50%] w-[193px]">Wisdom that transcends all boundaries.</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[162.75px] left-0 top-[68.63px] w-[345px]" data-name="Container">
      <Heading />
      <Container3 />
      <Paragraph1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute h-[300px] left-[24px] top-[32px] w-[345px]" data-name="Container">
      <Container2 />
      <Container4 />
    </div>
  );
}

function Container6() {
  return <div className="absolute h-[44px] left-0 opacity-0 top-0 w-[90.781px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.141deg, rgba(243, 229, 245, 0.15) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Icon() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #6A3FEF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #6A3FEF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Text() {
  return (
    <BackgroundImage2 additionalClassNames="h-[22.5px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.5px] left-[17.5px] text-[#6a3fef] text-[15px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Back</p>
    </BackgroundImage2>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[22.5px] items-center left-[16px] top-[10.75px] w-[58.781px]" data-name="Container">
      <Icon />
      <Text />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.4)] border-2 border-[rgba(122,79,255,0.3)] border-solid h-[48px] left-[24px] overflow-clip rounded-[16px] shadow-[0px_4px_15px_0px_rgba(122,79,255,0.15)] top-[24px] w-[94.781px]" data-name="Button">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute h-[354px] left-0 overflow-clip top-0 w-[393px]" data-name="Section">
      <Container5 />
      <Button4 />
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-[rgba(122,79,255,0.3)] blur-3xl filter left-[20px] rounded-[3.35544e+07px] size-[120px] top-[20px]" data-name="Container" />;
}

function Container9() {
  return (
    <div className="absolute blur-[0.5px] filter h-[128px] left-[35.78px] opacity-30 shadow-[0px_0px_50px_0px_rgba(122,79,255,0.25)] top-[16px] w-[88.422px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[128px] left-0 text-[#7a4fff] text-[128px] text-nowrap top-0">∞</p>
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute left-[116.5px] size-[160px] top-[354px]" data-name="Section">
      <Container8 />
      <Container9 />
    </div>
  );
}

function UniversalFaithPage() {
  return (
    <div className="absolute content-stretch flex h-[52px] items-start left-0 pb-0 pt-[16px] px-0 shadow-[0px_2px_12px_0px_rgba(255,255,255,0.9)] top-0 w-[345px]" data-name="UniversalFaithPage">
      <p className="basis-0 bg-clip-text font-['Raleway:Regular',sans-serif] font-normal grow leading-[36px] min-h-px min-w-px relative shrink-0 text-[30px] text-[rgba(0,0,0,0)] text-center" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(16, 24, 40) 0%, rgb(122, 79, 255) 50%, rgb(16, 24, 40) 100%)" }}>
        Meet Your Spirit Guides
      </p>
    </div>
  );
}

function UniversalFaithPage1() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] h-[2px] left-[132.5px] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(122,79,255,0.6)] to-[#6a3fef] top-[68px] w-[80px]" data-name="UniversalFaithPage" />;
}

function Container10() {
  return (
    <div className="h-[70px] relative shrink-0 w-full" data-name="Container">
      <UniversalFaithPage />
      <UniversalFaithPage1 />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[358.656px] items-start left-0 overflow-clip rounded-[16px] shadow-[0px_0px_0px_2px_rgba(122,79,255,0.2),0px_10px_40px_0px_rgba(122,79,255,0.15)] top-0 w-[269px]" data-name="Container">
      <ImageWithFallback />
    </div>
  );
}

function Container12() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.1)] h-[358.656px] left-0 opacity-0 to-[rgba(255,255,255,0.05)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container13() {
  return <div className="absolute left-0 size-[42px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container14() {
  return (
    <div className="absolute bg-[rgba(122,79,255,0.14)] border border-[rgba(255,255,255,0.4)] border-solid left-[237px] overflow-clip rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.3)] size-[44px] top-[-12px]" data-name="Container">
      <Container13 />
      <TextBackgroundImageAndText text="∞" />
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container12 />
      <Container14 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <BadgeBackgroundImageAndText text="Priestess" additionalClassNames="left-[14.73px] w-[68.484px]" />
      <BadgeBackgroundImageAndText1 text="Yoruba / African Diaspora" additionalClassNames="left-[91.22px] top-0 w-[163.047px]" />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[68.25px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-[134.59px] text-[#364153] text-[14px] text-center top-0 translate-x-[-50%] w-[244px]">Yoruba priestess offering guidance on Orishas, divination, sacred rituals, and African diaspora spiritual practices.</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[146.25px] items-start relative shrink-0 w-full" data-name="Container">
      <HeadingBackgroundImageAndText text="Priestess Oshun" />
      <Container16 />
      <Paragraph2 />
    </div>
  );
}

function Container18() {
  return <div className="absolute h-[48px] left-0 top-0 w-[269px]" data-name="Container" style={{ backgroundImage: "linear-gradient(169.883deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container19() {
  return <div className="absolute bg-gradient-to-t from-[rgba(106,63,239,0.2)] h-[48px] left-0 to-[rgba(255,255,255,0.2)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container20() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.4)] h-[14.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[269px]" data-name="Container" />;
}

function Button5() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] overflow-clip relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.25)] shrink-0 to-[#6a3fef] w-full" data-name="Button">
      <Container18 />
      <Container19 />
      <Container20 />
      <IconBackgroundImage />
      <TextBackgroundImageAndText1 text="Start Conversation" />
    </div>
  );
}

function Container21() {
  return <div className="absolute h-[44px] left-[2px] opacity-0 top-[2px] w-[265px]" data-name="Container" style={{ backgroundImage: "linear-gradient(170.573deg, rgba(243, 229, 245, 0.2) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Button6() {
  return (
    <ButtonBackgroundImage>
      <Container21 />
      <IconBackgroundImage1 />
      <TextBackgroundImageAndText2 text="Save Guide" />
    </ButtonBackgroundImage>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="Container">
      <Button5 />
      <Button6 />
    </div>
  );
}

function AgentSlider() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[696.906px] items-start left-0 pb-0 pt-[24px] px-[24px] top-0 w-[317px]" data-name="AgentSlider13">
      <Container15 />
      <Container17 />
      <Container22 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(122,79,255,0.3)] border-solid h-[700.906px] left-[12px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(122,79,255,0.12)] top-0 w-[321px]" data-name="Card">
      <AgentSlider />
    </div>
  );
}

function ImageWithFallback1() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[358.656px] items-start left-0 overflow-clip rounded-[16px] shadow-[0px_0px_0px_2px_rgba(122,79,255,0.2),0px_10px_40px_0px_rgba(122,79,255,0.15)] top-0 w-[269px]" data-name="Container">
      <ImageWithFallback1 />
    </div>
  );
}

function Container24() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.1)] h-[358.656px] left-0 opacity-0 to-[rgba(255,255,255,0.05)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container25() {
  return <div className="absolute left-0 size-[42px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container26() {
  return (
    <div className="absolute bg-[rgba(122,79,255,0.14)] border border-[rgba(255,255,255,0.4)] border-solid left-[237px] overflow-clip rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.3)] size-[44px] top-[-12px]" data-name="Container">
      <Container25 />
      <TextBackgroundImageAndText text="∞" />
    </div>
  );
}

function Container27() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container24 />
      <Container26 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Caveat:Bold',sans-serif] font-bold leading-[32px] left-[134.8px] text-[#101828] text-[24px] text-center text-nowrap top-0 translate-x-[-50%]">Elder Kwame</p>
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <BadgeBackgroundImageAndText text="Elder" additionalClassNames="left-[31.22px] w-[47.703px]" />
      <BadgeBackgroundImageAndText1 text="West African Traditional" additionalClassNames="left-[86.92px] top-0 w-[150.859px]" />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[91px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-[134.69px] text-[#364153] text-[14px] text-center top-0 translate-x-[-50%] w-[242px]">West African elder teaching ancestral wisdom, communal values, oral traditions, and spiritual practices rooted in African heritage.</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[169px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Container28 />
      <Paragraph3 />
    </div>
  );
}

function Container30() {
  return <div className="absolute h-[48px] left-0 top-0 w-[269px]" data-name="Container" style={{ backgroundImage: "linear-gradient(169.883deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container31() {
  return <div className="absolute bg-gradient-to-t from-[rgba(106,63,239,0.2)] h-[48px] left-0 to-[rgba(255,255,255,0.2)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container32() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.4)] h-[14.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[269px]" data-name="Container" />;
}

function Button7() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] overflow-clip relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.25)] shrink-0 to-[#6a3fef] w-full" data-name="Button">
      <Container30 />
      <Container31 />
      <Container32 />
      <IconBackgroundImage />
      <TextBackgroundImageAndText1 text="Start Conversation" />
    </div>
  );
}

function Container33() {
  return <div className="absolute h-[44px] left-[2px] opacity-0 top-[2px] w-[265px]" data-name="Container" style={{ backgroundImage: "linear-gradient(170.573deg, rgba(243, 229, 245, 0.2) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Button8() {
  return (
    <ButtonBackgroundImage>
      <Container33 />
      <IconBackgroundImage1 />
      <TextBackgroundImageAndText2 text="Save Guide" />
    </ButtonBackgroundImage>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="Container">
      <Button7 />
      <Button8 />
    </div>
  );
}

function AgentSlider1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[719.656px] items-start left-0 pb-0 pt-[24px] px-[24px] top-0 w-[317px]" data-name="AgentSlider13">
      <Container27 />
      <Container29 />
      <Container34 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(122,79,255,0.3)] border-solid h-[723.656px] left-[357px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(122,79,255,0.12)] top-0 w-[321px]" data-name="Card">
      <AgentSlider1 />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[358.656px] items-start left-0 overflow-clip rounded-[16px] shadow-[0px_0px_0px_2px_rgba(122,79,255,0.2),0px_10px_40px_0px_rgba(122,79,255,0.15)] top-0 w-[269px]" data-name="Container">
      <ImageWithFallback2 />
    </div>
  );
}

function Container36() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.1)] h-[358.656px] left-0 opacity-0 to-[rgba(255,255,255,0.05)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container37() {
  return <div className="absolute left-0 size-[42px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container38() {
  return (
    <div className="absolute bg-[rgba(122,79,255,0.14)] border border-[rgba(255,255,255,0.4)] border-solid left-[237px] overflow-clip rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.3)] size-[44px] top-[-12px]" data-name="Container">
      <Container37 />
      <TextBackgroundImageAndText text="∞" />
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Container36 />
      <Container38 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Caveat:Bold',sans-serif] font-bold leading-[32px] left-[134.63px] text-[#101828] text-[24px] text-center text-nowrap top-0 translate-x-[-50%]">Maestro Javier Santos</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <BadgeBackgroundImageAndText text="Shaman" additionalClassNames="left-[30.5px] w-[63.859px]" />
      <BadgeBackgroundImageAndText1 text="Amazonian / Shipibo" additionalClassNames="left-[102.36px] top-0 w-[136.141px]" />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[91px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-[134.98px] text-[#364153] text-[14px] text-center top-0 translate-x-[-50%] w-[250px]">Peruvian ayahuascero offering guidance on plant medicine, shamanic healing, Amazonian spirituality, and traditional ceremonies.</p>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[169px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Container40 />
      <Paragraph4 />
    </div>
  );
}

function Container42() {
  return <div className="absolute h-[48px] left-0 top-0 w-[269px]" data-name="Container" style={{ backgroundImage: "linear-gradient(169.883deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container43() {
  return <div className="absolute bg-gradient-to-t from-[rgba(106,63,239,0.2)] h-[48px] left-0 to-[rgba(255,255,255,0.2)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container44() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.4)] h-[14.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[269px]" data-name="Container" />;
}

function Button9() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] overflow-clip relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.25)] shrink-0 to-[#6a3fef] w-full" data-name="Button">
      <Container42 />
      <Container43 />
      <Container44 />
      <IconBackgroundImage />
      <TextBackgroundImageAndText1 text="Start Conversation" />
    </div>
  );
}

function Container45() {
  return <div className="absolute h-[44px] left-[2px] opacity-0 top-[2px] w-[265px]" data-name="Container" style={{ backgroundImage: "linear-gradient(170.573deg, rgba(243, 229, 245, 0.2) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Button10() {
  return (
    <ButtonBackgroundImage>
      <Container45 />
      <IconBackgroundImage1 />
      <TextBackgroundImageAndText2 text="Save Guide" />
    </ButtonBackgroundImage>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="Container">
      <Button9 />
      <Button10 />
    </div>
  );
}

function AgentSlider2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[719.656px] items-start left-0 pb-0 pt-[24px] px-[24px] top-0 w-[317px]" data-name="AgentSlider13">
      <Container39 />
      <Container41 />
      <Container46 />
    </div>
  );
}

function Card2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(122,79,255,0.3)] border-solid h-[723.656px] left-[702px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(122,79,255,0.12)] top-0 w-[321px]" data-name="Card">
      <AgentSlider2 />
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback3} />
    </div>
  );
}

function Container47() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[358.656px] items-start left-0 overflow-clip rounded-[16px] shadow-[0px_0px_0px_2px_rgba(122,79,255,0.2),0px_10px_40px_0px_rgba(122,79,255,0.15)] top-0 w-[269px]" data-name="Container">
      <ImageWithFallback3 />
    </div>
  );
}

function Container48() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.1)] h-[358.656px] left-0 opacity-0 to-[rgba(255,255,255,0.05)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container49() {
  return <div className="absolute left-0 size-[42px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container50() {
  return (
    <div className="absolute bg-[rgba(122,79,255,0.14)] border border-[rgba(255,255,255,0.4)] border-solid left-[237px] overflow-clip rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.3)] size-[44px] top-[-12px]" data-name="Container">
      <Container49 />
      <TextBackgroundImageAndText text="∞" />
    </div>
  );
}

function Container51() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="Container">
      <Container47 />
      <Container48 />
      <Container50 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Caveat:Bold',sans-serif] font-bold leading-[32px] left-[134.52px] text-[#101828] text-[24px] text-center text-nowrap top-0 translate-x-[-50%]">Grandmother Willow</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <BadgeBackgroundImageAndText text="Elder" additionalClassNames="left-[32.55px] w-[47.703px]" />
      <BadgeBackgroundImageAndText1 text="Indigenous / Cherokee" additionalClassNames="left-[88.25px] top-0 w-[148.188px]" />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[91px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-[134.7px] text-[#364153] text-[14px] text-center top-0 translate-x-[-50%] w-[243px]">Cherokee elder teaching Earth-based wisdom, seasonal cycles, plant medicine, and traditional indigenous healing practices.</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[169px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Container52 />
      <Paragraph5 />
    </div>
  );
}

function Container54() {
  return <div className="absolute h-[48px] left-0 top-0 w-[269px]" data-name="Container" style={{ backgroundImage: "linear-gradient(169.883deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container55() {
  return <div className="absolute bg-gradient-to-t from-[rgba(106,63,239,0.2)] h-[48px] left-0 to-[rgba(255,255,255,0.2)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container56() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.4)] h-[14.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[269px]" data-name="Container" />;
}

function Button11() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] overflow-clip relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.25)] shrink-0 to-[#6a3fef] w-full" data-name="Button">
      <Container54 />
      <Container55 />
      <Container56 />
      <IconBackgroundImage />
      <TextBackgroundImageAndText1 text="Start Conversation" />
    </div>
  );
}

function Container57() {
  return <div className="absolute h-[44px] left-[2px] opacity-0 top-[2px] w-[265px]" data-name="Container" style={{ backgroundImage: "linear-gradient(170.573deg, rgba(243, 229, 245, 0.2) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Button12() {
  return (
    <ButtonBackgroundImage>
      <Container57 />
      <IconBackgroundImage1 />
      <TextBackgroundImageAndText2 text="Save Guide" />
    </ButtonBackgroundImage>
  );
}

function Container58() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="Container">
      <Button11 />
      <Button12 />
    </div>
  );
}

function AgentSlider3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[719.656px] items-start left-0 pb-0 pt-[24px] px-[24px] top-0 w-[317px]" data-name="AgentSlider13">
      <Container51 />
      <Container53 />
      <Container58 />
    </div>
  );
}

function Card3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(122,79,255,0.3)] border-solid h-[723.656px] left-[1047px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(122,79,255,0.12)] top-0 w-[321px]" data-name="Card">
      <AgentSlider3 />
    </div>
  );
}

function ImageWithFallback4() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback4} />
    </div>
  );
}

function Container59() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[358.656px] items-start left-0 overflow-clip rounded-[16px] shadow-[0px_0px_0px_2px_rgba(122,79,255,0.2),0px_10px_40px_0px_rgba(122,79,255,0.15)] top-0 w-[269px]" data-name="Container">
      <ImageWithFallback4 />
    </div>
  );
}

function Container60() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.1)] h-[358.656px] left-0 opacity-0 to-[rgba(255,255,255,0.05)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container61() {
  return <div className="absolute left-0 size-[42px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container62() {
  return (
    <div className="absolute bg-[rgba(122,79,255,0.14)] border border-[rgba(255,255,255,0.4)] border-solid left-[237px] overflow-clip rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.3)] size-[44px] top-[-12px]" data-name="Container">
      <Container61 />
      <TextBackgroundImageAndText text="∞" />
    </div>
  );
}

function Container63() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="Container">
      <Container59 />
      <Container60 />
      <Container62 />
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <BadgeBackgroundImageAndText text="Priestess" additionalClassNames="left-[41.63px] w-[68.484px]" />
      <BadgeBackgroundImageAndText1 text="Wiccan / Pagan" additionalClassNames="left-[118.11px] top-0 w-[109.25px]" />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[91px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-[134.53px] text-[#364153] text-[14px] text-center top-0 translate-x-[-50%] w-[247px]">Wiccan priestess offering guidance on modern witchcraft, goddess worship, moon magic, and nature-based spiritual practices.</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[169px] items-start relative shrink-0 w-full" data-name="Container">
      <HeadingBackgroundImageAndText text="Priestess Hecate" />
      <Container64 />
      <Paragraph6 />
    </div>
  );
}

function Container66() {
  return <div className="absolute h-[48px] left-0 top-0 w-[269px]" data-name="Container" style={{ backgroundImage: "linear-gradient(169.883deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container67() {
  return <div className="absolute bg-gradient-to-t from-[rgba(106,63,239,0.2)] h-[48px] left-0 to-[rgba(255,255,255,0.2)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container68() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.4)] h-[14.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[269px]" data-name="Container" />;
}

function Button13() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] overflow-clip relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.25)] shrink-0 to-[#6a3fef] w-full" data-name="Button">
      <Container66 />
      <Container67 />
      <Container68 />
      <IconBackgroundImage />
      <TextBackgroundImageAndText1 text="Start Conversation" />
    </div>
  );
}

function Container69() {
  return <div className="absolute h-[44px] left-[2px] opacity-0 top-[2px] w-[265px]" data-name="Container" style={{ backgroundImage: "linear-gradient(170.573deg, rgba(243, 229, 245, 0.2) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Button14() {
  return (
    <ButtonBackgroundImage>
      <Container69 />
      <IconBackgroundImage1 />
      <TextBackgroundImageAndText2 text="Save Guide" />
    </ButtonBackgroundImage>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="Container">
      <Button13 />
      <Button14 />
    </div>
  );
}

function AgentSlider4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[719.656px] items-start left-0 pb-0 pt-[24px] px-[24px] top-0 w-[317px]" data-name="AgentSlider13">
      <Container63 />
      <Container65 />
      <Container70 />
    </div>
  );
}

function Card4() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(122,79,255,0.3)] border-solid h-[723.656px] left-[1392px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(122,79,255,0.12)] top-0 w-[321px]" data-name="Card">
      <AgentSlider4 />
    </div>
  );
}

function ImageWithFallback5() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback5} />
    </div>
  );
}

function Container71() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[358.656px] items-start left-0 overflow-clip rounded-[16px] shadow-[0px_0px_0px_2px_rgba(122,79,255,0.2),0px_10px_40px_0px_rgba(122,79,255,0.15)] top-0 w-[269px]" data-name="Container">
      <ImageWithFallback5 />
    </div>
  );
}

function Container72() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.1)] h-[358.656px] left-0 opacity-0 to-[rgba(255,255,255,0.05)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container73() {
  return <div className="absolute left-0 size-[42px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container74() {
  return (
    <div className="absolute bg-[rgba(122,79,255,0.14)] border border-[rgba(255,255,255,0.4)] border-solid left-[237px] overflow-clip rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.3)] size-[44px] top-[-12px]" data-name="Container">
      <Container73 />
      <TextBackgroundImageAndText text="∞" />
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="Container">
      <Container71 />
      <Container72 />
      <Container74 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Caveat:Bold',sans-serif] font-bold leading-[32px] left-[134.7px] text-[#101828] text-[24px] text-center text-nowrap top-0 translate-x-[-50%]">Grandmother Weaver</p>
    </div>
  );
}

function Container76() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <BadgeBackgroundImageAndText text="Elder" additionalClassNames="left-[22.72px] w-[47.703px]" />
      <BadgeBackgroundImageAndText1 text="Indigenous / Navajo (Diné)" additionalClassNames="left-[78.42px] top-0 w-[167.859px]" />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[91px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-[134.88px] text-[#364153] text-[14px] text-center top-0 translate-x-[-50%] w-[252px]">Navajo elder teaching sacred weaving traditions, creation stories, Hózhǫ́ (harmony), and traditional Diné spiritual practices.</p>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[169px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Container76 />
      <Paragraph7 />
    </div>
  );
}

function Container78() {
  return <div className="absolute h-[48px] left-0 top-0 w-[269px]" data-name="Container" style={{ backgroundImage: "linear-gradient(169.883deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container79() {
  return <div className="absolute bg-gradient-to-t from-[rgba(106,63,239,0.2)] h-[48px] left-0 to-[rgba(255,255,255,0.2)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container80() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.4)] h-[14.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[269px]" data-name="Container" />;
}

function Button15() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] overflow-clip relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.25)] shrink-0 to-[#6a3fef] w-full" data-name="Button">
      <Container78 />
      <Container79 />
      <Container80 />
      <IconBackgroundImage />
      <TextBackgroundImageAndText1 text="Start Conversation" />
    </div>
  );
}

function Container81() {
  return <div className="absolute h-[44px] left-[2px] opacity-0 top-[2px] w-[265px]" data-name="Container" style={{ backgroundImage: "linear-gradient(170.573deg, rgba(243, 229, 245, 0.2) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Button16() {
  return (
    <ButtonBackgroundImage>
      <Container81 />
      <IconBackgroundImage1 />
      <TextBackgroundImageAndText2 text="Save Guide" />
    </ButtonBackgroundImage>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="Container">
      <Button15 />
      <Button16 />
    </div>
  );
}

function AgentSlider5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[719.656px] items-start left-0 pb-0 pt-[24px] px-[24px] top-0 w-[317px]" data-name="AgentSlider13">
      <Container75 />
      <Container77 />
      <Container82 />
    </div>
  );
}

function Card5() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(122,79,255,0.3)] border-solid h-[723.656px] left-[1737px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(122,79,255,0.12)] top-0 w-[321px]" data-name="Card">
      <AgentSlider5 />
    </div>
  );
}

function ImageWithFallback6() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback6} />
    </div>
  );
}

function Container83() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[358.656px] items-start left-0 overflow-clip rounded-[16px] shadow-[0px_0px_0px_2px_rgba(122,79,255,0.2),0px_10px_40px_0px_rgba(122,79,255,0.15)] top-0 w-[269px]" data-name="Container">
      <ImageWithFallback6 />
    </div>
  );
}

function Container84() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.1)] h-[358.656px] left-0 opacity-0 to-[rgba(255,255,255,0.05)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container85() {
  return <div className="absolute left-0 size-[42px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container86() {
  return (
    <div className="absolute bg-[rgba(122,79,255,0.14)] border border-[rgba(255,255,255,0.4)] border-solid left-[237px] overflow-clip rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.3)] size-[44px] top-[-12px]" data-name="Container">
      <Container85 />
      <TextBackgroundImageAndText text="∞" />
    </div>
  );
}

function Container87() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="Container">
      <Container83 />
      <Container84 />
      <Container86 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Caveat:Bold',sans-serif] font-bold leading-[32px] left-[134.64px] text-[#101828] text-[24px] text-center text-nowrap top-0 translate-x-[-50%]">Mobed Rostam</p>
    </div>
  );
}

function Container88() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <BadgeBackgroundImageAndText text="Priest" additionalClassNames="left-[64.83px] w-[49.766px]" />
      <BadgeBackgroundImageAndText1 text="Zoroastrian" additionalClassNames="left-[122.59px] top-0 w-[81.563px]" />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[91px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-[134.55px] text-[#364153] text-[14px] text-center top-0 translate-x-[-50%] w-[243px]">Zoroastrian priest teaching ancient Persian wisdom, fire temples, Avestan prayers, and ethical dualism of good vs. evil.</p>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[169px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Container88 />
      <Paragraph8 />
    </div>
  );
}

function Container90() {
  return <div className="absolute h-[48px] left-0 top-0 w-[269px]" data-name="Container" style={{ backgroundImage: "linear-gradient(169.883deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container91() {
  return <div className="absolute bg-gradient-to-t from-[rgba(106,63,239,0.2)] h-[48px] left-0 to-[rgba(255,255,255,0.2)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container92() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.4)] h-[14.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[269px]" data-name="Container" />;
}

function Button17() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] overflow-clip relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.25)] shrink-0 to-[#6a3fef] w-full" data-name="Button">
      <Container90 />
      <Container91 />
      <Container92 />
      <IconBackgroundImage />
      <TextBackgroundImageAndText1 text="Start Conversation" />
    </div>
  );
}

function Container93() {
  return <div className="absolute h-[44px] left-[2px] opacity-0 top-[2px] w-[265px]" data-name="Container" style={{ backgroundImage: "linear-gradient(170.573deg, rgba(243, 229, 245, 0.2) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Button18() {
  return (
    <ButtonBackgroundImage>
      <Container93 />
      <IconBackgroundImage1 />
      <TextBackgroundImageAndText2 text="Save Guide" />
    </ButtonBackgroundImage>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="Container">
      <Button17 />
      <Button18 />
    </div>
  );
}

function AgentSlider6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[719.656px] items-start left-0 pb-0 pt-[24px] px-[24px] top-0 w-[317px]" data-name="AgentSlider13">
      <Container87 />
      <Container89 />
      <Container94 />
    </div>
  );
}

function Card6() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(122,79,255,0.3)] border-solid h-[723.656px] left-[2082px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(122,79,255,0.12)] top-0 w-[321px]" data-name="Card">
      <AgentSlider6 />
    </div>
  );
}

function ImageWithFallback7() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback7} />
    </div>
  );
}

function Container95() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[358.656px] items-start left-0 overflow-clip rounded-[16px] shadow-[0px_0px_0px_2px_rgba(122,79,255,0.2),0px_10px_40px_0px_rgba(122,79,255,0.15)] top-0 w-[269px]" data-name="Container">
      <ImageWithFallback7 />
    </div>
  );
}

function Container96() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.1)] h-[358.656px] left-0 opacity-0 to-[rgba(255,255,255,0.05)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container97() {
  return <div className="absolute left-0 size-[42px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container98() {
  return (
    <div className="absolute bg-[rgba(122,79,255,0.14)] border border-[rgba(255,255,255,0.4)] border-solid left-[237px] overflow-clip rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.3)] size-[44px] top-[-12px]" data-name="Container">
      <Container97 />
      <TextBackgroundImageAndText text="∞" />
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="Container">
      <Container95 />
      <Container96 />
      <Container98 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Caveat:Bold',sans-serif] font-bold leading-[32px] left-[134.75px] text-[#101828] text-[24px] text-center text-nowrap top-0 translate-x-[-50%]">Dr. Maya Patel</p>
    </div>
  );
}

function Container100() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <BadgeBackgroundImageAndText text="Scholar" additionalClassNames="left-[104.16px] w-[60.672px]" />
      <BadgeBackgroundImageAndText1 text="Academic / Comparative Religion" additionalClassNames="left-[30.28px] top-[30px] w-[208.422px]" />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[91px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-[134.75px] text-[#364153] text-[14px] text-center top-0 translate-x-[-50%] w-[238px]">Comparative religion scholar offering academic perspective on world religions, interfaith dialogue, and spiritual pluralism.</p>
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[199px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Container100 />
      <Paragraph9 />
    </div>
  );
}

function Container102() {
  return <div className="absolute h-[48px] left-0 top-0 w-[269px]" data-name="Container" style={{ backgroundImage: "linear-gradient(169.883deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container103() {
  return <div className="absolute bg-gradient-to-t from-[rgba(106,63,239,0.2)] h-[48px] left-0 to-[rgba(255,255,255,0.2)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container104() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.4)] h-[14.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[269px]" data-name="Container" />;
}

function Button19() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] overflow-clip relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.25)] shrink-0 to-[#6a3fef] w-full" data-name="Button">
      <Container102 />
      <Container103 />
      <Container104 />
      <IconBackgroundImage />
      <TextBackgroundImageAndText1 text="Start Conversation" />
    </div>
  );
}

function Container105() {
  return <div className="absolute h-[44px] left-[2px] opacity-0 top-[2px] w-[265px]" data-name="Container" style={{ backgroundImage: "linear-gradient(170.573deg, rgba(243, 229, 245, 0.2) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Button20() {
  return (
    <ButtonBackgroundImage>
      <Container105 />
      <IconBackgroundImage1 />
      <TextBackgroundImageAndText2 text="Save Guide" />
    </ButtonBackgroundImage>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="Container">
      <Button19 />
      <Button20 />
    </div>
  );
}

function AgentSlider7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[749.656px] items-start left-0 pb-0 pt-[24px] px-[24px] top-0 w-[317px]" data-name="AgentSlider13">
      <Container99 />
      <Container101 />
      <Container106 />
    </div>
  );
}

function Card7() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(122,79,255,0.3)] border-solid h-[753.656px] left-[2427px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(122,79,255,0.12)] top-0 w-[321px]" data-name="Card">
      <AgentSlider7 />
    </div>
  );
}

function ImageWithFallback8() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback8} />
    </div>
  );
}

function Container107() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[358.656px] items-start left-0 overflow-clip rounded-[16px] shadow-[0px_0px_0px_2px_rgba(122,79,255,0.2),0px_10px_40px_0px_rgba(122,79,255,0.15)] top-0 w-[269px]" data-name="Container">
      <ImageWithFallback8 />
    </div>
  );
}

function Container108() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.1)] h-[358.656px] left-0 opacity-0 to-[rgba(255,255,255,0.05)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container109() {
  return <div className="absolute left-0 size-[42px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container110() {
  return (
    <div className="absolute bg-[rgba(122,79,255,0.14)] border border-[rgba(255,255,255,0.4)] border-solid left-[237px] overflow-clip rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.3)] size-[44px] top-[-12px]" data-name="Container">
      <Container109 />
      <TextBackgroundImageAndText text="∞" />
    </div>
  );
}

function Container111() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="Container">
      <Container107 />
      <Container108 />
      <Container110 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Caveat:Bold',sans-serif] font-bold leading-[32px] left-[134.91px] text-[#101828] text-[24px] text-center text-nowrap top-0 translate-x-[-50%]">Sage River</p>
    </div>
  );
}

function Container112() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="Container">
      <BadgeBackgroundImageAndText text="Spiritual Guide" additionalClassNames="left-[13.22px] w-[100.047px]" />
      <BadgeBackgroundImageAndText1 text="Universal / New Age" additionalClassNames="left-[121.27px] top-0 w-[134.516px]" />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[91px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-[134.64px] text-[#364153] text-[14px] text-center top-0 translate-x-[-50%] w-[253px]">Eclectic spiritual guide offering wisdom on universal spirituality, energy healing, meditation, and personal spiritual development.</p>
    </div>
  );
}

function Container113() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[169px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading7 />
      <Container112 />
      <Paragraph10 />
    </div>
  );
}

function Container114() {
  return <div className="absolute h-[48px] left-0 top-0 w-[269px]" data-name="Container" style={{ backgroundImage: "linear-gradient(169.883deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container115() {
  return <div className="absolute bg-gradient-to-t from-[rgba(106,63,239,0.2)] h-[48px] left-0 to-[rgba(255,255,255,0.2)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container116() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.4)] h-[14.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[269px]" data-name="Container" />;
}

function Button21() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] overflow-clip relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.25)] shrink-0 to-[#6a3fef] w-full" data-name="Button">
      <Container114 />
      <Container115 />
      <Container116 />
      <IconBackgroundImage />
      <TextBackgroundImageAndText1 text="Start Conversation" />
    </div>
  );
}

function Container117() {
  return <div className="absolute h-[44px] left-[2px] opacity-0 top-[2px] w-[265px]" data-name="Container" style={{ backgroundImage: "linear-gradient(170.573deg, rgba(243, 229, 245, 0.2) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Button22() {
  return (
    <ButtonBackgroundImage>
      <Container117 />
      <IconBackgroundImage1 />
      <TextBackgroundImageAndText2 text="Save Guide" />
    </ButtonBackgroundImage>
  );
}

function Container118() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="Container">
      <Button21 />
      <Button22 />
    </div>
  );
}

function AgentSlider8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[719.656px] items-start left-0 pb-0 pt-[24px] px-[24px] top-0 w-[317px]" data-name="AgentSlider13">
      <Container111 />
      <Container113 />
      <Container118 />
    </div>
  );
}

function Card8() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(122,79,255,0.3)] border-solid h-[723.656px] left-[2772px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(122,79,255,0.12)] top-0 w-[321px]" data-name="Card">
      <AgentSlider8 />
    </div>
  );
}

function ImageWithFallback9() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageWithFallback9} />
    </div>
  );
}

function Container119() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] content-stretch flex flex-col h-[358.656px] items-start left-0 overflow-clip rounded-[16px] shadow-[0px_0px_0px_2px_rgba(122,79,255,0.2),0px_10px_40px_0px_rgba(122,79,255,0.15)] top-0 w-[269px]" data-name="Container">
      <ImageWithFallback9 />
    </div>
  );
}

function Container120() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.1)] h-[358.656px] left-0 opacity-0 to-[rgba(255,255,255,0.05)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container121() {
  return <div className="absolute left-0 size-[42px] top-0" data-name="Container" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container122() {
  return (
    <div className="absolute bg-[rgba(122,79,255,0.14)] border border-[rgba(255,255,255,0.4)] border-solid left-[237px] overflow-clip rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.3)] size-[44px] top-[-12px]" data-name="Container">
      <Container121 />
      <TextBackgroundImageAndText text="∞" />
    </div>
  );
}

function Container123() {
  return (
    <div className="h-[358.656px] relative shrink-0 w-full" data-name="Container">
      <Container119 />
      <Container120 />
      <Container122 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Caveat:Bold',sans-serif] font-bold leading-[32px] left-[134.89px] text-[#101828] text-[24px] text-center text-nowrap top-0 translate-x-[-50%]">Eagle Feather</p>
    </div>
  );
}

function Container124() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <BadgeBackgroundImageAndText text="Spiritual Guide" additionalClassNames="left-[84.47px] w-[100.047px]" />
      <BadgeBackgroundImageAndText1 text="Indigenous / Haudenosaunee" additionalClassNames="left-[41.16px] top-[30px] w-[186.672px]" />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[91px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-[134.91px] text-[#364153] text-[14px] text-center top-0 translate-x-[-50%] w-[249px]">Haudenosaunee elder teaching Great Law of Peace, indigenous governance, consensus building, and traditional peacemaking wisdom.</p>
    </div>
  );
}

function Container125() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[199px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading8 />
      <Container124 />
      <Paragraph11 />
    </div>
  );
}

function Container126() {
  return <div className="absolute h-[48px] left-0 top-0 w-[269px]" data-name="Container" style={{ backgroundImage: "linear-gradient(169.883deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container127() {
  return <div className="absolute bg-gradient-to-t from-[rgba(106,63,239,0.2)] h-[48px] left-0 to-[rgba(255,255,255,0.2)] top-0 via-50% via-[rgba(0,0,0,0)] w-[269px]" data-name="Container" />;
}

function Container128() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.4)] h-[14.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[269px]" data-name="Container" />;
}

function Button23() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] overflow-clip relative rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.25)] shrink-0 to-[#6a3fef] w-full" data-name="Button">
      <Container126 />
      <Container127 />
      <Container128 />
      <IconBackgroundImage />
      <TextBackgroundImageAndText1 text="Start Conversation" />
    </div>
  );
}

function Container129() {
  return <div className="absolute h-[44px] left-[2px] opacity-0 top-[2px] w-[265px]" data-name="Container" style={{ backgroundImage: "linear-gradient(170.573deg, rgba(243, 229, 245, 0.2) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Button24() {
  return (
    <ButtonBackgroundImage>
      <Container129 />
      <IconBackgroundImage1 />
      <TextBackgroundImageAndText2 text="Save Guide" />
    </ButtonBackgroundImage>
  );
}

function Container130() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[104px] items-start relative shrink-0 w-full" data-name="Container">
      <Button23 />
      <Button24 />
    </div>
  );
}

function AgentSlider9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[749.656px] items-start left-0 pb-0 pt-[24px] px-[24px] top-0 w-[317px]" data-name="AgentSlider13">
      <Container123 />
      <Container125 />
      <Container130 />
    </div>
  );
}

function Card9() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(122,79,255,0.3)] border-solid h-[753.656px] left-[3117px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(122,79,255,0.12)] top-0 w-[321px]" data-name="Card">
      <AgentSlider9 />
    </div>
  );
}

function Container131() {
  return <div className="absolute h-[696.906px] left-[14px] opacity-0 top-[2px] w-[317px]" data-name="Container" style={{ backgroundImage: "linear-gradient(114.459deg, rgba(243, 229, 245, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(122, 79, 255, 0.05) 100%)" }} />;
}

function Container132() {
  return <div className="absolute h-[719.656px] left-[359px] opacity-0 top-[2px] w-[317px]" data-name="Container" style={{ backgroundImage: "linear-gradient(113.773deg, rgba(243, 229, 245, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(122, 79, 255, 0.05) 100%)" }} />;
}

function Container133() {
  return <div className="absolute h-[719.656px] left-[704px] opacity-0 top-[2px] w-[317px]" data-name="Container" style={{ backgroundImage: "linear-gradient(113.773deg, rgba(243, 229, 245, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(122, 79, 255, 0.05) 100%)" }} />;
}

function Container134() {
  return <div className="absolute h-[719.656px] left-[1049px] opacity-0 top-[2px] w-[317px]" data-name="Container" style={{ backgroundImage: "linear-gradient(113.773deg, rgba(243, 229, 245, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(122, 79, 255, 0.05) 100%)" }} />;
}

function Container135() {
  return <div className="absolute h-[719.656px] left-[1394px] opacity-0 top-[2px] w-[317px]" data-name="Container" style={{ backgroundImage: "linear-gradient(113.773deg, rgba(243, 229, 245, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(122, 79, 255, 0.05) 100%)" }} />;
}

function Container136() {
  return <div className="absolute h-[719.656px] left-[1739px] opacity-0 top-[2px] w-[317px]" data-name="Container" style={{ backgroundImage: "linear-gradient(113.773deg, rgba(243, 229, 245, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(122, 79, 255, 0.05) 100%)" }} />;
}

function Container137() {
  return <div className="absolute h-[719.656px] left-[2084px] opacity-0 top-[2px] w-[317px]" data-name="Container" style={{ backgroundImage: "linear-gradient(113.773deg, rgba(243, 229, 245, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(122, 79, 255, 0.05) 100%)" }} />;
}

function Container138() {
  return <div className="absolute h-[749.656px] left-[2429px] opacity-0 top-[2px] w-[317px]" data-name="Container" style={{ backgroundImage: "linear-gradient(112.922deg, rgba(243, 229, 245, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(122, 79, 255, 0.05) 100%)" }} />;
}

function Container139() {
  return <div className="absolute h-[719.656px] left-[2774px] opacity-0 top-[2px] w-[317px]" data-name="Container" style={{ backgroundImage: "linear-gradient(113.773deg, rgba(243, 229, 245, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(122, 79, 255, 0.05) 100%)" }} />;
}

function Container140() {
  return <div className="absolute h-[749.656px] left-[3119px] opacity-0 top-[2px] w-[317px]" data-name="Container" style={{ backgroundImage: "linear-gradient(112.922deg, rgba(243, 229, 245, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(122, 79, 255, 0.05) 100%)" }} />;
}

function Container141() {
  return (
    <div className="h-[753.656px] relative shrink-0 w-full" data-name="Container">
      <Card />
      <Card1 />
      <Card2 />
      <Card3 />
      <Card4 />
      <Card5 />
      <Card6 />
      <Card7 />
      <Card8 />
      <Card9 />
      <Container131 />
      <Container132 />
      <Container133 />
      <Container134 />
      <Container135 />
      <Container136 />
      <Container137 />
      <Container138 />
      <Container139 />
      <Container140 />
    </div>
  );
}

function Container142() {
  return (
    <div className="absolute content-stretch flex flex-col h-[753.656px] items-start left-0 overflow-clip pl-[-345px] pr-[345px] py-0 top-0 w-[345px]" data-name="Container">
      <Container141 />
    </div>
  );
}

function Button25() {
  return <div className="bg-[rgba(122,79,255,0.3)] rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Button" />;
}

function Button26() {
  return <div className="bg-[#7a4fff] h-[8px] rounded-[3.35544e+07px] shrink-0 w-[32px]" data-name="Button" />;
}

function Container143() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[8px] items-start justify-center left-0 top-[777.66px] w-[345px]" data-name="Container">
      <Button25 />
      <Button26 />
      <Button25 />
      <Button25 />
      <Button25 />
      <Button25 />
      <Button25 />
      <Button25 />
      <Button25 />
      <Button25 />
    </div>
  );
}

function Icon1() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button27() {
  return (
    <ButtonBackgroundImage1>
      <Icon1 />
    </ButtonBackgroundImage1>
  );
}

function Icon2() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button28() {
  return (
    <ButtonBackgroundImage1>
      <Icon2 />
    </ButtonBackgroundImage1>
  );
}

function Container144() {
  return (
    <div className="absolute content-stretch flex h-[48px] items-start justify-between left-0 px-[16px] py-0 top-[368.83px] w-[345px]" data-name="Container">
      <Button27 />
      <Button28 />
    </div>
  );
}

function AgentSlider10() {
  return (
    <div className="h-[785.656px] relative shrink-0 w-full" data-name="AgentSlider13">
      <Container142 />
      <Container143 />
      <Container144 />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[903.656px] items-start left-[24px] top-[530px] w-[345px]" data-name="Section">
      <Container10 />
      <AgentSlider10 />
    </div>
  );
}

function Icon3() {
  return (
    <IconBackgroundImage3 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p296ad200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M20 3V7" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M22 5H18" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M4 17V19" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M5 18H3" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage3>
  );
}

function Container145() {
  return (
    <ContainerBackgroundImage additionalClassNames="from-[#7a4fff] to-[#6a3fef]">
      <Icon3 />
    </ContainerBackgroundImage>
  );
}

function UniversalFaithPage2() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[48px] items-center left-[24px] top-[16px] w-[185.531px]" data-name="UniversalFaithPage">
      <Container145 />
      <TextBackgroundImageAndText3 text="HOW IT WORKS" />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="h-[80px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <UniversalFaithPage2 />
      <IconBackgroundImage2 />
    </div>
  );
}

function Container146() {
  return (
    <ContainerBackgroundImage1>
      <PrimitiveButton />
    </ContainerBackgroundImage1>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage3 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p1023c700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage3>
  );
}

function Container147() {
  return (
    <ContainerBackgroundImage additionalClassNames="from-[#6a3fef] to-[#7a4fff]">
      <Icon4 />
    </ContainerBackgroundImage>
  );
}

function UniversalFaithPage3() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[48px] items-center left-[24px] top-[16px] w-[173.172px]" data-name="UniversalFaithPage">
      <Container147 />
      <TextBackgroundImageAndText3 text="WHAT TO ASK" />
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="h-[80px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <UniversalFaithPage3 />
      <IconBackgroundImage2 />
    </div>
  );
}

function Container148() {
  return (
    <ContainerBackgroundImage1>
      <PrimitiveButton1 />
    </ContainerBackgroundImage1>
  );
}

function Icon5() {
  return (
    <IconBackgroundImage3 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p9b81900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage3>
  );
}

function Container149() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] relative rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 to-[#9d7fff] w-[46.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.016px] py-0 relative size-full">
        <Icon5 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <BackgroundImage2 additionalClassNames="h-[40px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#7a4fff] text-[14px] top-0 tracking-[1.4px] w-[74px]">WHAT TO EXPECT</p>
    </BackgroundImage2>
  );
}

function UniversalFaithPage4() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[48px] items-center left-[24px] top-[16px] w-[199px]" data-name="UniversalFaithPage">
      <Container149 />
      <Text1 />
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="h-[80px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <UniversalFaithPage4 />
      <IconBackgroundImage2 />
    </div>
  );
}

function Container150() {
  return (
    <div className="bg-[rgba(11,20,38,0.6)] content-stretch flex flex-col h-[80px] items-start overflow-clip relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <PrimitiveButton2 />
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[274px] items-start left-[32px] top-[138px] w-[279px]" data-name="Primitive.div">
      <Container146 />
      <Container148 />
      <Container150 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="absolute h-[32px] left-0 top-0 w-[279px]" data-name="Heading 3">
      <p className="absolute bg-clip-text font-['Raleway:Regular',sans-serif] font-normal leading-[32px] left-[139.75px] text-[24px] text-[rgba(0,0,0,0)] text-center text-nowrap top-[-1px] translate-x-[-50%]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(255, 255, 255) 0%, rgb(122, 79, 255) 50%, rgb(255, 255, 255) 100%)" }}>
        Agent Interaction Guide
      </p>
    </div>
  );
}

function Container151() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] h-[2px] left-[99.5px] rounded-[3.35544e+07px] to-[#6a3fef] top-[48px] w-[80px]" data-name="Container" />;
}

function UniversalFaithPage5() {
  return (
    <div className="absolute h-[50px] left-[32px] top-[32px] w-[279px]" data-name="UniversalFaithPage">
      <Heading9 />
      <Container151 />
    </div>
  );
}

function Card10() {
  return (
    <div className="absolute bg-[rgba(22,40,68,0.4)] border border-[rgba(30,58,95,0.4)] border-solid h-[446px] left-[24px] rounded-[14px] top-0 w-[345px]" data-name="Card">
      <PrimitiveDiv />
      <UniversalFaithPage5 />
    </div>
  );
}

function Container152() {
  return <div className="absolute h-[444px] left-[25px] opacity-80 top-px w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(127.687deg, rgba(122, 79, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Section3() {
  return (
    <div className="absolute h-[446px] left-0 top-[1513.66px] w-[393px]" data-name="Section">
      <Card10 />
      <Container152 />
    </div>
  );
}

function UniversalFaithPage6() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-start left-0 top-0 w-[345px]" data-name="UniversalFaithPage">
      <p className="basis-0 bg-clip-text font-['Raleway:Regular',sans-serif] font-normal grow leading-[36px] min-h-px min-w-px relative shrink-0 text-[30px] text-[rgba(0,0,0,0)] text-center" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(255, 255, 255) 0%, rgb(122, 79, 255) 50%, rgb(255, 255, 255) 100%)" }}>
        Explore Topics
      </p>
    </div>
  );
}

function UniversalFaithPage7() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] h-[2px] left-[132.5px] rounded-[3.35544e+07px] to-[#6a3fef] top-[52px] w-[80px]" data-name="UniversalFaithPage" />;
}

function UniversalFaithPage8() {
  return (
    <div className="absolute h-[48px] left-0 top-[78px] w-[345px]" data-name="UniversalFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24px] left-[172.66px] text-[#cad5e2] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[336px]">Discover universal wisdom that transcends all boundaries</p>
    </div>
  );
}

function Container153() {
  return (
    <div className="h-[126px] relative shrink-0 w-full" data-name="Container">
      <UniversalFaithPage6 />
      <UniversalFaithPage7 />
      <UniversalFaithPage8 />
    </div>
  );
}

function Icon6() {
  return (
    <IconBackgroundImage4>
      <path d={svgPaths.p32b1bb00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage4>
  );
}

function Container154() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7a4fff] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6a3fef] top-0" data-name="Container">
      <Icon6 />
    </div>
  );
}

function UniversalFaithPage9() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="UniversalFaithPage">
      <Container154 />
      <HeadingBackgroundImageAndText1 text="Universal Wisdom" />
    </div>
  );
}

function Card11() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <UniversalFaithPage9 />
    </div>
  );
}

function Icon7() {
  return (
    <IconBackgroundImage4>
      <path d={svgPaths.p761d900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p3c07bc00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M14 11.6667V25.6667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p2b6b0700} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p2fc9fa30} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage4>
  );
}

function Container155() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7a4fff] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6a3fef] top-0" data-name="Container">
      <Icon7 />
    </div>
  );
}

function UniversalFaithPage10() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="UniversalFaithPage">
      <Container155 />
      <HeadingBackgroundImageAndText1 text="Indigenous Traditions" />
    </div>
  );
}

function Card12() {
  return (
    <div className="[grid-area:2_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <UniversalFaithPage10 />
    </div>
  );
}

function Icon8() {
  return (
    <IconBackgroundImage4>
      <path d={svgPaths.peebe800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M23.3333 3.5V8.16667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M25.6667 5.83333H21" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M4.66667 19.8333V22.1667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M5.83333 21H3.5" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage4>
  );
}

function Container156() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7a4fff] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6a3fef] top-0" data-name="Container">
      <Icon8 />
    </div>
  );
}

function UniversalFaithPage11() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="UniversalFaithPage">
      <Container156 />
      <HeadingBackgroundImageAndText1 text="Mystical Practices" />
    </div>
  );
}

function Card13() {
  return (
    <div className="[grid-area:3_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <UniversalFaithPage11 />
    </div>
  );
}

function Icon9() {
  return (
    <IconBackgroundImage4>
      <path d={svgPaths.p1dcc0100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage4>
  );
}

function Container157() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7a4fff] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6a3fef] top-0" data-name="Container">
      <Icon9 />
    </div>
  );
}

function UniversalFaithPage12() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="UniversalFaithPage">
      <Container157 />
      <HeadingBackgroundImageAndText1 text="Spiritual Healing" />
    </div>
  );
}

function Card14() {
  return (
    <div className="[grid-area:4_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <UniversalFaithPage12 />
    </div>
  );
}

function Icon10() {
  return (
    <IconBackgroundImage4>
      <path d={svgPaths.p3a298fb0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage4>
  );
}

function Container158() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7a4fff] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6a3fef] top-0" data-name="Container">
      <Icon10 />
    </div>
  );
}

function UniversalFaithPage13() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="UniversalFaithPage">
      <Container158 />
      <HeadingBackgroundImageAndText1 text="Sacred Traditions" />
    </div>
  );
}

function Card15() {
  return (
    <div className="[grid-area:5_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <UniversalFaithPage13 />
    </div>
  );
}

function Icon11() {
  return (
    <IconBackgroundImage4>
      <path d={svgPaths.pff627f0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage4>
  );
}

function Container159() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7a4fff] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6a3fef] top-0" data-name="Container">
      <Icon11 />
    </div>
  );
}

function UniversalFaithPage14() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="UniversalFaithPage">
      <Container159 />
      <HeadingBackgroundImageAndText1 text="Ancient Wisdom" />
    </div>
  );
}

function Card16() {
  return (
    <div className="[grid-area:6_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <UniversalFaithPage14 />
    </div>
  );
}

function Icon12() {
  return (
    <IconBackgroundImage4>
      <path d={svgPaths.p184ba090} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.pcd80870} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p36197298} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p5d36b00} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage4>
  );
}

function Container160() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7a4fff] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6a3fef] top-0" data-name="Container">
      <Icon12 />
    </div>
  );
}

function UniversalFaithPage15() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="UniversalFaithPage">
      <Container160 />
      <HeadingBackgroundImageAndText1 text="Cultural Spirituality" />
    </div>
  );
}

function Card17() {
  return (
    <div className="[grid-area:7_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <UniversalFaithPage15 />
    </div>
  );
}

function Icon13() {
  return (
    <IconBackgroundImage4>
      <path d={svgPaths.p1a3063b0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage4>
  );
}

function Container161() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#7a4fff] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6a3fef] top-0" data-name="Container">
      <Icon13 />
    </div>
  );
}

function UniversalFaithPage16() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="UniversalFaithPage">
      <Container161 />
      <HeadingBackgroundImageAndText1 text="Divine Feminine" />
    </div>
  );
}

function Card18() {
  return (
    <div className="[grid-area:8_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <UniversalFaithPage16 />
    </div>
  );
}

function Container162() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[repeat(8,_minmax(0px,_1fr))] h-[1408px] relative shrink-0 w-full" data-name="Container">
      <Card11 />
      <Card12 />
      <Card13 />
      <Card14 />
      <Card15 />
      <Card16 />
      <Card17 />
      <Card18 />
    </div>
  );
}

function Container163() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[1582px] items-start left-[24px] top-0 w-[345px]" data-name="Container">
      <Container153 />
      <Container162 />
    </div>
  );
}

function Container164() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[175px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(122, 79, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container165() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[353px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(122, 79, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container166() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[531px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(122, 79, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container167() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[709px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(122, 79, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container168() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[887px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(122, 79, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container169() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[1065px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(122, 79, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container170() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[1243px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(122, 79, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container171() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[1421px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(122, 79, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Section4() {
  return (
    <div className="absolute h-[1582px] left-0 top-[2007.66px] w-[393px]" data-name="Section">
      <Container163 />
      <Container164 />
      <Container165 />
      <Container166 />
      <Container167 />
      <Container168 />
      <Container169 />
      <Container170 />
      <Container171 />
    </div>
  );
}

function Icon14() {
  return (
    <IconBackgroundImage3 additionalClassNames="absolute left-0 top-[4.5px]">
      <path d={svgPaths.p9b81900} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage3>
  );
}

function Heading10() {
  return (
    <BackgroundImage3 additionalClassNames="h-[33px] w-[255.906px]">
      <Icon14 />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[33px] left-[36px] text-[#101828] text-[22px] text-nowrap top-0">Your Spiritual Journey</p>
    </BackgroundImage3>
  );
}

function Badge() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[36px] relative rounded-[8px] shrink-0 w-[76.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[18px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#7a4fff] text-[12px] text-nowrap">Level 4</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container172() {
  return (
    <div className="content-stretch flex flex-col h-[85px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading10 />
      <Badge />
    </div>
  );
}

function Icon15() {
  return (
    <BackgroundImage1 additionalClassNames="absolute left-[64.25px] top-[18px]">
      <path d={svgPaths.p383b2000} id="Vector" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage1>
  );
}

function UniversalFaithPage17() {
  return (
    <div className="absolute h-[28px] left-[18px] top-[46px] w-[112.5px]" data-name="UniversalFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[56.31px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">47</p>
    </div>
  );
}

function UniversalFaithPage18() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[78px] w-[112.5px]" data-name="UniversalFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[19.5px] left-[56.7px] text-[#4a5565] text-[13px] text-center text-nowrap top-0 translate-x-[-50%]">Conversations</p>
    </div>
  );
}

function Container173() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(255,255,255,0.5)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon15 />
      <UniversalFaithPage17 />
      <UniversalFaithPage18 />
    </div>
  );
}

function Icon16() {
  return (
    <BackgroundImage1 additionalClassNames="absolute left-[64.25px] top-[18px]">
      <path d={svgPaths.p3376b800} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage1>
  );
}

function UniversalFaithPage19() {
  return (
    <div className="absolute h-[28px] left-[18px] top-[46px] w-[112.5px]" data-name="UniversalFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[56.36px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">9</p>
    </div>
  );
}

function UniversalFaithPage20() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[78px] w-[112.5px]" data-name="UniversalFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[19.5px] left-[56.36px] text-[#4a5565] text-[13px] text-center text-nowrap top-0 translate-x-[-50%]">Badges</p>
    </div>
  );
}

function Container174() {
  return (
    <div className="[grid-area:1_/_2] bg-[rgba(255,255,255,0.5)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon16 />
      <UniversalFaithPage19 />
      <UniversalFaithPage20 />
    </div>
  );
}

function Icon17() {
  return (
    <BackgroundImage1 additionalClassNames="absolute left-[64.25px] top-[18px]">
      <path d={svgPaths.p17f2dd80} id="Vector" stroke="var(--stroke-0, #6A3FEF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p232c4380} id="Vector_2" stroke="var(--stroke-0, #6A3FEF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M10 8.33333V18.3333" id="Vector_3" stroke="var(--stroke-0, #6A3FEF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p112f4f80} id="Vector_4" stroke="var(--stroke-0, #6A3FEF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p86dd400} id="Vector_5" stroke="var(--stroke-0, #6A3FEF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage1>
  );
}

function UniversalFaithPage21() {
  return (
    <div className="absolute h-[28px] left-[18px] top-[46px] w-[112.5px]" data-name="UniversalFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[56.55px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">712</p>
    </div>
  );
}

function UniversalFaithPage22() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[78px] w-[112.5px]" data-name="UniversalFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[19.5px] left-[56.52px] text-[#4a5565] text-[13px] text-center text-nowrap top-0 translate-x-[-50%]">Wisdom Points</p>
    </div>
  );
}

function Container175() {
  return (
    <div className="[grid-area:2_/_1] bg-[rgba(255,255,255,0.5)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon17 />
      <UniversalFaithPage21 />
      <UniversalFaithPage22 />
    </div>
  );
}

function Icon18() {
  return (
    <BackgroundImage1 additionalClassNames="absolute left-[64.25px] top-[18px]">
      <path d={svgPaths.p2f84f400} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage1>
  );
}

function UniversalFaithPage23() {
  return (
    <div className="absolute h-[28px] left-[18px] top-[46px] w-[112.5px]" data-name="UniversalFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[56.39px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">7</p>
    </div>
  );
}

function UniversalFaithPage24() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[78px] w-[112.5px]" data-name="UniversalFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[19.5px] left-[56.63px] text-[#4a5565] text-[13px] text-center text-nowrap top-0 translate-x-[-50%]">Day Streak</p>
    </div>
  );
}

function Container176() {
  return (
    <div className="[grid-area:2_/_2] bg-[rgba(255,255,255,0.5)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon18 />
      <UniversalFaithPage23 />
      <UniversalFaithPage24 />
    </div>
  );
}

function Container177() {
  return (
    <div className="gap-[12px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[243px] relative shrink-0 w-full" data-name="Container">
      <Container173 />
      <Container174 />
      <Container175 />
      <Container176 />
    </div>
  );
}

function Icon19() {
  return (
    <BackgroundImage1 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p3376b800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage1>
  );
}

function Container178() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] relative rounded-[3.35544e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 size-[40px] to-[#ffd369]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon19 />
      </div>
    </div>
  );
}

function Text2() {
  return (
    <BackgroundImage3 additionalClassNames="h-[22.5px] w-[139.625px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.5px] left-0 text-[#7a4fff] text-[15px] text-nowrap top-[-1px]">Latest Achievement</p>
    </BackgroundImage3>
  );
}

function UniversalFaithPage25() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="UniversalFaithPage">
      <Container178 />
      <Text2 />
    </div>
  );
}

function UniversalFaithPage26() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="UniversalFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-0 text-[#101828] text-[20px] text-nowrap top-0">Daoism Explorer</p>
    </div>
  );
}

function UniversalFaithPage27() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="UniversalFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1px]">Explored the wisdom of Daoism</p>
    </div>
  );
}

function Container179() {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] h-[162px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-[2px] pt-[22px] px-[22px] relative size-full">
          <UniversalFaithPage25 />
          <UniversalFaithPage26 />
          <UniversalFaithPage27 />
        </div>
      </div>
    </div>
  );
}

function Container180() {
  return <div className="absolute h-[44px] left-0 top-0 w-[305px]" data-name="Container" style={{ backgroundImage: "linear-gradient(171.791deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container181() {
  return <div className="absolute bg-gradient-to-t from-[rgba(106,63,239,0.1)] h-[44px] left-0 to-[rgba(255,255,255,0.3)] top-0 via-50% via-[rgba(0,0,0,0)] w-[305px]" data-name="Container" />;
}

function Container182() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.6)] h-[20px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[305px]" data-name="Container" />;
}

function Container183() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[44px] left-0 rounded-[16px] top-0 w-[305px]" data-name="Container">
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.4)]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[21px] left-[111px] top-[11.5px] w-[82.984px]" data-name="Text">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[21px] left-[41px] text-[14px] text-center text-nowrap text-white top-0 tracking-[0.35px] translate-x-[-50%]">View Profile</p>
    </div>
  );
}

function UniversalFaithPage28() {
  return (
    <div className="absolute bg-gradient-to-b border-2 border-[rgba(122,79,255,0.3)] border-solid from-[#7a4fff] h-[48px] left-0 overflow-clip rounded-[16px] shadow-[0px_4px_20px_0px_rgba(122,79,255,0.25)] to-[#b794ff] top-0 via-50% via-[#9d7fff] w-[309px]" data-name="UniversalFaithPage">
      <Container180 />
      <Container181 />
      <Container182 />
      <Container183 />
      <Text3 />
    </div>
  );
}

function Container184() {
  return <div className="absolute h-[44px] left-0 opacity-0 top-0 w-[305px]" data-name="Container" style={{ backgroundImage: "linear-gradient(171.791deg, rgba(157, 127, 255, 0.15) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container185() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.5)] h-[15.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[305px]" data-name="Container" />;
}

function Container186() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[44px] left-0 rounded-[16px] top-0 w-[305px]" data-name="Container">
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.6)]" />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[21px] left-[103.48px] top-[11.5px] w-[98.031px]" data-name="Text">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[21px] left-[49px] text-[#7a4fff] text-[14px] text-center text-nowrap top-0 tracking-[0.35px] translate-x-[-50%]">Explore Faiths</p>
    </div>
  );
}

function UniversalFaithPage29() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] border-2 border-[rgba(122,79,255,0.3)] border-solid h-[48px] left-0 overflow-clip rounded-[16px] shadow-[0px_4px_15px_0px_rgba(122,79,255,0.15)] top-[60px] w-[309px]" data-name="UniversalFaithPage">
      <Container184 />
      <Container185 />
      <Container186 />
      <Text4 />
    </div>
  );
}

function Container187() {
  return (
    <div className="h-[108px] relative shrink-0 w-full" data-name="Container">
      <UniversalFaithPage28 />
      <UniversalFaithPage29 />
    </div>
  );
}

function UniversalFaithPage30() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[694px] items-start left-[24px] top-[24px] w-[309px]" data-name="UniversalFaithPage">
      <Container172 />
      <Container177 />
      <Container179 />
      <Container187 />
    </div>
  );
}

function Card19() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(255,255,255,0.4)] border-solid h-[746px] left-[16px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(255,255,255,0.3)] top-0 w-[361px]" data-name="Card">
      <UniversalFaithPage30 />
    </div>
  );
}

function Container188() {
  return <div className="absolute h-[742px] left-[18px] opacity-80 top-[2px] w-[357px]" data-name="Container" style={{ backgroundImage: "linear-gradient(115.694deg, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.1) 100%)" }} />;
}

function Section5() {
  return (
    <div className="absolute h-[746px] left-0 top-[3669.66px] w-[393px]" data-name="Section">
      <Card19 />
      <Container188 />
    </div>
  );
}

function Container189() {
  return (
    <div className="absolute h-[4415.656px] left-0 top-0 w-[393px]" data-name="Container">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </div>
  );
}

function UniversalFaithPage31() {
  return (
    <div className="bg-white h-[4619.656px] overflow-clip relative shrink-0 w-full" data-name="UniversalFaithPage">
      <AppFooter />
      <Container1 />
      <Container189 />
    </div>
  );
}

function AppContent() {
  return (
    <div className="absolute bg-[#121212] content-stretch flex flex-col h-[4692.656px] items-start left-0 pb-0 pt-[73px] px-0 top-0 w-[393px]" data-name="AppContent">
      <UniversalFaithPage31 />
    </div>
  );
}

function ImageBackground() {
  return (
    <div className="absolute h-[922px] left-0 opacity-0 top-0 w-[393px]" data-name="Image (Background)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageBackground} />
    </div>
  );
}

function Source() {
  return <div className="h-0 shrink-0 w-full" data-name="Source" />;
}

function Video() {
  return (
    <div className="absolute content-stretch flex flex-col h-[922px] items-start left-0 overflow-clip pl-0 pr-[393px] py-0 top-0 w-[393px]" data-name="Video">
      <Source />
    </div>
  );
}

function BackgroundVideo() {
  return (
    <div className="absolute h-[922px] left-0 top-0 w-[393px]" data-name="BackgroundVideo">
      <ImageBackground />
      <Video />
    </div>
  );
}

function ImageDivinityAgi() {
  return (
    <div className="h-[44px] relative shrink-0 w-[83.375px]" data-name="Image (DivinityAGI)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageDivinityAgi} />
    </div>
  );
}

function Icon20() {
  return (
    <IconBackgroundImage5 additionalClassNames="absolute left-[16px] top-[18px]">
      <path d="M5 1H7" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 7L7.5 5.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p5139500} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage5>
  );
}

function Badge1() {
  return (
    <div className="bg-gradient-to-b from-[#6b5dd3] h-[48px] relative rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] shrink-0 to-[#ffb84d] w-[109.969px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Icon20 />
        <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[40px] text-[14px] text-white top-[14px] w-[54px]">250 MIN</p>
      </div>
    </div>
  );
}

function Container190() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <ImageDivinityAgi />
      <Badge1 />
    </div>
  );
}

function AppHeader() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[73px] items-start left-0 pb-px pt-[12px] px-[16px] top-0 w-[393px]" data-name="AppHeader">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(107,93,211,0.1)] border-solid inset-0 pointer-events-none shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)]" />
      <Container190 />
    </div>
  );
}

function Icon21() {
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
      <Icon21 />
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

function Button29() {
  return (
    <div className="absolute h-[56px] left-[7.41px] rounded-[16px] top-[14px] w-[55.047px]" data-name="Button">
      <BottomNavigation />
      <BottomNavigation1 />
    </div>
  );
}

function Container191() {
  return <div className="absolute bg-gradient-to-b border border-[rgba(107,93,211,0.2)] border-solid from-[#e8e5ff] h-[56px] left-0 rounded-[16px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] to-[#fff8e8] top-0 w-[48.953px]" data-name="Container" />;
}

function Container192() {
  return <div className="absolute bg-gradient-to-b from-[#6b5dd3] left-[21.47px] rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] size-[6px] to-[#ffb84d] top-[-4px]" data-name="Container" />;
}

function Icon22() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3333 18.3333">
            <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BottomNavigation2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.47px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon22 />
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

function Button30() {
  return (
    <div className="absolute h-[60px] left-[69.28px] rounded-[16px] top-[12px] w-[48.953px]" data-name="Button">
      <Container191 />
      <Container192 />
      <BottomNavigation2 />
      <BottomNavigation3 />
    </div>
  );
}

function Icon23() {
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
      <Icon23 />
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

function Button31() {
  return (
    <div className="absolute h-[56px] left-[125.06px] rounded-[16px] top-[14px] w-[80.703px]" data-name="Button">
      <BottomNavigation4 />
      <BottomNavigation5 />
    </div>
  );
}

function Icon24() {
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
      <Icon47VectorBackgroundImage additionalClassNames="left-1/2 right-[20.83%]">
        <path d={svgPaths.p18da42f0} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon47VectorBackgroundImage>
      <Icon47VectorBackgroundImage additionalClassNames="left-[20.83%] right-1/2">
        <path d={svgPaths.p115f4d00} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon47VectorBackgroundImage>
    </div>
  );
}

function BottomNavigation6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13.09px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon24 />
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

function Button32() {
  return (
    <div className="absolute h-[56px] left-[212.59px] rounded-[16px] top-[14px] w-[46.188px]" data-name="Button">
      <BottomNavigation6 />
      <BottomNavigation7 />
    </div>
  );
}

function Icon25() {
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
      <Icon25 />
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

function Button33() {
  return (
    <div className="absolute h-[56px] left-[265.61px] rounded-[16px] top-[14px] w-[61.531px]" data-name="Button">
      <BottomNavigation8 />
      <BottomNavigation9 />
    </div>
  );
}

function Icon26() {
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
      <Icon26 />
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

function Button34() {
  return (
    <div className="absolute h-[56px] left-[333.97px] rounded-[16px] top-[14px] w-[51.594px]" data-name="Button">
      <BottomNavigation10 />
      <BottomNavigation11 />
    </div>
  );
}

function Container193() {
  return (
    <div className="absolute h-[84px] left-0 top-0 w-[393px]" data-name="Container">
      <Button29 />
      <Button30 />
      <Button31 />
      <Button32 />
      <Button33 />
      <Button34 />
    </div>
  );
}

function Container194() {
  return <div className="absolute bg-gradient-to-t from-[rgba(107,93,211,0.05)] h-[84px] left-0 to-[rgba(0,0,0,0)] top-0 w-[393px]" data-name="Container" />;
}

function Icon27() {
  return (
    <IconBackgroundImage5 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p2e69df00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage5>
  );
}

function Text5() {
  return (
    <BackgroundImage2 additionalClassNames="h-[16px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[33px] text-[#90a1b9] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Need Help?</p>
    </BackgroundImage2>
  );
}

function CrisisSupportButton() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center left-[303.33px] top-[4px] w-[81.672px]" data-name="CrisisSupportButton">
      <Icon27 />
      <Text5 />
    </div>
  );
}

function BottomNavigation12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-[1px_0px_0px] border-[rgba(107,93,211,0.1)] border-solid h-[85px] left-0 shadow-[0px_16px_48px_0px_rgba(107,93,211,0.2)] top-[837px] w-[393px]" data-name="BottomNavigation">
      <Container193 />
      <Container194 />
      <CrisisSupportButton />
    </div>
  );
}

export default function DivinityAgiSpiritGuideAppVersion127Copy() {
  return (
    <div className="bg-[#121212] relative size-full" data-name="DivinityAGI Spirit Guide App Version 12-7 (Copy)">
      <AppContent />
      <BackgroundVideo />
      <AppHeader />
      <BottomNavigation12 />
    </div>
  );
}