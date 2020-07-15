import * as React from 'react';
// import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Check from '@material-ui/icons/Check';
<<<<<<< HEAD
=======
import CheckIcon from '@material-ui/icons/Check';
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
import DoneAllIcon from '@material-ui/icons/DoneAll';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

<<<<<<< HEAD
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
=======
const useQontoStepIconStyles = makeStyles({
  root: {
    color: '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  active: {
    color: '#784af4',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
  completed: {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
});

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 12,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 96deg,#48a89c 0%,#48a89c 50%,#48a89c 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 96deg,#48a89c 0%,#48a89c 50%,#48a89c 100%)',
    },
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
  },
  line: {
    height: 3,
    border: 0,
<<<<<<< HEAD
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  }
=======
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
<<<<<<< HEAD
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
=======
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 30,
    height: 30,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, #48a89c 0%, #48a89c 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, #48a89c 0%, #48a89c 100%)',
  },
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <DoneAllIcon />,
    2: <DoneAllIcon />,
<<<<<<< HEAD
    3: <Check />,
    4: <Check />
=======
    3: <CheckIcon />,
    4: <CheckIcon />,
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
<<<<<<< HEAD
        [classes.completed]: completed
=======
        [classes.completed]: completed,
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

<<<<<<< HEAD
const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
=======
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
  },
}));

function getSteps() {
<<<<<<< HEAD
  return ["Ordered", "Payment Done", "Dispatched", "Good Received"];
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(2);
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map(label => (
          <Step key={label} >
=======
  return ['orderd', 'Payment Done', 'Dispatched', 'Goods Received'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Unknown step';
  }
}

export default function Tra() {
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
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
<<<<<<< HEAD
    </div>
  );
}
=======
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
  );
}
>>>>>>> 5e384d7ed5673aab7a9817831e0858aec7070ec1
