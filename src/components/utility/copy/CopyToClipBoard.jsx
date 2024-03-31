import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Typography from '@mui/material/Typography';


const CopyToClipboardButton = ({ textToCopy }) => {
  const handleCopyClick = () => {
    clipboardCopy(textToCopy)
      .then(() => {
        alert('Text copied to clipboard');
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
  };

  return (
    <div onClick={handleCopyClick} style={{ padding: "0px 3rem" }}>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField 
              style={{ 'border': 'none' }} 
              fullWidth id="input-with-sx" 
              value={textToCopy} 
              aria-readonly 
              variant="standard"
              InputProps={{ readOnly: true }}
            />
          <IconButton><ContentCopyIcon /></IconButton>
        </Box>
        <Typography variant="body2" sx={{ color: 'rgba(34, 64, 196, 1)', fontFamily: 'Montserrat Alternates' }}>
          Copy Your Referral Code
        </Typography>
      </Box>
      {/* {textToCopy} */}
    </div>
  );
};

CopyToClipboardButton.propTypes = {
    textToCopy: PropTypes.string
};

export default CopyToClipboardButton;
