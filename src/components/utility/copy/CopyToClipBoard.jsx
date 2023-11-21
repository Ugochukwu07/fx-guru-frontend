import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';


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
    <div onClick={handleCopyClick}>
      {textToCopy}
    </div>
  );
};

CopyToClipboardButton.propTypes = {
    textToCopy: PropTypes.string
};

export default CopyToClipboardButton;
