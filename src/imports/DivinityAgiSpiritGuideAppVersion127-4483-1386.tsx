import svgPaths from "./svg-g4yyqmfcez";
import clsx from "clsx";
type WrapperProps = {
  additionalClassNames?: string;
};

function Wrapper({ children, additionalClassNames = "" }: React.PropsWithChildren<WrapperProps>) {
  return (
    <div className={additionalClassNames}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        {children}
      </svg>
    </div>
  );
}
type Icon4VectorProps = {
  additionalClassNames?: string;
};

function Icon4Vector({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon4VectorProps>) {
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
type Vector2Props = {
  additionalClassNames?: string;
};

function Vector2({ children, additionalClassNames = "" }: React.PropsWithChildren<Vector2Props>) {
  return (
    <div className={clsx("absolute", additionalClassNames)}>
      <div className="absolute inset-[-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 19 19">
          {children}
        </svg>
      </div>
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
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9 9">
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
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 7">
          <path d={svgPaths.p6877e0} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </svg>
      </div>
    </div>
  );
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

function Container() {
  return <div className="absolute bg-[rgba(255,255,255,0.7)] h-[852px] left-0 top-0 w-[393px]" data-name="Container" />;
}

function Icon() {
  return (
    <div className="absolute left-[137.98px] size-[48px] top-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
        <g id="Icon">
          <path d={svgPaths.p1f337080} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
          <path d="M18 24L22 28L30 20" id="Vector_2" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[28px] left-[24px] top-[88px] w-[275.984px]" data-name="Heading 2">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[28px] left-[138.17px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">Welcome back!</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[124px] w-[275.984px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[138.02px] text-[#4a5565] text-[14px] text-center top-0 translate-x-[-50%] w-[272px]">{`You're signed in as info@theinnerface.com`}</p>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-gradient-to-b from-[#ffd369] h-[48px] relative rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] shrink-0 to-[#ffd369] via-50% via-[#ffc850] w-full" data-name="Button">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[20px] left-[138.05px] text-[#101828] text-[14px] text-center text-nowrap top-[14px] translate-x-[-50%]">Continue to DivinityAGI</p>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(41,41,41,0.3)] h-[48px] relative rounded-[14px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#292929] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[138.44px] text-[#364153] text-[14px] text-center text-nowrap top-[14px] translate-x-[-50%]">Sign Out</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[108px] items-start left-[24px] top-[168px] w-[275.984px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-white border-2 border-[rgba(255,255,255,0.4)] border-solid h-[304px] left-[32.5px] rounded-[24px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.08)] top-[254.51px] w-[327.984px]" data-name="Container">
      <Icon />
      <Heading />
      <Paragraph />
      <Container1 />
    </div>
  );
}

function LandingRegistrationPage() {
  return (
    <div className="absolute bg-white h-[852px] left-0 overflow-clip top-0 w-[393px]" data-name="LandingRegistrationPage">
      <Video />
      <Container />
      <Container2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Vector additionalClassNames="inset-[62.5%_33.33%_12.5%_8.33%]" />
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
      <Vector1 additionalClassNames="inset-[12.5%_45.83%_54.17%_20.83%]" />
    </div>
  );
}

function BottomNavigation() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[17.52px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon1 />
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

function Button2() {
  return (
    <div className="absolute h-[56px] left-[7.45px] rounded-[16px] top-[12px] w-[55.047px]" data-name="Button">
      <BottomNavigation />
      <BottomNavigation1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Vector2 additionalClassNames="inset-[8.33%]">
        <path d={svgPaths.p147ca400} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Vector2>
    </div>
  );
}

function BottomNavigation2() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[14.16px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon2 />
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

function Button3() {
  return (
    <div className="absolute h-[56px] left-[69.42px] rounded-[16px] top-[12px] w-[48.328px]" data-name="Button">
      <BottomNavigation2 />
      <BottomNavigation3 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Vector2 additionalClassNames="inset-[8.33%_8.32%_8.33%_8.34%]">
        <path d={svgPaths.p3937b100} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Vector2>
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
      <Icon3 />
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

function Button4() {
  return (
    <div className="absolute h-[56px] left-[124.67px] rounded-[16px] top-[12px] w-[80.703px]" data-name="Button">
      <BottomNavigation4 />
      <BottomNavigation5 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[41.67%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
        <Wrapper additionalClassNames="absolute inset-[-8.33%]">
          <path d={svgPaths.p77fa900} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </Wrapper>
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
      <Icon4Vector additionalClassNames="left-1/2 right-[20.83%]">
        <path d={svgPaths.p18da42f0} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon4Vector>
      <Icon4Vector additionalClassNames="left-[20.83%] right-1/2">
        <path d={svgPaths.p115f4d00} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon4Vector>
    </div>
  );
}

function BottomNavigation6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13.09px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon4 />
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

function Button5() {
  return (
    <div className="absolute h-[56px] left-[212.3px] rounded-[16px] top-[12px] w-[46.188px]" data-name="Button">
      <BottomNavigation6 />
      <BottomNavigation7 />
    </div>
  );
}

function Icon5() {
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
      <Icon5 />
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

function Button6() {
  return (
    <div className="absolute h-[56px] left-[265.41px] rounded-[16px] top-[12px] w-[61.531px]" data-name="Button">
      <BottomNavigation8 />
      <BottomNavigation9 />
    </div>
  );
}

function Icon6() {
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
      <Icon6 />
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

function Button7() {
  return (
    <div className="absolute h-[56px] left-[333.86px] rounded-[16px] top-[12px] w-[51.594px]" data-name="Button">
      <BottomNavigation10 />
      <BottomNavigation11 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[80px] left-0 top-0 w-[393px]" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Container4() {
  return <div className="absolute bg-gradient-to-t from-[rgba(107,93,211,0.05)] h-[80px] left-0 to-[rgba(0,0,0,0)] top-0 w-[393px]" data-name="Container" />;
}

function Icon7() {
  return (
    <Wrapper additionalClassNames="relative shrink-0 size-[12px]">
      <g id="Icon">
        <path d={svgPaths.p2e69df00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </Wrapper>
  );
}

function Text() {
  return (
    <div className="basis-0 grow h-[16px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[33px] text-[#90a1b9] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Need Help?</p>
      </div>
    </div>
  );
}

function CrisisSupportButton() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center left-[303.33px] top-[4px] w-[81.672px]" data-name="CrisisSupportButton">
      <Icon7 />
      <Text />
    </div>
  );
}

function BottomNavigation12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-[1px_0px_0px] border-[rgba(107,93,211,0.1)] border-solid h-[81px] left-0 shadow-[0px_16px_48px_0px_rgba(107,93,211,0.2)] top-[771px] w-[393px]" data-name="BottomNavigation">
      <Container3 />
      <Container4 />
      <CrisisSupportButton />
    </div>
  );
}

export default function DivinityAgiSpiritGuideAppVersion() {
  return (
    <div className="bg-[#121212] relative size-full" data-name="DivinityAGI Spirit Guide App Version 12-7">
      <LandingRegistrationPage />
      <BottomNavigation12 />
    </div>
  );
}