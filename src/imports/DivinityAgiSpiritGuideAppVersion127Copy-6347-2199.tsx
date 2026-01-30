import svgPaths from "./svg-ille3nfoni";
import clsx from "clsx";
import imgQuietSpacePage from "figma:asset/f098820f60f3b6f83ca867296518d584a3c9ff25.png";
import imgQuietSpacePage1 from "figma:asset/7afbeb4dd1f867c58d7a82f431872b9d4f4a118c.png";
import imgQuietSpacePage2 from "figma:asset/c5a60ed7a53c599749be009656d2c71f19da48de.png";
import imgQuietSpacePage3 from "figma:asset/66213b0e2aead2b33cc7a0499ed94f049e04a4ec.png";
import imgQuietSpacePage4 from "figma:asset/512f273f2795a9239b512f49a8c64bf324c3f045.png";
import imgQuietSpacePage5 from "figma:asset/ed77d541ad10573d7738844500cebaa048e3641f.png";
import imgQuietSpacePage6 from "figma:asset/14a049346d5ae8a42a12b308f26af3521f4028ac.png";
import imgImageDivinityAgi from "figma:asset/8a5c5551533b1297b98345f7179a0a7cc8223ad5.png";

function ContainerBackgroundImage1({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="basis-0 grow h-[45.703px] min-h-px min-w-px relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage8Props = {
  additionalClassNames?: string;
};

function BackgroundImage8({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage8Props>) {
  return (
    <div className={clsx("relative rounded-[10px] shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">{children}</div>
    </div>
  );
}
type BackgroundImage7Props = {
  additionalClassNames?: string;
};

function BackgroundImage7({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage7Props>) {
  return (
    <div className={clsx("relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">{children}</div>
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
type BackgroundImage3Props = {
  additionalClassNames?: string;
};

function BackgroundImage3({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage3Props>) {
  return (
    <div className={clsx("size-[16px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
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
    <div className={clsx("size-[20px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        {children}
      </svg>
    </div>
  );
}
type Icon37VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function Icon37VectorBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon37VectorBackgroundImageProps>) {
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
type ButtonBackgroundImageProps = {
  additionalClassNames?: string;
};

function ButtonBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<ButtonBackgroundImageProps>) {
  return (
    <div className={clsx("bg-gradient-to-r h-[79.703px] relative rounded-[14px] shrink-0 w-full", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[13px] py-px relative size-full">{children}</div>
      </div>
    </div>
  );
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <BackgroundImage2 additionalClassNames={additionalClassNames}>
      <g id="Icon">{children}</g>
    </BackgroundImage2>
  );
}
type BackgroundImageProps = {
  additionalClassNames?: string;
};

function BackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImageProps>) {
  return (
    <BackgroundImage3 additionalClassNames={additionalClassNames}>
      <g id="Icon">{children}</g>
    </BackgroundImage3>
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

function IconBackgroundImage3() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <div className="absolute inset-[-20.83%_-45.83%_-70.83%_-45.83%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30.6667 30.6667">
          <g clipPath="url(#clip0_6347_1068)" filter="url(#filter0_d_6347_1068)" id="Icon">
            <path d={svgPaths.p2831e100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
            <path d={svgPaths.p46b5c80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="32" id="filter0_d_6347_1068" width="32" x="-0.666667" y="-0.666667">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_6347_1068" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_6347_1068" mode="normal" result="shape" />
            </filter>
            <clipPath id="clip0_6347_1068">
              <rect fill="white" height="16" transform="translate(7.33333 3.33333)" width="16" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function IconBackgroundImage2() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}
type ContainerBackgroundImageAndText2Props = {
  text: string;
};

function ContainerBackgroundImageAndText2({ text }: ContainerBackgroundImageAndText2Props) {
  return (
    <div className="h-[20px] relative shrink-0 w-full">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[14px] text-[rgba(255,255,255,0.7)] text-nowrap top-0">{text}</p>
    </div>
  );
}
type ContainerBackgroundImageAndText1Props = {
  text: string;
};

function ContainerBackgroundImageAndText1({ text }: ContainerBackgroundImageAndText1Props) {
  return (
    <div className="h-[25.703px] relative shrink-0 w-full">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[25.714px] left-0 text-[18px] text-nowrap text-white top-0">{text}</p>
    </div>
  );
}

function IconBackgroundImage1() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.8" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}
type BackgroundImageAndTextProps = {
  text: string;
};

function BackgroundImageAndText({ text }: BackgroundImageAndTextProps) {
  return (
    <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
      <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[15px] relative shrink-0 text-[10px] text-nowrap text-white">{text}</p>
    </div>
  );
}

function ContainerBackgroundImage() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.2)] content-stretch flex items-center justify-center left-[110.5px] p-px rounded-[14px] size-[40px] top-[16px]">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <IconBackgroundImage />
    </div>
  );
}

function IconBackgroundImage() {
  return (
    <BackgroundImage1 additionalClassNames="relative shrink-0">
      <path d="M13.3333 5L16.6667 16.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M10 5V16.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M6.66667 6.66667V16.6667" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d="M3.33333 3.33333V16.6667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage1>
  );
}
type TextBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function TextBackgroundImageAndText({ text, additionalClassNames = "" }: TextBackgroundImageAndTextProps) {
  return (
    <BackgroundImage6 additionalClassNames={clsx("h-[18px] relative shrink-0", additionalClassNames)}>
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-[rgba(255,255,255,0.8)] text-nowrap top-0">{text}</p>
    </BackgroundImage6>
  );
}
type TrackYourJourneySectionBackgroundImageAndTextProps = {
  text: string;
};

function TrackYourJourneySectionBackgroundImageAndText({ text }: TrackYourJourneySectionBackgroundImageAndTextProps) {
  return (
    <div className="absolute h-[42px] left-[17px] top-[69px] w-[107.5px]">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[42px] left-[54.14px] text-[28px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%]">{text}</p>
    </div>
  );
}
type ContainerBackgroundImageAndTextProps = {
  text: string;
};

function ContainerBackgroundImageAndText({ text }: ContainerBackgroundImageAndTextProps) {
  return (
    <div className="h-[32px] relative shrink-0 w-full">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[32px] left-[32.31px] text-[24px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%]">{text}</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="absolute h-[52.797px] left-0 top-0 w-[345px]" data-name="Heading 1">
      <p className="absolute font-['Poppins:Black',sans-serif] leading-[52.8px] left-[172.03px] not-italic text-[#3d3d6b] text-[48px] text-center text-nowrap top-[2px] tracking-[-0.96px] translate-x-[-50%]">Quiet Space</p>
    </div>
  );
}

function Container() {
  return <div className="absolute bg-gradient-to-b from-[#7a4fff] h-[4px] left-[124.5px] rounded-[3.35544e+07px] to-[#ffd369] top-[68.8px] w-[96px]" data-name="Container" />;
}

function Paragraph() {
  return (
    <div className="absolute h-[44.781px] left-0 top-[88.8px] w-[345px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[22.4px] left-[172.84px] text-[#4a5565] text-[14px] text-center top-0 translate-x-[-50%] w-[300px]">Find peace through meditation, breathing, and mindfulness in a Sacred Quiet Space.</p>
    </div>
  );
}

function Section() {
  return (
    <div className="absolute h-[133.578px] left-[24px] top-[48px] w-[345px]" data-name="Section">
      <Heading />
      <Container />
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <div className="absolute inset-[-15.83%_-35.83%_-55.83%_-35.83%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.3333 34.3333">
          <g clipPath="url(#clip0_6347_1060)" filter="url(#filter0_d_6347_1060)" id="Icon">
            <path d={svgPaths.p22094bc0} id="Vector" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.pc365800} id="Vector_2" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p9025200} id="Vector_3" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d="M10.5 21.5H23.8333" id="Vector_4" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p233b8d80} id="Vector_5" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
            <path d={svgPaths.p32a16580} id="Vector_6" stroke="var(--stroke-0, #0F172B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="36" id="filter0_d_6347_1060" width="36" x="-0.833333" y="-0.833333">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_6347_1060" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_6347_1060" mode="normal" result="shape" />
            </filter>
            <clipPath id="clip0_6347_1060">
              <rect fill="white" height="20" transform="translate(7.16667 3.16667)" width="20" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-gradient-to-r from-[#fe9a00] h-[40px] relative rounded-[14px] shadow-[0px_4px_15px_0px_rgba(255,211,105,0.5)] shrink-0 to-[#ffd369] w-[33.672px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-0 pr-[0.016px] py-0 relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <BackgroundImage4 additionalClassNames="h-[52.781px]">
      <p className="absolute font-['Poppins:Black',sans-serif] leading-[26.4px] left-0 not-italic text-[#3d3d6b] text-[24px] top-0 tracking-[-0.48px] w-[134px]">Track Your Journey</p>
    </BackgroundImage4>
  );
}

function Container2() {
  return (
    <BackgroundImage7 additionalClassNames="h-[52.781px] w-[246.484px]">
      <Container1 />
      <Heading1 />
    </BackgroundImage7>
  );
}

function Icon1() {
  return (
    <BackgroundImage additionalClassNames="absolute left-[72.52px] top-[8px]">
      <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #8E8E93)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button() {
  return (
    <BackgroundImage5 additionalClassNames="h-[32px] rounded-[14px] w-[98.516px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[36.5px] text-[#8e8e93] text-[14px] text-center text-nowrap top-[6px] translate-x-[-50%]">View All</p>
      <Icon1 />
    </BackgroundImage5>
  );
}

function TrackYourJourneySection() {
  return (
    <div className="content-stretch flex h-[52.781px] items-center justify-between relative shrink-0 w-full" data-name="TrackYourJourneySection">
      <Container2 />
      <Button />
    </div>
  );
}

function TrackYourJourneySection1() {
  return <div className="absolute h-[796px] left-px opacity-80 top-px w-[343px]" data-name="TrackYourJourneySection" style={{ backgroundImage: "linear-gradient(113.311deg, rgba(122, 79, 255, 0.08) 0%, rgba(0, 0, 0, 0) 100%)" }} />;
}

function Container3() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[33.05px] text-[#ffd369] text-[12px] text-center text-nowrap top-0 tracking-[0.6px] translate-x-[-50%] uppercase">Badges</p>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute bg-[rgba(30,58,95,0.4)] content-stretch flex flex-col gap-[4px] h-[78px] items-start left-0 pb-px pt-[13px] px-[13px] rounded-[14px] top-0 w-[90.328px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.6)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <ContainerBackgroundImageAndText text="0" />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[31.92px] text-[#ffd369] text-[12px] text-center text-nowrap top-0 tracking-[0.6px] translate-x-[-50%] uppercase">Faiths</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute bg-[rgba(30,58,95,0.4)] content-stretch flex flex-col gap-[4px] h-[78px] items-start left-[102.33px] pb-px pt-[13px] px-[13px] rounded-[14px] top-0 w-[90.328px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.6)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <ContainerBackgroundImageAndText text="0" />
      <Container5 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[32px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[32px] left-[32.28px] text-[24px] text-center text-nowrap text-white top-[-1px] translate-x-[-50%]">12</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[32.17px] text-[#ffd369] text-[12px] text-center text-nowrap top-0 tracking-[0.6px] translate-x-[-50%] uppercase">Chats</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute bg-[rgba(30,58,95,0.4)] content-stretch flex flex-col gap-[4px] h-[78px] items-start left-[204.66px] pb-px pt-[13px] px-[13px] rounded-[14px] top-0 w-[90.344px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.6)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[78px] relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Container6 />
      <Container9 />
    </div>
  );
}

function Icon2() {
  return (
    <BackgroundImage1 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p15c4bf00} id="Vector" stroke="var(--stroke-0, #FF8904)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage1>
  );
}

function TrackYourJourneySection2() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[50.75px] rounded-[10px] size-[40px] top-[17px]" data-name="TrackYourJourneySection" style={{ backgroundImage: "linear-gradient(135deg, rgba(255, 105, 0, 0.1) 0%, rgba(245, 73, 0, 0.1) 100%)" }}>
      <Icon2 />
    </div>
  );
}

function TrackYourJourneySection3() {
  return (
    <div className="absolute h-[16.5px] left-[17px] top-[115px] w-[107.5px]" data-name="TrackYourJourneySection">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16.5px] left-[53.75px] text-[#ffd369] text-[11px] text-center text-nowrap top-[-1px] tracking-[0.55px] translate-x-[-50%] uppercase">Day Streak</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(30,58,95,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.6)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <TrackYourJourneySection2 />
      <TrackYourJourneySectionBackgroundImageAndText text="0" />
      <TrackYourJourneySection3 />
    </div>
  );
}

function Icon3() {
  return (
    <BackgroundImage2 additionalClassNames="relative shrink-0">
      <g clipPath="url(#clip0_6347_1087)" id="Icon">
        <path d="M10 5V10L13.3333 11.6667" id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        <path d={svgPaths.p14d24500} id="Vector_2" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </g>
      <defs>
        <clipPath id="clip0_6347_1087">
          <rect fill="white" height="20" width="20" />
        </clipPath>
      </defs>
    </BackgroundImage2>
  );
}

function TrackYourJourneySection4() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[50.75px] rounded-[10px] size-[40px] top-[17px]" data-name="TrackYourJourneySection" style={{ backgroundImage: "linear-gradient(135deg, rgba(240, 177, 0, 0.1) 0%, rgba(208, 135, 0, 0.1) 100%)" }}>
      <Icon3 />
    </div>
  );
}

function TrackYourJourneySection5() {
  return (
    <div className="absolute h-[16.5px] left-[17px] top-[115px] w-[107.5px]" data-name="TrackYourJourneySection">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16.5px] left-[54.72px] text-[#ffd369] text-[11px] text-center text-nowrap top-[-1px] tracking-[0.55px] translate-x-[-50%] uppercase">Minutes</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="[grid-area:1_/_2] bg-[rgba(30,58,95,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.6)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <TrackYourJourneySection4 />
      <TrackYourJourneySectionBackgroundImageAndText text="0" />
      <TrackYourJourneySection5 />
    </div>
  );
}

function Icon4() {
  return (
    <BackgroundImage1 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p2e533fc0} id="Vector" stroke="var(--stroke-0, #05DF72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p809b580} id="Vector_2" stroke="var(--stroke-0, #05DF72)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage1>
  );
}

function TrackYourJourneySection6() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[50.75px] rounded-[10px] size-[40px] top-[17px]" data-name="TrackYourJourneySection" style={{ backgroundImage: "linear-gradient(135deg, rgba(0, 201, 80, 0.1) 0%, rgba(0, 166, 62, 0.1) 100%)" }}>
      <Icon4 />
    </div>
  );
}

function TrackYourJourneySection7() {
  return (
    <div className="absolute h-[16.5px] left-[17px] top-[115px] w-[107.5px]" data-name="TrackYourJourneySection">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16.5px] left-[54.63px] text-[#ffd369] text-[11px] text-center text-nowrap top-[-1px] tracking-[0.55px] translate-x-[-50%] uppercase">Sessions</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="[grid-area:2_/_1] bg-[rgba(30,58,95,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.6)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <TrackYourJourneySection6 />
      <TrackYourJourneySectionBackgroundImageAndText text="0" />
      <TrackYourJourneySection7 />
    </div>
  );
}

function Icon5() {
  return (
    <BackgroundImage1 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p3ac0b600} id="Vector" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      <path d={svgPaths.p3c797180} id="Vector_2" stroke="var(--stroke-0, #51A2FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage1>
  );
}

function TrackYourJourneySection8() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[50.75px] rounded-[10px] size-[40px] top-[17px]" data-name="TrackYourJourneySection" style={{ backgroundImage: "linear-gradient(135deg, rgba(43, 127, 255, 0.1) 0%, rgba(21, 93, 252, 0.1) 100%)" }}>
      <Icon5 />
    </div>
  );
}

function TrackYourJourneySection9() {
  return (
    <div className="absolute h-[16.5px] left-[17px] top-[115px] w-[107.5px]" data-name="TrackYourJourneySection">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16.5px] left-[53.92px] text-[#ffd369] text-[11px] text-center text-nowrap top-[-1px] tracking-[0.55px] translate-x-[-50%] uppercase">Best Streak</p>
    </div>
  );
}

function Container14() {
  return (
    <div className="[grid-area:2_/_2] bg-[rgba(30,58,95,0.4)] place-self-stretch relative rounded-[14px] shrink-0" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[rgba(30,58,95,0.6)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <TrackYourJourneySection8 />
      <TrackYourJourneySectionBackgroundImageAndText text="0" />
      <TrackYourJourneySection9 />
    </div>
  );
}

function Container15() {
  return (
    <div className="gap-[12px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[309px] relative shrink-0 w-full" data-name="Container">
      <Container11 />
      <Container12 />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Icon">
          <path d={svgPaths.p29bcb300} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p267c9600} id="Vector_2" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p3448af00} id="Vector_3" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d="M5.33333 29.3333H26.6667" id="Vector_4" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.p1421cb00} id="Vector_5" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          <path d={svgPaths.pe3ecb00} id="Vector_6" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute bg-gradient-to-b content-stretch flex from-[#1e3a5f] items-center justify-center left-[115.5px] rounded-[3.35544e+07px] size-[64px] to-[#0f2346] top-[32px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[24px] left-0 top-[112px] w-[295px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[24px] left-[147.8px] text-[#cad5e2] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Start Your Journey</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[40px] left-0 top-[144px] w-[295px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[147.5px] text-[#90a1b9] text-[14px] text-center top-0 translate-x-[-50%] w-[277px]">Explore different faith traditions and unlock achievements as you grow spiritually</p>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[216px] relative shrink-0 w-full" data-name="Container">
      <Container16 />
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Icon7() {
  return (
    <BackgroundImage3 additionalClassNames="absolute left-[58.5px] top-[16px]">
      <g clipPath="url(#clip0_6313_923)" id="Icon">
        <path d={svgPaths.p319d7580} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M13.3333 2V4.66667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M14.6667 3.33333H12" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M3.33333 12H2" id="Vector_5" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
      <defs>
        <clipPath id="clip0_6313_923">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </BackgroundImage3>
  );
}

function Button1() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[48px] relative rounded-[8px] shadow-[0px_4px_15px_0px_rgba(122,79,255,0.4)] shrink-0 to-[#ffd369] w-full" data-name="Button">
      <Icon7 />
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[163.5px] text-[14px] text-center text-nowrap text-white top-[14px] translate-x-[-50%]">Upgrade Your Journey</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col h-[73px] items-start pb-0 pt-[25px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-[rgba(30,58,95,0.3)] border-solid inset-0 pointer-events-none" />
      <Button1 />
    </div>
  );
}

function TrackYourJourneySection10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[796px] items-start left-px pb-0 pt-[24px] px-[24px] top-px w-[343px]" data-name="TrackYourJourneySection">
      <Container10 />
      <Container15 />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Card() {
  return (
    <div className="h-[798px] relative rounded-[24px] shrink-0 w-full" data-name="Card" style={{ backgroundImage: "linear-gradient(rgba(10, 61, 77, 0.3) 0%, rgba(58, 95, 125, 0.3) 30%, rgba(42, 58, 90, 0.3) 70%, rgba(26, 26, 58, 0.4) 100%)" }}>
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <TrackYourJourneySection1 />
        <TrackYourJourneySection10 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.2)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_0px_0px_2px_rgba(212,121,63,0.3),0px_20px_50px_0px_rgba(0,0,0,0.2)]" />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[906.781px] items-start left-0 px-[24px] py-0 top-[1838.69px] w-[393px]" data-name="Container">
      <TrackYourJourneySection />
      <Card />
    </div>
  );
}

function Heading3() {
  return (
    <BackgroundImage5 additionalClassNames="h-[36px] w-[235.234px]">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[36px] left-0 not-italic text-[#3d3d6b] text-[24px] text-nowrap top-px">Your Saved Spaces</p>
    </BackgroundImage5>
  );
}

function Text() {
  return (
    <BackgroundImage5 additionalClassNames="h-[18px] w-[41.641px]">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[18px] left-0 text-[#6a7282] text-[12px] top-0 w-[42px]">1 saved</p>
    </BackgroundImage5>
  );
}

function QuietSpacePage() {
  return (
    <div className="content-stretch flex h-[36px] items-center justify-between relative shrink-0 w-full" data-name="QuietSpacePage">
      <Heading3 />
      <Text />
    </div>
  );
}

function QuietSpacePage1() {
  return (
    <div className="absolute h-[126px] left-px opacity-30 top-px w-[343px]" data-name="QuietSpacePage">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgQuietSpacePage} />
    </div>
  );
}

function QuietSpacePage2() {
  return <div className="absolute bg-gradient-to-r from-[rgba(122,79,255,0.8)] h-[126px] left-px to-[rgba(0,0,0,0)] top-px via-50% via-[rgba(122,79,255,0.6)] w-[343px]" data-name="QuietSpacePage" />;
}

function Heading2() {
  return (
    <div className="content-stretch flex h-[24px] items-start overflow-clip relative shrink-0 w-full" data-name="Heading 3">
      <p className="basis-0 font-['Poppins:SemiBold',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white">Christian Contemplative Prayer</p>
    </div>
  );
}

function Text1() {
  return (
    <BackgroundImage5 additionalClassNames="h-[18px] w-[36.188px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-[rgba(255,255,255,0.8)] top-0 w-[37px]">10 min</p>
    </BackgroundImage5>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[8px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <TextBackgroundImageAndText text="Christianity" additionalClassNames="w-[61.172px]" />
      <TextBackgroundImageAndText text="•" additionalClassNames="w-[4.219px]" />
      <Text1 />
    </div>
  );
}

function Container21() {
  return (
    <div className="basis-0 grow h-[46px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative size-full">
        <Heading2 />
        <Container20 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d="M12 4L4 12" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M4 4L12 12" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button2() {
  return (
    <BackgroundImage8 additionalClassNames="bg-[rgba(255,255,255,0.1)] opacity-0 size-[32px]">
      <Icon8 />
    </BackgroundImage8>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex h-[46px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container21 />
      <Button2 />
    </div>
  );
}

function Icon9() {
  return (
    <BackgroundImage additionalClassNames="absolute left-[49.11px] top-[10px]">
      <path d="M4 2L13.3333 8L4 14V2Z" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Button3() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(255,255,255,0.2)] place-self-stretch relative rounded-[10px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(255,255,255,0.3)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Icon9 />
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[18px] left-[89.11px] text-[12px] text-center text-nowrap text-white top-[9px] translate-x-[-50%]">Start</p>
    </div>
  );
}

function Icon10() {
  return (
    <BackgroundImage3 additionalClassNames="absolute left-[40.92px] top-[10px]">
      <g clipPath="url(#clip0_6347_2203)" id="Icon">
        <path d={svgPaths.p305fff00} id="Vector" stroke="var(--stroke-0, #3D3D6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M13.3333 2V4.66667" id="Vector_2" stroke="var(--stroke-0, #3D3D6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M14.6667 3.33333H12" id="Vector_3" stroke="var(--stroke-0, #3D3D6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="var(--stroke-0, #3D3D6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M3.33333 12H2" id="Vector_5" stroke="var(--stroke-0, #3D3D6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
      <defs>
        <clipPath id="clip0_6347_2203">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </BackgroundImage3>
  );
}

function Button4() {
  return (
    <div className="[grid-area:1_/_2] bg-gradient-to-r from-[#ffd369] place-self-stretch relative rounded-[10px] shrink-0 to-[#fe9a00]" data-name="Button">
      <Icon10 />
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[18px] left-[88.92px] text-[#3d3d6b] text-[12px] text-center text-nowrap top-[9px] translate-x-[-50%]">Feature</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="gap-[8px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[36px] relative shrink-0 w-full" data-name="Container">
      <Button3 />
      <Button4 />
    </div>
  );
}

function QuietSpacePage3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[126px] items-start left-px pb-0 pt-[16px] px-[16px] top-px w-[343px]" data-name="QuietSpacePage">
      <Container22 />
      <Container23 />
    </div>
  );
}

function Card1() {
  return (
    <div className="bg-[#1b1b1b] h-[128px] relative rounded-[14px] shrink-0 w-full" data-name="Card">
      <div className="overflow-clip relative rounded-[inherit] size-full">
        <QuietSpacePage1 />
        <QuietSpacePage2 />
        <QuietSpacePage3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(122,79,255,0.2)] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Section1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[204px] items-start left-0 px-[24px] py-0 top-[609.58px] w-[393px]" data-name="Section">
      <QuietSpacePage />
      <Card1 />
    </div>
  );
}

function QuietSpacePage4() {
  return (
    <div className="h-[42px] relative shrink-0 w-full" data-name="QuietSpacePage">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[42px] left-[172.88px] not-italic text-[#3d3d6b] text-[28px] text-center text-nowrap top-px translate-x-[-50%]">Guided Meditations</p>
    </div>
  );
}

function QuietSpacePage5() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[166.5px]" data-name="QuietSpacePage">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgQuietSpacePage} />
    </div>
  );
}

function QuietSpacePage6() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.95)] h-[192px] left-0 to-[rgba(255,211,105,0.19)] top-0 via-50% via-[rgba(255,211,105,0.5)] w-[166.5px]" data-name="QuietSpacePage" />;
}

function Heading4() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-white top-0 w-[126px]">Christian Contemplation</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-[rgba(255,255,255,0.9)] top-0 w-[117px]">Centering prayer and sacred reading</p>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[rgba(255,211,105,0.25)] h-[21px] relative rounded-[8px] shrink-0 w-[65.531px]" data-name="Badge">
      <BackgroundImageAndText text="2 sessions" />
      <div aria-hidden="true" className="absolute border border-[#ffd369] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Badge />
      <IconBackgroundImage1 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[117px] items-start left-[16px] top-[59px] w-[134.5px]" data-name="Container">
      <Heading4 />
      <Paragraph3 />
      <Container24 />
    </div>
  );
}

function QuietSpacePage7() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[166.5px]" data-name="QuietSpacePage">
      <ContainerBackgroundImage />
      <Container25 />
    </div>
  );
}

function Card2() {
  return (
    <div className="[grid-area:1_/_1] bg-[#1b1b1b] overflow-clip place-self-stretch relative rounded-[24px] shrink-0" data-name="Card">
      <QuietSpacePage5 />
      <QuietSpacePage6 />
      <QuietSpacePage7 />
    </div>
  );
}

function QuietSpacePage8() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[166.5px]" data-name="QuietSpacePage">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgQuietSpacePage1} />
    </div>
  );
}

function QuietSpacePage9() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.95)] h-[192px] left-0 to-[rgba(255,137,4,0.19)] top-0 via-50% via-[rgba(255,137,4,0.5)] w-[166.5px]" data-name="QuietSpacePage" />;
}

function Heading5() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-white top-0 w-[101px]">Buddhist Mindfulness</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-[rgba(255,255,255,0.9)] top-0 w-[116px]">Loving-kindness and awareness</p>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[rgba(255,137,4,0.25)] h-[21px] relative rounded-[8px] shrink-0 w-[65.531px]" data-name="Badge">
      <BackgroundImageAndText text="2 sessions" />
      <div aria-hidden="true" className="absolute border border-[#ff8904] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Badge1 />
      <IconBackgroundImage1 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[117px] items-start left-[16px] top-[59px] w-[134.5px]" data-name="Container">
      <Heading5 />
      <Paragraph4 />
      <Container26 />
    </div>
  );
}

function QuietSpacePage10() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[166.5px]" data-name="QuietSpacePage">
      <ContainerBackgroundImage />
      <Container27 />
    </div>
  );
}

function Card3() {
  return (
    <div className="[grid-area:1_/_2] bg-[#1b1b1b] overflow-clip place-self-stretch relative rounded-[24px] shrink-0" data-name="Card">
      <QuietSpacePage8 />
      <QuietSpacePage9 />
      <QuietSpacePage10 />
    </div>
  );
}

function QuietSpacePage11() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[166.5px]" data-name="QuietSpacePage">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgQuietSpacePage2} />
    </div>
  );
}

function QuietSpacePage12() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.95)] h-[192px] left-0 to-[rgba(5,223,114,0.19)] top-0 via-50% via-[rgba(5,223,114,0.5)] w-[166.5px]" data-name="QuietSpacePage" />;
}

function Heading6() {
  return (
    <div className="content-stretch flex h-[24px] items-start relative shrink-0 w-full" data-name="Heading 3">
      <p className="basis-0 font-['Poppins:Bold',sans-serif] grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[16px] text-white">Islamic Dhikr</p>
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-[rgba(255,255,255,0.9)] top-0 w-[118px]">Remembrance of the Divine</p>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[rgba(5,223,114,0.25)] h-[21px] relative rounded-[8px] shrink-0 w-[59.781px]" data-name="Badge">
      <BackgroundImageAndText text="1 session" />
      <div aria-hidden="true" className="absolute border border-[#05df72] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Badge2 />
      <IconBackgroundImage1 />
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[93px] items-start left-[16px] top-[83px] w-[134.5px]" data-name="Container">
      <Heading6 />
      <Paragraph5 />
      <Container28 />
    </div>
  );
}

function QuietSpacePage13() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[166.5px]" data-name="QuietSpacePage">
      <ContainerBackgroundImage />
      <Container29 />
    </div>
  );
}

function Card4() {
  return (
    <div className="[grid-area:2_/_1] bg-[#1b1b1b] overflow-clip place-self-stretch relative rounded-[24px] shrink-0" data-name="Card">
      <QuietSpacePage11 />
      <QuietSpacePage12 />
      <QuietSpacePage13 />
    </div>
  );
}

function QuietSpacePage14() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[166.5px]" data-name="QuietSpacePage">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgQuietSpacePage3} />
    </div>
  );
}

function QuietSpacePage15() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.95)] h-[192px] left-0 to-[rgba(122,79,255,0.19)] top-0 via-50% via-[rgba(122,79,255,0.5)] w-[166.5px]" data-name="QuietSpacePage" />;
}

function Heading7() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-white top-0 w-[90px]">Hindu Meditation</p>
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-[rgba(255,255,255,0.9)] top-0 w-[109px]">Mantras and chakra balancing</p>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[rgba(122,79,255,0.25)] h-[21px] relative rounded-[8px] shrink-0 w-[65.531px]" data-name="Badge">
      <BackgroundImageAndText text="2 sessions" />
      <div aria-hidden="true" className="absolute border border-[#7a4fff] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Badge3 />
      <IconBackgroundImage1 />
    </div>
  );
}

function Container31() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[117px] items-start left-[16px] top-[59px] w-[134.5px]" data-name="Container">
      <Heading7 />
      <Paragraph6 />
      <Container30 />
    </div>
  );
}

function QuietSpacePage16() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[166.5px]" data-name="QuietSpacePage">
      <ContainerBackgroundImage />
      <Container31 />
    </div>
  );
}

function Card5() {
  return (
    <div className="[grid-area:2_/_2] bg-[#1b1b1b] overflow-clip place-self-stretch relative rounded-[24px] shrink-0" data-name="Card">
      <QuietSpacePage14 />
      <QuietSpacePage15 />
      <QuietSpacePage16 />
    </div>
  );
}

function QuietSpacePage17() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[166.5px]" data-name="QuietSpacePage">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgQuietSpacePage4} />
    </div>
  );
}

function QuietSpacePage18() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.95)] h-[192px] left-0 to-[rgba(81,162,255,0.19)] top-0 via-50% via-[rgba(81,162,255,0.5)] w-[166.5px]" data-name="QuietSpacePage" />;
}

function Heading8() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-white top-0 w-[83px]">Jewish Reflection</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-[rgba(255,255,255,0.9)] text-nowrap top-0">Meditative conversation</p>
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[rgba(81,162,255,0.25)] h-[21px] relative rounded-[8px] shrink-0 w-[59.781px]" data-name="Badge">
      <BackgroundImageAndText text="1 session" />
      <div aria-hidden="true" className="absolute border border-[#51a2ff] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container32() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Badge4 />
      <IconBackgroundImage1 />
    </div>
  );
}

function Container33() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[99px] items-start left-[16px] top-[77px] w-[134.5px]" data-name="Container">
      <Heading8 />
      <Paragraph7 />
      <Container32 />
    </div>
  );
}

function QuietSpacePage19() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[166.5px]" data-name="QuietSpacePage">
      <ContainerBackgroundImage />
      <Container33 />
    </div>
  );
}

function Card6() {
  return (
    <div className="[grid-area:3_/_1] bg-[#1b1b1b] overflow-clip place-self-stretch relative rounded-[24px] shrink-0" data-name="Card">
      <QuietSpacePage17 />
      <QuietSpacePage18 />
      <QuietSpacePage19 />
    </div>
  );
}

function QuietSpacePage20() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[166.5px]" data-name="QuietSpacePage">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgQuietSpacePage5} />
    </div>
  );
}

function QuietSpacePage21() {
  return <div className="absolute bg-gradient-to-t from-[rgba(0,0,0,0.95)] h-[192px] left-0 to-[rgba(152,16,250,0.19)] top-0 via-50% via-[rgba(152,16,250,0.5)] w-[166.5px]" data-name="QuietSpacePage" />;
}

function Heading9() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[24px] left-0 not-italic text-[16px] text-white top-0 w-[79px]">Universal Practice</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[18px] left-0 text-[12px] text-[rgba(255,255,255,0.9)] top-0 w-[102px]">Mindfulness for all traditions</p>
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-[rgba(152,16,250,0.25)] h-[21px] relative rounded-[8px] shrink-0 w-[65.656px]" data-name="Badge">
      <BackgroundImageAndText text="5 sessions" />
      <div aria-hidden="true" className="absolute border border-[#9810fa] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Badge5 />
      <IconBackgroundImage1 />
    </div>
  );
}

function Container35() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[117px] items-start left-[16px] top-[59px] w-[134.5px]" data-name="Container">
      <Heading9 />
      <Paragraph8 />
      <Container34 />
    </div>
  );
}

function QuietSpacePage22() {
  return (
    <div className="absolute h-[192px] left-0 top-0 w-[166.5px]" data-name="QuietSpacePage">
      <ContainerBackgroundImage />
      <Container35 />
    </div>
  );
}

function Card7() {
  return (
    <div className="[grid-area:3_/_2] bg-[#1b1b1b] overflow-clip place-self-stretch relative rounded-[24px] shrink-0" data-name="Card">
      <QuietSpacePage20 />
      <QuietSpacePage21 />
      <QuietSpacePage22 />
    </div>
  );
}

function QuietSpacePage23() {
  return (
    <div className="gap-[12px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(3,_minmax(0px,_1fr))] h-[600px] relative shrink-0 w-full" data-name="QuietSpacePage">
      <Card2 />
      <Card3 />
      <Card4 />
      <Card5 />
      <Card6 />
      <Card7 />
    </div>
  );
}

function Section2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[698px] items-start left-0 px-[24px] py-0 top-[813.58px] w-[393px]" data-name="Section">
      <QuietSpacePage4 />
      <QuietSpacePage23 />
    </div>
  );
}

function Icon11() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d="M10.6667 4L13.3333 13.3333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M8 4V13.3333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M5.33333 5.33333V13.3333" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d="M2.66667 2.66667V13.3333" id="Vector_4" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Container36() {
  return (
    <BackgroundImage8 additionalClassNames="bg-[rgba(255,255,255,0.2)] size-[40px]">
      <Icon11 />
    </BackgroundImage8>
  );
}

function Container37() {
  return (
    <ContainerBackgroundImage1>
      <ContainerBackgroundImageAndText1 text="Guided Meditations" />
      <ContainerBackgroundImageAndText2 text="17 sessions available" />
    </ContainerBackgroundImage1>
  );
}

function QuietSpacePage24() {
  return (
    <BackgroundImage7 additionalClassNames="h-[45.703px] w-[218.438px]">
      <Container36 />
      <Container37 />
    </BackgroundImage7>
  );
}

function Button5() {
  return (
    <ButtonBackgroundImage additionalClassNames="from-[rgba(122,79,255,0.3)] to-[rgba(30,58,95,0.3)]">
      <QuietSpacePage24 />
      <IconBackgroundImage2 />
    </ButtonBackgroundImage>
  );
}

function Icon12() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p69dd000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p27014d80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.pa49680} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Container38() {
  return (
    <BackgroundImage8 additionalClassNames="bg-[rgba(255,255,255,0.2)] size-[40px]">
      <Icon12 />
    </BackgroundImage8>
  );
}

function Container39() {
  return (
    <ContainerBackgroundImage1>
      <ContainerBackgroundImageAndText1 text="Breathing Exercises" />
      <ContainerBackgroundImageAndText2 text="4 techniques available" />
    </ContainerBackgroundImage1>
  );
}

function QuietSpacePage25() {
  return (
    <BackgroundImage7 additionalClassNames="h-[45.703px] w-[219.625px]">
      <Container38 />
      <Container39 />
    </BackgroundImage7>
  );
}

function Button6() {
  return (
    <ButtonBackgroundImage additionalClassNames="from-[rgba(0,146,184,0.3)] to-[rgba(21,93,252,0.3)]">
      <QuietSpacePage25 />
      <IconBackgroundImage2 />
    </ButtonBackgroundImage>
  );
}

function Icon13() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <path d={svgPaths.p14890d00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
    </BackgroundImage>
  );
}

function Container40() {
  return (
    <BackgroundImage8 additionalClassNames="bg-[rgba(255,255,255,0.2)] size-[40px]">
      <Icon13 />
    </BackgroundImage8>
  );
}

function Container41() {
  return (
    <ContainerBackgroundImage1>
      <ContainerBackgroundImageAndText1 text="Meditation Reminders" />
      <ContainerBackgroundImageAndText2 text="Set daily notifications" />
    </ContainerBackgroundImage1>
  );
}

function QuietSpacePage26() {
  return (
    <BackgroundImage7 additionalClassNames="h-[45.703px] w-[239.531px]">
      <Container40 />
      <Container41 />
    </BackgroundImage7>
  );
}

function Button7() {
  return (
    <ButtonBackgroundImage additionalClassNames="from-[rgba(152,16,250,0.3)] to-[rgba(230,0,118,0.3)]">
      <QuietSpacePage26 />
      <IconBackgroundImage2 />
    </ButtonBackgroundImage>
  );
}

function Section3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[271.109px] items-start left-[24px] top-[1511.58px] w-[345px]" data-name="Section">
      <Button5 />
      <Button6 />
      <Button7 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p761d900} id="Vector" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p3c07bc00} id="Vector_2" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d="M14 11.6667V25.6667" id="Vector_3" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p2b6b0700} id="Vector_4" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p2fc9fa30} id="Vector_5" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container42() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.36)] content-stretch flex items-center justify-center left-[152.5px] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] size-[56px] top-[32px]" data-name="Container">
      <Icon14 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="absolute h-[42px] left-0 top-[104px] w-[361px]" data-name="Heading 3">
      <p className="absolute font-['Poppins:Bold',sans-serif] leading-[42px] left-[180.95px] not-italic text-[28px] text-center text-nowrap text-white top-px translate-x-[-50%]">Discover a Space</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="absolute h-[48px] left-0 top-[158px] w-[361px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[24px] left-[180.59px] text-[15px] text-center text-white top-0 translate-x-[-50%] w-[338px]">Find a personalized meditation space tailored to your spiritual journey and wellness goals</p>
    </div>
  );
}

function Text2() {
  return (
    <BackgroundImage4 additionalClassNames="h-[19.5px]">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[19.5px] left-[70.5px] text-[13px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Personalized matching</p>
    </BackgroundImage4>
  );
}

function Container43() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[19.5px] items-center left-[34.63px] top-0 w-[164.563px]" data-name="Container">
      <IconBackgroundImage3 />
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <BackgroundImage4 additionalClassNames="h-[19.5px]">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[19.5px] left-[46px] text-[13px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Faith-centered</p>
    </BackgroundImage4>
  );
}

function Container44() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[19.5px] items-center left-[211.19px] top-0 w-[115.172px]" data-name="Container">
      <IconBackgroundImage3 />
      <Text3 />
    </div>
  );
}

function Container45() {
  return (
    <div className="absolute h-[19.5px] left-0 top-[230px] w-[361px]" data-name="Container">
      <Container43 />
      <Container44 />
    </div>
  );
}

function Icon15() {
  return (
    <BackgroundImage1 additionalClassNames="absolute left-[179.73px] top-[13.25px]">
      <path d="M7.5 15L12.5 10L7.5 5" id="Vector" stroke="var(--stroke-0, #3D3D6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
    </BackgroundImage1>
  );
}

function Container46() {
  return (
    <div className="absolute bg-gradient-to-r border-2 border-[rgba(225,113,0,0.3)] border-solid from-[#ffd369] h-[50.5px] left-[66.63px] rounded-[3.35544e+07px] shadow-[0px_8px_30px_0px_rgba(255,211,105,0.4)] to-[#fe9a00] top-[281.5px] w-[227.734px]" data-name="Container">
      <p className="absolute font-['Poppins:SemiBold',sans-serif] leading-[22.5px] left-[98px] not-italic text-[#3d3d6b] text-[15px] text-center text-nowrap top-[12px] translate-x-[-50%]">Begin Your Journey</p>
      <Icon15 />
    </div>
  );
}

function Section4() {
  return (
    <div className="absolute h-[364px] left-[16px] top-[221.58px] w-[361px]" data-name="Section">
      <Container42 />
      <Heading10 />
      <Paragraph9 />
      <Container45 />
      <Container46 />
    </div>
  );
}

function QuietSpacePage27() {
  return (
    <div className="bg-white h-[2825.469px] relative shrink-0 w-full" data-name="QuietSpacePage">
      <Section />
      <Container19 />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
}

function AppContent() {
  return (
    <div className="absolute bg-[#121212] content-stretch flex flex-col h-[2898.469px] items-start left-0 pb-0 pt-[73px] px-0 top-0 w-[393px]" data-name="AppContent">
      <QuietSpacePage27 />
    </div>
  );
}

function QuietSpacePage28() {
  return (
    <div className="absolute h-[331.531px] left-[16px] top-[998px] w-[361px]" data-name="QuietSpacePage">
      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-contain pointer-events-none size-full" src={imgQuietSpacePage6} />
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

function Icon16() {
  return (
    <IconBackgroundImage4 additionalClassNames="absolute left-[16px] top-[18px]">
      <path d="M5 1H7" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 7L7.5 5.5" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p5139500} id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage4>
  );
}

function Badge6() {
  return (
    <div className="bg-gradient-to-b from-[#6b5dd3] h-[48px] relative rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] shrink-0 to-[#ffb84d] w-[109.969px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Icon16 />
        <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[40px] text-[14px] text-white top-[14px] w-[54px]">250 MIN</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex h-[48px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <ImageDivinityAgi />
      <Badge6 />
    </div>
  );
}

function AppHeader() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[73px] items-start left-0 pb-px pt-[12px] px-[16px] top-[778px] w-[393px]" data-name="AppHeader">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-[rgba(107,93,211,0.1)] border-solid inset-0 pointer-events-none shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)]" />
      <Container47 />
    </div>
  );
}

function Icon17() {
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
      <Icon17 />
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

function Button8() {
  return (
    <div className="absolute h-[56px] left-[7.42px] rounded-[16px] top-[14px] w-[55.047px]" data-name="Button">
      <BottomNavigation />
      <BottomNavigation1 />
    </div>
  );
}

function Icon18() {
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
      <Icon18 />
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

function Button9() {
  return (
    <div className="absolute h-[56px] left-[69.31px] rounded-[16px] top-[14px] w-[48.328px]" data-name="Button">
      <BottomNavigation2 />
      <BottomNavigation3 />
    </div>
  );
}

function Icon19() {
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
      <Icon19 />
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

function Button10() {
  return (
    <div className="absolute h-[56px] left-[124.48px] rounded-[16px] top-[14px] w-[80.703px]" data-name="Button">
      <BottomNavigation4 />
      <BottomNavigation5 />
    </div>
  );
}

function Container48() {
  return <div className="absolute bg-gradient-to-b border border-[rgba(107,93,211,0.2)] border-solid from-[#e8e5ff] h-[56px] left-0 rounded-[16px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] to-[#fff8e8] top-0 w-[46.703px]" data-name="Container" />;
}

function Container49() {
  return <div className="absolute bg-gradient-to-b from-[#6b5dd3] left-[20.34px] rounded-[3.35544e+07px] shadow-[0px_2px_8px_0px_rgba(107,93,211,0.08)] size-[6px] to-[#ffb84d] top-[-4px]" data-name="Container" />;
}

function Icon20() {
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
      <Icon37VectorBackgroundImage additionalClassNames="left-1/2 right-[20.83%]">
        <path d={svgPaths.p18da42f0} id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon37VectorBackgroundImage>
      <Icon37VectorBackgroundImage additionalClassNames="left-[20.83%] right-1/2">
        <path d={svgPaths.p115f4d00} id="Vector" stroke="var(--stroke-0, #6B5DD3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon37VectorBackgroundImage>
    </div>
  );
}

function BottomNavigation6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13.34px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon20 />
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

function Button11() {
  return (
    <div className="absolute h-[60px] left-[212.03px] rounded-[16px] top-[12px] w-[46.703px]" data-name="Button">
      <Container48 />
      <Container49 />
      <BottomNavigation6 />
      <BottomNavigation7 />
    </div>
  );
}

function Icon21() {
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
      <Icon21 />
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

function Button12() {
  return (
    <div className="absolute h-[56px] left-[265.58px] rounded-[16px] top-[14px] w-[61.531px]" data-name="Button">
      <BottomNavigation8 />
      <BottomNavigation9 />
    </div>
  );
}

function Icon22() {
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
      <Icon22 />
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

function Button13() {
  return (
    <div className="absolute h-[56px] left-[333.95px] rounded-[16px] top-[14px] w-[51.594px]" data-name="Button">
      <BottomNavigation10 />
      <BottomNavigation11 />
    </div>
  );
}

function Container50() {
  return (
    <div className="absolute h-[84px] left-0 top-0 w-[393px]" data-name="Container">
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
    </div>
  );
}

function Container51() {
  return <div className="absolute bg-gradient-to-t from-[rgba(107,93,211,0.05)] h-[84px] left-0 to-[rgba(0,0,0,0)] top-0 w-[393px]" data-name="Container" />;
}

function Icon23() {
  return (
    <IconBackgroundImage4 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p2e69df00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage4>
  );
}

function Text4() {
  return (
    <BackgroundImage4 additionalClassNames="h-[16px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[33px] text-[#90a1b9] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Need Help?</p>
    </BackgroundImage4>
  );
}

function CrisisSupportButton() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center left-[303.33px] top-[4px] w-[81.672px]" data-name="CrisisSupportButton">
      <Icon23 />
      <Text4 />
    </div>
  );
}

function BottomNavigation12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-[1px_0px_0px] border-[rgba(107,93,211,0.1)] border-solid h-[85px] left-0 shadow-[0px_16px_48px_0px_rgba(107,93,211,0.2)] top-[1545px] w-[393px]" data-name="BottomNavigation">
      <Container50 />
      <Container51 />
      <CrisisSupportButton />
    </div>
  );
}

export default function DivinityAgiSpiritGuideAppVersion127Copy() {
  return (
    <div className="bg-[#121212] relative size-full" data-name="DivinityAGI Spirit Guide App Version 12-7 (Copy)">
      <AppContent />
      <QuietSpacePage28 />
      <AppHeader />
      <BottomNavigation12 />
    </div>
  );
}