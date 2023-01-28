import { AppBar, Button, ThemeProvider, Toolbar } from '@mui/material';
import { useTheme } from '@mui/system';
import useSettings from 'app/hooks/useSettings';

const Footer = () => {
  const theme = useTheme();
  const { settings } = useSettings();

  const footerTheme = settings.themes[settings.footer.theme] || theme;

  return (
    <div className='footer'>
        <div className='row h-100'>
          <div className='col-12 h-100 d-flex justify-content-end align-items-center p-4'>
            <h6 className='m-0'>Design and Developed by <a href="">IU Students</a></h6>
          </div>
        </div>
      </div>
  );
};

export default Footer;
