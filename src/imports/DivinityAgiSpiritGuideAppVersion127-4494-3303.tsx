import svgPaths from "./svg-3yrap0vt8z";
import clsx from "clsx";
type BackgroundImage2Props = {
  additionalClassNames?: string;
};

function BackgroundImage2({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage2Props>) {
  return (
    <div className={additionalClassNames}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        {children}
      </svg>
    </div>
  );
}
type BackgroundImage1Props = {
  additionalClassNames?: string;
};

function BackgroundImage1({ children, additionalClassNames = "" }: React.PropsWithChildren<BackgroundImage1Props>) {
  return (
    <div className={clsx("basis-0 grow min-h-px min-w-px relative shrink-0", additionalClassNames)}>
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">{children}</div>
    </div>
  );
}

function ContainerBackgroundImage({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="h-[32px] relative shrink-0 w-[80px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">{children}</div>
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
        {children}
      </svg>
    </div>
  );
}
type Icon5VectorBackgroundImageProps = {
  additionalClassNames?: string;
};

function Icon5VectorBackgroundImage({ children, additionalClassNames = "" }: React.PropsWithChildren<Icon5VectorBackgroundImageProps>) {
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

function PrimitiveButtonBackgroundImage() {
  return (
    <div className="bg-[rgba(41,41,41,0.3)] relative rounded-[4px] shrink-0 size-[16px]">
      <div aria-hidden="true" className="absolute border-2 border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[4px] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" />
    </div>
  );
}
type InputBackgroundImageAndTextProps = {
  text: string;
};

function InputBackgroundImageAndText({ text }: InputBackgroundImageAndTextProps) {
  return (
    <div className="bg-[rgba(41,41,41,0.3)] h-[48px] relative rounded-[14px] shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[12px] py-[4px] relative size-full">
          <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#99a1af] text-[16px] text-nowrap">{text}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}
type PrimitiveLabelBackgroundImageAndTextProps = {
  text: string;
};

function PrimitiveLabelBackgroundImageAndText({ text }: PrimitiveLabelBackgroundImageAndTextProps) {
  return (
    <div className="content-stretch flex h-[20px] items-center relative shrink-0 w-full">
      <p className="font-['Raleway:Medium',sans-serif] font-medium leading-[20px] relative shrink-0 text-[#364153] text-[14px] text-nowrap">{text}</p>
    </div>
  );
}
type ContainerBackgroundImageAndTextProps = {
  text: string;
};

function ContainerBackgroundImageAndText({ text }: ContainerBackgroundImageAndTextProps) {
  return (
    <div className="bg-[#e5e7eb] relative rounded-[3.35544e+07px] shrink-0 size-[32px]">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Raleway:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#99a1af] text-[16px] text-nowrap">{text}</p>
      </div>
    </div>
  );
}

function Container() {
  return <div className="absolute h-[1082.391px] left-0 top-0 w-[393px]" data-name="Container" style={{ backgroundImage: "linear-gradient(109.955deg, rgba(255, 211, 105, 0.1) 0%, rgb(255, 255, 255) 50%, rgba(122, 79, 255, 0.05) 100%)" }} />;
}

function Icon() {
  return (
    <BackgroundImage additionalClassNames="absolute left-[12px] top-[16px]">
      <g id="Icon">
        <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #4A5565)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
      </g>
    </BackgroundImage>
  );
}

function Button() {
  return (
    <div className="absolute h-[48px] left-0 rounded-[14px] top-0 w-[88.453px]" data-name="Button">
      <Icon />
      <p className="absolute font-['Raleway:Medium',sans-serif] font-medium leading-[20px] left-[60.5px] text-[#4a5565] text-[14px] text-center text-nowrap top-[14px] translate-x-[-50%]">Back</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-gradient-to-b from-[#ffd369] relative rounded-[3.35544e+07px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] shrink-0 size-[32px] to-[#ffc850]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Raleway:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#101828] text-[16px] text-nowrap">1</p>
      </div>
    </div>
  );
}

function Container2() {
  return <div className="bg-[#e5e7eb] h-[4px] rounded-[3.35544e+07px] shrink-0 w-[32px]" data-name="Container" />;
}

function Container3() {
  return (
    <ContainerBackgroundImage>
      <Container1 />
      <Container2 />
    </ContainerBackgroundImage>
  );
}

function Container4() {
  return <div className="bg-[#e5e7eb] h-[4px] rounded-[3.35544e+07px] shrink-0 w-[32px]" data-name="Container" />;
}

function Container5() {
  return (
    <ContainerBackgroundImage>
      <ContainerBackgroundImageAndText text="2" />
      <Container4 />
    </ContainerBackgroundImage>
  );
}

function LandingRegistrationPage() {
  return (
    <div className="h-[32px] relative shrink-0 w-[309px]" data-name="LandingRegistrationPage">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative size-full">
        <Container3 />
        <Container5 />
        <ContainerBackgroundImageAndText text="3" />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[28px] relative shrink-0 w-full" data-name="Heading 2">
      <p className="absolute font-['Raleway:Bold',sans-serif] font-bold leading-[28px] left-[154.83px] text-[#101828] text-[20px] text-center text-nowrap top-0 translate-x-[-50%]">Create Your Account</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[154.75px] text-[#4a5565] text-[14px] text-center text-nowrap top-0 translate-x-[-50%]">Step 1: Basic Information</p>
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[56px] items-start left-0 top-0 w-[309px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col h-[68px] items-start left-0 top-[80px] w-[309px]" data-name="Container">
      <PrimitiveLabelBackgroundImageAndText text="Full Name *" />
      <InputBackgroundImageAndText text="John Doe" />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col h-[68px] items-start left-0 top-[164px] w-[309px]" data-name="Container">
      <PrimitiveLabelBackgroundImageAndText text="Email *" />
      <InputBackgroundImageAndText text="john@example.com" />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col h-[68px] items-start left-0 top-[248px] w-[309px]" data-name="Container">
      <PrimitiveLabelBackgroundImageAndText text="Username *" />
      <InputBackgroundImageAndText text="johndoe" />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute bg-[rgba(41,41,41,0.3)] h-[48px] left-0 rounded-[14px] top-0 w-[309px]" data-name="Input">
      <div className="content-stretch flex items-center overflow-clip pl-[12px] pr-[40px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Raleway:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#99a1af] text-[16px] text-nowrap">Minimum 6 characters</p>
      </div>
      <div aria-hidden="true" className="absolute border-2 border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[20.84%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-7.14%_-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.6673 10.6658">
            <path d={svgPaths.pb85f580} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #6A7282)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[281px] size-[16px] top-[16px]" data-name="Button">
      <Icon1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Container">
      <Input />
      <Button1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-0 text-[#6a7282] text-[12px] text-nowrap top-0">At least 6 characters</p>
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col h-[88px] items-start left-0 top-[332px] w-[309px]" data-name="Container">
      <PrimitiveLabelBackgroundImageAndText text="Password *" />
      <Container10 />
      <Paragraph1 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col h-[68px] items-start left-0 top-[436px] w-[309px]" data-name="Container">
      <PrimitiveLabelBackgroundImageAndText text="Confirm Password *" />
      <InputBackgroundImageAndText text="Re-enter your password" />
    </div>
  );
}

function Label() {
  return (
    <div className="h-[20px] relative shrink-0 w-[224.875px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#364153] text-[14px] text-nowrap top-0">I confirm that I am 13 years or older</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[20px] items-start left-0 top-[520px] w-[309px]" data-name="Container">
      <PrimitiveButtonBackgroundImage />
      <Label />
    </div>
  );
}

function Label1() {
  return (
    <BackgroundImage1 additionalClassNames="h-[40px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-0 text-[#364153] text-[14px] top-0 w-[275px]">I agree to the Terms of Service and Privacy Policy</p>
    </BackgroundImage1>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[40px] items-start left-0 top-[556px] w-[309px]" data-name="Container">
      <PrimitiveButtonBackgroundImage />
      <Label1 />
    </div>
  );
}

function Container15() {
  return <div className="absolute border-[#e5e7eb] border-[1px_0px_0px] border-solid h-px left-0 top-[9.5px] w-[309px]" data-name="Container" />;
}

function Text() {
  return (
    <div className="absolute bg-white h-[20px] left-[98.38px] top-0 w-[112.234px]" data-name="Text">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[8px] text-[#6a7282] text-[14px] text-nowrap top-0">Or sign up with</p>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <Container15 />
      <Text />
    </div>
  );
}

function LandingRegistrationPage1() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <g clipPath="url(#clip0_4483_1183)" id="LandingRegistrationPage">
        <path d={svgPaths.p30ef7a30} fill="var(--fill-0, #364153)" id="Vector" />
        <path d={svgPaths.p35541a00} fill="var(--fill-0, #364153)" id="Vector_2" />
        <path d={svgPaths.p17176680} fill="var(--fill-0, #364153)" id="Vector_3" />
        <path d={svgPaths.p3683500} fill="var(--fill-0, #364153)" id="Vector_4" />
      </g>
      <defs>
        <clipPath id="clip0_4483_1183">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </BackgroundImage>
  );
}

function Button2() {
  return (
    <div className="[grid-area:1_/_1] bg-[rgba(41,41,41,0.3)] content-stretch flex items-center justify-center p-[2px] place-self-stretch relative rounded-[14px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#292929] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <LandingRegistrationPage1 />
    </div>
  );
}

function LandingRegistrationPage2() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <g clipPath="url(#clip0_4483_1194)" id="LandingRegistrationPage">
        <path d={svgPaths.p302cda80} fill="var(--fill-0, #364153)" id="Vector" />
      </g>
      <defs>
        <clipPath id="clip0_4483_1194">
          <rect fill="white" height="16" width="16" />
        </clipPath>
      </defs>
    </BackgroundImage>
  );
}

function Button3() {
  return (
    <div className="[grid-area:1_/_2] bg-[rgba(41,41,41,0.3)] content-stretch flex items-center justify-center p-[2px] place-self-stretch relative rounded-[14px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#292929] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <LandingRegistrationPage2 />
    </div>
  );
}

function LandingRegistrationPage3() {
  return (
    <BackgroundImage additionalClassNames="relative shrink-0">
      <g id="LandingRegistrationPage">
        <path d={svgPaths.p7ad0b00} fill="var(--fill-0, #364153)" id="Vector" />
      </g>
    </BackgroundImage>
  );
}

function Button4() {
  return (
    <div className="[grid-area:1_/_3] bg-[rgba(41,41,41,0.3)] content-stretch flex items-center justify-center p-[2px] place-self-stretch relative rounded-[14px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#292929] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <LandingRegistrationPage3 />
    </div>
  );
}

function Container17() {
  return (
    <div className="gap-[12px] grid grid-cols-[repeat(3,_minmax(0px,_1fr))] grid-rows-[repeat(1,_minmax(0px,_1fr))] h-[48px] relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[92px] items-start left-0 top-[676px] w-[309px]" data-name="Container">
      <Container16 />
      <Container17 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[22.391px] left-[214.06px] top-0 w-[50.641px]" data-name="Button">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[22.4px] left-[25.5px] text-[#ffd369] text-[16px] text-center text-nowrap top-[-1px] translate-x-[-50%]">Sign in</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[22.391px] left-0 top-[792px] w-[309px]" data-name="Paragraph">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[20px] left-[129.28px] text-[#4a5565] text-[14px] text-center top-px translate-x-[-50%] w-[170px]">Already have an account?</p>
      <Button5 />
    </div>
  );
}

function Container19() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.4)] h-[40px] left-0 rounded-[3.35544e+07px] to-[rgba(0,0,0,0)] top-0 via-50% via-[rgba(255,255,255,0.1)] w-[309px]" data-name="Container" />;
}

function Container20() {
  return <div className="absolute bg-gradient-to-b from-[rgba(255,255,255,0.5)] h-[16px] left-0 rounded-[3.35544e+07px] to-[rgba(0,0,0,0)] top-0 w-[309px]" data-name="Container" />;
}

function Text1() {
  return (
    <div className="absolute h-[21px] left-[124.48px] top-[9.5px] w-[60.031px]" data-name="Text">
      <p className="absolute font-['Raleway:SemiBold',sans-serif] font-semibold leading-[21px] left-[30.5px] text-[#101828] text-[14px] text-center text-nowrap top-0 translate-x-[-50%]">Continue</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-gradient-to-b from-[#ffd369] h-[40px] left-0 overflow-clip rounded-[3.35544e+07px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] to-[#ffd369] top-[612px] via-50% via-[#ffc850] w-[309px]" data-name="Button">
      <Container19 />
      <Container20 />
      <Text1 />
    </div>
  );
}

function LandingRegistrationPage4() {
  return (
    <BackgroundImage1 additionalClassNames="w-[309px]">
      <Container6 />
      <Container7 />
      <Container8 />
      <Container9 />
      <Container11 />
      <Container12 />
      <Container13 />
      <Container14 />
      <Container18 />
      <Paragraph2 />
      <Button6 />
    </BackgroundImage1>
  );
}

function Card() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[56px] h-[954.391px] items-start left-0 pl-[26px] pr-[2px] py-[26px] rounded-[24px] top-[64px] w-[361px]" data-name="Card">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_8px_30px_0px_rgba(0,0,0,0.08)]" />
      <LandingRegistrationPage />
      <LandingRegistrationPage4 />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute h-[1018.391px] left-[16px] top-[32px] w-[361px]" data-name="Container">
      <Button />
      <Card />
    </div>
  );
}

function LandingRegistrationPage5() {
  return (
    <div className="absolute bg-white h-[1082.391px] left-0 overflow-clip top-0 w-[393px]" data-name="LandingRegistrationPage">
      <Container />
      <Container21 />
    </div>
  );
}

function Icon2() {
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
      <Icon2 />
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

function Button7() {
  return (
    <div className="absolute h-[56px] left-[7.45px] rounded-[16px] top-[12px] w-[55.047px]" data-name="Button">
      <BottomNavigation />
      <BottomNavigation1 />
    </div>
  );
}

function Icon3() {
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
      <Icon3 />
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

function Button8() {
  return (
    <div className="absolute h-[56px] left-[69.42px] rounded-[16px] top-[12px] w-[48.328px]" data-name="Button">
      <BottomNavigation2 />
      <BottomNavigation3 />
    </div>
  );
}

function Icon4() {
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
      <Icon4 />
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

function Button9() {
  return (
    <div className="absolute h-[56px] left-[124.67px] rounded-[16px] top-[12px] w-[80.703px]" data-name="Button">
      <BottomNavigation4 />
      <BottomNavigation5 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[41.67%] left-1/4 right-1/4 top-[8.33%]" data-name="Vector">
        <BackgroundImage2 additionalClassNames="absolute inset-[-8.33%]">
          <path d={svgPaths.p77fa900} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </BackgroundImage2>
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
      <Icon5VectorBackgroundImage additionalClassNames="left-1/2 right-[20.83%]">
        <path d={svgPaths.p18da42f0} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon5VectorBackgroundImage>
      <Icon5VectorBackgroundImage additionalClassNames="left-[20.83%] right-1/2">
        <path d={svgPaths.p115f4d00} id="Vector" stroke="var(--stroke-0, #5D5D7D)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
      </Icon5VectorBackgroundImage>
    </div>
  );
}

function BottomNavigation6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[13.09px] size-[20px] top-[8px]" data-name="BottomNavigation">
      <Icon5 />
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

function Button10() {
  return (
    <div className="absolute h-[56px] left-[212.3px] rounded-[16px] top-[12px] w-[46.188px]" data-name="Button">
      <BottomNavigation6 />
      <BottomNavigation7 />
    </div>
  );
}

function Icon6() {
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
      <Icon6 />
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

function Button11() {
  return (
    <div className="absolute h-[56px] left-[265.41px] rounded-[16px] top-[12px] w-[61.531px]" data-name="Button">
      <BottomNavigation8 />
      <BottomNavigation9 />
    </div>
  );
}

function Icon7() {
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
      <Icon7 />
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

function Button12() {
  return (
    <div className="absolute h-[56px] left-[333.86px] rounded-[16px] top-[12px] w-[51.594px]" data-name="Button">
      <BottomNavigation10 />
      <BottomNavigation11 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute h-[80px] left-0 top-0 w-[393px]" data-name="Container">
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
    </div>
  );
}

function Container23() {
  return <div className="absolute bg-gradient-to-t from-[rgba(107,93,211,0.05)] h-[80px] left-0 to-[rgba(0,0,0,0)] top-0 w-[393px]" data-name="Container" />;
}

function Icon8() {
  return (
    <BackgroundImage2 additionalClassNames="relative shrink-0 size-[12px]">
      <g id="Icon">
        <path d={svgPaths.p2e69df00} id="Vector" stroke="var(--stroke-0, #90A1B9)" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </BackgroundImage2>
  );
}

function Text2() {
  return (
    <BackgroundImage1 additionalClassNames="h-[16px]">
      <p className="absolute font-['Raleway:Regular',sans-serif] font-normal leading-[16px] left-[33px] text-[#90a1b9] text-[12px] text-center text-nowrap top-0 translate-x-[-50%]">Need Help?</p>
    </BackgroundImage1>
  );
}

function CrisisSupportButton() {
  return (
    <div className="absolute content-stretch flex gap-[4px] h-[16px] items-center left-[303.33px] top-[4px] w-[81.672px]" data-name="CrisisSupportButton">
      <Icon8 />
      <Text2 />
    </div>
  );
}

function BottomNavigation12() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.95)] border-[1px_0px_0px] border-[rgba(107,93,211,0.1)] border-solid h-[81px] left-0 shadow-[0px_16px_48px_0px_rgba(107,93,211,0.2)] top-[771px] w-[393px]" data-name="BottomNavigation">
      <Container22 />
      <Container23 />
      <CrisisSupportButton />
    </div>
  );
}

export default function DivinityAgiSpiritGuideAppVersion() {
  return (
    <div className="bg-[#121212] relative size-full" data-name="DivinityAGI Spirit Guide App Version 12-7">
      <LandingRegistrationPage5 />
      <BottomNavigation12 />
    </div>
  );
}