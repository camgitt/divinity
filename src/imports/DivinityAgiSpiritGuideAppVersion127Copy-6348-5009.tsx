import svgPaths from "./svg-nipwkfjrbw";
import clsx from "clsx";
import imgImageAhimsaHand from "figma:asset/7dc002689f83346c020bf1c6c800b3f09778f4cf.png";
import imgImageJainismCommunity from "figma:asset/7f578f35fe7453fe60a07210c3904940d17a0923.png";
import imgImageBackground from "figma:asset/93a55c9837cd3d37439da278c2db152cb7774df3.png";
import imgImageDivinityAgi from "figma:asset/8a5c5551533b1297b98345f7179a0a7cc8223ad5.png";

function ContainerBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(11,20,38,0.6)] h-[81px] relative rounded-[14px] shrink-0 w-full">
      <div className="content-stretch flex flex-col items-start overflow-clip pb-px pt-0 px-0 relative rounded-[inherit] size-full">{children}</div>
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function ButtonBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="bg-[rgba(255,255,255,0.9)] relative rounded-[3.35544e+07px] shrink-0 size-[48px]">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(142,21,55,0.3)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px] shadow-[0px_4px_20px_0px_rgba(142,21,55,0.2)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-[2px] relative size-full">{children}</div>
    </div>
  );
}
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("bg-gradient-to-b from-[#8e1537] relative shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 to-[#6d1027]", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
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

function BackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute h-[28px] left-0 top-[72px] w-[295px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[28px] left-0 text-[18px] text-nowrap text-white top-0">{children}</p>
    </div>
  );
}
type Icon32VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function Icon32VectorBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon32VectorBackgroundImageProps>) {
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

function IconBackgroundImage3({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="relative shrink-0 size-[28px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type IconBackgroundImage2Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage2Props>) {
  return (
    <div className={clsx("size-[20px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type IconBackgroundImage1Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage1Props>) {
  return (
    <div className={clsx("size-[24px]", additionalClassNames)}>
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
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#8e1537] text-[14px] text-nowrap top-0">{text}</p>
    </div>
  );
}
type HeadingBackgroundImageAndTextProps = {
  text: string;
};

function HeadingBackgroundImageAndText({ text }: HeadingBackgroundImageAndTextProps) {
  return <BackgroundImage1>{text}</BackgroundImage1>;
}

function IconBackgroundImage() {
  return (
    <BackgroundImage additionalClassNames="absolute left-[239px] top-[18px]">
      <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #A1A1A1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
};

function TextBackgroundImageAndText({ text }: TextBackgroundImageAndTextProps) {
  return (
    <BackgroundImage2 additionalClassNames="h-[20px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#8e1537] text-[14px] text-nowrap top-0 tracking-[1.4px]">{text}</p>
    </BackgroundImage2>
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
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[52px] items-start left-[16px] top-[5435.41px] w-[361px]" data-name="AppFooter">
      <Container />
      <Paragraph />
    </div>
  );
}

function Container1() {
  return <div className="absolute h-[5591.406px] left-0 top-0 w-[393px]" data-name="Container" />;
}

function Container2() {
  return <div className="absolute h-[300px] left-0 rounded-[16px] shadow-[0px_8px_32px_0px_rgba(142,21,55,0.12)] top-0 w-[345px]" data-name="Container" style={{ backgroundImage: "linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.15) 100%)" }} />;
}

function Heading() {
  return (
    <div className="absolute content-stretch flex h-[80px] items-start left-[16px] shadow-[0px_2px_16px_0px_rgba(142,21,55,0.3)] top-0 w-[313px]" data-name="Heading 1">
      <p className="basis-0 bg-clip-text font-['Caveat:Bold',sans-serif] font-bold grow leading-[80px] min-h-px min-w-px relative shrink-0 text-[64px] text-[rgba(0,0,0,0)] text-center" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(142, 21, 55) 0%, rgb(109, 16, 39) 50%, rgb(160, 27, 69) 100%)" }}>
        Jainism
      </p>
    </div>
  );
}

function Container3() {
  return <div className="absolute bg-gradient-to-b from-[#8e1537] h-[2px] left-[132.5px] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(142,21,55,0.4)] to-[#6d1027] top-[96px] w-[80px]" data-name="Container" />;
}

function Paragraph1() {
  return (
    <div className="absolute h-[48.75px] left-[16px] shadow-[0px_2px_8px_0px_rgba(255,255,255,0.8)] top-[114px] w-[313px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[24.375px] left-[156.59px] text-[#1a1a1a] text-[15px] text-center top-0 translate-x-[-50%] w-[258px]">Practice ahimsa and walk the path of non-violence.</p>
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
  return <div className="absolute h-[44px] left-0 opacity-0 top-0 w-[90.781px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.141deg, rgba(255, 240, 240, 0.15) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Icon() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #6D1027)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #6D1027)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Text() {
  return (
    <BackgroundImage2 additionalClassNames="h-[22.5px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.5px] left-[17.5px] text-[#6d1027] text-[15px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Back</p>
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
    <div className="absolute bg-[rgba(255,255,255,0.4)] border-2 border-[rgba(142,21,55,0.3)] border-solid h-[48px] left-[24px] overflow-clip rounded-[16px] shadow-[0px_4px_15px_0px_rgba(142,21,55,0.15)] top-[24px] w-[94.781px]" data-name="Button">
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
  return <div className="absolute bg-[rgba(142,21,55,0.3)] blur-3xl filter left-[20px] rounded-[3.35544e+07px] size-[120px] top-[20px]" data-name="Container" />;
}

function ImageAhimsaHand() {
  return (
    <div className="absolute blur-[0.5px] filter left-0 opacity-30 shadow-[0px_0px_50px_0px_rgba(142,21,55,0.25)] size-[160px] top-0" data-name="Image (Ahimsa Hand)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageAhimsaHand} />
    </div>
  );
}

function Container9() {
  return <div className="absolute border-2 border-[rgba(142,21,55,0.25)] border-solid left-[-11.97px] opacity-[0.341] rounded-[3.35544e+07px] size-[183.944px] top-[-11.97px]" data-name="Container" />;
}

function Container10() {
  return (
    <div className="absolute left-0 size-[160px] top-0" data-name="Container">
      <ImageAhimsaHand />
      <Container9 />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute left-[116.5px] size-[160px] top-[354px]" data-name="Section">
      <Container8 />
      <Container10 />
    </div>
  );
}

function Icon1() {
  return (
    <IconBackgroundImage1 additionalClassNames="absolute left-0 top-[4.5px]">
      <path d={svgPaths.p9b81900} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage1>
  );
}

function Heading1() {
  return (
    <BackgroundImage3 additionalClassNames="h-[33px] w-[255.906px]">
      <Icon1 />
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[33px] left-[36px] text-[#101828] text-[22px] text-nowrap top-0">Your Spiritual Journey</p>
    </BackgroundImage3>
  );
}

function Badge() {
  return (
    <div className="bg-[rgba(255,255,255,0.5)] h-[36px] relative rounded-[8px] shrink-0 w-[76.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[18px] py-[10px] relative rounded-[inherit] size-full">
        <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#8e1537] text-[12px] text-nowrap">Level 4</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-col h-[85px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Badge />
    </div>
  );
}

function Icon2() {
  return (
    <IconBackgroundImage2 additionalClassNames="absolute left-[64.25px] top-[18px]">
      <path d={svgPaths.p383b2000} id="Vector" stroke="var(--stroke-0, #8E1537)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage2>
  );
}

function JainismFaithPage() {
  return (
    <div className="absolute h-[28px] left-[18px] top-[46px] w-[112.5px]" data-name="JainismFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[56.31px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">47</p>
    </div>
  );
}

function JainismFaithPage1() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[78px] w-[112.5px]" data-name="JainismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[19.5px] left-[56.7px] text-[#4a5565] text-[13px] text-center text-nowrap top-0 translate-x-[-50%]">Conversations</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(255,255,255,0.5)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon2 />
      <JainismFaithPage />
      <JainismFaithPage1 />
    </div>
  );
}

function Icon3() {
  return (
    <IconBackgroundImage2 additionalClassNames="absolute left-[64.25px] top-[18px]">
      <path d={svgPaths.p5cb4500} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage2>
  );
}

function JainismFaithPage2() {
  return (
    <div className="absolute h-[28px] left-[18px] top-[46px] w-[112.5px]" data-name="JainismFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[56.36px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">9</p>
    </div>
  );
}

function JainismFaithPage3() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[78px] w-[112.5px]" data-name="JainismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[19.5px] left-[56.36px] text-[#4a5565] text-[13px] text-center text-nowrap top-0 translate-x-[-50%]">Badges</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="[grid-area:1_/_2] bg-[rgba(255,255,255,0.5)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon3 />
      <JainismFaithPage2 />
      <JainismFaithPage3 />
    </div>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage2 additionalClassNames="absolute left-[64.25px] top-[18px]">
      <path d={svgPaths.p17f2dd80} id="Vector" stroke="var(--stroke-0, #6D1027)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p232c4380} id="Vector_2" stroke="var(--stroke-0, #6D1027)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M10 8.33333V18.3333" id="Vector_3" stroke="var(--stroke-0, #6D1027)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p112f4f80} id="Vector_4" stroke="var(--stroke-0, #6D1027)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p86dd400} id="Vector_5" stroke="var(--stroke-0, #6D1027)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage2>
  );
}

function JainismFaithPage4() {
  return (
    <div className="absolute h-[28px] left-[18px] top-[46px] w-[112.5px]" data-name="JainismFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[56.41px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">699</p>
    </div>
  );
}

function JainismFaithPage5() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[78px] w-[112.5px]" data-name="JainismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[19.5px] left-[56.52px] text-[#4a5565] text-[13px] text-center text-nowrap top-0 translate-x-[-50%]">Wisdom Points</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="[grid-area:2_/_1] bg-[rgba(255,255,255,0.5)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon4 />
      <JainismFaithPage4 />
      <JainismFaithPage5 />
    </div>
  );
}

function Icon5() {
  return (
    <IconBackgroundImage2 additionalClassNames="absolute left-[64.25px] top-[18px]">
      <path d={svgPaths.p2f84f400} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage2>
  );
}

function JainismFaithPage6() {
  return (
    <div className="absolute h-[28px] left-[18px] top-[46px] w-[112.5px]" data-name="JainismFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-[56.39px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">7</p>
    </div>
  );
}

function JainismFaithPage7() {
  return (
    <div className="absolute h-[19.5px] left-[18px] top-[78px] w-[112.5px]" data-name="JainismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[19.5px] left-[56.63px] text-[#4a5565] text-[13px] text-center text-nowrap top-0 translate-x-[-50%]">Day Streak</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="[grid-area:2_/_2] bg-[rgba(255,255,255,0.5)] place-self-stretch relative rounded-[16px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <Icon5 />
      <JainismFaithPage6 />
      <JainismFaithPage7 />
    </div>
  );
}

function Container16() {
  return (
    <div className="gap-[12px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[243px] relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container13 />
      <Container14 />
      <Container15 />
    </div>
  );
}

function Icon6() {
  return (
    <IconBackgroundImage2 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p5cb4500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage2>
  );
}

function Container17() {
  return (
    <div className="bg-gradient-to-b from-[#8e1537] relative rounded-[3.35544e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 size-[40px] to-[#ffd369]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Text1() {
  return (
    <BackgroundImage3 additionalClassNames="h-[22.5px] w-[139.625px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[22.5px] left-0 text-[#8e1537] text-[15px] text-nowrap top-[-1px]">Latest Achievement</p>
    </BackgroundImage3>
  );
}

function JainismFaithPage8() {
  return (
    <div className="content-stretch flex gap-[12px] h-[40px] items-center relative shrink-0 w-full" data-name="JainismFaithPage">
      <Container17 />
      <Text1 />
    </div>
  );
}

function JainismFaithPage9() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="JainismFaithPage">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[28px] left-0 text-[#101828] text-[20px] text-nowrap top-0">Daoism Explorer</p>
    </div>
  );
}

function JainismFaithPage10() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="JainismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[26px] left-0 text-[#364153] text-[16px] text-nowrap top-[-1px]">Explored the wisdom of Daoism</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] h-[162px] relative rounded-[16px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.5)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start pb-[2px] pt-[22px] px-[22px] relative size-full">
          <JainismFaithPage8 />
          <JainismFaithPage9 />
          <JainismFaithPage10 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return <div className="absolute h-[44px] left-0 top-0 w-[305px]" data-name="Container" style={{ backgroundImage: "linear-gradient(171.791deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container20() {
  return <div className="absolute bg-gradient-to-t from-[rgba(109,16,39,0.1)] h-[44px] left-0 to-[rgba(255,255,255,0.3)] top-0 via-50% via-[rgba(0,0,0,0)] w-[305px]" data-name="Container" />;
}

function Container21() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.6)] h-[20px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[305px]" data-name="Container" />;
}

function Container22() {
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

function JainismFaithPage11() {
  return (
    <div className="absolute bg-gradient-to-b border-2 border-[rgba(142,21,55,0.3)] border-solid from-[#8e1537] h-[48px] left-0 overflow-clip rounded-[16px] shadow-[0px_4px_20px_0px_rgba(142,21,55,0.25)] to-[#b8244f] top-0 via-50% via-[#a01b42] w-[309px]" data-name="JainismFaithPage">
      <Container19 />
      <Container20 />
      <Container21 />
      <Container22 />
      <Text2 />
    </div>
  );
}

function Container23() {
  return <div className="absolute h-[44px] left-0 opacity-0 top-0 w-[305px]" data-name="Container" style={{ backgroundImage: "linear-gradient(171.791deg, rgba(160, 27, 66, 0.15) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container24() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.5)] h-[15.391px] left-0 rounded-tl-[16px] rounded-tr-[16px] to-[rgba(0,0,0,0)] top-0 w-[305px]" data-name="Container" />;
}

function Container25() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0)] h-[44px] left-0 rounded-[16px] top-0 w-[305px]" data-name="Container">
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_0px_0px_1px_rgba(255,255,255,0.6)]" />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute h-[21px] left-[103.48px] top-[11.5px] w-[98.031px]" data-name="Text">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[21px] left-[49px] text-[#8e1537] text-[14px] text-center text-nowrap top-0 tracking-[0.35px] translate-x-[-50%]">Explore Faiths</p>
    </div>
  );
}

function JainismFaithPage12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.9)] border-2 border-[rgba(142,21,55,0.3)] border-solid h-[48px] left-0 overflow-clip rounded-[16px] shadow-[0px_4px_15px_0px_rgba(142,21,55,0.15)] top-[60px] w-[309px]" data-name="JainismFaithPage">
      <Container23 />
      <Container24 />
      <Container25 />
      <Text3 />
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[108px] relative shrink-0 w-full" data-name="Container">
      <JainismFaithPage11 />
      <JainismFaithPage12 />
    </div>
  );
}

function JainismFaithPage13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[694px] items-start left-[24px] top-[24px] w-[309px]" data-name="JainismFaithPage">
      <Container11 />
      <Container16 />
      <Container18 />
      <Container26 />
    </div>
  );
}

function Card() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.6)] border-2 border-[rgba(255,255,255,0.4)] border-solid h-[746px] left-[16px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(255,255,255,0.3)] top-0 w-[361px]" data-name="Card">
      <JainismFaithPage13 />
    </div>
  );
}

function Container27() {
  return <div className="absolute h-[742px] left-[18px] opacity-80 top-[2px] w-[357px]" data-name="Container" style={{ backgroundImage: "linear-gradient(115.694deg, rgba(255, 255, 255, 0.2) 0%, rgba(0, 0, 0, 0) 50%, rgba(255, 255, 255, 0.1) 100%)" }} />;
}

function Section2() {
  return (
    <div className="absolute h-[746px] left-0 top-[578px] w-[393px]" data-name="Section">
      <Card />
      <Container27 />
    </div>
  );
}

function JainismFaithPage14() {
  return (
    <div className="absolute content-stretch flex h-[52px] items-start left-0 pb-0 pt-[16px] px-0 shadow-[0px_2px_12px_0px_rgba(255,255,255,0.9)] top-0 w-[345px]" data-name="JainismFaithPage">
      <p className="basis-0 bg-clip-text font-['Raleway:Regular',sans-serif] font-normal grow leading-[36px] min-h-px min-w-px relative shrink-0 text-[30px] text-[rgba(0,0,0,0)] text-center" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(90deg, rgb(16, 24, 40) 0%, rgb(142, 21, 55) 50%, rgb(16, 24, 40) 100%)" }}>
        Meet Your Spirit Guides
      </p>
    </div>
  );
}

function JainismFaithPage15() {
  return <div className="absolute bg-gradient-to-b from-[#8e1537] h-[2px] left-[132.5px] rounded-[3.35544e+07px] shadow-[0px_0px_10px_0px_rgba(142,21,55,0.6)] to-[#6d1027] top-[68px] w-[80px]" data-name="JainismFaithPage" />;
}

function Container28() {
  return (
    <div className="h-[70px] relative shrink-0 w-full" data-name="Container">
      <JainismFaithPage14 />
      <JainismFaithPage15 />
    </div>
  );
}

function Container29() {
  return <div className="absolute h-[791.906px] left-0 top-0 w-[345px]" data-name="Container" />;
}

function Button5() {
  return <div className="bg-[#8e1537] h-[8px] rounded-[3.35544e+07px] shrink-0 w-[32px]" data-name="Button" />;
}

function Button6() {
  return <div className="bg-[rgba(142,21,55,0.25)] rounded-[3.35544e+07px] shrink-0 size-[8px]" data-name="Button" />;
}

function Container30() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[8px] items-start justify-center left-0 top-[815.91px] w-[345px]" data-name="Container">
      <Button5 />
      {[...Array(4).keys()].map((_, i) => (
        <Button6 key={i} />
      ))}
    </div>
  );
}

function Icon7() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d="M10 12L6 8L10 4" id="Vector" stroke="var(--stroke-0, #8E1537)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button7() {
  return (
    <ButtonBackgroundImage>
      <Icon7 />
    </ButtonBackgroundImage>
  );
}

function Icon8() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #8E1537)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button8() {
  return (
    <ButtonBackgroundImage>
      <Icon8 />
    </ButtonBackgroundImage>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex h-[48px] items-start justify-between left-0 px-[16px] py-0 top-[387.95px] w-[345px]" data-name="Container">
      <Button7 />
      <Button8 />
    </div>
  );
}

function AgentSlider() {
  return (
    <div className="h-[823.906px] relative shrink-0 w-full" data-name="AgentSlider7">
      <Container29 />
      <Container30 />
      <Container31 />
    </div>
  );
}

function Section3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[941.906px] items-start left-[24px] top-[1324px] w-[345px]" data-name="Section">
      <Container28 />
      <AgentSlider />
    </div>
  );
}

function Icon9() {
  return (
    <IconBackgroundImage1 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p296ad200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M20 3V7" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M22 5H18" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M4 17V19" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <path d="M5 18H3" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage1>
  );
}

function Container32() {
  return (
    <ContainerBackgroundImage additionalClassNames="rounded-[14px] size-[48px]">
      <Icon9 />
    </ContainerBackgroundImage>
  );
}

function JainismFaithPage16() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[48px] items-center left-[24px] top-[16px] w-[185.531px]" data-name="JainismFaithPage">
      <Container32 />
      <TextBackgroundImageAndText text="HOW IT WORKS" />
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="h-[80px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <JainismFaithPage16 />
      <IconBackgroundImage />
    </div>
  );
}

function Container33() {
  return (
    <ContainerBackgroundImage1>
      <PrimitiveButton />
    </ContainerBackgroundImage1>
  );
}

function Icon10() {
  return (
    <IconBackgroundImage1 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p1023c700} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage1>
  );
}

function Container34() {
  return (
    <div className="bg-gradient-to-b from-[#6d1027] relative rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 size-[48px] to-[#8e1537]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function JainismFaithPage17() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[48px] items-center left-[24px] top-[16px] w-[173.172px]" data-name="JainismFaithPage">
      <Container34 />
      <TextBackgroundImageAndText text="WHAT TO ASK" />
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="h-[80px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <JainismFaithPage17 />
      <IconBackgroundImage />
    </div>
  );
}

function Container35() {
  return (
    <ContainerBackgroundImage1>
      <PrimitiveButton1 />
    </ContainerBackgroundImage1>
  );
}

function Icon11() {
  return (
    <IconBackgroundImage1 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p9b81900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </IconBackgroundImage1>
  );
}

function Container36() {
  return (
    <div className="bg-gradient-to-b from-[#8e1537] h-[48px] relative rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 to-[#a01b45] w-[46.891px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.016px] py-0 relative size-full">
        <Icon11 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <BackgroundImage2 additionalClassNames="h-[40px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-0 text-[#8e1537] text-[14px] top-0 tracking-[1.4px] w-[74px]">WHAT TO EXPECT</p>
    </BackgroundImage2>
  );
}

function JainismFaithPage18() {
  return (
    <div className="absolute content-stretch flex gap-[16px] h-[48px] items-center left-[24px] top-[16px] w-[199px]" data-name="JainismFaithPage">
      <Container36 />
      <Text4 />
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="h-[80px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <JainismFaithPage18 />
      <IconBackgroundImage />
    </div>
  );
}

function Container37() {
  return (
    <div className="bg-[rgba(11,20,38,0.6)] content-stretch flex flex-col h-[80px] items-start overflow-clip relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <PrimitiveButton2 />
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[274px] items-start left-[32px] top-[138px] w-[279px]" data-name="Primitive.div">
      <Container33 />
      <Container35 />
      <Container37 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="absolute h-[32px] left-0 top-0 w-[279px]" data-name="Heading 3">
      <p className="absolute bg-clip-text font-['Raleway:Regular',sans-serif] font-normal leading-[32px] left-[139.75px] text-[24px] text-[rgba(0,0,0,0)] text-center text-nowrap top-[-1px] translate-x-[-50%]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(255, 255, 255) 0%, rgb(142, 21, 55) 50%, rgb(255, 255, 255) 100%)" }}>
        Agent Interaction Guide
      </p>
    </div>
  );
}

function Container38() {
  return <div className="absolute bg-gradient-to-b from-[#8e1537] h-[2px] left-[99.5px] rounded-[3.35544e+07px] to-[#6d1027] top-[48px] w-[80px]" data-name="Container" />;
}

function JainismFaithPage19() {
  return (
    <div className="absolute h-[50px] left-[32px] top-[32px] w-[279px]" data-name="JainismFaithPage">
      <Heading3 />
      <Container38 />
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute bg-[rgba(22,40,68,0.4)] border border-[rgba(30,58,95,0.4)] border-solid h-[446px] left-[24px] rounded-[14px] top-0 w-[345px]" data-name="Card">
      <PrimitiveDiv />
      <JainismFaithPage19 />
    </div>
  );
}

function Container39() {
  return <div className="absolute bg-gradient-to-b from-[#8e1537] h-[444px] left-[25px] opacity-80 to-[rgba(0,0,0,0)] top-px w-[343px]" data-name="Container" />;
}

function Section4() {
  return (
    <div className="absolute h-[446px] left-0 top-[2345.91px] w-[393px]" data-name="Section">
      <Card1 />
      <Container39 />
    </div>
  );
}

function JainismFaithPage20() {
  return (
    <div className="absolute content-stretch flex h-[36px] items-start left-0 top-0 w-[345px]" data-name="JainismFaithPage">
      <p className="basis-0 bg-clip-text font-['Raleway:Regular',sans-serif] font-normal grow leading-[36px] min-h-px min-w-px relative shrink-0 text-[30px] text-[rgba(0,0,0,0)] text-center" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(255, 255, 255) 0%, rgb(142, 21, 55) 50%, rgb(255, 255, 255) 100%)" }}>
        Explore Topics
      </p>
    </div>
  );
}

function JainismFaithPage21() {
  return <div className="absolute bg-gradient-to-b from-[#8e1537] h-[2px] left-[132.5px] rounded-[3.35544e+07px] to-[#6d1027] top-[52px] w-[80px]" data-name="JainismFaithPage" />;
}

function JainismFaithPage22() {
  return (
    <div className="absolute h-[48px] left-0 top-[78px] w-[345px]" data-name="JainismFaithPage">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24px] left-[172.55px] text-[#2e2e2e] text-[16px] text-center top-[-1px] translate-x-[-50%] w-[312px]">Discover the path of ahimsa and spiritual liberation through engaging conversations</p>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[126px] relative shrink-0 w-full" data-name="Container">
      <JainismFaithPage20 />
      <JainismFaithPage21 />
      <JainismFaithPage22 />
    </div>
  );
}

function Icon12() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.p1dcc0100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage3>
  );
}

function Container41() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#8e1537] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6d1027] top-0" data-name="Container">
      <Icon12 />
    </div>
  );
}

function JainismFaithPage23() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="JainismFaithPage">
      <Container41 />
      <HeadingBackgroundImageAndText text="Ahimsa (Non-violence)" />
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <JainismFaithPage23 />
    </div>
  );
}

function Icon13() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.peebe800} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M23.3333 3.5V8.16667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M25.6667 5.83333H21" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M4.66667 19.8333V22.1667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M5.83333 21H3.5" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage3>
  );
}

function Container42() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#8e1537] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6d1027] top-0" data-name="Container">
      <Icon13 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="absolute h-[56px] left-0 top-[72px] w-[295px]" data-name="Heading 3">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[28px] left-0 text-[18px] text-white top-0 w-[196px]">Anekantavada (Multiple Perspectives)</p>
    </div>
  );
}

function JainismFaithPage24() {
  return (
    <div className="absolute h-[140px] left-[25px] top-[25px] w-[295px]" data-name="JainismFaithPage">
      <Container42 />
      <Heading4 />
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:2_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <JainismFaithPage24 />
    </div>
  );
}

function Icon14() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.p1a3063b0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage3>
  );
}

function Container43() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#8e1537] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6d1027] top-0" data-name="Container">
      <Icon14 />
    </div>
  );
}

function JainismFaithPage25() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="JainismFaithPage">
      <Container43 />
      <HeadingBackgroundImageAndText text="Aparigraha (Non-attachment)" />
    </div>
  );
}

function Card4() {
  return (
    <div className="[grid-area:3_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <JainismFaithPage25 />
    </div>
  );
}

function Icon15() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.pff627f0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage3>
  );
}

function Container44() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#8e1537] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6d1027] top-0" data-name="Container">
      <Icon15 />
    </div>
  );
}

function JainismFaithPage26() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="JainismFaithPage">
      <Container44 />
      <HeadingBackgroundImageAndText text="Karma Theory" />
    </div>
  );
}

function Card5() {
  return (
    <div className="[grid-area:4_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <JainismFaithPage26 />
    </div>
  );
}

function Icon16() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.p761d900} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p3c07bc00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M14 11.6667V25.6667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p2b6b0700} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p2fc9fa30} id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage3>
  );
}

function Container45() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#8e1537] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6d1027] top-0" data-name="Container">
      <Icon16 />
    </div>
  );
}

function Heading5() {
  return <BackgroundImage1>{`Meditation & Contemplation`}</BackgroundImage1>;
}

function JainismFaithPage27() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="JainismFaithPage">
      <Container45 />
      <Heading5 />
    </div>
  );
}

function Card6() {
  return (
    <div className="[grid-area:5_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <JainismFaithPage27 />
    </div>
  );
}

function Icon17() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.p3a298fb0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage3>
  );
}

function Container46() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#8e1537] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6d1027] top-0" data-name="Container">
      <Icon17 />
    </div>
  );
}

function JainismFaithPage28() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="JainismFaithPage">
      <Container46 />
      <HeadingBackgroundImageAndText text="Ascetic Practices" />
    </div>
  );
}

function Card7() {
  return (
    <div className="[grid-area:6_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <JainismFaithPage28 />
    </div>
  );
}

function Icon18() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.p34441480} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M23.3333 3.5V8.16667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M25.6667 5.83333H21" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M4.66667 19.8333V22.1667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d="M5.83333 21H3.5" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage3>
  );
}

function Container47() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#8e1537] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6d1027] top-0" data-name="Container">
      <Icon18 />
    </div>
  );
}

function JainismFaithPage29() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="JainismFaithPage">
      <Container47 />
      <HeadingBackgroundImageAndText text="Spiritual Liberation" />
    </div>
  );
}

function Card8() {
  return (
    <div className="[grid-area:7_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <JainismFaithPage29 />
    </div>
  );
}

function Icon19() {
  return (
    <IconBackgroundImage3>
      <path d={svgPaths.p184ba090} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.pcd80870} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p36197298} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
      <path d={svgPaths.p5d36b00} id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
    </IconBackgroundImage3>
  );
}

function Container48() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#8e1537] items-center justify-center left-0 rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] to-[#6d1027] top-0" data-name="Container">
      <Icon19 />
    </div>
  );
}

function JainismFaithPage30() {
  return (
    <div className="absolute h-[112px] left-[25px] top-[25px] w-[295px]" data-name="JainismFaithPage">
      <Container48 />
      <HeadingBackgroundImageAndText text="Jain Ethics" />
    </div>
  );
}

function Card9() {
  return (
    <div className="[grid-area:8_/_1] bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.4)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <JainismFaithPage30 />
    </div>
  );
}

function Container49() {
  return (
    <div className="gap-[16px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_162fr)_minmax(0px,_190fr)_minmax(0px,_162fr)_minmax(0px,_162fr)_minmax(0px,_162fr)_minmax(0px,_162fr)_minmax(0px,_162fr)_minmax(0px,_1fr)] h-[1436px] relative shrink-0 w-full" data-name="Container">
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

function Container50() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[48px] h-[1610px] items-start left-[24px] top-0 w-[345px]" data-name="Container">
      <Container40 />
      <Container49 />
    </div>
  );
}

function Container51() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[175px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(142, 21, 55, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container52() {
  return <div className="absolute h-[188px] left-[25px] opacity-0 rounded-[14px] top-[353px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(151.273deg, rgba(142, 21, 55, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container53() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[559px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(142, 21, 55, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container54() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[737px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(142, 21, 55, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container55() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[915px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(142, 21, 55, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container56() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[1093px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(142, 21, 55, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container57() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[1271px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(142, 21, 55, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container58() {
  return <div className="absolute h-[160px] left-[25px] opacity-0 rounded-[14px] top-[1449px] w-[343px]" data-name="Container" style={{ backgroundImage: "linear-gradient(154.992deg, rgba(142, 21, 55, 0.05) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Section5() {
  return (
    <div className="absolute h-[1610px] left-0 top-[2839.91px] w-[393px]" data-name="Section">
      <Container50 />
      <Container51 />
      <Container52 />
      <Container53 />
      <Container54 />
      <Container55 />
      <Container56 />
      <Container57 />
      <Container58 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[40px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal inset-[8.33%_15.83%_24.17%_16.67%] leading-[normal] not-italic text-[26.667px] text-center text-nowrap text-white">🖐️</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <ContainerBackgroundImage additionalClassNames="rounded-[3.35544e+07px] size-[64px]">
      <Icon20 />
    </ContainerBackgroundImage>
  );
}

function Heading6() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[28px] left-0 text-[#101828] text-[20px] text-nowrap top-0">Jainism Circle</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[45.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.75px] left-0 text-[#4a5565] text-[14px] top-0 w-[220px]">Practice ahimsa, meditation, and the path of non-violence together.</p>
    </div>
  );
}

function Container60() {
  return (
    <div className="basis-0 grow h-[81.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <Heading6 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="content-stretch flex gap-[16px] h-[81.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container59 />
      <Container60 />
    </div>
  );
}

function Icon21() {
  return (
    <IconBackgroundImage2 additionalClassNames="absolute left-[35.16px] top-[16px]">
      <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #8E1537)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p3e0acf00} id="Vector_2" stroke="var(--stroke-0, #8E1537)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p16b3b0c0} id="Vector_3" stroke="var(--stroke-0, #8E1537)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #8E1537)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage2>
  );
}

function Container62() {
  return (
    <div className="absolute h-[24px] left-[16px] top-[44px] w-[58.328px]" data-name="Container">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[24px] left-[29.36px] text-[#101828] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">234</p>
    </div>
  );
}

function Container63() {
  return (
    <div className="absolute h-[16px] left-[16px] top-[72px] w-[58.328px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[29.19px] text-[#6a7282] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Members</p>
    </div>
  );
}

function Container64() {
  return (
    <div className="absolute bg-[#fff0f0] border border-[rgba(142,21,55,0.2)] border-solid h-[106px] left-0 rounded-[14px] top-0 w-[92.328px]" data-name="Container">
      <Icon21 />
      <Container62 />
      <Container63 />
    </div>
  );
}

function Icon22() {
  return (
    <IconBackgroundImage2 additionalClassNames="absolute left-[35.16px] top-[16px]">
      <path d={svgPaths.p26705e00} id="Vector" stroke="var(--stroke-0, #8E1537)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage2>
  );
}

function Container65() {
  return (
    <div className="absolute h-[24px] left-[16px] top-[44px] w-[58.328px]" data-name="Container">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[24px] left-[29.41px] text-[#101828] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">467</p>
    </div>
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
    <div className="absolute bg-[#fff0f0] border border-[rgba(142,21,55,0.2)] border-solid h-[106px] left-[108.33px] rounded-[14px] top-0 w-[92.328px]" data-name="Container">
      <Icon22 />
      <Container65 />
      <Container66 />
    </div>
  );
}

function Icon23() {
  return (
    <IconBackgroundImage2 additionalClassNames="absolute left-[35.17px] top-[16px]">
      <path d={svgPaths.p3ac0b600} id="Vector" stroke="var(--stroke-0, #8E1537)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p3c797180} id="Vector_2" stroke="var(--stroke-0, #8E1537)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </IconBackgroundImage2>
  );
}

function Container68() {
  return (
    <div className="absolute h-[24px] left-[16px] top-[44px] w-[58.344px]" data-name="Container">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[24px] left-[29.58px] text-[#101828] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Active</p>
    </div>
  );
}

function Container69() {
  return (
    <div className="absolute h-[16px] left-[16px] top-[72px] w-[58.344px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[29.25px] text-[#6a7282] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Now</p>
    </div>
  );
}

function Container70() {
  return (
    <div className="absolute bg-[#fff0f0] border border-[rgba(142,21,55,0.2)] border-solid h-[106px] left-[216.66px] rounded-[14px] top-0 w-[92.344px]" data-name="Container">
      <Icon23 />
      <Container68 />
      <Container69 />
    </div>
  );
}

function Container71() {
  return (
    <div className="h-[106px] relative shrink-0 w-full" data-name="Container">
      <Container64 />
      <Container67 />
      <Container70 />
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[20px] left-0 text-[#8e1537] text-[14px] text-nowrap top-0">Community Guidelines</p>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[40px] left-[12.92px] top-0 w-[262.078px]" data-name="Text">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#364153] text-[14px] top-0 w-[220px]">Practice and discuss ahimsa (non-violence)</p>
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
      <TextBackgroundImageAndText2 text="Share Jain teachings and meditation" additionalClassNames="w-[233.281px]" />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[22px] relative shrink-0 w-full" data-name="List Item">
      <TextBackgroundImageAndText1 text="•" />
      <TextBackgroundImageAndText2 text="Support vegetarian and ethical living" additionalClassNames="w-[235.672px]" />
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

function Container72() {
  return (
    <div className="bg-[#fff0f0] h-[166px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(142,21,55,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
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
    <div className="basis-0 bg-gradient-to-b from-[#8e1537] grow min-h-px min-w-px relative rounded-[8px] shadow-[0px_4px_20px_0px_rgba(142,21,55,0.25)] shrink-0 to-[#6d1027] w-[309px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[16px] py-[8px] relative size-full">
        <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-center text-nowrap text-white">Join Group</p>
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <BackgroundImage additionalClassNames="absolute left-[192.45px] top-[10px]">
      <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #8E1537)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, #8E1537)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button10() {
  return (
    <div className="bg-[rgba(41,41,41,0.3)] h-[36px] relative rounded-[8px] shrink-0 w-[309px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#292929] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[138.55px] text-[#8e1537] text-[14px] text-center text-nowrap top-[8px] translate-x-[-50%]">View Group</p>
        <Icon24 />
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[84px] items-start relative shrink-0 w-full" data-name="Container">
      <Button9 />
      <Button10 />
    </div>
  );
}

function JainismFaithGroups() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[557.5px] items-start left-0 pb-0 pt-[24px] px-[24px] top-[216px] w-[357px]" data-name="JainismFaithGroups">
      <Container61 />
      <Container71 />
      <Container72 />
      <Container73 />
    </div>
  );
}

function ImageJainismCommunity() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[357px]" data-name="Image (Jainism Community)">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImageJainismCommunity} />
    </div>
  );
}

function Container74() {
  return <div className="absolute bg-gradient-to-t from-[#ffffff] h-[192px] left-0 to-[rgba(0,0,0,0)] top-0 via-50% via-[rgba(255,255,255,0.5)] w-[357px]" data-name="Container" />;
}

function Text6() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Text">
      <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[14px] text-nowrap text-white">public</p>
    </div>
  );
}

function Container75() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex flex-col from-[#8e1537] h-[40px] items-start left-[268.16px] pb-0 pt-[12px] px-[16px] rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] to-[#6d1027] top-[16px] w-[72.844px]" data-name="Container">
      <Text6 />
    </div>
  );
}

function JainismFaithGroups1() {
  return (
    <div className="absolute h-[192px] left-0 overflow-clip top-0 w-[357px]" data-name="JainismFaithGroups">
      <ImageJainismCommunity />
      <Container74 />
      <Container75 />
    </div>
  );
}

function Card10() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-2 border-[rgba(142,21,55,0.3)] border-solid h-[777.5px] left-[16px] overflow-clip rounded-[24px] shadow-[0px_8px_30px_0px_rgba(142,21,55,0.15)] top-[4593.91px] w-[361px]" data-name="Card">
      <JainismFaithGroups />
      <JainismFaithGroups1 />
    </div>
  );
}

function Container76() {
  return (
    <div className="absolute h-[5435.406px] left-0 top-0 w-[393px]" data-name="Container">
      <Section />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Card10 />
    </div>
  );
}

function JainismFaithPage31() {
  return (
    <div className="bg-white h-[5591.406px] overflow-clip relative shrink-0 w-full" data-name="JainismFaithPage">
      <AppFooter />
      <Container1 />
      <Container76 />
    </div>
  );
}

function AppContent() {
  return (
    <div className="absolute bg-[#121212] content-stretch flex flex-col h-[5664.406px] items-start left-0 pb-0 pt-[73px] px-0 top-0 w-[393px]" data-name="AppContent">
      <JainismFaithPage31 />
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

function Icon25() {
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
        <Icon25 />
        <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[40px] text-[14px] text-white top-[14px] w-[54px]">250 MIN</p>
      </div>
    </div>
  );
}

function Container77() {
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
      <Container77 />
    </div>
  );
}

function Icon26() {
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
      <Icon26 />
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

function Container78() {
  return <div className="absolute bg-gradient-to-b border border-[rgba(107,93,211,0.2)] border-solid from-[#e8e5ff] h-[56px] left-0 rounded-[16px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] to-[#fff8e8] top-0 w-[48.953px]" data-name="Container" />;
}

function Container79() {
  return <div className="absolute bg-gradient-to-b from-[#6b5dd3] left-[21.47px] rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] size-[6px] to-[#ffb84d] top-[-4px]" data-name="Container" />;
}

function Icon27() {
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
      <Icon27 />
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
      <Container78 />
      <Container79 />
      <BottomNavigation2 />
      <BottomNavigation3 />
    </div>
  );
}

function Icon28() {
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
      <Icon28 />
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

function Icon29() {
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
      <Icon32VectorBackgroundImage additionalClassNames="left-1/2 right-[20.83%]">
        <path d={svgPaths.p18da42f0} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon32VectorBackgroundImage>
      <Icon32VectorBackgroundImage additionalClassNames="left-[20.83%] right-1/2">
        <path d={svgPaths.p115f4d00} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon32VectorBackgroundImage>
    </div>
  );
}

function BottomNavigation6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13.09px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon29 />
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

function Icon30() {
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
      <Icon30 />
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

function Icon31() {
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
      <Icon31 />
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

function Container80() {
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

function Container81() {
  return <div className="absolute bg-gradient-to-t from-[rgba(107,93,211,0.05)] h-[84px] left-0 to-[rgba(0,0,0,0)] top-0 w-[393px]" data-name="Container" />;
}

function Icon32() {
  return (
    <IconBackgroundImage4 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p2e69df00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage4>
  );
}

function Text7() {
  return (
    <BackgroundImage2 additionalClassNames="h-[16px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[33px] text-[#90a1b9] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Need Help?</p>
    </BackgroundImage2>
  );
}

function CrisisSupportButton() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center left-[303.33px] top-[4px] w-[81.672px]" data-name="CrisisSupportButton">
      <Icon32 />
      <Text7 />
    </div>
  );
}

function BottomNavigation12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-[1px_0px_0px] border-[rgba(107,93,211,0.1)] border-solid h-[85px] left-0 shadow-[0px_16px_48px_0px_rgba(107,93,211,0.2)] top-[837px] w-[393px]" data-name="BottomNavigation">
      <Container80 />
      <Container81 />
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