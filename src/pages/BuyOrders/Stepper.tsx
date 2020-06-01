import * as React from "react";

export const Stepper = (props: any) => {
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <div className="stepper-container">
      <div className="step-container">
        {props.stepData.map((step: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => setActiveStep(index)}
              className={`step ${index === activeStep ? "active" : ""}`}
            >
              <StpperBG fill={index === activeStep ? "red" : "green"} />
              <div className="step-label">{step.label}</div>
            </div>
          );
        })}
      </div>

      <div className="stepper-content" >
        {props.stepData[activeStep].component}
        {/* {props.stepData.length - 1 > activeStep && (
          <button onClick={() => setActiveStep(activeStep + 1)}>Next</button>
        )} */}
      </div>
    </div>
  );
};

const StpperBG = (props: any) => {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 1090 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M788.834 43H0V52.8147L262.719 310.971L0 569.127V577H788.834V43Z"
        fill={props.fill}
      />
      <path d="M1090 310L784 578.468L784 41.5321L1090 310Z" fill={props.fill} />
    </svg>
  );
};
