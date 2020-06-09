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
              className={`step ${
                index === activeStep || index === props.activeStep
                  ? "active"
                  : ""
              }`}
            >
              <StpperBG
                fill={
                  index <= activeStep || index <= props.activeStep
                    ? "#48a89c"
                    : "#b5b5b5"
                }
              />
              <div className="step-label">
                {" "}
                <div className="step-label-inner">{step.label}</div>{" "}
              </div>
            </div>
          );
        })}
      </div>

      <div className="stepper-content">
        {props.activeStep && props.activeStep < props.stepData.length
          ? props.stepData[props.activeStep].component
          : props.stepData[activeStep].component}
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
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="50"
      viewBox="0 0 979 382"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M793 26H0V32.4207L161.991 191.599L0 350.777V356H793V26Z"
        fill={props.fill}
      />
      <path d="M979 191L791.5 356.411V25.5891L979 191Z" fill={props.fill} />
    </svg>
  );
};
