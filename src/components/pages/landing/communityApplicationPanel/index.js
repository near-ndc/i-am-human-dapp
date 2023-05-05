import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Panel } from '../../../common/panel';

export const CommunityApplicationPanel = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [previewImage, setPreviewImage] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Panel
      open={open}
      onClose={() => setOpen(false)}
      title="Application for Community on I-am-Human"
    >
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="py-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="communityName"
            >
              Community Name
            </label>
            <input
              {...register('communityName', {
                required: 'Community name is required',
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="communityName"
              type="text"
            />
            {errors.communityName && (
              <p className="text-red-500 mt-1 text-xs italic">
                {errors.communityName.message}
              </p>
            )}
          </div>
          <div className="py-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="communityDescription"
            >
              Community Description
            </label>
            <textarea
              {...register('communityDescription', {
                required: 'Community description is required',
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="communityDescription"
            />
            {errors.communityDescription && (
              <p className="text-red-500 mt-1 text-xs italic">
                {errors.communityDescription.message}
              </p>
            )}
          </div>
          <div className="py-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="communityArtwork"
            >
              Community Artwork
            </label>
            <input
              {...register('communityArtwork', {
                required: 'Community artwork is required',
              })}
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="communityArtwork"
              type="file"
              accept="image/*"
            />
            {errors.communityArtwork && (
              <p className="text-red-500 mt-1 text-xs italic">
                {errors.communityArtwork.message}
              </p>
            )}
            {previewImage && (
              <div className="mt-4">
                <img
                  src={previewImage}
                  alt="preview"
                  className="w-[200px] h-[200px] object-cover object-center rounded-md"
                />
              </div>
            )}
          </div>
          <div className="py-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Community
            </button>
          </div>
        </form>
      </div>
    </Panel>
  );
};
