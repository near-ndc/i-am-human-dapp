import React from 'react';
import { PrimaryButton, OutlineButton } from './Buttons';

const ImageTextBlock = ({
  imageSrc,
  title,
  description,
  isAvailable = false,
  onClick,
  buttonText = null,
}) => {
  return (
    <div className="flex gap-6 hover-card p-4 md:p-5">
      <img
        className="max-w-[130px] object-cover md:max-w-[160px] md:h-auto rounded-lg object-cover h-fit self-center"
        src={imageSrc}
      />
      <div className="flex flex-col gap-1 leading-1">
        <p className="text-lg font-semibold text-black">{title}</p>
        <p className="text-xs flex-1">{description}</p>
        <div className="text-black">
          {isAvailable ? (
            <PrimaryButton onClick={onClick}>
              <p className="text-sm">{buttonText ?? 'Apply Now'}</p>
            </PrimaryButton>
          ) : (
            <OutlineButton classes="cursor-auto">
              <p className="text-sm">{buttonText ?? 'Coming Soon'}</p>
            </OutlineButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageTextBlock;
