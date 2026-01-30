import svgPaths from "./svg-5zgb4xt2o6";
import clsx from "clsx";
import imgChat2 from "figma:asset/936069199d8bf088e4dae0072f3271aa27baad55.png";
import imgChat3 from "figma:asset/544c9e2d2ed2480aa4ccd42f2793d101bf048610.png";
import imgImageDivinityAgi from "figma:asset/61e6939d809ba54cb8cc52bd066079fa481abb31.png";
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={clsx("h-[19.5px] relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}
type IconBackgroundImage1Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage1Props>) {
  return (
    <div className={clsx("size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        {children}
      </svg>
    </div>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <div className={additionalClassNames}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        {children}
      </svg>
    </div>
  );
}
type Icon12VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function Icon12VectorBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon12VectorBackgroundImageProps>) {
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
type IconBackgroundImageProps = {
  additionalClassNames?: string;
};

function IconBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImageProps>) {
  return (
    <BackgroundImage additionalClassNames={clsx("size-[12px]", additionalClassNames)}>
      <g id="Icon">{children}</g>
    </BackgroundImage>
  );
}
type ContainerBackgroundImageProps = {
  additionalClassNames?: string;
};

function ContainerBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ContainerBackgroundImageProps>) {
  return (
    <div className={clsx("bg-[rgba(30,58,95,0.4)] place-self-stretch relative rounded-[14px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.6)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.3)]" />
      <div className="size-full">
        <div className="content-stretch flex flex-col gap-[4px] items-start pb-px pt-[13px] px-[13px] relative size-full">{children}</div>
      </div>
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
type ContainerBackgroundImageAndText1Props = {
  text: string;
};

function ContainerBackgroundImageAndText1({ text }: ContainerBackgroundImageAndText1Props) {
  return (
    <div className="h-[16px] relative shadow-[0px_0px_16px_0px_rgba(255,211,105,0.4)] shrink-0 w-full">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[65.48px] text-[#ffd369] text-[12px] text-center text-nowrap top-0 tracking-[0.6px] translate-x-[-50%] uppercase">{text}</p>
    </div>
  );
}
type ContainerBackgroundImageAndTextProps = {
  text: string;
};

function ContainerBackgroundImageAndText({ text }: ContainerBackgroundImageAndTextProps) {
  return (
    <div className="h-[28px] relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.5)] shrink-0 w-full">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[28px] left-[65.75px] text-[20px] text-center text-nowrap text-white top-0 translate-x-[-50%]">{text}</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[105.594px] left-0 shadow-[0px_2px_16px_0px_rgba(61,61,107,0.15)] top-0 w-[345px]" data-name="Heading 1">
      <p className="absolute font-['Poppins:Black',sans-serif] leading-[52.8px] left-[172.56px] not-italic text-[#3d3d6b] text-[48px] text-center top-[2px] tracking-[-0.96px] translate-x-[-50%] w-[235px]">Divine Guidance</p>
    </div>
  );
}

function Container() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] h-[4px] left-[124.5px] rounded-[3.35544e+07px] shadow-[0px_2px_10px_0px_rgba(122,79,255,0.3)] to-[#ffd369] top-[121.59px] w-[96px]" data-name="Container" />;
}

function Paragraph() {
  return (
    <div className="absolute h-[22.391px] left-0 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.05)] top-[141.59px] w-[345px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.4px] left-[172.66px] text-[#4a5565] text-[14px] text-center text-nowrap top-0 translate-x-[-50%]">Find a personal companion, made just for you.</p>
    </div>
  );
}

function Section() {
  return (
    <div className="absolute h-[163.984px] left-[24px] top-[48px] w-[345px]" data-name="Section">
      <Heading />
      <Container />
      <Paragraph />
    </div>
  );
}

function Chat() {
  return <div className="h-0 rounded-[24px] shrink-0 w-full" data-name="Chat2" />;
}

function Chat1() {
  return (
    <div className="absolute h-[400.5px] left-[2px] top-[2px] w-[341px]" data-name="Chat2">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgChat2} />
    </div>
  );
}

function Chat2() {
  return <div className="absolute h-[400.5px] left-[2px] top-[2px] w-[341px]" data-name="Chat2" style={{ backgroundImage: "linear-gradient(130.412deg, rgba(122, 79, 255, 0.7) 0%, rgba(122, 79, 255, 0.6) 50%, rgba(255, 211, 105, 0.5) 100%)" }} />;
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <div className="absolute inset-[-8.33%_-20.84%_-33.33%_-20.83%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.334 45.334">
          <g filter="url(#filter0_d_4487_2347)" id="Icon">
            <path d={svgPaths.p2a9e0c80} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            <path d="M33.3313 6.66699V12.0003" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            <path d="M35.998 9.33366H30.6646" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            <path d="M11.998 25.3337V28.0003" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            <path d="M13.3313 26.667H10.6646" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_4487_2347" width="48" x="-1.33537" y="-1.33301">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4487_2347" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4487_2347" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center left-[106.5px] p-px rounded-[16px] size-[64px] top-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <Icon />
    </div>
  );
}

function Heading2() {
  return (
    <div className="absolute h-[72px] left-0 shadow-[0px_4px_8px_0px_rgba(0,0,0,0.15)] top-[80px] w-[277px]" data-name="Heading 3">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[36px] left-[138.78px] not-italic text-[24px] text-center text-white top-px translate-x-[-50%] w-[209px]">Find Your Perfect Guide</p>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[63px] left-0 shadow-[0px_3px_6px_0px_rgba(0,0,0,0.12)] top-[160px] w-[277px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[21px] left-[138.75px] text-[14px] text-[rgba(255,255,255,0.9)] text-center top-0 translate-x-[-50%] w-[251px]">Discover a personalized spiritual companion tailored to your faith, goals, and spiritual journey</p>
    </div>
  );
}

function Icon1() {
  return (
    <IconBackgroundImage1 additionalClassNames="relative shrink-0">
      <g clipPath="url(#clip0_4487_2338)" id="Icon">
        <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d={svgPaths.p17134c00} id="Vector_2" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
      <defs>
        <clipPath id="clip0_4487_2338">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </IconBackgroundImage1>
  );
}

function Text() {
  return (
    <BackgroundImage1 additionalClassNames="w-[132.469px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[19.5px] left-[66.5px] text-[13px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-0 translate-x-[-50%]">AI-powered matching</p>
    </BackgroundImage1>
  );
}

function Text1() {
  return (
    <BackgroundImage1 additionalClassNames="w-[4.641px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[19.5px] left-[2.5px] text-[13px] text-[rgba(255,255,255,0.4)] text-center text-nowrap top-0 translate-x-[-50%]">•</p>
    </BackgroundImage1>
  );
}

function Text2() {
  return (
    <BackgroundImage1 additionalClassNames="w-[64.938px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[19.5px] left-[32.5px] text-[13px] text-[rgba(255,255,255,0.8)] text-center text-nowrap top-0 translate-x-[-50%]">50+ guides</p>
    </BackgroundImage1>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[19.5px] items-center justify-center left-0 pl-0 pr-[0.016px] py-0 top-[243px] w-[277px]" data-name="Container">
      <Icon1 />
      <Text />
      <Text1 />
      <Icon1 />
      <Text2 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[173.16px] size-[20px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M7.5 15L12.5 10L7.5 5" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.3)] border-solid h-[50px] left-[28.92px] rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] top-[286.5px] w-[219.156px]" data-name="Container">
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[24px] left-[95px] not-italic text-[16px] text-center text-nowrap text-white top-[12px] translate-x-[-50%]">Start your Search</p>
      <Icon2 />
    </div>
  );
}

function Chat3() {
  return (
    <div className="absolute h-[336.5px] left-[34px] top-[34px] w-[277px]" data-name="Chat2">
      <Container1 />
      <Heading2 />
      <Paragraph1 />
      <Container2 />
      <Container3 />
    </div>
  );
}

function Card() {
  return (
    <div className="bg-[#1b1b1b] h-[404.5px] relative rounded-[24px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <Chat1 />
        <Chat2 />
        <Chat3 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[rgba(122,79,255,0.3)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1),0px_8px_10px_-6px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[444.5px] items-start left-0 px-[24px] py-0 top-[251.98px] w-[393px]" data-name="Section">
      <Chat />
      <Card />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <div className="absolute inset-[-15.83%_-35.83%_-55.83%_-35.83%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.3333 34.3333">
          <g clipPath="url(#clip0_4487_2330)" filter="url(#filter0_d_4487_2330)" id="Icon">
            <path d={svgPaths.pd78fc0} id="Vector" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p3027b100} id="Vector_2" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p9025200} id="Vector_3" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d="M10.5 21.5H23.8333" id="Vector_4" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p233b8d80} id="Vector_5" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p32a16580} id="Vector_6" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="36" id="filter0_d_4487_2330" width="36" x="-0.833333" y="-0.833333">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_4487_2330" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_4487_2330" mode="normal" result="shape" />
            </filter>
            <clipPath id="clip0_4487_2330">
              <rect fill="white" height="20" transform="translate(7.16667 3.16667)" width="20" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="bg-gradient-to-r from-[#fe9a00] relative rounded-[14px] shadow-[0px_4px_15px_0px_rgba(255,211,105,0.5)] shrink-0 size-[40px] to-[#ffd369]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[22px] relative shrink-0 w-[198.766px]" data-name="Heading 2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Poppins:Black',sans-serif] leading-[22px] left-0 not-italic text-[#3d3d6b] text-[20px] text-nowrap top-px tracking-[-0.4px]">Track Your Journey</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-0 top-0 w-[361px]" data-name="Container">
      <Container4 />
      <Heading1 />
    </div>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage1 additionalClassNames="absolute left-[72.52px] top-[8px]">
      <g id="Icon">
        <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #8E8E93)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
    </IconBackgroundImage1>
  );
}

function Button() {
  return (
    <div className="absolute h-[32px] left-0 rounded-[14px] top-[56px] w-[98.516px]" data-name="Button">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[36.5px] text-[#8e8e93] text-[14px] text-center text-nowrap top-[6px] translate-x-[-50%]">View All</p>
      <Icon4 />
    </div>
  );
}

function RecentAchievementsSection() {
  return (
    <div className="h-[88px] relative shrink-0 w-full" data-name="RecentAchievementsSection">
      <Container5 />
      <Button />
    </div>
  );
}

function RecentAchievementsSection1() {
  return <div className="absolute h-[696px] left-px opacity-50 top-px w-[359px]" data-name="RecentAchievementsSection" style={{ backgroundImage: "linear-gradient(117.285deg, rgba(255, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function RecentAchievementsSection2() {
  return <div className="absolute h-[696px] left-px opacity-60 top-px w-[359px]" data-name="RecentAchievementsSection" style={{ backgroundImage: "linear-gradient(117.285deg, rgba(122, 79, 255, 0.1) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container6() {
  return (
    <div className="h-[16px] relative shadow-[0px_0px_16px_0px_rgba(255,211,105,0.4)] shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[66.63px] text-[#ffd369] text-[12px] text-center text-nowrap top-0 tracking-[0.6px] translate-x-[-50%] uppercase">Badges</p>
    </div>
  );
}

function Container7() {
  return (
    <ContainerBackgroundImage additionalClassNames="[grid-area:1_/_1]">
      <ContainerBackgroundImageAndText text="12" />
      <Container6 />
    </ContainerBackgroundImage>
  );
}

function Container8() {
  return (
    <div className="h-[28px] relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.5)] shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[28px] left-[66.22px] text-[20px] text-center text-nowrap text-white top-0 translate-x-[-50%]">6</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[16px] relative shadow-[0px_0px_16px_0px_rgba(255,211,105,0.4)] shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[65.52px] text-[#ffd369] text-[12px] text-center text-nowrap top-0 tracking-[0.6px] translate-x-[-50%] uppercase">Faiths</p>
    </div>
  );
}

function Container10() {
  return (
    <ContainerBackgroundImage additionalClassNames="[grid-area:1_/_2]">
      <Container8 />
      <Container9 />
    </ContainerBackgroundImage>
  );
}

function Container11() {
  return (
    <div className="h-[16px] relative shadow-[0px_0px_16px_0px_rgba(255,211,105,0.4)] shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[65.75px] text-[#ffd369] text-[12px] text-center text-nowrap top-0 tracking-[0.6px] translate-x-[-50%] uppercase">Chats</p>
    </div>
  );
}

function Container12() {
  return (
    <ContainerBackgroundImage additionalClassNames="[grid-area:2_/_1]">
      <ContainerBackgroundImageAndText text="12" />
      <Container11 />
    </ContainerBackgroundImage>
  );
}

function Container13() {
  return (
    <div className="h-[28px] relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.5)] shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[28px] left-[65.92px] text-[20px] text-center text-white top-0 translate-x-[-50%] w-[31px]">12h</p>
    </div>
  );
}

function Container14() {
  return (
    <ContainerBackgroundImage additionalClassNames="[grid-area:2_/_2]">
      <Container13 />
      <ContainerBackgroundImageAndText1 text="Time" />
    </ContainerBackgroundImage>
  );
}

function Container15() {
  return (
    <div className="h-[28px] relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.5)] shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[28px] left-[65.84px] text-[20px] text-center text-nowrap text-white top-0 translate-x-[-50%]">1452</p>
    </div>
  );
}

function Container16() {
  return (
    <ContainerBackgroundImage additionalClassNames="[grid-area:3_/_1]">
      <Container15 />
      <ContainerBackgroundImageAndText1 text="Wisdom" />
    </ContainerBackgroundImage>
  );
}

function Container17() {
  return (
    <div className="h-[28px] relative shadow-[0px_1px_6px_0px_rgba(0,0,0,0.5)] shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[28px] left-[66.13px] text-[20px] text-center text-nowrap text-white top-0 translate-x-[-50%]">0</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[16px] relative shadow-[0px_0px_16px_0px_rgba(255,211,105,0.4)] shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[65.8px] text-[#ffd369] text-[12px] text-center text-nowrap top-0 tracking-[0.6px] translate-x-[-50%] uppercase">Messages</p>
    </div>
  );
}

function Container19() {
  return (
    <ContainerBackgroundImage additionalClassNames="[grid-area:3_/_2]">
      <Container17 />
      <Container18 />
    </ContainerBackgroundImage>
  );
}

function Container20() {
  return (
    <div className="gap-[12px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] h-[246px] relative shrink-0 w-full" data-name="Container">
      <Container7 />
      <Container10 />
      <Container12 />
      <Container14 />
      <Container16 />
      <Container19 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p1c5a5a40} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p2303e280} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p3448af00} id="Vector_3" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M5.33333 29.3333H26.6667" id="Vector_4" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1421cb00} id="Vector_5" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.pe3ecb00} id="Vector_6" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#1e3a5f] items-center justify-center left-[131.5px] rounded-[3.35544e+07px] size-[64px] to-[#0f2346] top-[32px]" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[24px] left-0 top-[112px] w-[327px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24px] left-[163.8px] text-[#cad5e2] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Start Your Journey</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[40px] left-0 top-[144px] w-[327px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[163.5px] text-[#90a1b9] text-[14px] text-center top-0 translate-x-[-50%] w-[277px]">Explore different faith traditions and unlock achievements as you grow spiritually</p>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[216px] relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[143.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#90a1b9] text-[12px] text-nowrap top-0">Spiritual Journey Progress</p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[101.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#ffd369] text-[12px] top-0 w-[102px]">12 / 20 Milestones</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text3 />
      <Text4 />
    </div>
  );
}

function Container24() {
  return <div className="bg-gradient-to-b from-[#7a4fff] h-[8px] rounded-[3.35544e+07px] shrink-0 to-[#ffd369] w-full" data-name="Container" />;
}

function Container25() {
  return (
    <div className="bg-[rgba(30,58,95,0.3)] h-[8px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="content-stretch flex flex-col items-start pl-0 pr-[130.813px] py-0 relative size-full">
          <Container24 />
        </div>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[57px] items-start pb-0 pt-[25px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(30,58,95,0.3)] border-solid inset-0 pointer-events-none" />
      <Container23 />
      <Container25 />
    </div>
  );
}

function Icon6() {
  return (
    <IconBackgroundImage1 additionalClassNames="absolute left-[74.5px] top-[16px]">
      <g clipPath="url(#clip0_4487_2390)" id="Icon">
        <path d={svgPaths.p319d7580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M13.3333 2V4.66667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M14.6667 3.33333H12" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M3.33333 12H2" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
      <defs>
        <clipPath id="clip0_4487_2390">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </IconBackgroundImage1>
  );
}

function Button1() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] relative rounded-[8px] shadow-[0px_4px_15px_0px_rgba(122,79,255,0.4)] shrink-0 to-[#ffd369] w-full" data-name="Button">
      <Icon6 />
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[179.5px] text-[14px] text-center text-nowrap text-white top-[14px] translate-x-[-50%]">Upgrade Your Journey</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex flex-col h-[73px] items-start pb-0 pt-[25px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(30,58,95,0.3)] border-solid inset-0 pointer-events-none" />
      <Button1 />
    </div>
  );
}

function RecentAchievementsSection3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[696px] items-start left-px pb-0 pt-[16px] px-[16px] top-px w-[359px]" data-name="RecentAchievementsSection">
      <Container20 />
      <Container22 />
      <Container26 />
      <Container27 />
    </div>
  );
}

function Card1() {
  return (
    <div className="h-[698px] relative rounded-[24px] shrink-0 w-full" data-name="Card" style={{ backgroundImage: "linear-gradient(117.348deg, rgba(10, 61, 77, 0.85) 0%, rgba(58, 95, 125, 0.9) 30%, rgba(42, 58, 90, 0.9) 70%, rgba(26, 26, 58, 0.95) 100%)" }}>
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <RecentAchievementsSection1 />
        <RecentAchievementsSection2 />
        <RecentAchievementsSection3 />
      </div>
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0px_1px_1px_0px_rgba(255,255,255,0.1)]" />
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.1)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_0px_0px_2px_rgba(212,121,63,0.6),0px_20px_50px_0px_rgba(0,0,0,0.4)]" />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[810px] items-start left-0 px-[16px] py-0 top-[728.48px] w-[393px]" data-name="Container">
      <RecentAchievementsSection />
      <Card1 />
    </div>
  );
}

function Chat4() {
  return (
    <div className="bg-[#f5f7fa] h-[1698.484px] relative shrink-0 w-full" data-name="Chat2">
      <Section />
      <Section1 />
      <Container28 />
    </div>
  );
}

function AppContent() {
  return (
    <div className="absolute bg-[#121212] content-stretch flex flex-col h-[1771.484px] items-start left-0 pb-0 pt-[73px] px-0 top-0 w-[393px]" data-name="AppContent">
      <Chat4 />
    </div>
  );
}

function Chat5() {
  return (
    <div className="absolute h-[852px] left-0 opacity-30 top-[676px] w-[393px]" data-name="Chat2">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgChat3} />
    </div>
  );
}

function ImageDivinityAgi() {
  return (
    <div className="h-[44px] relative shrink-0 w-[71.609px]" data-name="Image (DivinityAGI)">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgImageDivinityAgi} />
    </div>
  );
}

function Icon7() {
  return (
    <IconBackgroundImage additionalClassNames="absolute left-[16px] top-[18px]">
      <path d="M5 1H7" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 7L7.5 5.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p5139500} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage>
  );
}

function Badge() {
  return (
    <div className="bg-gradient-to-b from-[#6b5dd3] h-[48px] relative rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] shrink-0 to-[#ffb84d] w-[109.969px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Icon7 />
        <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[40px] text-[14px] text-white top-[14px] w-[54px]">250 MIN</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <ImageDivinityAgi />
      <Badge />
    </div>
  );
}

function AppHeader() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[73px] items-start left-0 pb-px pt-[12px] px-[16px] top-[676px] w-[393px]" data-name="AppHeader">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(107,93,211,0.1)] border-solid inset-0 pointer-events-none shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)]" />
      <Container29 />
    </div>
  );
}

function Icon8() {
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
      <Icon8 />
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
    <div className="absolute h-[56px] left-[7.41px] rounded-[16px] top-[14px] w-[55.047px]" data-name="Button">
      <BottomNavigation />
      <BottomNavigation1 />
    </div>
  );
}

function Icon9() {
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
      <Icon9 />
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
    <div className="absolute h-[56px] left-[69.28px] rounded-[16px] top-[14px] w-[48.328px]" data-name="Button">
      <BottomNavigation2 />
      <BottomNavigation3 />
    </div>
  );
}

function Container30() {
  return <div className="absolute bg-gradient-to-b border border-[rgba(107,93,211,0.2)] border-solid from-[#e8e5ff] h-[56px] left-0 rounded-[16px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] to-[#fff8e8] top-0 w-[81.313px]" data-name="Container" />;
}

function Container31() {
  return <div className="absolute bg-gradient-to-b from-[#6b5dd3] left-[37.66px] rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] size-[6px] to-[#ffb84d] top-[-4px]" data-name="Container" />;
}

function Icon10() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_8.32%_8.33%_8.34%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3338 18.3338">
            <path d={svgPaths.p3937b100} id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_16.67%_70.83%_83.33%]" data-name="Vector">
        <div className="absolute inset-[-25%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 5">
            <path d="M0.833333 0.833333V4.16667" id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[79.17%] left-3/4 right-[8.33%] top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-0.83px_-25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5 1.66667">
            <path d="M4.16667 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[70.83%_83.33%_20.83%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66667 3.33333">
            <path d="M0.833333 0.833333V2.5" id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[12.5%] right-[79.17%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-0.83px_-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 3.33333 1.66667">
            <path d="M2.5 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function BottomNavigation4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[30.66px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon10 />
    </div>
  );
}

function BottomNavigation5() {
  return (
    <div className="absolute h-[16px] left-[8px] top-[32px] w-[65.313px]" data-name="BottomNavigation">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[16px] left-[33px] text-[#6b5dd3] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Companion</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[60px] left-[124.44px] rounded-[16px] top-[12px] w-[81.313px]" data-name="Button">
      <Container30 />
      <Container31 />
      <BottomNavigation4 />
      <BottomNavigation5 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[41.67%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
        <BackgroundImage additionalClassNames="absolute inset-[-8.33%]">
          <path d={svgPaths.p77fa900} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </BackgroundImage>
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
      <Icon12VectorBackgroundImage additionalClassNames="left-1/2 right-[20.83%]">
        <path d={svgPaths.p18da42f0} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon12VectorBackgroundImage>
      <Icon12VectorBackgroundImage additionalClassNames="left-[20.83%] right-1/2">
        <path d={svgPaths.p115f4d00} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon12VectorBackgroundImage>
    </div>
  );
}

function BottomNavigation6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13.09px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon11 />
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
    <div className="absolute h-[56px] left-[212.58px] rounded-[16px] top-[14px] w-[46.188px]" data-name="Button">
      <BottomNavigation6 />
      <BottomNavigation7 />
    </div>
  );
}

function Icon12() {
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
      <Icon12 />
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
    <div className="absolute h-[56px] left-[265.59px] rounded-[16px] top-[14px] w-[61.531px]" data-name="Button">
      <BottomNavigation8 />
      <BottomNavigation9 />
    </div>
  );
}

function Icon13() {
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
      <Icon13 />
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
    <div className="absolute h-[56px] left-[333.95px] rounded-[16px] top-[14px] w-[51.594px]" data-name="Button">
      <BottomNavigation10 />
      <BottomNavigation11 />
    </div>
  );
}

function Container32() {
  return (
    <div className="absolute h-[84px] left-0 top-0 w-[393px]" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Container33() {
  return <div className="absolute bg-gradient-to-t from-[rgba(107,93,211,0.05)] h-[84px] left-0 to-[rgba(0,0,0,0)] top-0 w-[393px]" data-name="Container" />;
}

function Icon14() {
  return (
    <IconBackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p2e69df00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage>
  );
}

function Text5() {
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
      <Icon14 />
      <Text5 />
    </div>
  );
}

function BottomNavigation12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-[1px_0px_0px] border-[rgba(107,93,211,0.1)] border-solid h-[85px] left-0 shadow-[0px_16px_48px_0px_rgba(107,93,211,0.2)] top-[1443px] w-[393px]" data-name="BottomNavigation">
      <Container32 />
      <Container33 />
      <CrisisSupportButton />
    </div>
  );
}

export default function DivinityAgiSpiritGuideAppVersion() {
  return (
    <div className="bg-[#121212] relative size-full" data-name="DivinityAGI Spirit Guide App Version 12-7">
      <AppContent />
      <Chat5 />
      <AppHeader />
      <BottomNavigation12 />
    </div>
  );
}