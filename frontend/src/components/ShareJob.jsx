import {
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  LinkedinIcon,
  FacebookIcon,
  TwitterIcon
} from "react-share";

function ShareJob({ jobUrl }) {


    console.log(jobUrl)
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <WhatsappShareButton url={jobUrl} title="Check out this job on Refrll!">
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <LinkedinShareButton url={jobUrl} title="Check out this job on Refrll!">
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <FacebookShareButton url={jobUrl} quote="Check out this job on Refrll!">
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton url={jobUrl} title="Check out this job on Refrll!">
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  );
}


export default ShareJob;