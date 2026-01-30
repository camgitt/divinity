import svgPaths from "./svg-anys2ft172";
import clsx from "clsx";
import imgImageDivinityAgi from "figma:asset/8a5c5551533b1297b98345f7179a0a7cc8223ad5.png";
type Wrapper3Props = {
  additionalClassNames?: string;
};

function Wrapper3({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper3Props>) {
  return (
    <div className={additionalClassNames}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type Wrapper2Props = {
  additionalClassNames?: string;
};

function Wrapper2({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper2Props>) {
  return <Wrapper3 additionalClassNames={clsx("relative shrink-0", additionalClassNames)}>{children}</Wrapper3>;
}
type Wrapper1Props = {
  additionalClassNames?: string;
};

function Wrapper1({ children, additionalClassNames = "" }: React.PropsWithChildren<Wrapper1Props>) {
  return <Wrapper3 additionalClassNames={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>{children}</Wrapper3>;
}
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return <Wrapper3 additionalClassNames={clsx("relative shrink-0 w-[295px]", additionalClassNames)}>{children}</Wrapper3>;
}
type Icon6VectorProps = {
  additionalClassNames?: string;
};

function Icon6Vector({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon6VectorProps>) {
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
type Icon11Props = {
  additionalClassNames?: string;
};

function Icon11({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon11Props>) {
  return (
    <div className={clsx("size-[12px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type Button15Props = {
  additionalClassNames?: string;
};

function Button15({ children, additionalClassNames = "" }: React.PropsWithChildren<Button15Props>) {
  return (
    <div className={clsx("bg-[rgba(22,40,68,0.4)] place-self-stretch relative rounded-[14px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(122,79,255,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pb-[2px] pt-[18px] px-[18px] relative size-full">{children}</div>
      </div>
    </div>
  );
}
type Icon10Props = {
  additionalClassNames?: string;
};

function Icon10({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon10Props>) {
  return (
    <div className={clsx("absolute size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}
type Vector1Props = {
  additionalClassNames?: string;
};

function Vector1({ additionalClassNames = "" }: Vector1Props) {
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
type VectorProps = {
  additionalClassNames?: string;
};

function Vector({ additionalClassNames = "" }: VectorProps) {
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
type TextText1Props = {
  text: string;
  additionalClassNames?: string;
};

function TextText1({ text, additionalClassNames = "" }: TextText1Props) {
  return (
    <Wrapper3 additionalClassNames={clsx("h-[24px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[24px] left-0 text-[16px] text-nowrap text-white top-[-1px]">{text}</p>
    </Wrapper3>
  );
}
type TextTextProps = {
  text: string;
};

function TextText({ text }: TextTextProps) {
  return (
    <Wrapper2 additionalClassNames="h-[32px] w-[24px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[32px] left-0 text-[#fafafa] text-[24px] text-nowrap top-[-1px]">{text}</p>
    </Wrapper2>
  );
}

function Source() {
  return <div className="h-0 shrink-0 w-full" data-name="Source" />;
}

function Video() {
  return (
    <div className="absolute content-stretch flex flex-col h-[681.594px] items-start left-0 overflow-clip pb-0 pl-0 pr-[393px] pt-[-73px] top-0 w-[393px]" data-name="Video">
      <Source />
    </div>
  );
}

function Container() {
  return <div className="absolute bg-[rgba(255,255,255,0.4)] h-[1399px] left-0 top-0 w-[393px]" data-name="Container" />;
}

function Container1() {
  return (
    <div className="absolute h-[1399px] left-0 overflow-clip top-0 w-[393px]" data-name="Container">
      <Video />
      <Container />
    </div>
  );
}

function Icon() {
  return (
    <Icon10 additionalClassNames="left-[12px] top-[10px]">
      <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.33333" />
      <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.33333" />
    </Icon10>
  );
}

function Button() {
  return (
    <div className="absolute h-[36px] left-0 rounded-[8px] top-0 w-[188.469px]" data-name="Button">
      <Icon />
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[110.5px] text-[14px] text-[rgba(0,0,0,0.8)] text-center text-nowrap top-[8px] translate-x-[-50%]">Back to Quiet Space</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[54px] relative shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Poppins:Black',sans-serif] leading-[54px] left-[172.59px] not-italic text-[#3d3d6b] text-[36px] text-center text-nowrap top-px translate-x-[-50%]">Your Quiet Space</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24px] left-[172.88px] text-[16px] text-[rgba(0,0,0,0.7)] text-center top-[-1px] translate-x-[-50%] w-[297px]">Answer a few questions to discover your perfect meditation environment</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[104px] h-[206px] items-start left-0 top-[52px] w-[345px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Text() {
  return (
    <Wrapper2 additionalClassNames="h-[20px] w-[67.516px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-[rgba(0,0,0,0.7)] top-0 w-[68px]">Step 1 of 6</p>
    </Wrapper2>
  );
}

function Text1() {
  return (
    <Wrapper2 additionalClassNames="h-[20px] w-[23.438px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#7a4fff] text-[14px] top-0 w-[24px]">17%</p>
    </Wrapper2>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Text1 />
    </div>
  );
}

function Container4() {
  return <div className="bg-gradient-to-b from-[#7a4fff] h-[8px] rounded-[3.35544e+07px] shrink-0 to-[#ffd369] w-full" data-name="Container" />;
}

function Container5() {
  return (
    <div className="bg-[rgba(11,20,38,0.6)] h-[8px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(122,79,255,0.2)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pl-px pr-[286.844px] py-px relative size-full">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[36px] items-start left-0 top-[273px] w-[345px]" data-name="Container">
      <Container3 />
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[309px] relative shrink-0 w-full" data-name="Container">
      <Button />
      <Container2 />
      <Container6 />
    </div>
  );
}

function QuietSpaceMatchingProcess() {
  return (
    <Wrapper additionalClassNames="h-[64px]">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[32px] left-0 not-italic text-[24px] text-white top-px w-[219px]">What is your faith tradition?</p>
    </Wrapper>
  );
}

function QuietSpaceMatchingProcess1() {
  return (
    <Wrapper additionalClassNames="h-[48px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24px] left-0 text-[16px] text-[rgba(255,255,255,0.7)] top-[-1px] w-[276px]">{`We'll recommend a meditation space aligned with your spiritual path`}</p>
    </Wrapper>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <TextText text="✝️" />
      <TextText1 text="Christianity" additionalClassNames="w-[85px]" />
    </div>
  );
}

function Button1() {
  return (
    <Button15 additionalClassNames="[grid-area:1_/_1]">
      <Container8 />
    </Button15>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <TextText text="☸️" />
      <TextText1 text="Buddhism" additionalClassNames="w-[77.031px]" />
    </div>
  );
}

function Button2() {
  return (
    <Button15 additionalClassNames="[grid-area:2_/_1]">
      <Container9 />
    </Button15>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <TextText text="☪️" />
      <TextText1 text="Islam" additionalClassNames="w-[40.797px]" />
    </div>
  );
}

function Button3() {
  return (
    <Button15 additionalClassNames="[grid-area:3_/_1]">
      <Container10 />
    </Button15>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <TextText text="🕉️" />
      <TextText1 text="Hinduism" additionalClassNames="w-[71.813px]" />
    </div>
  );
}

function Button4() {
  return (
    <Button15 additionalClassNames="[grid-area:4_/_1]">
      <Container11 />
    </Button15>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <TextText text="✡️" />
      <TextText1 text="Judaism" additionalClassNames="w-[63.219px]" />
    </div>
  );
}

function Button5() {
  return (
    <Button15 additionalClassNames="[grid-area:5_/_1]">
      <Container12 />
    </Button15>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex gap-[12px] h-[32px] items-center relative shrink-0 w-full" data-name="Container">
      <TextText text="☯️" />
      <TextText1 text="Taoism" additionalClassNames="w-[53.578px]" />
    </div>
  );
}

function Button6() {
  return (
    <Button15 additionalClassNames="[grid-area:6_/_1]">
      <Container13 />
    </Button15>
  );
}

function Text2() {
  return (
    <Wrapper1 additionalClassNames="h-[48px]">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[24px] left-0 text-[16px] text-white top-[-1px] w-[120px]">Universal/Non-denominational</p>
    </Wrapper1>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[12px] h-[48px] items-center relative shrink-0 w-full" data-name="Container">
      <TextText text="🌟" />
      <Text2 />
    </div>
  );
}

function Button7() {
  return (
    <Button15 additionalClassNames="[grid-area:7_/_1]">
      <Container14 />
    </Button15>
  );
}

function QuietSpaceMatchingProcess2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[295px]" data-name="QuietSpaceMatchingProcess">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid gap-[12px] grid grid-cols-[repeat(1,_minmax(0px,_1fr))] grid-rows-[minmax(0px,_68fr)_minmax(0px,_68fr)_minmax(0px,_68fr)_minmax(0px,_68fr)_minmax(0px,_68fr)_minmax(0px,_68fr)_minmax(0px,_1fr)] relative size-full">
        <Button1 />
        <Button2 />
        <Button3 />
        <Button4 />
        <Button5 />
        <Button6 />
        <Button7 />
      </div>
    </div>
  );
}

function Card() {
  return (
    <div className="bg-[rgba(22,40,68,0.6)] h-[814px] relative rounded-[16px] shrink-0 w-full" data-name="Card">
      <div aria-hidden="true" className="absolute border border-[rgba(122,79,255,0.3)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_8px_30px_0px_rgba(122,79,255,0.3)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[40px] items-start pl-[25px] pr-px py-[25px] relative size-full">
          <QuietSpaceMatchingProcess />
          <QuietSpaceMatchingProcess1 />
          <QuietSpaceMatchingProcess2 />
        </div>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <Icon10 additionalClassNames="left-[202.11px] top-[16px]">
      <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p1d405500} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </Icon10>
  );
}

function Button8() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] opacity-50 relative rounded-[8px] shrink-0 to-[#ffd369] w-full" data-name="Button">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[156.88px] text-[14px] text-center text-nowrap text-white top-[14px] translate-x-[-50%]">Continue</p>
      <Icon1 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[36px] h-[1303px] items-start left-0 pb-0 pt-[32px] px-[24px] top-0 w-[393px]" data-name="Container">
      <Container7 />
      <Card />
      <Button8 />
    </div>
  );
}

function QuietSpaceMatchingProcess3() {
  return (
    <div className="bg-white h-[1399px] overflow-clip relative shrink-0 w-full" data-name="QuietSpaceMatchingProcess">
      <Container1 />
      <Container15 />
    </div>
  );
}

function AppContent() {
  return (
    <div className="absolute bg-[#121212] content-stretch flex flex-col h-[1472px] items-start left-0 pb-0 pt-[73px] px-0 top-0 w-[393px]" data-name="AppContent">
      <QuietSpaceMatchingProcess3 />
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

function Icon2() {
  return (
    <Icon11 additionalClassNames="absolute left-[16px] top-[18px]">
      <path d="M5 1H7" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 7L7.5 5.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p5139500} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
    </Icon11>
  );
}

function Badge() {
  return (
    <div className="bg-gradient-to-b from-[#6b5dd3] h-[48px] relative rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] shrink-0 to-[#ffb84d] w-[109.969px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Icon2 />
        <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[40px] text-[14px] text-white top-[14px] w-[54px]">250 MIN</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <ImageDivinityAgi />
      <Badge />
    </div>
  );
}

function AppHeader() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[73px] items-start left-0 pb-px pt-[12px] px-[16px] top-0 w-[393px]" data-name="AppHeader">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(107,93,211,0.1)] border-solid inset-0 pointer-events-none shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)]" />
      <Container16 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Vector additionalClassNames="inset-[62.5%_33.33%_12.5%_8.33%]" />
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
      <Vector1 additionalClassNames="inset-[12.5%_45.83%_54.17%_20.83%]" />
    </div>
  );
}

function BottomNavigation() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[17.52px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon3 />
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

function Button9() {
  return (
    <div className="absolute h-[56px] left-[7.42px] rounded-[16px] top-[14px] w-[55.047px]" data-name="Button">
      <BottomNavigation />
      <BottomNavigation1 />
    </div>
  );
}

function Icon4() {
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
      <Icon4 />
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

function Button10() {
  return (
    <div className="absolute h-[56px] left-[69.31px] rounded-[16px] top-[14px] w-[48.328px]" data-name="Button">
      <BottomNavigation2 />
      <BottomNavigation3 />
    </div>
  );
}

function Icon5() {
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
      <Icon5 />
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

function Button11() {
  return (
    <div className="absolute h-[56px] left-[124.48px] rounded-[16px] top-[14px] w-[80.703px]" data-name="Button">
      <BottomNavigation4 />
      <BottomNavigation5 />
    </div>
  );
}

function Container17() {
  return <div className="absolute bg-gradient-to-b border border-[rgba(107,93,211,0.2)] border-solid from-[#e8e5ff] h-[56px] left-0 rounded-[16px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] to-[#fff8e8] top-0 w-[46.703px]" data-name="Container" />;
}

function Container18() {
  return <div className="absolute bg-gradient-to-b from-[#6b5dd3] left-[20.34px] rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] size-[6px] to-[#ffb84d] top-[-4px]" data-name="Container" />;
}

function Icon6() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[41.67%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
            <path d={svgPaths.p77fa900} id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[58.33%] left-[41.67%] right-[41.67%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 5">
            <path d={svgPaths.p29efb800} id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[8.33%] left-1/2 right-1/2 top-[41.67%]" data-name="Vector">
        <div className="absolute inset-[-8.33%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 11.6667">
            <path d="M0.833333 0.833333V10.8333" id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <Icon6Vector additionalClassNames="left-1/2 right-[20.83%]">
        <path d={svgPaths.p18da42f0} id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon6Vector>
      <Icon6Vector additionalClassNames="left-[20.83%] right-1/2">
        <path d={svgPaths.p115f4d00} id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon6Vector>
    </div>
  );
}

function BottomNavigation6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13.34px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon6 />
    </div>
  );
}

function BottomNavigation7() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[32px] w-[30.703px]" data-name="BottomNavigation">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[16px] left-[15.5px] text-[#6b5dd3] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Quiet</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="absolute h-[60px] left-[212.03px] rounded-[16px] top-[12px] w-[46.703px]" data-name="Button">
      <Container17 />
      <Container18 />
      <BottomNavigation6 />
      <BottomNavigation7 />
    </div>
  );
}

function Icon7() {
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
      <Icon7 />
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

function Button13() {
  return (
    <div className="absolute h-[56px] left-[265.58px] rounded-[16px] top-[14px] w-[61.531px]" data-name="Button">
      <BottomNavigation8 />
      <BottomNavigation9 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Vector additionalClassNames="inset-[62.5%_20.83%_12.5%_20.83%]" />
      <Vector1 additionalClassNames="inset-[12.5%_33.33%_54.17%_33.33%]" />
    </div>
  );
}

function BottomNavigation10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[15.8px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon8 />
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

function Button14() {
  return (
    <div className="absolute h-[56px] left-[333.95px] rounded-[16px] top-[14px] w-[51.594px]" data-name="Button">
      <BottomNavigation10 />
      <BottomNavigation11 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[84px] left-0 top-0 w-[393px]" data-name="Container">
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
    </div>
  );
}

function Container20() {
  return <div className="absolute bg-gradient-to-t from-[rgba(107,93,211,0.05)] h-[84px] left-0 to-[rgba(0,0,0,0)] top-0 w-[393px]" data-name="Container" />;
}

function Icon9() {
  return (
    <Icon11 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p2e69df00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
    </Icon11>
  );
}

function Text3() {
  return (
    <Wrapper1 additionalClassNames="h-[16px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[33px] text-[#90a1b9] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Need Help?</p>
    </Wrapper1>
  );
}

function CrisisSupportButton() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center left-[303.33px] top-[4px] w-[81.672px]" data-name="CrisisSupportButton">
      <Icon9 />
      <Text3 />
    </div>
  );
}

function BottomNavigation12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-[1px_0px_0px] border-[rgba(107,93,211,0.1)] border-solid h-[85px] left-0 shadow-[0px_16px_48px_0px_rgba(107,93,211,0.2)] top-[767px] w-[393px]" data-name="BottomNavigation">
      <Container19 />
      <Container20 />
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