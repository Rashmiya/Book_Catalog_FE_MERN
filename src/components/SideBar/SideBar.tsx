import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Input = styled(MuiInput)`
  width: 42px;
`;
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const CustomAccordionSummary = styled(MuiAccordionSummary)(
  ({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, .05)'
        : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  })
);

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [a1Expanded, setExpandedA1] = React.useState<string | false>('panel1');
  const [a2Expanded, setExpandedA2] = React.useState<string | false>('panel2');
  const [a3Expanded, setExpandedA3] = React.useState<string | false>('panel3');
  const [a4Expanded, setExpandedA4] = React.useState<string | false>('panel4');


  // price area
  const [value, setValue] = React.useState<any>(
    0,
  );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 1000) {
      setValue(1000);
    } else if (value > 10000) {
      setValue(10000);
    }
  };

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    if(panel==='panel1'){setExpandedA1(newExpanded ? panel : false);}
    if(panel==='panel2'){setExpandedA2(newExpanded ? panel : false);}
    if(panel==='panel3'){setExpandedA3(newExpanded ? panel : false);}
    if(panel==='panel4'){setExpandedA4(newExpanded ? panel : false);}
    
  };

  return (
    <div>
      {/* availability */}
      <Accordion
        sx={{ border: 'none' }}
        expanded={a1Expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <CustomAccordionSummary
          sx={{ backgroundColor: 'white' }}
          aria-controls="panel1d-content"
          id="panel1d-header"
        >
          <Typography sx={{fontFamily:'initial',fontSize:'20px',color:'#676767'}}>Availability</Typography>
        </CustomAccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox  />} label="In Stock" />
            <FormControlLabel control={<Checkbox  />} label="Out Of Stock" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/* Price */}
      <Accordion
        sx={{ border: 'none' }}
        expanded={a2Expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <CustomAccordionSummary
          sx={{ backgroundColor: 'white' }}
          aria-controls="panel2d-content"
          id="panel2d-header"
        >
          <Typography sx={{fontFamily:'initial',fontSize:'20px',color:'#676767'}}>Price</Typography>
        </CustomAccordionSummary>
        <AccordionDetails>
          <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>
        Select Price
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <AttachMoneyIcon />
              </Grid>
              <Grid item xs>
                <Slider
                  value={typeof value === 'number' ? value : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                  min={1000}  
                  max={10000}
                />
              </Grid>
              <Grid item>
                <Input
                  value={value}
                  size="small"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 10,
                    min: 1000,
                    max: 10000,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/*product type */}
      <Accordion
        sx={{ border: 'none' }}
        expanded={a3Expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <CustomAccordionSummary
          sx={{ backgroundColor: 'white' }}
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <Typography sx={{fontFamily:'initial',fontSize:'20px',color:'#676767'}}>Product type</Typography>
        </CustomAccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox  />} label="Business" />
            <FormControlLabel control={<Checkbox  />} label="Entertainment" />
            <FormControlLabel control={<Checkbox  />} label="Fiction" />
            <FormControlLabel control={<Checkbox  />} label="Humor" />
            <FormControlLabel control={<Checkbox  />} label="Literature" />
            <FormControlLabel control={<Checkbox  />} label="Sugar Flakes" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      {/*Language */}
      <Accordion
        sx={{ border: 'none' }}
        expanded={a4Expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <CustomAccordionSummary
          sx={{ backgroundColor: 'white' }}
          aria-controls="panel3d-content"
          id="panel3d-header"
        >
          <Typography sx={{fontFamily:'initial',fontSize:'20px',color:'#676767'}}>Language</Typography>
        </CustomAccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox  />} label="Sinhala" />
            <FormControlLabel control={<Checkbox  />} label="English" />
            <FormControlLabel control={<Checkbox  />} label="Tamil" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
