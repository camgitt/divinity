import svgPaths from "./svg-hfbbypbiok";
import clsx from "clsx";
import imgImageOm from "figma:asset/fc363bf8713e2e810f69904b94bbd531b064ce0f.png";
import imgImageDivinityAgi from "figma:asset/8a5c5551533b1297b98345f7179a0a7cc8223ad5.png";

function ContainerBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(11,20,38,0.6)] h-[77px] relative rounded-[16px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-0 px-0 relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}
type BackgroundImage8Props = {
  additionalClassNames?: string;
};

function BackgroundImage8({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage8Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage7Props = {
  additionalClassNames?: string;
};

function BackgroundImage7({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage7Props>) {
  return <BackgroundImage8 additionalClassNames={clsx("bg-gradient-to-b from-[#f4511e] relative rounded-[3.35544e+07px] shrink-0", additionalClassNames)}>{children}</BackgroundImage8>;
}
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return <BackgroundImage8 additionalClassNames={clsx("bg-gradient-to-b relative rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 size-[44px]", additionalClassNames)}>{children}</BackgroundImage8>;
}

function ButtonBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(255,255,255,0.9)] relative rounded-[3.35544e+07px] shrink-0 size-[48px]">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(244,81,30,0.3)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(244,81,30,0.2)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage6Props = {
  additionalClassNames?: string;
};

function BackgroundImage6({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage6Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage5Props = {
  additionalClassNames?: string;
};

function BackgroundImage5({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage5Props>) {
  return <BackgroundImage6 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</BackgroundImage6>;
}
type BackgroundImage4Props = {
  additionalClassNames?: string;
};

function BackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage4Props>) {
  return <BackgroundImage6 additionalClassNames={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>{children}</BackgroundImage6>;
}

function BackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute h-[23.375px] left-0 top-[68px] w-[303px]">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[23.375px] left-0 text-[17px] text-nowrap text-white top-[-1px]">{children}</p>
    </div>
  );
}
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={clsx("size-[20px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}
type Icon31VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function Icon31VectorBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon31VectorBackgroundImageProps>) {
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
type IconBackgroundImage4Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage4({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage4Props>) {
  return (
    <div className={clsx("size-[12px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
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
    <BackgroundImage2 additionalClassNames={additionalClassNames}>
      <g id="Icon">{children}</g>
    </BackgroundImage2>
  );
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={clsx("size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
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
    <div className={clsx("size-[24px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
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
type TextBackgroundImageAndText2Props = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText2({ text, additionalClassNames = "" }: TextBackgroundImageAndText2Props) {
  return (
    <div className={clsx("absolute h-[20px] left-[12.92px] top-0", additionalClassNames)}>
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#364153] text-[14px] text-nowrap top-0">{text}</p>
    </div>
  );
}
type TextBackgroundImageAndText1Props = {
  text: string;
};

function TextBackgroundImageAndText1({ text }: TextBackgroundImageAndText1Props) {
  return (
    <div className="absolute h-[20px] left-0 top-[2px] w-[4.922px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#f4511e] text-[14px] text-nowrap top-0">{text}</p>
    </div>
  );
}
type ContainerBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function ContainerBackgroundImageAndText({ text, additionalClassNames = "" }: ContainerBackgroundImageAndTextProps) {
  return (
    <div className={clsx("absolute h-[24px] left-[16px] top-[44px]", additionalClassNames)}>
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[24px] left-[29.58px] text-[#101828] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">{text}</p>
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return <BackgroundImage3>{text}</BackgroundImage3>;
}

function IconBackgroundImage2() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p296ad200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M20 3V7" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M22 5H18" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M4 17V19" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M5 18H3" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage>
  );
}

function IconBackgroundImage1() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p2460274} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage1 additionalClassNames="absolute left-[259px] top-[18px]">
      <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage1>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
};

function TextBackgroundImageAndText({ text }: TextBackgroundImageAndTextProps) {
  return (
    <BackgroundImage4 additionalClassNames="h-[18.563px]">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[18.571px] left-0 text-[#f4511e] text-[13px] text-nowrap top-[-1px] tracking-[0.65px]">{text}</p>
    </BackgroundImage4>
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
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[52px] items-start left-[16px] top-[5188.63px] w-[361px]" data-name="AppFooter">
      <Container />
      <Paragraph />
    </div>
  );
}

function Container1() {
  return <div className="absolute h-[5344.625px] left-0 top-0 w-[393px]" data-name="Container" />;
}

function Container2() {
  return <div className="absolute h-[300px] left-0 rounded-[16px] shadow-[0px_8px_32px_0px_rgba(122,79,255,0.12)] top-0 w-[345px]" data-name="Container" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.14) 0%, rgba(0, 0, 0, 0.14) 100%)" }} />;
}

function Heading() {
  return (
    <div className="absolute content-stretch flex h-[80px] items-start left-[16px] shadow-[0px_2px_16px_0px_rgba(244,81,30,0.3)] top-0 w-[313px]" data-name="Heading 1">
      <p className="basis-0 bg-clip-text font-['Caveat:Bold',sans-serif] font-bold grow leading-[80px] min-h-px min-w-px relative shrink-0 text-[64px] text-[rgba(0,0,0,0)] text-center" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(244, 81, 30) 0%, rgb(255, 111, 60) 50%, rgb(255, 138, 101) 100%)" }}>
        Hinduism
      </p>
    </div>
  );
}

function Container3() {
  return <div className="absolute bg-gradient-to-b from-[#f4511e] h-[2px] left-[132.5px] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(244,81,30,0.4)] to-[#ff6f3c] top-[96px] w-[80px]" data-name="Container" />;
}

function Paragraph1() {
  return (
    <div className="absolute h-[48.75px] left-[16px] shadow-[0px_2px_8px_0px_rgba(255,255,255,0.8)] top-[114px] w-[313px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[24.375px] left-[156.84px] text-[#1a1a1a] text-[15px] text-center top-0 translate-x-[-50%] w-[236px]">Explore the diverse traditions and wisdom of Hinduism.</p>
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
  return <div className="absolute h-[44px] left-0 opacity-0 top-0 w-[90.781px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.141deg, rgba(255, 229, 219, 0.15) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Icon() {
  return (
    <BackgroundImage1 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #D84315)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #D84315)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage1>
  );
}

function Text() {
  return (
    <BackgroundImage4 additionalClassNames="h-[22.5px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.5px] left-[17.5px] text-[#d84315] text-[15px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Back</p>
    </BackgroundImage4>
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
    <div className="absolute bg-[rgba(255,255,255,0.4)] border-2 border-[rgba(244,81,30,0.3)] border-solid h-[48px] left-[24px] overflow-clip rounded-[16px] shadow-[0px_4px_15px_0px_rgba(244,81,30,0.15)] top-[24px] w-[94.781px]" data-name="Button">
      <Container6 />
      <Container7 />
    </div>
  );
}

function Section() {
  return (
    <div className="absolute h-[392px] left-0 overflow-clip top-0 w-[393px]" data-name="Section">
      <Container5 />
      <Button4 />
    </div>
  );
}

function Container8() {
  return <div className="absolute bg-[rgba(244,81,30,0.15)] blur-3xl filter left-[16px] rounded-[3.35544e+07px] size-[96px] top-[16px]" data-name="Container" />;
}

function ImageOm() {
  return (
    <div className="absolute blur-[0.5px] filter left-0 opacity-25 shadow-[0px_0px_40px_0px_rgba(244,81,30,0.2)] size-[128px] top-0" data-name="Image (Om)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageOm} />
    </div>
  );
}

function Container9() {
  return <div className="absolute border-2 border-[rgba(244,81,30,0.2)] border-solid left-[-0.01px] opacity-[0.15] rounded-[3.35544e+07px] size-[128.03px] top-[-0.01px]" data-name="Container" />;
}

function Container10() {
  return (
    <div className="absolute left-0 size-[128px] top-0" data-name="Container">
      <ImageOm />
      <Container9 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute left-[108.5px] size-[128px] top-[-32px]" data-name="Container">
      <Container8 />
      <Container10 />
    </div>
  );
}

function HinduismFaithPage() {
  return (
    <div className="absolute h-[51px] left-0 shadow-[0px_2px_12px_0px_rgba(244,81,30,0.3)] top-0 w-[345px]" data-name="HinduismFaithPage">
      <BackgroundImageAndText text="Meet Your Spirit Guides" additionalClassNames="left-[172.59px] top-[16px]" />
    </div>
  );
}

function HinduismFaithPage1() {
  return <div className="absolute bg-gradient-to-b from-[#f4511e] h-[2px] left-[140.5px] rounded-[3.35544e+07px] shadow-[0px_0px_12px_0px_rgba(244,81,30,0.5)] to-[#ff6f3c] top-[67px] w-[64px]" data-name="HinduismFaithPage" />;
}

function Container12() {
  return (
    <div className="absolute h-[69px] left-0 top-0 w-[345px]" data-name="Container">
      <HinduismFaithPage />
      <HinduismFaithPage1 />
    </div>
  );
}

function Container13() {
  return <div className="absolute h-[798.625px] left-0 top-0 w-[345px]" data-name="Container" />;
}

function Button5() {
  return <div className="bg-[#f4511e] h-[8px] rounded-[3.35544e+07px] shrink-0 w-[32px]" data-name="Button" />;
}

function Button6() {
  return <div className="bg-[rgba(244,81,30,0.25)] rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Button" />;
}

function Container14() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[8px] items-start justify-center left-0 top-[822.63px] w-[345px]" data-name="Container">
      <Button5 />
      {[...Array(6).keys()].map((_, i) => (
        <Button6 key={i} />
      ))}
    </div>
  );
}

function Icon1() {
  return (
    <BackgroundImage1 additionalClassNames="relative shrink-0">
      <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #D84315)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage1>
  );
}

function Button7() {
  return (
    <ButtonBackgroundImage>
      <Icon1 />
    </ButtonBackgroundImage>
  );
}

function Icon2() {
  return (
    <BackgroundImage1 additionalClassNames="relative shrink-0">
      <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #D84315)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage1>
  );
}

function Button8() {
  return (
    <ButtonBackgroundImage>
      <Icon2 />
    </ButtonBackgroundImage>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex h-[48px] items-start justify-between left-0 px-[16px] py-0 top-[391.31px] w-[345px]" data-name="Container">
      <Button7 />
      <Button8 />
    </div>
  );
}

function AgentSlider() {
  return (
    <div className="absolute h-[830.625px] left-0 top-[117px] w-[345px]" data-name="AgentSlider">
      <Container13 />
      <Container14 />
      <Container15 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute h-[947.625px] left-[24px] top-[392px] w-[345px]" data-name="Section">
      <Container11 />
      <Container12 />
      <AgentSlider />
    </div>
  );
}

function Icon3() {
  return (
    <BackgroundImage2 additionalClassNames="relative shrink-0">
      <g clipPath="url(#clip0_6322_1359)" id="Icon">
        <path d={svgPaths.p1902bdf0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M16.6667 2.5V5.83333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M18.3333 4.16667H15" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M3.33333 14.1667V15.8333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d="M4.16667 15H2.5" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_6322_1359">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </BackgroundImage2>
  );
}

function Container16() {
  return (
    <ContainerBackgroundImage additionalClassNames="from-[#f4511e] to-[#d84315]">
      <Icon3 />
    </ContainerBackgroundImage>
  );
}

function HinduismFaithPage2() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[44px] items-center left-[20px] top-[16px] w-[161.422px]" data-name="HinduismFaithPage">
      <Container16 />
      <TextBackgroundImageAndText text="HOW IT WORKS" />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="h-[76px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <HinduismFaithPage2 />
      <IconBackgroundImage />
    </div>
  );
}

function Container17() {
  return (
    <ContainerBackgroundImage1>
      <PrimitiveButton />
    </ContainerBackgroundImage1>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage3 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p26705e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Container18() {
  return (
    <ContainerBackgroundImage additionalClassNames="from-[#d84315] to-[#bf360c]">
      <Icon4 />
    </ContainerBackgroundImage>
  );
}

function HinduismFaithPage3() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[44px] items-center left-[20px] top-[16px] w-[150.359px]" data-name="HinduismFaithPage">
      <Container18 />
      <TextBackgroundImageAndText text="WHAT TO ASK" />
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="h-[76px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <HinduismFaithPage3 />
      <IconBackgroundImage />
    </div>
  );
}

function Container19() {
  return (
    <ContainerBackgroundImage1>
      <PrimitiveButton1 />
    </ContainerBackgroundImage1>
  );
}

function Icon5() {
  return (
    <IconBackgroundImage3 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p5cb4500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Container20() {
  return (
    <ContainerBackgroundImage additionalClassNames="from-[#bf360c] to-[#f4511e]">
      <Icon5 />
    </ContainerBackgroundImage>
  );
}

function HinduismFaithPage4() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[44px] items-center left-[20px] top-[16px] w-[176.375px]" data-name="HinduismFaithPage">
      <Container20 />
      <TextBackgroundImageAndText text="WHAT TO EXPECT" />
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="h-[76px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <HinduismFaithPage4 />
      <IconBackgroundImage />
    </div>
  );
}

function Container21() {
  return (
    <div className="bg-[rgba(11,20,38,0.6)] content-stretch flex flex-col h-[76px] items-start overflow-clip relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <PrimitiveButton2 />
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[262px] items-start left-[24px] top-[128px] w-[295px]" data-name="Primitive.div">
      <Container17 />
      <Container19 />
      <Container21 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="absolute content-stretch flex h-[30px] items-start left-0 shadow-[0px_2px_8px_0px_rgba(244,81,30,0.25)] top-0 w-[295px]" data-name="Heading 3">
      <p className="basis-0 bg-clip-text font-['Raleway:Regular',sans-serif] font-normal grow leading-[30px] min-h-px min-w-px relative shrink-0 text-[24px] text-[rgba(0,0,0,0)] text-center" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(255, 255, 255) 0%, rgb(244, 81, 30) 50%, rgb(255, 255, 255) 100%)" }}>
        Agent Interaction Guide
      </p>
    </div>
  );
}

function Container22() {
  return <div className="absolute bg-gradient-to-b from-[#f4511e] h-[2px] left-[115.5px] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(244,81,30,0.4)] to-[#ff6f3c] top-[46px] w-[64px]" data-name="Container" />;
}

function HinduismFaithPage5() {
  return (
    <div className="absolute h-[48px] left-[24px] top-[24px] w-[295px]" data-name="HinduismFaithPage">
      <Heading1 />
      <Container22 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-[rgba(22,40,68,0.4)] border border-[rgba(30,58,95,0.4)] border-solid h-[416px] left-[24px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(244,81,30,0.15)] top-0 w-[345px]" data-name="Card">
      <PrimitiveDiv />
      <HinduismFaithPage5 />
    </div>
  );
}

function Container23() {
  return <div className="absolute h-[414px] left-[25px] opacity-80 top-px w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(129.642deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Section2() {
  return (
    <div className="absolute h-[416px] left-0 top-[1419.63px] w-[393px]" data-name="Section">
      <Card />
      <Container23 />
    </div>
  );
}

function HinduismFaithPage6() {
  return (
    <div className="absolute h-[35px] left-0 shadow-[0px_2px_12px_0px_rgba(244,81,30,0.3)] top-0 w-[345px]" data-name="HinduismFaithPage">
      <BackgroundImageAndText text="Explore Topics" additionalClassNames="left-[172.63px] top-0" />
    </div>
  );
}

function HinduismFaithPage7() {
  return <div className="absolute bg-gradient-to-b from-[#f4511e] h-[2px] left-[140.5px] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(244,81,30,0.4)] to-[#ff6f3c] top-[51px] w-[64px]" data-name="HinduismFaithPage" />;
}

function HinduismFaithPage8() {
  return (
    <div className="absolute h-[48.75px] left-0 top-[77px] w-[345px]" data-name="HinduismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24.375px] left-[172.86px] text-[15px] text-black text-center top-0 translate-x-[-50%] w-[294px]">Discover the rich wisdom and practices of Hinduism through engaging conversations</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="h-[125.75px] relative shrink-0 w-full" data-name="Container">
      <HinduismFaithPage6 />
      <HinduismFaithPage7 />
      <HinduismFaithPage8 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <IconBackgroundImage1 />
    </div>
  );
}

function Heading3() {
  return <BackgroundImage3>{`Karma & Dharma`}</BackgroundImage3>;
}

function HinduismFaithPage9() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[303px]" data-name="HinduismFaithPage">
      <Container25 />
      <Heading3 />
    </div>
  );
}

function Card1() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage9 />
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <IconBackgroundImage2 />
    </div>
  );
}

function Heading4() {
  return <BackgroundImage3>{`Meditation & Yoga`}</BackgroundImage3>;
}

function HinduismFaithPage10() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[303px]" data-name="HinduismFaithPage">
      <Container26 />
      <Heading4 />
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:2_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage10 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <IconBackgroundImage1 />
    </div>
  );
}

function HinduismFaithPage11() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[303px]" data-name="HinduismFaithPage">
      <Container27 />
      <HeadingBackgroundImageAndText text="Sacred Texts" />
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:3_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage11 />
    </div>
  );
}

function Icon6() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p1dff4600} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage>
  );
}

function Container28() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <Icon6 />
    </div>
  );
}

function HinduismFaithPage12() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[303px]" data-name="HinduismFaithPage">
      <Container28 />
      <HeadingBackgroundImageAndText text="Devotional Practices" />
    </div>
  );
}

function Card4() {
  return (
    <div className="[grid-area:4_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage12 />
    </div>
  );
}

function Icon7() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p1d820380} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p27451300} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p2981fe00} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p161d4800} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage>
  );
}

function Container29() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <Icon7 />
    </div>
  );
}

function HinduismFaithPage13() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[303px]" data-name="HinduismFaithPage">
      <Container29 />
      <HeadingBackgroundImageAndText text="Philosophy" />
    </div>
  );
}

function Card5() {
  return (
    <div className="[grid-area:5_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage13 />
    </div>
  );
}

function Icon8() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p9b81900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage>
  );
}

function Container30() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <Icon8 />
    </div>
  );
}

function Heading5() {
  return <BackgroundImage3>{`Festivals & Rituals`}</BackgroundImage3>;
}

function HinduismFaithPage14() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[303px]" data-name="HinduismFaithPage">
      <Container30 />
      <Heading5 />
    </div>
  );
}

function Card6() {
  return (
    <div className="[grid-area:6_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage14 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <IconBackgroundImage2 />
    </div>
  );
}

function HinduismFaithPage15() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[303px]" data-name="HinduismFaithPage">
      <Container31 />
      <HeadingBackgroundImageAndText text="Spiritual Paths" />
    </div>
  );
}

function Card7() {
  return (
    <div className="[grid-area:7_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage15 />
    </div>
  );
}

function Icon9() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p1c68f900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p11abce80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M12 10V22" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p1e272200} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d={svgPaths.p24ee1e00} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage>
  );
}

function Container32() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#f4511e] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[52px] to-[#ff6f3c] top-0" data-name="Container">
      <Icon9 />
    </div>
  );
}

function HinduismFaithPage16() {
  return (
    <div className="absolute h-[103.375px] left-[21px] top-[21px] w-[303px]" data-name="HinduismFaithPage">
      <Container32 />
      <HeadingBackgroundImageAndText text="Divine Consciousness" />
    </div>
  );
}

function Card8() {
  return (
    <div className="[grid-area:8_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <HinduismFaithPage16 />
    </div>
  );
}

function Container33() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[repeat(8,_minmax(0px,_1fr))] h-[1275px] relative shrink-0 w-full" data-name="Container">
      <Card1 />
      <Card2 />
      <Card3 />
      <Card4 />
      <Card5 />
      <Card6 />
      <Card7 />
      <Card8 />
    </div>
  );
}

function Container34() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[1448.75px] items-start left-[24px] top-0 w-[345px]" data-name="Container">
      <Container24 />
      <Container33 />
    </div>
  );
}

function Container35() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[174.75px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.315deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container36() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[336.13px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.315deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container37() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[497.5px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.315deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container38() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[658.88px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.315deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container39() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[820.25px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.315deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container40() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[981.63px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.315deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container41() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[1143px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.315deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container42() {
  return <div className="absolute h-[143.375px] left-[25px] opacity-0 rounded-[16px] top-[1304.38px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(157.315deg, rgba(244, 81, 30, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Section3() {
  return (
    <div className="absolute h-[1448.75px] left-0 top-[1883.63px] w-[393px]" data-name="Section">
      <Container34 />
      <Container35 />
      <Container36 />
      <Container37 />
      <Container38 />
      <Container39 />
      <Container40 />
      <Container41 />
      <Container42 />
    </div>
  );
}

function Icon10() {
  return (
    <BackgroundImage additionalClassNames="absolute left-0 top-[4.5px]">
      <path d={svgPaths.p9b81900} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </BackgroundImage>
  );
}

function Heading6() {
  return (
    <BackgroundImage5 additionalClassNames="h-[33px] w-[255.906px]">
      <Icon10 />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[33px] left-[36px] text-[#101828] text-[22px] text-nowrap top-0">Your Spiritual Journey</p>
    </BackgroundImage5>
  );
}

function Badge() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[36px] relative rounded-[8px] shrink-0 w-[75.734px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[18px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#d84315] text-[12px] text-nowrap">Level 2</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col h-[85px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Badge />
    </div>
  );
}

function Icon11() {
  return (
    <IconBackgroundImage3 additionalClassNames="absolute left-[64.25px] top-[18px]">
      <path d={svgPaths.p383b2000} id="Vector" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function HinduismFaithPage17() {
  return (
    <div className="absolute h-[28px] left-[18px] top-[46px] w-[112.5px]" data-name="HinduismFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[56.31px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">47</p>
    </div>
  );
}

function HinduismFaithPage18() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[78px] w-[112.5px]" data-name="HinduismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[19.5px] left-[56.7px] text-[#4a5565] text-[13px] text-center text-nowrap top-0 translate-x-[-50%]">Conversations</p>
    </div>
  );
}

function Container44() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(255,255,255,0.5)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon11 />
      <HinduismFaithPage17 />
      <HinduismFaithPage18 />
    </div>
  );
}

function Icon12() {
  return (
    <IconBackgroundImage3 additionalClassNames="absolute left-[64.25px] top-[18px]">
      <path d={svgPaths.p3376b800} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function HinduismFaithPage19() {
  return (
    <div className="absolute h-[28px] left-[18px] top-[46px] w-[112.5px]" data-name="HinduismFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[56.27px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">5</p>
    </div>
  );
}

function HinduismFaithPage20() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[78px] w-[112.5px]" data-name="HinduismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[19.5px] left-[56.36px] text-[#4a5565] text-[13px] text-center text-nowrap top-0 translate-x-[-50%]">Badges</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="[grid-area:1_/_2] bg-[rgba(255,255,255,0.5)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon12 />
      <HinduismFaithPage19 />
      <HinduismFaithPage20 />
    </div>
  );
}

function Icon13() {
  return (
    <IconBackgroundImage3 additionalClassNames="absolute left-[64.25px] top-[18px]">
      <path d={svgPaths.p17f2dd80} id="Vector" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p232c4380} id="Vector_2" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M10 8.33333V18.3333" id="Vector_3" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p112f4f80} id="Vector_4" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p86dd400} id="Vector_5" stroke="var(--stroke-0, #FAFAFA)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function HinduismFaithPage21() {
  return (
    <div className="absolute h-[28px] left-[18px] top-[46px] w-[112.5px]" data-name="HinduismFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[56.52px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">378</p>
    </div>
  );
}

function HinduismFaithPage22() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[78px] w-[112.5px]" data-name="HinduismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[19.5px] left-[56.52px] text-[#4a5565] text-[13px] text-center text-nowrap top-0 translate-x-[-50%]">Wisdom Points</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="[grid-area:2_/_1] bg-[rgba(255,255,255,0.5)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon13 />
      <HinduismFaithPage21 />
      <HinduismFaithPage22 />
    </div>
  );
}

function Icon14() {
  return (
    <IconBackgroundImage3 additionalClassNames="absolute left-[64.25px] top-[18px]">
      <path d={svgPaths.p2f84f400} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function HinduismFaithPage23() {
  return (
    <div className="absolute h-[28px] left-[18px] top-[46px] w-[112.5px]" data-name="HinduismFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[56.39px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">7</p>
    </div>
  );
}

function HinduismFaithPage24() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[78px] w-[112.5px]" data-name="HinduismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[19.5px] left-[56.63px] text-[#4a5565] text-[13px] text-center text-nowrap top-0 translate-x-[-50%]">Day Streak</p>
    </div>
  );
}

function Container47() {
  return (
    <div className="[grid-area:2_/_2] bg-[rgba(255,255,255,0.5)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon14 />
      <HinduismFaithPage23 />
      <HinduismFaithPage24 />
    </div>
  );
}

function Container48() {
  return (
    <div className="gap-[12px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[243px] relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Container45 />
      <Container46 />
      <Container47 />
    </div>
  );
}

function Icon15() {
  return (
    <IconBackgroundImage3 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p3376b800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Container49() {
  return (
    <BackgroundImage7 additionalClassNames="shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] size-[40px] to-[#ffd369]">
      <Icon15 />
    </BackgroundImage7>
  );
}

function Text1() {
  return (
    <BackgroundImage5 additionalClassNames="h-[22.5px] w-[139.625px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.5px] left-0 text-[#f4511e] text-[15px] text-nowrap top-[-1px]">Latest Achievement</p>
    </BackgroundImage5>
  );
}

function HinduismFaithPage25() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="HinduismFaithPage">
      <Container49 />
      <Text1 />
    </div>
  );
}

function HinduismFaithPage26() {
  return (
    <div className="h-[56px] relative shrink-0 w-full" data-name="HinduismFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-0 text-[#101828] text-[20px] top-0 w-[188px]">First Christian Guide Launched</p>
    </div>
  );
}

function HinduismFaithPage27() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="HinduismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#364153] text-[16px] top-[-1px] w-[210px]">Launched your first Christian spiritual guide</p>
    </div>
  );
}

function Container50() {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] h-[216px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-[2px] pt-[22px] px-[22px] relative size-full">
          <HinduismFaithPage25 />
          <HinduismFaithPage26 />
          <HinduismFaithPage27 />
        </div>
      </div>
    </div>
  );
}

function Container51() {
  return <div className="absolute h-[44px] left-0 top-0 w-[305px]" data-name="Container" style={{ backgroundImage: "linear-gradient(171.791deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container52() {
  return <div className="absolute bg-gradient-to-t from-[rgba(216,67,21,0.1)] h-[44px] left-0 to-[rgba(255,255,255,0.3)] top-0 via-50% via-[rgba(0,0,0,0)] w-[305px]" data-name="Container" />;
}

function Container53() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.6)] h-[20px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[305px]" data-name="Container" />;
}

function Container54() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[44px] left-0 rounded-[16px] top-0 w-[305px]" data-name="Container">
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.4)]" />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute h-[21px] left-[111px] top-[11.5px] w-[82.984px]" data-name="Text">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[21px] left-[41px] text-[14px] text-center text-nowrap text-white top-0 tracking-[0.35px] translate-x-[-50%]">View Profile</p>
    </div>
  );
}

function HinduismFaithPage28() {
  return (
    <div className="absolute bg-gradient-to-b border-2 border-[rgba(244,81,30,0.3)] border-solid from-[#f4511e] h-[48px] left-0 overflow-clip rounded-[16px] shadow-[0px_4px_20px_0px_rgba(244,81,30,0.25)] to-[#ff8a65] top-0 via-50% via-[#ff6f3c] w-[309px]" data-name="HinduismFaithPage">
      <Container51 />
      <Container52 />
      <Container53 />
      <Container54 />
      <Text2 />
    </div>
  );
}

function Container55() {
  return <div className="absolute h-[44px] left-0 opacity-0 top-0 w-[305px]" data-name="Container" style={{ backgroundImage: "linear-gradient(171.791deg, rgba(255, 111, 60, 0.15) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container56() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.5)] h-[15.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[305px]" data-name="Container" />;
}

function Container57() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[44px] left-0 rounded-[16px] top-0 w-[305px]" data-name="Container">
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.6)]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[21px] left-[103.48px] top-[11.5px] w-[98.031px]" data-name="Text">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[21px] left-[49px] text-[#d84315] text-[14px] text-center text-nowrap top-0 tracking-[0.35px] translate-x-[-50%]">Explore Faiths</p>
    </div>
  );
}

function HinduismFaithPage29() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] border-2 border-[rgba(244,81,30,0.3)] border-solid h-[48px] left-0 overflow-clip rounded-[16px] shadow-[0px_4px_15px_0px_rgba(244,81,30,0.15)] top-[60px] w-[309px]" data-name="HinduismFaithPage">
      <Container55 />
      <Container56 />
      <Container57 />
      <Text3 />
    </div>
  );
}

function Container58() {
  return (
    <div className="h-[108px] relative shrink-0 w-full" data-name="Container">
      <HinduismFaithPage28 />
      <HinduismFaithPage29 />
    </div>
  );
}

function HinduismFaithPage30() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[748px] items-start left-[24px] top-[24px] w-[309px]" data-name="HinduismFaithPage">
      <Container43 />
      <Container48 />
      <Container50 />
      <Container58 />
    </div>
  );
}

function Card9() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(255,255,255,0.4)] border-solid h-[800px] left-[16px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(255,255,255,0.3)] top-0 w-[361px]" data-name="Card">
      <HinduismFaithPage30 />
    </div>
  );
}

function Container59() {
  return <div className="absolute h-[796px] left-[18px] opacity-80 top-[2px] w-[357px]" data-name="Container" style={{ backgroundImage: "linear-gradient(114.156deg, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.1) 100%)" }} />;
}

function Section4() {
  return (
    <div className="absolute h-[800px] left-0 top-[3412.38px] w-[393px]" data-name="Section">
      <Card9 />
      <Container59 />
    </div>
  );
}

function Text4() {
  return (
    <BackgroundImage5 additionalClassNames="h-[32px] w-[24px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[32px] left-0 text-[#fafafa] text-[24px] text-nowrap top-[-1px]">🕉</p>
    </BackgroundImage5>
  );
}

function Container60() {
  return (
    <BackgroundImage7 additionalClassNames="shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[64px] to-[#ff6f3c]">
      <Text4 />
    </BackgroundImage7>
  );
}

function Heading7() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[28px] left-0 text-[#101828] text-[20px] text-nowrap top-0">Hinduism Circle</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[68.25px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-0 text-[#4a5565] text-[14px] top-0 w-[198px]">Explore Vedic wisdom, yoga philosophy, and Hindu spiritual practices together.</p>
    </div>
  );
}

function Container61() {
  return (
    <div className="basis-0 grow h-[104.25px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading7 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex gap-[16px] h-[104.25px] items-start relative shrink-0 w-full" data-name="Container">
      <Container60 />
      <Container61 />
    </div>
  );
}

function Icon16() {
  return (
    <IconBackgroundImage3 additionalClassNames="absolute left-[35.16px] top-[16px]">
      <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p3e0acf00} id="Vector_2" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p16b3b0c0} id="Vector_3" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Container63() {
  return (
    <div className="absolute h-[24px] left-[16px] top-[44px] w-[58.328px]" data-name="Container">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[24px] left-[29.38px] text-[#101828] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">734</p>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute h-[16px] left-[16px] top-[72px] w-[58.328px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[29.19px] text-[#6a7282] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Members</p>
    </div>
  );
}

function Container65() {
  return (
    <div className="absolute bg-[#f9fafb] border border-[#e5e7eb] border-solid h-[106px] left-0 rounded-[14px] top-0 w-[92.328px]" data-name="Container">
      <Icon16 />
      <Container63 />
      <Container64 />
    </div>
  );
}

function Icon17() {
  return (
    <IconBackgroundImage3 additionalClassNames="absolute left-[35.16px] top-[16px]">
      <path d={svgPaths.p26705e00} id="Vector" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Container66() {
  return (
    <div className="absolute h-[16px] left-[16px] top-[72px] w-[58.328px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[29.61px] text-[#6a7282] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Posts</p>
    </div>
  );
}

function Container67() {
  return (
    <div className="absolute bg-[#f9fafb] border border-[#e5e7eb] border-solid h-[106px] left-[108.33px] rounded-[14px] top-0 w-[92.328px]" data-name="Container">
      <Icon17 />
      <ContainerBackgroundImageAndText text="1,876" additionalClassNames="w-[58.328px]" />
      <Container66 />
    </div>
  );
}

function Icon18() {
  return (
    <IconBackgroundImage3 additionalClassNames="absolute left-[35.17px] top-[16px]">
      <path d={svgPaths.p3ac0b600} id="Vector" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p3c797180} id="Vector_2" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage3>
  );
}

function Container68() {
  return (
    <div className="absolute h-[16px] left-[16px] top-[72px] w-[58.344px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[29.25px] text-[#6a7282] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Now</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute bg-[#f9fafb] border border-[#e5e7eb] border-solid h-[106px] left-[216.66px] rounded-[14px] top-0 w-[92.344px]" data-name="Container">
      <Icon18 />
      <ContainerBackgroundImageAndText text="Active" additionalClassNames="w-[58.344px]" />
      <Container68 />
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[106px] relative shrink-0 w-full" data-name="Container">
      <Container65 />
      <Container67 />
      <Container69 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[20px] left-0 text-[#d84315] text-[14px] text-nowrap top-0">Community Guidelines</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[40px] left-[12.92px] top-0 w-[262.078px]" data-name="Text">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#364153] text-[14px] top-0 w-[184px]">Share teachings from Vedas, Upanishads, and Gita</p>
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="List Item">
      <TextBackgroundImageAndText1 text="•" />
      <Text5 />
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <TextBackgroundImageAndText1 text="•" />
      <TextBackgroundImageAndText2 text="Discuss yoga, meditation, and dharma" additionalClassNames="w-[245.25px]" />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <TextBackgroundImageAndText1 text="•" />
      <TextBackgroundImageAndText2 text="Respect all paths within Hindu tradition" additionalClassNames="w-[251.484px]" />
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

function Container71() {
  return (
    <div className="bg-[#fff7ed] h-[166px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ffd6a7] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start pb-px pt-[17px] px-[17px] relative size-full">
          <Heading2 />
          <List />
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="basis-0 bg-gradient-to-b from-[#f4511e] grow min-h-px min-w-px relative rounded-[8px] shadow-[0px_4px_20px_0px_rgba(244,81,30,0.25)] shrink-0 to-[#ff6f3c] w-[309px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative size-full">
        <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white">Join Group</p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <BackgroundImage1 additionalClassNames="absolute left-[192.45px] top-[10px]">
      <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #F4511E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage1>
  );
}

function Button10() {
  return (
    <div className="bg-[rgba(41,41,41,0.3)] h-[36px] relative rounded-[8px] shrink-0 w-[309px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#292929] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[138.55px] text-[#f4511e] text-[14px] text-center text-nowrap top-[8px] translate-x-[-50%]">View Group</p>
        <Icon19 />
      </div>
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Button9 />
      <Button10 />
    </div>
  );
}

function HinduismFaithGroups() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[580.25px] items-start left-0 pb-0 pt-[24px] px-[24px] top-[216px] w-[357px]" data-name="HinduismFaithGroups">
      <Container62 />
      <Container70 />
      <Container71 />
      <Container72 />
    </div>
  );
}

function ImageHinduismCommunity() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[357px]" data-name="Image (Hinduism Community)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src="917f4c7405ac86f803a0fbc949ccc73cc4de42df.png" />
    </div>
  );
}

function Container73() {
  return <div className="absolute bg-gradient-to-t from-[#ffffff] h-[192px] left-0 to-[rgba(0,0,0,0)] top-0 via-50% via-[rgba(255,255,255,0.5)] w-[357px]" data-name="Container" />;
}

function Text6() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white">public</p>
    </div>
  );
}

function Container74() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#f4511e] h-[40px] items-start left-[268.16px] pb-0 pt-[12px] px-[16px] rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] to-[#ff6f3c] top-[16px] w-[72.844px]" data-name="Container">
      <Text6 />
    </div>
  );
}

function HinduismFaithGroups1() {
  return (
    <div className="absolute h-[192px] left-0 overflow-clip top-0 w-[357px]" data-name="HinduismFaithGroups">
      <ImageHinduismCommunity />
      <Container73 />
      <Container74 />
    </div>
  );
}

function Card10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-2 border-[rgba(244,81,30,0.3)] border-solid h-[800.25px] left-[16px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(244,81,30,0.15)] top-[4324.38px] w-[361px]" data-name="Card">
      <HinduismFaithGroups />
      <HinduismFaithGroups1 />
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute h-[5188.625px] left-0 top-0 w-[393px]" data-name="Container">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Card10 />
    </div>
  );
}

function HinduismFaithPage31() {
  return (
    <div className="bg-white h-[5344.625px] overflow-clip relative shrink-0 w-full" data-name="HinduismFaithPage">
      <AppFooter />
      <Container1 />
      <Container75 />
    </div>
  );
}

function Section5() {
  return <div className="h-0 shrink-0 w-full" data-name="Section" />;
}

function AppContent() {
  return (
    <div className="absolute bg-[#121212] content-stretch flex flex-col h-[5417.625px] items-start left-0 pb-0 pt-[73px] px-0 top-0 w-[393px]" data-name="AppContent">
      <HinduismFaithPage31 />
      <Section5 />
    </div>
  );
}

function ImageBackground() {
  return <div className="absolute h-[852px] left-0 opacity-0 top-0 w-[393px]" data-name="Image (Background)" />;
}

function Source() {
  return <div className="h-0 shrink-0 w-full" data-name="Source" />;
}

function Video() {
  return (
    <div className="absolute content-stretch flex flex-col h-[852px] items-start left-0 overflow-clip pl-0 pr-[393px] py-0 top-0 w-[393px]" data-name="Video">
      <Source />
    </div>
  );
}

function BackgroundVideo() {
  return (
    <div className="absolute h-[852px] left-0 top-0 w-[393px]" data-name="BackgroundVideo">
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
    <IconBackgroundImage4 additionalClassNames="absolute left-[16px] top-[18px]">
      <path d="M5 1H7" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 7L7.5 5.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p5139500} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage4>
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

function Container76() {
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
      <Container76 />
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

function Button11() {
  return (
    <div className="absolute h-[56px] left-[7.41px] rounded-[16px] top-[14px] w-[55.047px]" data-name="Button">
      <BottomNavigation />
      <BottomNavigation1 />
    </div>
  );
}

function Container77() {
  return <div className="absolute bg-gradient-to-b border border-[rgba(107,93,211,0.2)] border-solid from-[#e8e5ff] h-[56px] left-0 rounded-[16px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] to-[#fff8e8] top-0 w-[48.953px]" data-name="Container" />;
}

function Container78() {
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

function Button12() {
  return (
    <div className="absolute h-[60px] left-[69.28px] rounded-[16px] top-[12px] w-[48.953px]" data-name="Button">
      <Container77 />
      <Container78 />
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

function Button13() {
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
      <Icon31VectorBackgroundImage additionalClassNames="left-1/2 right-[20.83%]">
        <path d={svgPaths.p18da42f0} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon31VectorBackgroundImage>
      <Icon31VectorBackgroundImage additionalClassNames="left-[20.83%] right-1/2">
        <path d={svgPaths.p115f4d00} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon31VectorBackgroundImage>
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

function Button14() {
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

function Button15() {
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

function Button16() {
  return (
    <div className="absolute h-[56px] left-[333.97px] rounded-[16px] top-[14px] w-[51.594px]" data-name="Button">
      <BottomNavigation10 />
      <BottomNavigation11 />
    </div>
  );
}

function Container79() {
  return (
    <div className="absolute h-[84px] left-0 top-0 w-[393px]" data-name="Container">
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
      <Button16 />
    </div>
  );
}

function Container80() {
  return <div className="absolute bg-gradient-to-t from-[rgba(107,93,211,0.05)] h-[84px] left-0 to-[rgba(0,0,0,0)] top-0 w-[393px]" data-name="Container" />;
}

function Icon27() {
  return (
    <IconBackgroundImage4 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p2e69df00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage4>
  );
}

function Text7() {
  return (
    <BackgroundImage4 additionalClassNames="h-[16px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[33px] text-[#90a1b9] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Need Help?</p>
    </BackgroundImage4>
  );
}

function CrisisSupportButton() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center left-[303.33px] top-[4px] w-[81.672px]" data-name="CrisisSupportButton">
      <Icon27 />
      <Text7 />
    </div>
  );
}

function BottomNavigation12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-[1px_0px_0px] border-[rgba(107,93,211,0.1)] border-solid h-[85px] left-0 shadow-[0px_16px_48px_0px_rgba(107,93,211,0.2)] top-[767px] w-[393px]" data-name="BottomNavigation">
      <Container79 />
      <Container80 />
      <CrisisSupportButton />
    </div>
  );
}

function Container81() {
  return (
    <BackgroundImage5 additionalClassNames="h-[18.684px] w-[231.142px]">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#008a2e] text-[13px] text-nowrap top-[-0.04px] tracking-[-0.0762px]">🏆 Badge Unlocked: Hinduism Explorer</p>
    </BackgroundImage5>
  );
}

function Container82() {
  return (
    <BackgroundImage5 additionalClassNames="h-[17.427px] w-[231.142px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-0 not-italic text-[#008a2e] text-[13px] text-nowrap top-[-0.04px] tracking-[-0.0762px]">+30 wisdom points earned!</p>
    </BackgroundImage5>
  );
}

function Container83() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[1.916px] h-[38.027px] items-start left-[37.33px] opacity-0 top-[-3.72px] w-[231.142px]" data-name="Container">
      <Container81 />
      <Container82 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[19.163px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19.1633 19.1633">
        <g id="Icon">
          <path clipRule="evenodd" d={svgPaths.p1db3cd00} fill="var(--fill-0, #008A2E)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Container84() {
  return (
    <div className="absolute content-stretch flex items-center left-[12.41px] opacity-0 pl-[-0.958px] pr-0 py-0 size-[15.331px] top-[7.62px]" data-name="Container">
      <Icon28 />
    </div>
  );
}

function He() {
  return (
    <div className="absolute bg-[#ecfdf3] border border-[#bffcd9] border-solid h-[32.578px] left-[7.55px] opacity-40 rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] top-[14.65px] w-[345.898px]" data-name="he3">
      <Container83 />
      <Container84 />
    </div>
  );
}

function Container85() {
  return (
    <BackgroundImage4 additionalClassNames="w-[219.516px]">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[19.5px] left-0 not-italic text-[#008a2e] text-[13px] text-nowrap top-0 tracking-[-0.0762px]">Exploring Hinduism wisdom!</p>
    </BackgroundImage4>
  );
}

function Container86() {
  return (
    <BackgroundImage5 additionalClassNames="h-[18.188px] w-[219.516px]">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18.2px] left-0 not-italic text-[#008a2e] text-[13px] text-nowrap top-0 tracking-[-0.0762px]">{`You've gained new spiritual insights.`}</p>
    </BackgroundImage5>
  );
}

function Container87() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[39.688px] items-start left-[39px] top-[16px] w-[219.516px]" data-name="Container">
      <Container85 />
      <Container86 />
    </div>
  );
}

function Icon29() {
  return (
    <IconBackgroundImage3 additionalClassNames="relative shrink-0">
      <path clipRule="evenodd" d={svgPaths.p19773c80} fill="var(--fill-0, #008A2E)" fillRule="evenodd" id="Vector" />
    </IconBackgroundImage3>
  );
}

function Container88() {
  return (
    <div className="absolute content-stretch flex items-center left-[13px] pl-[-1px] pr-0 py-0 size-[16px] top-[27.84px]" data-name="Container">
      <Icon29 />
    </div>
  );
}

function He1() {
  return (
    <div className="absolute bg-[#ecfdf3] border border-[#bffcd9] border-solid h-[73.688px] left-0 opacity-80 rounded-[8px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.1)] top-[-14.71px] w-[361px]" data-name="he3">
      <Container87 />
      <Container88 />
    </div>
  );
}

function NumberedList() {
  return (
    <div className="absolute h-0 left-[16px] top-[16px] w-[393px]" data-name="Numbered List">
      <He />
      <He1 />
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
      <NumberedList />
    </div>
  );
}