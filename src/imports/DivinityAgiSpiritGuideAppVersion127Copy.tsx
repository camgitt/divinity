import svgPaths from "./svg-p5ytml3s3h";
import clsx from "clsx";
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div style={{ backgroundImage: "linear-gradient(rgb(10, 61, 77) 0%, rgb(58, 95, 125) 30%, rgb(42, 58, 90) 70%, rgb(26, 26, 58) 100%)" }} className={clsx("content-stretch flex flex-col items-start overflow-clip pb-0 place-self-stretch pt-[20px] px-0 relative rounded-[16px] shadow-[0px_0px_0px_2px_#d4793f,0px_20px_50px_0px_rgba(0,0,0,0.4)] shrink-0", additionalClassNames)}>
      {children}
    </div>
  );
}

function BackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex flex-row items-center justify-center size-full">
      <div className="content-stretch flex items-center justify-center px-[9px] py-[5px] relative size-full">{children}</div>
    </div>
  );
}
type Icon13VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function Icon13VectorBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon13VectorBackgroundImageProps>) {
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
type IconBackgroundImage1Props = {
  additionalClassNames?: string;
};

function IconBackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<IconBackgroundImage1Props>) {
  return (
    <div className={clsx("size-[12px]", additionalClassNames)}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">{children}</g>
      </svg>
    </div>
  );
}

function IconBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="absolute left-[59.25px] size-[32px] top-0">
      <div className="absolute inset-[-4.17%_-20.83%_-29.17%_-20.83%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.3333 42.6667">
          {children}
        </svg>
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
type ParagraphBackgroundImageAndTextProps = {
  text: string;
};

function ParagraphBackgroundImageAndText({ text }: ParagraphBackgroundImageAndTextProps) {
  return (
    <div className="absolute h-[16px] left-0 top-[40px] w-[150.5px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[75.52px] text-[#cad5e2] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">{text}</p>
    </div>
  );
}
type PrimitiveButtonBackgroundImageAndTextProps = {
  text: string;
  additionalClassNames?: string;
};

function PrimitiveButtonBackgroundImageAndText({ text, additionalClassNames = "" }: PrimitiveButtonBackgroundImageAndTextProps) {
  return (
    <div className={clsx("h-[25px] justify-self-stretch relative rounded-[10px] shrink-0", additionalClassNames)}>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <BackgroundImage>
        <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#a1a1a1] text-[12px] text-center text-nowrap">{text}</p>
      </BackgroundImage>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="[grid-area:1_/_1] h-[25px] justify-self-stretch relative rounded-[10px] shrink-0" data-name="Primitive.button" style={{ backgroundImage: "linear-gradient(rgb(122, 79, 255) 0%, rgb(157, 127, 255) 100%), linear-gradient(90deg, rgba(41, 41, 41, 0.3) 0%, rgba(41, 41, 41, 0.3) 100%)" }}>
      <div aria-hidden="true" className="absolute border border-[#292929] border-solid inset-0 pointer-events-none rounded-[10px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]" />
      <BackgroundImage>
        <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#fafafa] text-[12px] text-center text-nowrap">Overview</p>
      </BackgroundImage>
    </div>
  );
}

function TabList() {
  return (
    <div className="bg-[rgba(255,255,255,0.9)] h-[36px] relative rounded-[14px] shrink-0 w-[361px]" data-name="Tab List">
      <div aria-hidden="true" className="absolute border border-[rgba(122,79,255,0.2)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid grid grid-cols-[repeat(4,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] px-[5px] py-[5.5px] relative size-full">
        <PrimitiveButton />
        <PrimitiveButtonBackgroundImageAndText text="Tokens" additionalClassNames="[grid-area:1_/_2]" />
        <PrimitiveButtonBackgroundImageAndText text="Plans" additionalClassNames="[grid-area:1_/_3]" />
        <PrimitiveButtonBackgroundImageAndText text="History" additionalClassNames="[grid-area:1_/_4]" />
      </div>
    </div>
  );
}

function SubscriptionSystem() {
  return (
    <div className="absolute h-[28px] left-[24px] top-[24px] w-[313px]" data-name="SubscriptionSystem">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[28px] left-[156.58px] text-[18px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Why Choose Premium?</p>
    </div>
  );
}

function Icon() {
  return (
    <IconBackgroundImage>
      <g filter="url(#filter0_d_6313_946)" id="Icon">
        <path d={svgPaths.p205ee300} id="Vector" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        <path d={svgPaths.p12670f80} id="Vector_2" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        <path d={svgPaths.p2a1dbb00} id="Vector_3" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        <path d={svgPaths.p21451d80} id="Vector_4" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      </g>
      <defs>
        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_6313_946" width="48" x="-1.33333" y="-2.66667">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_6313_946" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_6313_946" mode="normal" result="shape" />
        </filter>
      </defs>
    </IconBackgroundImage>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[16px] left-0 top-[40px] w-[150.5px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[75.31px] text-[#cad5e2] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">50+ Diverse AI Guides</p>
    </div>
  );
}

function Container() {
  return (
    <div className="[grid-area:1_/_1] place-self-stretch relative shrink-0" data-name="Container">
      <Icon />
      <Paragraph />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[59.25px] size-[32px] top-0" data-name="Icon">
      <div className="absolute inset-[0_-20.83%_-8.33%_-20.83%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.3333 34.6667">
          <g filter="url(#filter0_d_6313_914)" id="Icon">
            <path d={svgPaths.p239b5000} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_6313_914" width="48" x="-1.33333" y="-4">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_6313_914" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_6313_914" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="[grid-area:1_/_2] place-self-stretch relative shrink-0" data-name="Container">
      <Icon1 />
      <ParagraphBackgroundImageAndText text="Unlimited Chat Time" />
    </div>
  );
}

function Icon2() {
  return (
    <IconBackgroundImage>
      <g filter="url(#filter0_d_6313_930)" id="Icon">
        <path d="M22.6667 10.6667V29.3333" id="Vector" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
        <path d={svgPaths.p1f623680} id="Vector_2" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
      </g>
      <defs>
        <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_6313_930" width="48" x="-1.33333" y="-2.66667">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="4" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_6313_930" />
          <feBlend in="SourceGraphic" in2="effect1_dropShadow_6313_930" mode="normal" result="shape" />
        </filter>
      </defs>
    </IconBackgroundImage>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[16px] left-0 top-[40px] w-[150.5px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[75.47px] text-[#cad5e2] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Exclusive Reflections</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="[grid-area:2_/_1] place-self-stretch relative shrink-0" data-name="Container">
      <Icon2 />
      <Paragraph1 />
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[59.25px] size-[32px] top-0" data-name="Icon">
      <div className="absolute inset-[-8.34%_-12.5%_-33.35%_-12.5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 45.3378">
          <g filter="url(#filter0_d_6313_934)" id="Icon">
            <path d={svgPaths.p2f703100} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_6313_934" width="48" x="-4" y="-1.33276">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_6313_934" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_6313_934" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="[grid-area:2_/_2] place-self-stretch relative shrink-0" data-name="Container">
      <Icon3 />
      <ParagraphBackgroundImageAndText text="Ad-Free Experience" />
    </div>
  );
}

function SubscriptionSystem1() {
  return (
    <div className="absolute gap-[12px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(2,_minmax(0px,_1fr))] h-[124px] left-[24px] top-[92px] w-[313px]" data-name="SubscriptionSystem">
      <Container />
      <Container1 />
      <Container2 />
      <Container3 />
    </div>
  );
}

function PrimitiveDiv() {
  return <div className="absolute bg-[rgba(255,255,255,0.3)] h-px left-[24px] top-[272px] w-[313px]" data-name="Primitive.div" />;
}

function Paragraph2() {
  return (
    <div className="absolute h-[16px] left-0 top-0 w-[313px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[156.89px] text-[#cad5e2] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Start your spiritual journey with basic access</p>
    </div>
  );
}

function Icon4() {
  return (
    <IconBackgroundImage1 additionalClassNames="absolute left-[8px] top-[4px]">
      <path d={svgPaths.p2b0a6970} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 4V10.5" id="Vector_2" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p37996300} id="Vector_3" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" />
      <path d={svgPaths.p256c500} id="Vector_4" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage1>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[rgba(255,211,105,0.1)] border border-[rgba(255,211,105,0.5)] border-solid h-[22px] left-[82.23px] overflow-clip rounded-[8px] top-[28px] w-[148.531px]" data-name="Badge">
      <Icon4 />
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[16px] left-[85.5px] text-[#ffd369] text-[12px] text-center text-nowrap top-[2px] translate-x-[-50%]">Generous Free Tier</p>
    </div>
  );
}

function SubscriptionSystem2() {
  return (
    <div className="absolute h-[52px] left-[24px] top-[313px] w-[313px]" data-name="SubscriptionSystem">
      <Paragraph2 />
      <Badge />
    </div>
  );
}

function Card() {
  return (
    <div className="h-[389px] overflow-clip relative rounded-[24px] shadow-[0px_0px_0px_2px_#d4793f,0px_20px_50px_0px_rgba(0,0,0,0.4)] shrink-0 w-full" data-name="Card" style={{ backgroundImage: "linear-gradient(rgb(10, 61, 77) 0%, rgb(58, 95, 125) 30%, rgb(42, 58, 90) 70%, rgb(26, 26, 58) 100%)" }}>
      <SubscriptionSystem />
      <SubscriptionSystem1 />
      <PrimitiveDiv />
      <SubscriptionSystem2 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[75.25px] size-[24px] top-0" data-name="Icon">
      <div className="absolute inset-[-12.51%_-25.01%_-45.84%_-25.01%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 36.0068 38.0052">
          <g filter="url(#filter0_d_6313_943)" id="Icon">
            <path d={svgPaths.p35f9a700} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="40" id="filter0_d_6313_943" width="40" x="-1.99659" y="-0.997394">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_6313_943" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_6313_943" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute h-[16px] left-0 top-[32px] w-[174.5px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[87.25px] text-[12px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Buy Tokens</p>
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <Icon5 />
      <Container4 />
    </div>
  );
}

function Button() {
  return (
    <BackgroundImage1 additionalClassNames="[grid-area:1_/_1]">
      <Container5 />
    </BackgroundImage1>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[75.25px] size-[24px] top-0" data-name="Icon">
      <div className="absolute inset-[-8.3%_-29.16%_-41.67%_-29.16%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 37.996 35.9928">
          <g filter="url(#filter0_d_6313_939)" id="Icon">
            <path d={svgPaths.p2324c580} id="Vector" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
            <path d="M11.9975 22.9928H25.9975" id="Vector_2" stroke="var(--stroke-0, #7A4FFF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="40" id="filter0_d_6313_939" width="40" x="-1.00251" y="-2.00716">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_6313_939" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_6313_939" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[16px] left-0 top-[32px] w-[174.5px]" data-name="Container">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[87.69px] text-[12px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Go Premium</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <Icon6 />
      <Container6 />
    </div>
  );
}

function Button1() {
  return (
    <BackgroundImage1 additionalClassNames="[grid-area:1_/_2]">
      <Container7 />
    </BackgroundImage1>
  );
}

function SubscriptionSystem3() {
  return (
    <div className="gap-[12px] grid grid-cols-[repeat(2,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[88px] relative shrink-0 w-full" data-name="SubscriptionSystem">
      <Button />
      <Button1 />
    </div>
  );
}

function TabPanel() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[361px]" data-name="Tab Panel">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <Card />
        <SubscriptionSystem3 />
      </div>
    </div>
  );
}

function PrimitiveDiv1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[32px] h-[569px] items-start left-[16px] top-[473.5px] w-[361px]" data-name="Primitive.div">
      <TabList />
      <TabPanel />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute h-[24px] left-[58.2px] top-0 w-[64.609px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[32.5px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Our Mission</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[24px] left-[134.81px] top-0 w-[69.844px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[35px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Spirit Guides</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[24px] left-[216.66px] top-0 w-[40.078px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[20.5px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Privacy</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[24px] left-[268.73px] top-0 w-[34.063px]" data-name="Button">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[17.5px] text-[#90a1b9] text-[12px] text-center text-nowrap top-[4px] translate-x-[-50%]">Terms</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[180.59px] text-[#62748e] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">© 2025 DivinityAGI</p>
    </div>
  );
}

function AppFooter() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] h-[52px] items-start left-[16px] top-[1042.5px] w-[361px]" data-name="AppFooter">
      <Container8 />
      <Paragraph3 />
    </div>
  );
}

function SubscriptionSystem4() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="SubscriptionSystem">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[181.39px] text-[#7a4fff] text-[12px] text-center text-nowrap top-0 tracking-[0.6px] translate-x-[-50%] uppercase">Sacred Economy</p>
    </div>
  );
}

function SubscriptionSystem5() {
  return (
    <div className="h-[37.5px] relative shrink-0 w-full" data-name="SubscriptionSystem">
      <p className="absolute bg-clip-text font-['Raleway:Regular',sans-serif] font-normal leading-[37.5px] left-[180.83px] text-[30px] text-[rgba(0,0,0,0)] text-center text-nowrap top-0 translate-x-[-50%]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(122, 79, 255) 0%, rgb(255, 211, 105) 50%, rgb(122, 79, 255) 100%)" }}>
        Spiritual Journey Tokens
      </p>
    </div>
  );
}

function SubscriptionSystem6() {
  return (
    <div className="h-[26px] relative shrink-0 w-full" data-name="SubscriptionSystem">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[26px] left-[180.72px] text-[#4a5565] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Transparent. Simple. Meaningful.</p>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[99.5px] items-start left-[16px] top-[24px] w-[361px]" data-name="Container">
      <SubscriptionSystem4 />
      <SubscriptionSystem5 />
      <SubscriptionSystem6 />
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Icon">
      <div className="absolute inset-[-4.14%_-20.83%_-29.17%_-20.82%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 45.328 42.6571">
          <g filter="url(#filter0_d_6313_954)" id="Icon">
            <path d={svgPaths.p2414cab0} id="Vector" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
            <path d="M13.33 29.3238H31.9967" id="Vector_2" stroke="var(--stroke-0, #FFD369)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.66667" />
          </g>
          <defs>
            <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="48" id="filter0_d_6313_954" width="48" x="-1.33667" y="-2.67621">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" result="hardAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="4" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_6313_954" />
              <feBlend in="SourceGraphic" in2="effect1_dropShadow_6313_954" mode="normal" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[28px] relative shrink-0 w-[191.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[28px] left-[96px] text-[20px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Your Sacred Balance</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[32px] items-center justify-center left-0 pl-0 pr-[0.016px] py-0 top-0 w-[313px]" data-name="Container">
      <Icon7 />
      <Text />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[40px] left-0 top-[48px] w-[313px]" data-name="Container">
      <p className="absolute bg-clip-text font-['Raleway:Regular',sans-serif] font-normal leading-[40px] left-[156.77px] text-[36px] text-[rgba(0,0,0,0)] text-center text-nowrap top-0 translate-x-[-50%]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(rgb(255, 211, 105) 0%, rgb(255, 255, 255) 50%, rgb(255, 211, 105) 100%)" }}>
        10
      </p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[16px] left-0 top-[96px] w-[313px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[156.7px] text-[#cad5e2] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">tokens = minutes of divine guidance</p>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[22px] relative shrink-0 w-[68.922px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[34.5px] text-[12px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Current Plan</p>
      </div>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[rgba(122,79,255,0.1)] h-[22px] relative rounded-[8px] shrink-0 w-[57.094px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] size-full">
        <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#ffd369] text-[12px] text-center text-nowrap">Seeker</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(122,79,255,0.5)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex h-[22px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Badge1 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[16px] relative shrink-0 w-[88.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[44.5px] text-[12px] text-center text-nowrap text-white top-0 translate-x-[-50%]">Daily Remaining</p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[12.484px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[6.5px] text-[12px] text-center text-nowrap text-white top-0 translate-x-[-50%]">10</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[16px] items-start justify-between relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Text3 />
    </div>
  );
}

function Container14() {
  return <div className="bg-[#fafafa] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function PrimitiveDiv2() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex flex-col h-[8px] items-start overflow-clip relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Primitive.div">
      <Container14 />
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[62px] items-start relative shrink-0 w-full" data-name="Container">
      <Container12 />
      <Container13 />
      <PrimitiveDiv2 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[67.5px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
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
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-gradient-to-b from-[#7a4fff] h-[40px] relative rounded-[8px] shrink-0 to-[#ffd369] w-full" data-name="Button">
      <Icon8 />
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[172.5px] text-[14px] text-center text-nowrap text-white top-[10px] translate-x-[-50%]">Upgrade Your Journey</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] h-[118px] items-start left-0 top-[128px] w-[313px]" data-name="Container">
      <Container15 />
      <Button6 />
    </div>
  );
}

function SubscriptionSystem7() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[313px]" data-name="SubscriptionSystem">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container10 />
        <Container11 />
        <Paragraph4 />
        <Container16 />
      </div>
    </div>
  );
}

function Card1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[294px] items-start left-[16px] overflow-clip pl-[24px] pr-0 py-[24px] rounded-[24px] shadow-[0px_0px_0px_2px_#d4793f,0px_20px_50px_0px_rgba(0,0,0,0.4)] top-[139.5px] w-[361px]" data-name="Card" style={{ backgroundImage: "linear-gradient(rgb(10, 61, 77) 0%, rgb(58, 95, 125) 30%, rgb(42, 58, 90) 70%, rgb(26, 26, 58) 100%)" }}>
      <SubscriptionSystem7 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[20.83%] left-[20.83%] right-1/2 top-[20.83%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.5 13.3333">
            <path d={svgPaths.p37c3e100} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/2 left-[20.83%] right-[20.83%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-0.83px_-7.14%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3333 1.66667">
            <path d="M12.5 0.833333H0.833333" id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[16px] pb-0 pt-[8px] px-[8px] size-[36px] top-[24px]" data-name="Button">
      <Icon9 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[473.5px] left-0 top-0 w-[393px]" data-name="Container">
      <Container9 />
      <Card1 />
      <Button7 />
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[1118.5px] relative shrink-0 w-full" data-name="Container">
      <PrimitiveDiv1 />
      <AppFooter />
      <Container17 />
    </div>
  );
}

function SubscriptionSystem8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[1198.5px] items-start left-0 top-0 w-[393px]" data-name="SubscriptionSystem" style={{ backgroundImage: "linear-gradient(rgb(248, 247, 255) 0%, rgb(239, 241, 255) 50%, rgb(248, 247, 255) 100%), linear-gradient(90deg, rgb(18, 18, 18) 0%, rgb(18, 18, 18) 100%)" }}>
      <Container18 />
    </div>
  );
}

function Icon10() {
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
      <Icon10 />
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
    <div className="absolute h-[56px] left-[7.45px] rounded-[16px] top-[12px] w-[55.047px]" data-name="Button">
      <BottomNavigation />
      <BottomNavigation1 />
    </div>
  );
}

function Icon11() {
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
      <Icon11 />
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
    <div className="absolute h-[56px] left-[69.42px] rounded-[16px] top-[12px] w-[48.328px]" data-name="Button">
      <BottomNavigation2 />
      <BottomNavigation3 />
    </div>
  );
}

function Icon12() {
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
      <Icon12 />
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
    <div className="absolute h-[56px] left-[124.67px] rounded-[16px] top-[12px] w-[80.703px]" data-name="Button">
      <BottomNavigation4 />
      <BottomNavigation5 />
    </div>
  );
}

function Icon13() {
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
      <Icon13VectorBackgroundImage additionalClassNames="left-1/2 right-[20.83%]">
        <path d={svgPaths.p18da42f0} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon13VectorBackgroundImage>
      <Icon13VectorBackgroundImage additionalClassNames="left-[20.83%] right-1/2">
        <path d={svgPaths.p115f4d00} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon13VectorBackgroundImage>
    </div>
  );
}

function BottomNavigation6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13.09px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon13 />
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

function Button11() {
  return (
    <div className="absolute h-[56px] left-[212.3px] rounded-[16px] top-[12px] w-[46.188px]" data-name="Button">
      <BottomNavigation6 />
      <BottomNavigation7 />
    </div>
  );
}

function Icon14() {
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
      <Icon14 />
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
    <div className="absolute h-[56px] left-[265.41px] rounded-[16px] top-[12px] w-[61.531px]" data-name="Button">
      <BottomNavigation8 />
      <BottomNavigation9 />
    </div>
  );
}

function Icon15() {
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
      <Icon15 />
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
    <div className="absolute h-[56px] left-[333.86px] rounded-[16px] top-[12px] w-[51.594px]" data-name="Button">
      <BottomNavigation10 />
      <BottomNavigation11 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[80px] left-0 top-0 w-[393px]" data-name="Container">
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
    </div>
  );
}

function Container20() {
  return <div className="absolute bg-gradient-to-t from-[rgba(107,93,211,0.05)] h-[80px] left-0 to-[rgba(0,0,0,0)] top-0 w-[393px]" data-name="Container" />;
}

function Icon16() {
  return (
    <IconBackgroundImage1 additionalClassNames="relative shrink-0">
      <path d={svgPaths.p2e69df00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
    </IconBackgroundImage1>
  );
}

function Text4() {
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
      <Icon16 />
      <Text4 />
    </div>
  );
}

function BottomNavigation12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-[1px_0px_0px] border-[rgba(107,93,211,0.1)] border-solid h-[81px] left-0 shadow-[0px_16px_48px_0px_rgba(107,93,211,0.2)] top-[771px] w-[393px]" data-name="BottomNavigation">
      <Container19 />
      <Container20 />
      <CrisisSupportButton />
    </div>
  );
}

export default function DivinityAgiSpiritGuideAppVersion127Copy() {
  return (
    <div className="bg-[#121212] relative size-full" data-name="DivinityAGI Spirit Guide App Version 12-7 (Copy)">
      <SubscriptionSystem8 />
      <BottomNavigation12 />
    </div>
  );
}