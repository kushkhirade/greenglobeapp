import * as React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 12
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg, #48a89c 0%, #48a89c 30%, #48a89c 50%, #48a89c 100%)"
    }
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg, #48a89c 0%, #48a89c 30%, #48a89c 50%, #48a89c 100%)"
    }
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  }

})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 30,
    height: 30,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, #48a89c 0%, #48a89c 30%, #48a89c 50%, #48a89c 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, #48a89c 0%, #48a89c 30%, #48a89c 50%, #48a89c 100%)"
  }
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <DoneAllIcon />,
    2: <DoneAllIcon />,
    3: <Check />,
    4: <Check />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
}));

function getSteps() {
  return ['orderd', 'Payment Done', 'Dispatched', 'Goods Received'];
}

export default function TrackingInfoBar() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    // <div className={classes.root}>
      <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
  );
}
    //   <div>
    //     {activeStep === steps.length ? (
    //       <div>
    //         <Typography className={classes.instructions}>
    //           All steps completed - you&apos;re finished
    //         </Typography>
    //         <Button onClick={handleReset} className={classes.button}>
    //           Reset
    //         </Button>
    //       </div>
    //     ) : (
    //       <div>
    //         <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
    //         <div>
    //           <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
    //             Back
    //           </Button>
    //           <Button
    //             variant="contained"
    //             color="primary"
    //             onClick={handleNext}
    //             className={classes.button}
    //           >
    //             {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
    //           </Button>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </div>

